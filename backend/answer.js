import { askGemini } from "./llm.js";

const answer = await askGemini(" what my name ");
console.log(answer);
