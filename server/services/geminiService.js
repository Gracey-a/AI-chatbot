const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getGeminiReply = async (history, newMessage) => {
    const contents = history.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.text }],
    }));

    contents.push({ role: 'user', parts: [{ text: newMessage }] });
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents,
            config: {
                systemInstruction:
                    'You are a helpful, friendly AI assistant. Give clear, well-formatted answers.',
            },
    });

    const reply = response.text?.trim();
    
    if (!reply) {
        throw new Error('Gemini returned an empty response.');
    }

    return reply;
} catch (error) {
    console.error('Gemini API error:', error);
    if (error.message?.includes('UNAVAILABLE') || error.message?.includes('503')) {
        throw new Error('The AI is a bit busy right now. Please try again in a moment.');
    }
    throw new Error('Something went wrong while getting a response. Please try again.');
}
};

module.exports = { getGeminiReply };