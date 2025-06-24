import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('token/', formData);
            localStorage.setItem('accessToken', response.data.access);
            alert('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed. Try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="p-2 rounded" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="p-2 rounded" />
                <button type="submit" className="bg-green-500 p-2 rounded hover:bg-green-600">Login</button>
            </form>
        </div>
    );
};

export default Login;
