from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment_content = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    created_at = db.Column(db.DateTime)

    def to_dict(self):
        return {
            'id': self.id,
            'comment_content': self.comment_content,
            'post_id': self.post_id,
            'created_at': self.created_at.strftime('%I:%M %p') if self.created_at else None
        }
