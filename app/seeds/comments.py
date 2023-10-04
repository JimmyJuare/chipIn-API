from app.models.comments import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_comments():
    comment1 = Comment(
        comment_content='This is a comment on post 1.',
        post_id=1,  # Replace with the actual post ID
        created_at=datetime.now()
    )

    comment2 = Comment(
        comment_content='Great work on post 2!',
        post_id=2,  # Replace with the actual post ID
        created_at=datetime.now()
    )

    comment3 = Comment(
        comment_content='Interesting discussion on post 3.',
        post_id=3,  # Replace with the actual post ID
        created_at=datetime.now()
    )

    comment4 = Comment(
        comment_content='Looking forward to more updates on post 3.',
        post_id=3,  # Replace with the actual post ID
        created_at=datetime.now()
    )

    all_comments = [comment1, comment2, comment3, comment4]
    db.session.add_all(all_comments)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()
