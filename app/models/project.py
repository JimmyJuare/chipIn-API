from .db import db, environment, SCHEMA, add_prefix_for_prod
from .posts import Post
class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    project_name = db.Column(db.String(40), nullable=False)
    project_type = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    
    user = db.relationship('User', backref='projects')
    post = db.relationship('Post', foreign_keys=[post_id])  # Specify foreign key
    posts = db.relationship('Post', back_populates='project', cascade='all, delete', foreign_keys=[Post.project_id])
    user_projects = db.relationship('UserProject', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id': self.id,
            'project_name': self.project_name,
            'project_type': self.project_type,
            'description': self.description,
            'image_url':self.image_url,
            'post_id': self.post_id,
            'user_id': self.user_id,
            'user': self.user.to_dict() if self.user else None
        }
