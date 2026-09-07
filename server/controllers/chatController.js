const Conversation = require('../models/Conversation');
const { getGeminiReply } = require('../services/geminiService');

const sendMessage = async (req, res) => {
    try {
        const { message, conversationId } = req.body;
        
        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }
        
        let conversation;
        if (conversationId) {
            conversation = await Conversation.findById(conversationId);
        } else {
            conversation = await Conversation.create({
                user: req.user._id,
                messages: [],
            });
        }
        
        const aiReply = await getGeminiReply(conversation.messages, message);

        conversation.messages.push({ role: 'user', text: message });
        conversation.messages.push({ role: 'assistant', text: aiReply });
        await conversation.save();

        res.json({
        conversationId: conversation._id,
        reply: aiReply,
        });
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getConversations = async (req, res) => {
    const conversations = await Conversation.find({ user: req.user._id })
        .select('messages createdAt')
        .sort({ updatedAt: -1 });

        const list = conversations.map((c) => ({
            _id: c._id,
            title: c.messages[0]?.text?.slice(0, 40) || 'New chat',
            createdAt: c.createdAt,
        }));

        res.json(list);
};

const getLatestConversation = async (req, res) => {
    const conversation = await Conversation.findOne({ user: req.user._id }).sort({
        updatedAt: -1,
    });

    if (!conversation) {
        return res.json(null);
    }

    res.json(conversation);
};

const getConversationById = async (req, res) => {
    const conversation = await Conversation.findOne({
        _id: req.params.id,
        user: req.user._id,
    });
    
    if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation);
};

module.exports = {
    sendMessage,
    getConversations,
    getLatestConversation,
    getConversationById,
};