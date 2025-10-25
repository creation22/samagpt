



// import { Pinecone } from "@pinecone-database/pinecone";
// import dotenv from "dotenv";
// import { records } from "./samaltman_posts.js";

// dotenv.config();

// const pc = new Pinecone({ apiKey: process.env.API_KEY });
// const indexName = "samagptex";

// // Create dense index (run once)
// await pc.createIndexForModel({
//   name: indexName,
//   cloud: "aws",
//   region: "us-east-1",
//   embed: {
//     model: "llama-text-embed-v2",
//     fieldMap: { text: "text" },
//   },
//   waitUntilReady: true,
// });

// console.log(`✅ Index '${indexName}' is ready.`);

// const index = pc.index(indexName).namespace("example-namespace");

// // Pinecone dense model max batch size
// const MAX_BATCH_SIZE = 96;

// // Upsert in batches safely
// for (let i = 0; i < records.length; i += MAX_BATCH_SIZE) {
//   const batch = records.slice(i, i + MAX_BATCH_SIZE);
//   await index.upsertRecords(batch);
//   console.log(`📦 Inserted batch ${Math.floor(i / MAX_BATCH_SIZE) + 1}`);
// }

// console.log(`✅ Successfully inserted ${records.length} records.`);

// // Wait a bit to let indexing finish
// await new Promise((resolve) => setTimeout(resolve, 10000));

// // Show index stats
// const stats = await index.describeIndexStats();
// console.log("📊 Index stats:", stats);


import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import { records } from "./samaltman_posts.js";

dotenv.config();

const pc = new Pinecone({ apiKey: process.env.API_KEY });
const indexName = "samagex";

// Create dense index (run once)
await pc.createIndexForModel({
  name: indexName,
  cloud: "aws",
  region: "us-east-1",
  embed: {
    model: "llama-text-embed-v2",
    fieldMap: { text: "text" },
  },
  waitUntilReady: true,
});

console.log(`✅ Index '${indexName}' is ready.`);

const index = pc.index(indexName).namespace("example-namespace");

// Pinecone dense model max batch size
const MAX_BATCH_SIZE = 96;
const MAX_METADATA_SIZE = 40960; // 40 KB

// Clean records to remove metadata
const cleanedRecords = records.map((r) => ({
  id: r.id,
  text: r.text,
}));

// Optional: skip any record whose text itself is too large
const safeRecords = cleanedRecords.filter((r) => {
  const size = Buffer.byteLength(r.text, "utf-8");
  if (size > MAX_METADATA_SIZE) {
    console.warn(`⚠️ Skipping ${r.id}: text too large (${size} bytes)`);
    return false;
  }
  return true;
});

// Upsert in batches
for (let i = 0; i < safeRecords.length; i += MAX_BATCH_SIZE) {
  const batch = safeRecords.slice(i, i + MAX_BATCH_SIZE);
  await index.upsertRecords(batch);
  console.log(`📦 Inserted batch ${Math.floor(i / MAX_BATCH_SIZE) + 1}`);
}

console.log(`✅ Successfully inserted ${safeRecords.length} records.`);

// Wait a bit to let indexing finish
await new Promise((resolve) => setTimeout(resolve, 5000));

// Show index stats
const stats = await index.describeIndexStats();
console.log("📊 Index stats:", stats);
