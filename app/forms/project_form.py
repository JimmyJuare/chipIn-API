from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, URL, Optional
from app.api.aws_helper import ALLOWED_EXTENSIONS
class ProjectForm(FlaskForm):
    project_name = StringField('Project Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    project_type = StringField('Type', validators=[DataRequired()])
    image_url = FileField("Image File", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
