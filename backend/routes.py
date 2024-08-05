from flask import request, jsonify
from app import app, db
from models import Task
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.objects(user=user_id)
    return jsonify(tasks), 200

@app.route('/tasks', methods=['POST'])
@jwt_required()
def add_task():
    user_id = get_jwt_identity()
    data = request.get_json()
    task = Task(title=data['title'], description=data.get('description'), user=user_id)
    task.save()
    return jsonify(task), 201

@app.route('/tasks/<task_id>', methods=['PUT'])
@jwt_required()
def edit_task(task_id):
    user_id = get_jwt_identity()
    task = Task.objects(id=task_id, user=user_id).first()
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    data = request.get_json()
    task.update(title=data['title'], description=data.get('description'), completed=data.get('completed', False))
    return jsonify(task), 200

@app.route('/tasks/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.objects(id=task_id, user=user_id).first()
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    task.delete()
    return jsonify({'message': 'Task deleted'}), 200
