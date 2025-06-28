import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('token/', { username, password });
      localStorage.setItem('access_token', resp.data.access);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      <button type="submit"><p>Don't have an account? <a href="/register">Register here</a></p>
</button>
    </form>
  );
}
