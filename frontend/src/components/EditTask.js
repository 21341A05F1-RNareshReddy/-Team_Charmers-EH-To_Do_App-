import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { editTask } from '../api';
import { View, TextInput, Button, Switch } from 'react-native';

const EditTask = ({ task, onTaskUpdated }) => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleEditTask = async () => {
    const updatedTask = { title, description, completed };
    await editTask(token, task._id, updatedTask);
    onTaskUpdated();
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Switch
        value={completed}
        onValueChange={setCompleted}
      />
      <Button title="Update Task" onPress={handleEditTask} />
    </View>
  );
};

export default EditTask;
