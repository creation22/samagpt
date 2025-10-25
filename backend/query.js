

import { Pinecone } from '@pinecone-database/pinecone'
import dotenv from "dotenv";
dotenv.config();
const pc = new Pinecone({ apiKey: process.env.API_KEY });

const namespace = pc.index("samagpt", "https://samagpt-51d26lq.svc.aped-4627-b74a.pinecone.io").namespace("example-namespace");

const response = await namespace.searchRecords({
  query: {
    topK: 3,
    inputs: { text: 'how to become good at coding' },
  },
  fields: ['text'],
  rerank: {
    model: 'bge-reranker-v2-m3',
    rankFields: ['text'],
    topN: 3,
  },
});
// console.log(response);
// console.log(JSON.stringify(response.result.hits, null, 2));

// Get top reranked texts
export const topTexts = response.result.hits.map(hit => hit.fields.text);
// console.log("Top reranked texts:", topTexts);