import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || '',
});

const storedToken = localStorage.getItem('token');
if (storedToken) {
  api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

export default api;
