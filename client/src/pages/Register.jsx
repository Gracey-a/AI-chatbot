import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Register() {
    const [name, setName] = useState('');
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
            const userData = await registerUser(name, email, password);
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
            <h1>Create an account</h1>
            <p className="auth-subtitle">Start chatting with your AI assistant</p>
            
            {error && <p className="auth-error">{error}</p>}
            
            <label>Name</label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />

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
            minLength={6}
            required
            />
            
            <button type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign Up'}
                </button>
                
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log in</Link>
                    </p>
                    </form>
                    </div>
                    
                );
}

export default Register;