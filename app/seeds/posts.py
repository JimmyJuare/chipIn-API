from app.models.posts import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_posts():
    posts = [
       # User 1 Project Posts
        Post(title='Looking for Guitarist', body='We are creating a music album and need a skilled guitarist to join our project.', user_id=1, project_id=1, status='Published', created_at=datetime.now()),
        Post(title='Recording Session Announcement', body='We are excited to announce the upcoming recording session for our music project.', user_id=1, project_id=2, status='Published', created_at=datetime.now()),
        Post(title='Join Our Music Collaboration', body='Musicians and vocalists wanted for a collaborative music album. Let\'s create something special!', user_id=1, project_id=4, status='Draft', created_at=datetime.now()),
        Post(title='Electronic Music Collaboration', body='Electronic music enthusiasts, let\'s collaborate on a unique and experimental music project!', user_id=1, project_id=5, status='Published', created_at=datetime.now()),
        Post(title='Community Art Mural Project', body='Contribute to a community art mural project. Let\'s beautify our surroundings together!', user_id=1, project_id=6, status='Draft', created_at=datetime.now()),

        # User 2 Project Posts
        Post(title='Join Our Game Development Team', body='Join us in bringing games to life! We are looking for developers passionate about game development.', user_id=2, project_id=3, status='Published', created_at=datetime.now()),
        Post(title='Open Source Software Project', body='Contributors needed for an open-source software project. Join us in building innovative solutions!', user_id=2, project_id=7, status='Draft', created_at=datetime.now()),
        Post(title='Mobile App Development Opportunity', body='Developers and UI/UX designers wanted for an exciting mobile app development project.', user_id=2, project_id=8, status='Published', created_at=datetime.now()),
        Post(title='Sci-Fi Film Script Writing', body='Writers and script enthusiasts, join us in crafting an engaging sci-fi film script.', user_id=2, project_id=9, status='Published', created_at=datetime.now()),
        Post(title='Digital Art Exhibition Participants Needed', body='Participate in our digital art exhibition. Showcase your artistic talent to the world!', user_id=2, project_id=10, status='Draft', created_at=datetime.now()),

        # User 3 Project Posts
        Post(title='Film Project Casting Call', body='Casting call for our exciting film project. Be a part of cinematic excellence!', user_id=3, project_id=11, status='Published', created_at=datetime.now()),
        Post(title='Short Film Production Crew Wanted', body='Filmmakers, actors, and crew members wanted for an upcoming short film. Apply now!', user_id=3, project_id=12, status='Published', created_at=datetime.now()),
        Post(title='Digital Art Exhibition', body='Join us in our digital art exhibition. Showcase your creativity to the world!', user_id=3, project_id=13, status='Draft', created_at=datetime.now()),
        Post(title='Experimental Music Collaboration', body='Experimental musicians wanted for a unique music collaboration. Let\'s push the boundaries!', user_id=3, project_id=14, status='Published', created_at=datetime.now()),
        Post(title='Artistic Mobile App Designers Needed', body='Designers and artists wanted for an exciting mobile app development project.', user_id=3, project_id=15, status='Draft', created_at=datetime.now()),
        Post(title='Community Art Mural Volunteers', body='Volunteers needed for our community art mural project. Let\'s beautify our surroundings together!', user_id=3, project_id=16, status='Published', created_at=datetime.now()),
    ]
    db.session.add_all(posts)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()
