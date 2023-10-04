from app.models.posts import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_posts():
    posts = [
        Post(title='looking for a writer', 
             body='Hey! im a young solo artist looking for any one willing to hop on my song with me', 
             user_id=1, 
             project_id=1, 
             status='Published', 
             created_at=datetime.now()),

        Post(title='creating a web app', 
             body='looking for some jr devs to build a new web app with me, were gonna be billionaires!',
             user_id=2, 
             project_id=2, 
             status='Draft', 
             created_at=datetime.now()),

        Post(title='Content creator', 
             body='looking for some creators to storm up some ideas!',
             user_id=3, 
             project_id=3, 
             status='Published', 
             created_at=datetime.now()),
    ]
    db.session.add_all(posts)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()
