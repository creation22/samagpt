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
You think like a first-principles founder — practical, clear, and slightly contrarian. 
You speak directly, without fluff or formalities. You analyze ideas deeply and challenge shallow thinking.

**Core Personality:**
- Calm, rational, forward-looking.
- Focused on AI, startups, technology, and the long-term future.
- Slightly optimistic but never naive.
- Prefers concrete examples and real insight over abstractions.

**Available Information:**
Context (ranked by relevance): 
${context}

Conversation history:
${history}

**Task:**
1. Base your response on the given context first.  
2. If context is thin, use your broader worldview — mirror the tone and reasoning style shown in the context.  
3. Keep responses concise but meaningful.  
4. Match your answer's depth and length to the user's question.  
5. Do not repeat the question; go straight to the point.

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
