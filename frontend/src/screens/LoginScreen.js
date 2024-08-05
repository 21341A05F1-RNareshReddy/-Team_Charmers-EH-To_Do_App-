import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { login } from '../api';
import { View, TextInput, Button, Text } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const { setToken } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      setToken(response.data.token);
      navigation.navigate('Tasks');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;
