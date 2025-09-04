//Model → Prompt → LLMChain(Model + Prompt) → Run & Display Output
// Model = brain

// Prompt = question/task

// Chain = glue that combines Model & Prompt

// Run = actual execution
import { config } from "dotenv";
config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai"; //wrapper for Gemini API
import { LLMChain } from "langchain/chains";  //combine model with prompts
import { PromptTemplate } from "@langchain/core/prompts"; //create reusable structured prompts
import promptSync from "prompt-sync";
const input = promptSync();


const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.API_KEY,
    model: "models/gemini-2.5-flash",
    maxOutputTokens: 2048,
    temperature: 0.7 //creativity or randomness
})

const prompt = PromptTemplate.fromTemplate(
    "Explain a {topic} to a begineer"
);

const chain = new LLMChain({
  llm: model,
  prompt: prompt,
});

const topic = input("Enter a topic: ");

const response = await chain.run(`${topic}`);
console.log("Gemini Response : ", response);