import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_jwt_secret_key'
    MONGODB_SETTINGS = {
        'db': 'todo_app',
        'host': 'localhost',
        'port': 27017
    }
