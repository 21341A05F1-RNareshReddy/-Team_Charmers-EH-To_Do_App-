 from flask_mongoengine import MongoEngine

db = MongoEngine()

class User(db.Document):
    username = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)

class Task(db.Document):
    user = db.StringField(required=True)
    title = db.StringField(required=True)
    description = db.StringField()
    completed = db.BooleanField(default=False)
    created_at = db.DateTimeField()
