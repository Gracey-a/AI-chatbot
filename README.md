# AI Chatbot

A full-stack AI chatbot built as my final capstone project for the Neocloud program. It's a general-purpose assistant (similar to ChatGPT) with user accounts, persistent chat history, and a clean, responsive interface with light/dark mode.

**Live demo:** <https://ai-chatbot-frontend-0vdn.onrender.com>
**Backend API:** <https://ai-chatbot-cnrr.onrender.com>

> Note: both are hosted on Render's free tier, so the backend may take 30–60 seconds to "wake up" on the first request after a period of inactivity.

## Features

- User authentication (register/login) with JWT
- Real-time AI chat powered by Google's Gemini API
- Persistent conversations — chat history is saved per user and survives page refresh
- Switch between past conversations or start a new one
- Light/dark theme toggle
- Markdown rendering for AI responses (bold text, lists, code blocks)
- Fully responsive, mobile-friendly design

## Tech Stack

**Frontend:** React (Vite), React Router, plain CSS (CSS variables for theming)
**Backend:** Node.js, Express
**Database:** MongoDB (via Mongoose)
**AI:** Google Gemini API (`@google/genai`)
**Auth:** JWT + bcrypt for password hashing
**Deployment:** Render (Web Service for backend, Static Site for frontend)

## Project Structure

AI-chatbot/
├── client/ # React frontend
│ └── src/
│ ├── api/ # All backend API calls in one place
│ ├── components/ # Reusable UI components
│ ├── context/ # Auth and theme state (React Context)
│ └── pages/ # Login, Register, Chat pages
└── server/ # Express backend
├── config/ # MongoDB connection
├── controllers/ # Route logic (auth, chat)
├── middleware/ # JWT auth protection
├── models/ # Mongoose schemas (User, Conversation)
├── routes/ # API endpoints
└── services/ # Gemini API integration

## Running Locally

### Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/` with:

PORT=5002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
GEMINI_API_KEY=your_gemini_api_key

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

VITE_API_URL=<http://localhost:5002/api>

Then run:

```bash
npm run dev
```

## How It Works

- **Auth:** Passwords are hashed with bcrypt before being saved. On login, a JWT is issued and stored in the browser, then sent with every request to prove who's logged in.
- **Chat:** Each message is sent to the backend, which passes the conversation history to Gemini for context, then saves both the user's message and the AI's reply to MongoDB.
- **Persistence:** On page load, the frontend fetches the user's most recent conversation from the database, so refreshing never loses the chat.

## Author

Agho Ivie Gracious.
