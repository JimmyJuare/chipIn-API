from app.models.join_requests import db, JoinRequest, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_join_requests():
    join_request1 = JoinRequest(
        sender_id=1,  # Replace with the actual user IDs
        receiver_id=2,  # Replace with the actual user IDs
        project_id=1,  # Replace with the actual project ID
        status='pending',
        created_at=datetime.now()
    )

    join_request2 = JoinRequest(
        sender_id=3,  # Replace with the actual user IDs
        receiver_id=1,  # Replace with the actual user IDs
        project_id=2,  # Replace with the actual project ID
        status='pending',
        created_at=datetime.now()
    )

    join_request3 = JoinRequest(
        sender_id=2,  # Replace with the actual user IDs
        receiver_id=3,  # Replace with the actual user IDs
        project_id=1,  # Replace with the actual project ID
        status='accepted',
        created_at=datetime.now()
    )

    join_request4 = JoinRequest(
        sender_id=1,  # Replace with the actual user IDs
        receiver_id=3,  # Replace with the actual user IDs
        project_id=2,  # Replace with the actual project ID
        status='declined',
        created_at=datetime.now()
    )

    all_join_requests = [join_request1, join_request2, join_request3, join_request4]
    db.session.add_all(all_join_requests)
    db.session.commit()


def undo_join_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.join_requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM join_requests"))
        
    db.session.commit()
