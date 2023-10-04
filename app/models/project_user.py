
from .db import db, environment, SCHEMA

class UserProject(db.Model):
    __tablename__ = 'user_projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), primary_key=True)
