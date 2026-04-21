import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            console.log('Registration success:', response.data);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-glass-card">
                <div className="auth-header">
                    <h2>Create <i>Account</i></h2>
                    <p>Join the OBSIDIAN collective</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}
                    
                    <div className="auth-input-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="John Doe" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

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

                    <div className="auth-input-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="••••••••" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'SIGN UP'}
                    </button>
                    
                    <p className="auth-toggle-text">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
