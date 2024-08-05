import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { getTasks, deleteTask, editTask } from '../api';
import Task from './Task';
import AddTask from './AddTask';
import EditTask from './EditTask';
import { View, Text } from 'react-native';

const TaskList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks(token);
    setTasks(response.data);
  };

  const handleAddTask = () => {
    fetchTasks();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleTaskUpdated = () => {
    setEditingTask(null);
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(token, taskId);
    fetchTasks();
  };

  const handleCompleteTask = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await editTask(token, task._id, updatedTask);
    fetchTasks();
  };

  return (
    <View>
      {editingTask ? (
        <EditTask task={editingTask} onTaskUpdated={handleTaskUpdated} />
      ) : (
        <AddTask onTaskAdded={handleAddTask} />
      )}
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
        />
      ))}
    </View>
  );
};

export default TaskList;
