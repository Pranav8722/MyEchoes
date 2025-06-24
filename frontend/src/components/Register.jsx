import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState(''); // Added username state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('register/', { username, email, password }); // Send username too
            alert('Registered Successfully!');
            navigate('/');
        } catch (error) {
            alert('Registration Failed!');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-4">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded" required />
                
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded" required />
                
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded" required />
                
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Register</button>
                
                <p onClick={() => navigate('/')} className="text-blue-500 text-center cursor-pointer">Login</p>
            </form>
        </div>
    );
};

export default Register;
