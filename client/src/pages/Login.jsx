import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
        const userData = await loginUser(email, password);
        login(userData);
        navigate('/chat');
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Welcome back</h1>
                <p className="auth-subtitle">Log in to continue chatting</p>

        {error && <p className="auth-error">{error}</p>}
        
        <label>Email</label>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />

        <label>Password</label>
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />

        <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
        </button>

        <p className="auth-switch">
            Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        </form>
        </div>
        );
}

export default Login;