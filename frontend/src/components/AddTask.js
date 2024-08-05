import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { addTask } from '../api';
import { View, TextInput, Button } from 'react-native';

const AddTask = ({ onTaskAdded }) => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    const task = { title, description };
    await addTask(token, task);
    onTaskAdded();
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
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

export default AddTask;
