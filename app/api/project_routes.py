from flask import Blueprint, request, jsonify
from app.models import db, Project, JoinRequest
from app.forms import ProjectForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helper import (
    upload_file_to_s3, get_unique_filename)


projects_bp = Blueprint('projects', __name__, url_prefix='/projects')

@projects_bp.route('/', methods=['GET'])
def get_all_projects():
    projects = Project.query.all()

    return [project.to_dict() for project in projects]

@projects_bp.route('/user/<int:user_id>', methods=['GET'])
@login_required
def get_user_projects(user_id):
    # Ensure that the current user is the one requesting their own projects
    if current_user.id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 401

    # Fetch projects for the specified user
    user_projects = Project.query.filter_by(user_id=user_id).all()

    # Convert projects to a list of dictionaries
    projects_data = [project.to_dict() for project in user_projects]

    return projects_data

@projects_bp.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.get(project_id)
    if project:
        return project.to_dict()
    return jsonify({'error': 'Project not found'}), 404


@projects_bp.route('/create', methods=['POST'])
def create_project():
    form = ProjectForm()
    if form.validate_on_submit:
        new_project = Project(
            project_name=form.data['project_name'],
            description=form.data['description'],
            project_type=form.data['project_type'],
            image_url=form.data['image_url'],
            user_id=current_user.id
            )
        db.session.add(new_project)
        db.session.commit()
        
        return new_project.to_dict(), 201
    return form.errors, 404

@projects_bp.route('/<int:project_id>/join', methods=['POST'])
def join_project(project_id):
     # Fetch the project to get the receiver_id
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'message': 'Project not found.'}), 404
    # Check if the user has already sent a request
    existing_request = JoinRequest.query.filter_by(sender_id=current_user.id, project_id=project_id).first()
    if existing_request:
        return jsonify({'message': 'You have already sent a request to join this project.'}), 400

    # Create a new join request
    join_request = JoinRequest(
        sender_id=current_user.id,
        receiver_id=project.user_id,
        project_id=project_id
        )
    db.session.add(join_request)
    db.session.commit()

    return jsonify({'message': 'Join request sent successfully.'})

@projects_bp.route('/<int:user_id>/join-requests', methods=['GET'])
def get_join_requests(user_id):
    # Get all join requests for a specific project
    join_requests = JoinRequest.query.filter_by(sender_id=user_id).all()

    # Return the list of join requests
    return jsonify({'join_requests': [request.to_dict() for request in join_requests]})


@projects_bp.route('/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    project = Project.query.get(project_id)
    form = ProjectForm()
    
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    if form.validate_on_submit:
        url = None
        image_url=form.data["image_url"]
        if image_url:
            image_url.filename = get_unique_filename(image_url.filename)
            upload = upload_file_to_s3(image_url)
            print("image upload", upload)

            if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message (and we printed it above)
                errors = [upload]
                return {'errors': errors}, 400

            url = upload["url"]
        if current_user.id == project.user_id:
            project.project_name =form.data['project_name']
            project.description=form.data['description']
            project.project_type=form.data['project_type']
            project.image_url=url
        else:
            return {'errors':'You do not own the project you want to edit'}, 404
    # Update other fields as needed
        db.session.commit()
        return project.to_dict()
    return form.errors, 404


from sqlalchemy.exc import SQLAlchemyError

@projects_bp.route('/<int:project_id>', methods=['DELETE'])
@login_required
def delete_project(project_id):
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({'error': 'Project not found'}), 404
        if current_user.id != project.user_id:
            return jsonify({'error': 'You do not own this project'}), 403

        # Attempt to delete the project and commit the changes
        db.session.delete(project)
        db.session.commit()

        return jsonify({'message': 'Project deleted successfully'}), 200

    except SQLAlchemyError as e:
        # If there's an error, log it and rollback the session
        projects_bp.logger.error(f"Error deleting project (ID: {project_id}): {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Internal Server Error'}), 500
