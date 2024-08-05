import React from 'react';
import { View, Text, Button, Switch } from 'react-native';

const Task = ({ task, onEdit, onDelete, onComplete }) => {
  return (
    <View>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Switch
        value={task.completed}
        onValueChange={() => onComplete(task)}
      />
      <Button title="Edit" onPress={() => onEdit(task)} />
      <Button title="Delete" onPress={() => onDelete(task._id)} />
    </View>
  );
};

export default Task;
