from app.models.project import db, Project, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_projects():
    projects = [
        Project(project_name='My music Project', 
                project_type='Music',
                description='new description',
                user_id=1),
        Project(project_name='game dev project', 
                project_type='Software', 
                description='another description',  # Provide a different description
                user_id=2),
        Project(project_name='film project', 
                project_type='Film', 
                description='another description',  # Provide a different description
                user_id=2),
        Project(project_name='art project', 
                project_type='Art/Design',
                description='yet another description',  # Provide a different description
                user_id=3),
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
