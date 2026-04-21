import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
            console.log('Login success:', response.data);
            
            // Store token and user data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            navigate('/');
            window.location.reload(); // Quick way to update nav icon
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-glass-card">
                <div className="auth-header">
                    <h2>Welcome <i>Back</i></h2>
                    <p>Elevate your experience</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}
                    
                    <div className="auth-input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="john@example.com" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="auth-input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="••••••••" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        {loading ? 'Authenticating...' : 'SIGN IN'}
                    </button>
                    
                    <p className="auth-toggle-text">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
