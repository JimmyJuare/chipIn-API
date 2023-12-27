
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
import pytz
class JoinRequest(db.Model):
    __tablename__ = 'join_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
                          
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    status = db.Column(db.String, default="pending")  # 'pending', 'accepted', 'declined'
    created_at = db.Column(db.DateTime, default=datetime.now)

    sender = db.relationship('User', foreign_keys=[sender_id])
    project = db.relationship('Project', foreign_keys=[project_id])
    post = db.relationship('Post', foreign_keys=[post_id])

    def to_dict(self, user_timezone='America/New_York'):
        server_timezone = 'EST'  # Adjust this to your server's timezone
        formatted_timestamp = (
            self.created_at.replace(tzinfo=pytz.timezone(server_timezone))
            .astimezone(pytz.timezone(user_timezone))
            .strftime('%m/%d/%Y %I:%M %p')
            if self.created_at
            else None
        )

        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.project.user_id,
            'project_id': self.project_id,
            'post_id': self.post_id,
            'status': self.status,
            'created_at': formatted_timestamp,
        }
