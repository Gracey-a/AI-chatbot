const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getGeminiReply = async (history, newMessage) => {
    const contents = history.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.text }],
    }));

    contents.push({ role: 'user', parts: [{ text: newMessage }] });

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
};

module.exports = { getGeminiReply };