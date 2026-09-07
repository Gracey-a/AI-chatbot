/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import {
    sendMessage,
    getLatestConversation,
    getConversations,
    getConversationById,
} from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ChatMessage from '../components/ChatMessage';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [conversationId, setConversationId] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const bottomRef = useRef(null);

    const refreshConversationList = async () => {
        try {
            const list = await getConversations();
            setConversations(list);
        } catch (err) {
            console.error('Could not load conversation list:', err);
        }
    };

    useEffect(() => {
        const loadLatest = async () => {
            try {
                const conversation = await getLatestConversation();
                if (conversation) {
                    setConversationId(conversation._id);
                    setMessages(
                        conversation.messages.map((m) => ({ role: m.role, text: m.text }))
                    );
                }
            } catch (err) {
                console.error('Could not load previous conversation:', err);
            } finally {
                setInitialLoad(false);
            }
        };
        
        loadLatest();
        refreshConversationList();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const data = await sendMessage(input, conversationId);
        const isNewConversation = !conversationId;
        setConversationId(data.conversationId);
        setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);

        if (isNewConversation) {
            refreshConversationList();
        }
    } catch (err) {
        setMessages((prev) => [
            ...prev,
            { role: 'assistant', text: `Error: ${err.message}` },
        ]);
    } finally {
        setLoading(false);
    }
};

const handleNewChat = () => {
    setMessages([]);
    setConversationId(null);
};

const handleSelectConversation = async (e) => {
    const id = e.target.value;

    if (!id) {
        handleNewChat();
        return;
    }

    try {
        const conversation = await getConversationById(id);
        setConversationId(conversation._id);
        setMessages(
            conversation.messages.map((m) => ({ role: m.role, text: m.text }))
        );
    } catch (err) {
        console.error('Could not load conversation:', err);
    }
};

return (
    <div className="chat-page">
        <header className="chat-header">
            <h2>AI Assistant</h2>
            <div className="chat-header-right">
                <select
                    className="conversation-select"
                    value={conversationId || ''}
                    onChange={handleSelectConversation}
                >
                    <option value="">+ New Chat</option>
                    {conversations.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.title}
                            </option>
                        ))}
                        </select>
                        <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        title="Toggle theme"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                            </button>
                            <button onClick={logout}>Log out</button>
                        </div>
                        </header>
                        
                        <div className="chat-messages">
                            {initialLoad && <p className="chat-empty">Loading your chat...</p>}
                            {!initialLoad && messages.length === 0 && (
                                <p className="chat-empty">Start a conversation below 👋</p>
                                )}
                                {messages.map((msg, i) => (
                                    <ChatMessage key={i} role={msg.role} text={msg.text} />
                                    ))}
                                    {loading && <ChatMessage role="assistant" text="Thinking..." />}
                                    <div ref={bottomRef} />
                                    </div>

                                    <form className="chat-input-bar" onSubmit={handleSend}>
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                        />
                                        <button type="submit" disabled={loading}>
                                            Send
                                            </button>
                                            </form>
                                            </div>
                                            );
                                        }

export default Chat;