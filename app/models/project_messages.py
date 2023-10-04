
from .db import db, environment, SCHEMA

class ProjectMessage(db.Model):
    __tablename__ = 'project_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    message_content = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    created_at = db.Column(db.DateTime)

    def to_dict(self):
        return {
            'id': self.id,
            'message_content': self.message_content,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'created_at': self.created_at.strftime('%I:%M %p') if self.created_at else None
        }
