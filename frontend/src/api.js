import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const getTasks = (token) => {
  return axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addTask = (token, task) => {
  return axios.post(`${API_URL}/tasks`, task, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const editTask = (token, taskId, task) => {
  return axios.put(`${API_URL}/tasks/${taskId}`, task, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteTask = (token, taskId) => {
  return axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
