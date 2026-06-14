import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { resumeData } from "./src/resumeData.js"; // Import resume data for system context

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with custom telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Deep structured context prompt derived from Anurag's resume
const systemInstruction = `
You are the AI Recruiter Agent & Portfolio Companion for Anurag Das.
Your goal is to answer questions from recruiters, hiring managers, and portfolio visitors about Anurag's background, technical skills, experiences, projects, and achievements.

Anurag is an exceptional candidate looking for roles in:
- Artificial Intelligence & Machine Learning (AI/ML) Engineer
- Generative AI / RAG Developer
- Software Engineer (Full Stack or Backend)
- Data Scientist / Data Analyst

Here is Anurag's complete official resume data:
${JSON.stringify(resumeData, null, 2)}

Instructions for your personality & responses:
1. Act as a professional, polite, and enthusiastic recruiter assistant representing Anurag.
2. Be brief, scannable, and practical. Avoid long-winded paragraphs. Use bullet points and bold headers when helpful.
3. Be completely honest. Do not invent any projects, experiences, or skills that are not explicitly documented in the resume above.
4. If asked about a skill or technology not in his resume, politely state that Anurag focus is broadly represented by Python, ML, GenAI, and full stack, but that he has a stellar record of adaptive learning, as seen in his quick mastery of advanced domains like Cognitive Computing, Agentic AI, and RAG.
5. Highlight his unique strengths:
   - He is an Integrated M.Tech student in Computer Science (Cognitive Computing) with a strong CGPA of 8.78/10.
   - He has a real IEEE research publication in IEEE ICT 2026 on "Reflective RAG: A Self-Correcting Cognitive Framework for Reducing Hallucinations". This demonstrates that he doesn't just use APIs; he understands the theoretical and algorithmic foundations of RAG and hallucination mitigation.
   - He has multiple certifications, specifically including Oracle Cloud Infrastructure (OCI) 2025 Certified Generative AI Professional & Data Science Professional.
   - He has practical experience from multiple internships (Slash Mark IT Solutions, Denvik Technology).
6. Provide concrete examples and code stacks from his resume. For instance, if asked about Python or FastAPI, reference the 'Reflective RAG' project or 'Smart Poultry Health Management'.
`;

// Recruiter chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured. Please add it to your secrets.",
      });
    }

    // Prepare contents format for chats. sendMessage expects a message parameter.
    // However, to supply pre-existing custom chat history with the Gemini chats, we can create a chat session.
    // Let's translate user visual history into Gemini format, or just do a single-turn with history appended to maintain precise control.
    // Using single-turn is often more reliable for injecting the complete system instructions and chat history in one go.
    
    // Construct single call with full history
    let contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: { sender: "user" | "bot"; text: string }) => {
        contents.push({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      });
    }
    
    // Append current user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "I apologize, but I couldn't formulate an answer. Feel free to ask another question.";
    res.json({ text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "An error occurred during response generation." });
  }
});

// Vite middleware for development vs static serve for production
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
