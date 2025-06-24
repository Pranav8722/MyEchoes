import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('accounts/register/', formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            alert('Registration failed. Try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl mb-6">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="p-2 rounded" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="p-2 rounded" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="p-2 rounded" />
                <button type="submit" className="bg-blue-500 p-2 rounded hover:bg-blue-600">Register</button>
            </form>
        </div>
    );
};

export default Register;
