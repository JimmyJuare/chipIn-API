from flask import Blueprint, request, jsonify
from app.models import db, Post
from app.forms import PostForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helper import (
    upload_file_to_s3, get_unique_filename)


posts_bp = Blueprint('posts', __name__, url_prefix='/posts')

#get all posts
@posts_bp.route('/', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()

    return [post.to_dict() for post in posts]

#get single post
@posts_bp.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    return post.to_dict()

@posts_bp.route('/user/<int:user_id>', methods=['GET'])
@login_required
def get_user_posts(user_id):
    # Ensure that the current user is the one requesting their own posts
    if current_user.id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 401

    # Fetch posts for the specified user
    user_posts = Post.query.filter_by(user_id=user_id).all()

    # Convert posts to a list of dictionaries
    posts_data = [post.to_dict() for post in user_posts]

    return posts_data

@posts_bp.route('/create', methods=['POST'])
def create_post():
    form = PostForm()
    #must add csrf to every form in order form for it to work
    form['csrf_token'].data = request.cookies["csrf_token"]
    print('this is the form', form.data)
    if form.validate_on_submit():
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
        new_post = Post(
            title=form.data['title'],
            user_id=current_user.id,
            project_id=form.data['project_id'],
            body=form.data['body'],
            image_url=url,
            status=form.data['status']
        )
        print('this is the new post', jsonify(new_post.to_dict()))
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201
    return form.errors, 400

@posts_bp.route('/<int:post_id>', methods=['PUT'])
@login_required
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    form = PostForm()
    
    form['csrf_token'].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
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
        post.title = form.data['title']
        post.body = form.data['body']
        post.image_url = url
        post.status = form.data['status']
        post.project_id = form.data['project_id']
        db.session.commit()
        return post.to_dict()
    return form.errors, 400

@posts_bp.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if not post:
        return jsonify({'error': 'post not found'}), 404
    if current_user.id != post.user_id:
        return jsonify({'error': 'You do not own this post'}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'})
