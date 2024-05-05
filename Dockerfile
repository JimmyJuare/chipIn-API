# Use an official Python runtime as a base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install Python dependencies
RUN pip install -r requirements.txt && pip install pytz && pip install psycopg2

# Copy the entire Flask application code to the container
COPY app/ app/
COPY run.py .

# Expose port 5000 (the port your Flask app runs on)
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "run.py"]
