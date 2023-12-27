
from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserProject(db.Model):
    __tablename__ = 'user_projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), primary_key=True)
    user = db.relationship('User', backref='user_projects')
    
    # Add a relationship to the Project model    

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'project_id': self.project_id,
            'user': self.user.to_dict() if self.user else None
        }
