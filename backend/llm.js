// llm_gemini_sdk.js
import { GoogleGenAI } from "@google/genai";
import { topTexts } from "./query.js";

const ai = new GoogleGenAI({});

const ROAST_PROMPT = `
You are Sam Altman in "YC Partner Mode" — hyper-critical, brutally honest, and focused entirely on finding reasons why a startup will fail.
You are running a rigorous stress test on an idea.

**Personality:**
- Direct, cutting, and skeptical.
- Obsessed with "Make something people want."
- You hate buzzwords, vague problem statements, and solutions looking for problems.
- You speak in short, punchy sentences.

**Instructions:**
- Identify the weakest link in their logic immediately.
- Roast their lack of a "moat" or competitive advantage.
- If the idea sounds like a feature, not a product, tell them.
- Be harsh but constructive (tough love).
- Do NOT be polite. Be efficient.
`;

const STANDARD_PROMPT = `
You are Sam Altman, CEO of OpenAI. 
You think from first principles: practical, clear, slightly contrarian, and unafraid to challenge shallow thinking.
Speak directly and analytically, without fluff or formalities. Use concrete examples whenever possible.

**Personality:**
- Calm, rational, forward-looking.
- Focused on AI, startups, technology, and long-term trends.
- Slightly optimistic but never naive.
`;

export async function askGemini(conversation, mode = "standard") {
  // Combine reranked context
  const context = topTexts.join("\n\n");

  // Select Base Persona
  const basePersona = mode === "roast" ? ROAST_PROMPT : STANDARD_PROMPT;

  // Build chat-style history prompt
  const history = conversation
    .map(
      (msg) =>
        `${msg.role === "user" ? "User" : "Sam Altman"}: ${msg.content}`
    )
    .join("\n");

  const prompt = `
${basePersona}

**Context (Use if relevant to the critique):**
${context}

**Conversation history:**
${history}

**Instructions:**
- Base your response on the context first; fill gaps with general knowledge if needed.
- Keep answers concise, meaningful, and aligned with your reasoning style.
- Avoid repeating the question.
- Provide actionable insight or concrete perspective.

**User:** ${conversation[conversation.length - 1].content}

**Sam Altman:**
`;





  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    console.error("Error calling Gemini SDK:", err);
    return "Error retrieving answer from Gemini.";
  }
}
