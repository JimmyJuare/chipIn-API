
from .db import db, environment, SCHEMA
from datetime import datetime

class JoinRequest(db.Model):
    __tablename__ = 'join_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
                          
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    status = db.Column(db.String)  # 'pending', 'accepted', 'declined'
    created_at = db.Column(db.DateTime, default=datetime.now)

    sender = db.relationship('User', foreign_keys=[sender_id])
    receiver = db.relationship('User', foreign_keys=[receiver_id])
    project = db.relationship('Project')

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'project_id': self.project_id,
            'status': self.status,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None
        }
