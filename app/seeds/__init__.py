from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .comments import seed_comments, undo_comments
from .posts import seed_posts, undo_posts
from .join_requests import seed_join_requests, undo_join_requests
from .project_messages import seed_project_messages, undo_project_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_project_messages()
        undo_join_requests()
        undo_comments()
        undo_posts()
        undo_projects()
        undo_users()
    seed_users()
    seed_projects()
    seed_posts()
    seed_comments()
    seed_join_requests()
    seed_project_messages()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_projects()
    undo_project_messages()
    undo_posts()
    undo_comments()
    undo_join_requests()
    # Add other undo functions here
