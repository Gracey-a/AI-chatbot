import { Link } from 'react-router-dom';
import './Landing.css';
import { useEffect, useRef } from 'react';

function Landing() {
    const revealRefs = useRef([]);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-visible');
                    }
                });
            },
            { threshold: 0.15 }
        );
        
        revealRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);


    return (
    <div className="landing">
        
        <nav className="landing-nav">
            <span className="landing-logo">Gigi</span>
            <div className="landing-nav-links">
                <Link to="/login">Log in</Link>
                <Link to="/register" className="nav-cta">Get Started</Link>
            </div>
        </nav>
        
        <header className="landing-hero">
            <div className="hero-text">
                <span className="hero-badge">AI Code Assistant</span>
                <h1>Your coding second opinion.</h1>
                <p>
                    Gigi debugs errors, explains unfamiliar code, and writes snippets
                    on demand — so you spend less time stuck and more time shipping.
                    Built for developers at any level.
                </p>
                
                <div className="hero-actions">
                    <Link to="/register" className="btn-primary">Get Started Free</Link>
                    <Link to="/login" className="btn-secondary">Log in</Link>
                </div>
            </div>
            
            <div className="hero-preview">
                <div className="preview-window">
                    <div className="preview-bar">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    
                    <div className="preview-body">
                        <div className="preview-msg user">
                            Why does my function return undefined?
                        </div>
                        <div className="preview-msg ai">
                            <p>Your function has no return statement. Try this:</p>
                            <pre><code>{`function getName(user) {
                            return user.name
                            }`}</code></pre>
                            <p>The <code>return</code> keyword sends the value back.</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
        <section className="landing-features">
            <div className="feature reveal" ref={(el) => (revealRefs.current[0] = el)}>
                <h3>Debug</h3>
                <p>Paste an error and the code around it. Gigi pinpoints the cause and suggests a fix.</p>
            </div>
            <div className="feature reveal" ref={(el) => (revealRefs.current[1] = el)}>
                <h3>Explain</h3>
                <p>Drop in unfamiliar code — a legacy function, someone else's PR — and get a clear breakdown.</p>
            </div>
            <div className="feature reveal" ref={(el) => (revealRefs.current[2] = el)}>
                <h3>Generate</h3>
                <p>Describe what you need and get working code you can drop straight into your project.</p>
            </div>
        </section>
        
        <section className="landing-cta reveal" ref={(el) => (revealRefs.current[3] = el)}>
            <h2>Ready to get unstuck?</h2>
            <p>Create a free account and start asking.</p>
            <Link to="/register" className="btn-primary">Get Started</Link>
        </section>
        
        <footer className="landing-footer">
            <span>Gigi — AI Code Assistant</span>
            <Link to="/terms">Terms &amp; Conditions</Link>
        </footer>
    </div>
    );
}

export default Landing;