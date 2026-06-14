import { GoogleGenAI } from "@google/genai";
import { resumeData } from "../src/resumeData.js";

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
   - He has a real IEEE research publication in IEEE ICICT  2026 on "Reflective RAG: A Self-Correcting Cognitive Framework for Reducing Hallucinations". This demonstrates that he doesn't just use APIs; he understands the theoretical and algorithmic foundations of RAG and hallucination mitigation.
   - He has multiple certifications, specifically including Oracle Cloud Infrastructure (OCI) 2025 Certified Generative AI Professional & Data Science Professional.
   - He has practical experience from multiple internships (Slash Mark IT Solutions, Denvik Technology).
6. Provide concrete examples and code stacks from his resume. For instance, if asked about Python or FastAPI, reference the 'Reflective RAG' project or 'Smart Poultry Health Management'.
`;

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured. Please add it to your Vercel Environment Variables.",
      });
    }

    // Construct history parts
    let contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: { sender: "user" | "bot"; text: string }) => {
        contents.push({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      });
    }
    
    // Append current message
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
    return res.status(200).json({ text });
  } catch (error: any) {
    console.error("Error in serverless api/chat:", error);
    return res.status(500).json({ error: error.message || "An error occurred during response generation." });
  }
}
