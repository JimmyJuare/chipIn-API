
from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserProject(db.Model):
    __tablename__ = 'user_projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), primary_key=True)
