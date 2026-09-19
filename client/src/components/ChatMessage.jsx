import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';

function CodeBlock({ language, code }) {
    const [copied, setCopied] = useState(false);
    const { theme } = useTheme();

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
    <div className="code-block-wrapper">
        <div className="code-block-header">
            <span>{language || 'code'}</span>
                <button onClick={handleCopy} className="copy-btn" title="Copy code">
                    {copied ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    )}
                </button>
        </div>
        <SyntaxHighlighter
        language={language || 'text'}
        style={theme === 'dark' ? oneDark : oneLight}
        customStyle={{ margin: 0, borderRadius: '0 0 8px 8px', fontSize: '13px' }}
        >
            {code}
            </SyntaxHighlighter>
    </div>
    );
}

function ChatMessage({ role, text }) {
    const isUser = role === 'user';

    return (
    <div className={`message-row ${isUser ? 'user-row' : 'ai-row'}`}>
        <div className={`message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
            {isUser ? (
                text
            ) : (
            <ReactMarkdown
            components={{
                pre({ children }) {
                    const codeEl = Array.isArray(children) ? children[0] : children;
                    const className = codeEl?.props?.className || '';
                    const match = /language-(\w+)/.exec(className);
                    const raw = codeEl?.props?.children;
                    const codeText = (Array.isArray(raw) ? raw.join('') : String(raw ?? '')).replace(/\n$/, '');
                    return <CodeBlock language={match?.[1]} code={codeText} />;
                },
            }}
            >
                {text}
                </ReactMarkdown>
            )}
        </div>
    </div>
    );
}

export default ChatMessage;