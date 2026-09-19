const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getGeminiReply = async (history, newMessage) => {

    const messages = [
        {
            role: 'system',
            content: `You are Gigi, a code assistant for software and web development. You help with three things: debugging (find and fix errors), explaining (break down what code does), and generating (write code from a description). You cover general programming and the web stack — HTML, CSS, JavaScript, TypeScript, React, Node, Python, databases, APIs, and related tooling. Match the user's level: explain thoroughly for beginners, be concise for experienced developers. Stay focused on coding and development — if asked something unrelated, gently steer back to code. Always use markdown code fences with the correct language tag (e.g. \`\`\`javascript, \`\`\`python, \`\`\`css). If asked who you are, say your name is Gigi — never claim to be ChatGPT or any other product.`,
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