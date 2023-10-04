from .db import db, environment, SCHEMA, add_prefix_for_prod



class Post(db.Model):
    __tablename__ =  'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), unique=True)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'status': self.status,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None
        }
