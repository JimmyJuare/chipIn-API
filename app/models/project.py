from .db import db, environment, SCHEMA, add_prefix_for_prod

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    project_name = db.Column(db.String(40), nullable=False)
    project_type = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String(255), nullable=True) # , nullable=False
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    user = db.relationship('User', backref='projects')
    posts = db.relationship('Post', back_populates='project', cascade='all, delete')
    user_projects = db.relationship('UserProject', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'project_name': self.project_name,
            'project_type': self.project_type,
            'description': self.description,
            'image_url':self.image_url,
            'user_id': self.user_id,
            'user': self.user.to_dict() if self.user else None
        }
