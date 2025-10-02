import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function RegisterUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch {
      alert('Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const register = await API.post('/auth/register', {username, email, password});
    await handleLogin();
  };

  return (
    <div className="container mt-4 w-50">
      <h2 className='text-center'>Register</h2>
      <form onSubmit={handleRegister} className='mt-4'>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Username"
            value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email"
            value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
