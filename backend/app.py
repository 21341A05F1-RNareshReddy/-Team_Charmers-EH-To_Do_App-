from flask import Flask, jsonify, request
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'todo_app',
    'host': 'localhost',
    'port': 27017
}
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
db = MongoEngine(app)
jwt = JWTManager(app)
CORS(app)

from models import User, Task

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.objects(username=data['username']):
        return jsonify({'error': 'User already exists'}), 400

    user = User(
        username=data['username'],
        password=data['password']
    ).save()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.objects(username=data['username']).first()

    if user and user.password == data['password']:
        token = create_access_token(identity=user.username)
        return jsonify({'token': token}), 200

    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    current_user = get_jwt_identity()
    tasks = Task.objects(user=current_user)
    return jsonify(tasks), 200

@app.route('/tasks', methods=['POST'])
@jwt_required()
def add_task():
    current_user = get_jwt_identity()
    data = request.get_json()
    task = Task(
        user=current_user,
        title=data['title'],
        description=data['description'],
        completed=False,
        created_at=datetime.utcnow()
    ).save()
    return jsonify(task), 201

@app.route('/tasks/<task_id>', methods=['PUT'])
@jwt_required()
def edit_task(task_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    task = Task.objects(id=task_id, user=current_user).first()

    if task:
        task.update(
            title=data['title'],
            description=data['description'],
            completed=data['completed']
        )
        return jsonify({'message': 'Task updated successfully'}), 200

    return jsonify({'error': 'Task not found'}), 404

@app.route('/tasks/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    current_user = get_jwt_identity()
    task = Task.objects(id=task_id, user=current_user).first()
    if task:
        task.delete()
        return jsonify({'message': 'Task deleted successfully'}), 200

    return jsonify({'error': 'Task not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
