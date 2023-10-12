from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, URL, Optional
from app.api.aws_helper import ALLOWED_EXTENSIONS
class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    body = TextAreaField('Body', validators=[DataRequired()])
    image_url = FileField("Image File", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    project_id = IntegerField("Project", validators=[DataRequired()])
    status = StringField('Status', validators=[DataRequired()])
