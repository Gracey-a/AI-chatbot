import ReactMarkdown from 'react-markdown';

function ChatMessage({ role, text }) {
    const isUser = role === 'user';

    return (
        <div className={`message-row ${isUser ? 'user-row' : 'ai-row'}`}>
            <div className={`message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
                {isUser ? text : <ReactMarkdown>{text}</ReactMarkdown>}
            </div>
        </div>
    );
}

export default ChatMessage;