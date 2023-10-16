from app.models.project import db, Project, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_projects():
    projects = [
        Project(project_name='Music Project 1', project_type='Music', description='Description for Music Project 1', user_id=1),
        Project(project_name='Music Project 2', project_type='Music', description='Description for Music Project 2', user_id=1),
        Project(project_name='Music Project 3', project_type='Music', description='Description for Music Project 3', user_id=1),
        Project(project_name='Software Project 1', project_type='Software', description='Description for Software Project 1', user_id=2),
        Project(project_name='Software Project 2', project_type='Software', description='Description for Software Project 2', user_id=2),
        Project(project_name='Software Project 3', project_type='Software', description='Description for Software Project 3', user_id=2),
        Project(project_name='Art Project 1', project_type='Art/Design', description='Description for Art Project 1', user_id=3),
        Project(project_name='Art Project 2', project_type='Art/Design', description='Description for Art Project 2', user_id=3),
        Project(project_name='Art Project 3', project_type='Art/Design', description='Description for Art Project 3', user_id=3),
        Project(project_name='Music Project 4', project_type='Music', description='Description for Music Project 4', user_id=1),
        Project(project_name='Software Project 4', project_type='Software', description='Description for Software Project 4', user_id=2),
        Project(project_name='Art Project 4', project_type='Art/Design', description='Description for Art Project 4', user_id=3),
        Project(project_name='Music Project 5', project_type='Music', description='Description for Music Project 5', user_id=1),
        Project(project_name='Software Project 5', project_type='Software', description='Description for Software Project 5', user_id=2),
        Project(project_name='Art Project 5', project_type='Art/Design', description='Description for Art Project 5', user_id=3),
        Project(project_name='Music Project 6', project_type='Music', description='Description for Music Project 6', user_id=1),
        Project(project_name='Software Project 6', project_type='Software', description='Description for Software Project 6', user_id=2),
        Project(project_name='Art Project 6', project_type='Art/Design', description='Description for Art Project 6', user_id=3),
    ]
    db.session.add_all(projects)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))
        
    db.session.commit()
