# Gigi — AI Code Assistant

A full-stack AI code assistant built as my capstone project for the Neocloud program. Gigi helps developers debug errors, explain unfamiliar code, and generate new code — with real user accounts and persistent chat history.

**Live demo:** https://ai-chatbot-frontend-0vdn.onrender.com
**Backend API:** https://ai-chatbot-cnrr.onrender.com

> Note: both are hosted on Render's free tier, so the backend may take 30–60 seconds to "wake up" on the first request after a period of inactivity.

## Features

- Landing page introducing Gigi, with a live chat preview
- User authentication (register/login) with JWT
- Enforced Terms & Conditions — must be read and accepted before signup unlocks
- AI-powered debugging, code explanation, and code generation (Groq API)
- Full sidebar — browse, switch between, and delete past conversations
- Persistent conversations — saved per user, survive page refresh
- Syntax-highlighted code blocks with a one-click copy button
- Light/dark theme toggle, applied across every page including the landing page
- Fully responsive, mobile-friendly design

## Tech Stack

**Frontend:** React (Vite), React Router, react-markdown, react-syntax-highlighter, plain CSS (CSS variables for theming)
**Backend:** Node.js, Express
**Database:** MongoDB (via Mongoose)
**AI:** Groq API (`openai/gpt-oss-20b`)
**Auth:** JWT + bcrypt for password hashing
**Deployment:** Render (Web Service for backend, Static Site for frontend)

## Project Structure

```
AI-chatbot/
├── client/          # React frontend
│   └── src/
│       ├── api/          # All backend API calls in one place
│       ├── components/   # ChatMessage, Sidebar
│       ├── context/       # Auth and theme state (React Context)
│       └── pages/        # Landing, Login, Register, Terms, Chat
└── server/          # Express backend
    ├── config/           # MongoDB connection
    ├── controllers/      # Route logic (auth, chat)
    ├── middleware/        # JWT auth protection
    ├── models/            # Mongoose schemas (User, Conversation)
    ├── routes/            # API endpoints
    └── services/          # Groq API integration
```

## Running Locally

### Backend
```bash
cd server
npm install
```
Create a `.env` file in `server/` with:
```
PORT=5002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
GROQ_API_KEY=your_groq_api_key
```
Then run:
```bash
npm run dev
```

### Frontend
```bash
cd client
npm install
```
Create a `.env` file in `client/` with:
```
VITE_API_URL=http://localhost:5002/api
```
Then run:
```bash
npm run dev
```

## How It Works

- **Auth:** Passwords are hashed with bcrypt before being saved. On login, a JWT is issued and stored in the browser, then sent with every request to prove who's logged in.
- **Terms & Conditions:** Users must read and check a box agreeing to terms before the signup form unlocks. A form draft (name/email) is preserved in localStorage if they navigate away to read the terms, so nothing is lost.
- **Chat:** Each message is sent to the backend, which passes the conversation history to Groq for context, then saves both the user's message and the AI's reply to MongoDB.
- **Persistence:** On page load, the frontend fetches the user's most recent conversation from the database, so refreshing never loses the chat.

## Design Decision: Why a Focused Code Assistant

The first version of this project was a general-purpose chatbot. After early feedback showed it couldn't reliably answer specific questions outside its training, I narrowed the scope to coding help — debugging, explaining, and generating code — which plays to what AI models are genuinely strong at, rather than trying to be good at everything.

## Author

Agho Ivie Gracious