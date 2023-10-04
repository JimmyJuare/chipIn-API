from app.models.project_messages import db, ProjectMessage, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_project_messages():
    channel_message1 = ProjectMessage(
        user_id=1,
        project_id=1,
        message_content='Hello, this is the first project message!',
        created_at=datetime.now()
    )
    channel_message2 = ProjectMessage(
        user_id=2,
        project_id=1,
        message_content='Welcome to the project channel!',
        created_at=datetime.now()
    )
    channel_message3 = ProjectMessage(
        user_id=3,
        project_id=2,
        message_content='Discussion about project X starts here.',
        created_at=datetime.now()
    )
    channel_message4 = ProjectMessage(
        user_id=1,
        project_id=2,
        message_content='Any updates on project Y?',
        created_at=datetime.now()
    )
    
    all_channel_messages = [channel_message1, channel_message2, channel_message3, channel_message4]
    db.session.add_all(all_channel_messages)
    db.session.commit()

def undo_project_messages():
    if environment == "production":
         db.session.execute(f"TRUNCATE table {SCHEMA}.project_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text(f"DELETE FROM {SCHEMA}.project_messages"))
        db.session.commit()
