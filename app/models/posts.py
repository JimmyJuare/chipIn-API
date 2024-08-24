from .db import db, environment, SCHEMA, add_prefix_for_prod



class Post(db.Model):
    __tablename__ =  'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    image_url = db.Column(db.String(255), nullable=True) # , nullable=False
    status = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
    
    project = db.relationship('Project', back_populates='posts', foreign_keys=[project_id])


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'user_id': self.user_id,
            'image_url':self.image_url,
            'project_id': self.project_id,
            'project_type': self.project.project_type,
            'status': self.status,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None
        }
