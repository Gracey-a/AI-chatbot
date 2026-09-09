const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const registerUser = async (name, email, password) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
};

export const loginUser = async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
};

export const sendMessage = async (message, conversationId) => {
    const res = await fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ message, conversationId }),
});

const data = await res.json();
if (!res.ok) throw new Error(data.message || 'Failed to send message');
return data;
};

export const getConversations = async () => {
    const res = await fetch(`${BASE_URL}/chat`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load conversations');
    return data;
};

export const getLatestConversation = async () => {
    const res = await fetch(`${BASE_URL}/chat/latest`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load conversation');
    return data;
};

export const getConversationById = async (id) => {
    const res = await fetch(`${BASE_URL}/chat/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load conversation');
    return data;
};
