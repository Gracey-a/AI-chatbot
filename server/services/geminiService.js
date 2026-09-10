const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getGeminiReply = async (history, newMessage) => {

    const messages = [
        {
            role: 'system',
            content: 'You are a helpful, friendly AI assistant. Give clear, well-formatted answers.',content: 'You are a helpful, friendly AI assistant built for this chat application. If asked who you are or what model you are, simply say you are an AI assistant — do not claim to be ChatGPT or any other specific product. Give clear, well-formatted answers.',
        },
        ...history.map((msg) => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.text,
        })),
        { role: 'user', content: newMessage },
    ];
    
    try {
        const response = await groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            messages,
        });
        
        const reply = response.choices[0]?.message?.content?.trim();

    if (!reply) {
        throw new Error('The AI returned an empty response.');
    }

    return reply;

} catch (error) {
    console.error('Groq API error:', error);
    throw new Error('Something went wrong while getting a response. Please try again.');
}
};

module.exports = { getGeminiReply };