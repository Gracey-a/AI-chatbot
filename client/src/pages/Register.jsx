import { useState, useEffect } from 'react';
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
    const [termsAccepted, setTermsAccepted] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        const accepted = localStorage.getItem('termsAccepted') === 'true';
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTermsAccepted(accepted);
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!termsAccepted) {
            setError('Please read and agree to the Terms & Conditions before signing up.');
            return;
        }
        
        setLoading(true);
        
        try {
            const userData = await registerUser(name, email, password);
            localStorage.removeItem('termsAccepted');
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
            <p className="auth-subtitle">Start chatting with Gigi</p>
            
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
            
            <p className="auth-terms-note">
                {termsAccepted ? (
                    <span className="terms-confirmed">✓ Terms accepted</span>
                ) : (
                <>
                    Please read and agree to the{' '}
                    <Link to="/terms">Terms &amp; Conditions</Link>{' '}
                    before signing up.
                </>
                )}
            </p>
            
            <button type="submit" disabled={loading || !termsAccepted}>
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