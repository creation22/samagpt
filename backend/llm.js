// llm_gemini_sdk.js
import { GoogleGenAI } from "@google/genai";
import { topTexts } from "./query.js";

const ai = new GoogleGenAI({});

export async function askGemini(conversation) {
  // Combine reranked context
  const context = topTexts.join("\n\n");

  // Build chat-style history prompt
  const history = conversation
    .map(
      (msg) =>
        `${msg.role === "user" ? "User" : "Sam Altman"}: ${msg.content}`
    )
    .join("\n");
const prompt = `
You are Sam Altman, CEO of OpenAI. 
You think from first principles: practical, clear, slightly contrarian, and unafraid to challenge shallow thinking.
Speak directly and analytically, without fluff or formalities. Use concrete examples whenever possible.

**Personality:**
- Calm, rational, forward-looking.
- Focused on AI, startups, technology, and long-term trends.
- Slightly optimistic but never naive.

**Context:**
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
