// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { askGemini } from "./llm.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173", "https://altmangpt.vercel.app"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

// In-memory store for chat history
const userSessions = new Map();

app.post("/ask", async (req, res) => {
  const { question, sessionId, mode } = req.body;

  if (!question || !sessionId)
    return res.status(400).json({ error: "question and sessionId required" });

  // Get or create user session
  const conversation = userSessions.get(sessionId) || [];

  // Add user message
  conversation.push({ role: "user", content: question });

  try {
    // Get response
    const answer = await askGemini(conversation, mode || "standard");

    // Add assistant message to conversation
    conversation.push({ role: "assistant", content: answer });

    // Save updated conversation
    userSessions.set(sessionId, conversation);

    res.json({ answer });
  } catch (error) {
    console.error("Error in /ask:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
