// LCEL - LangChain Expression Language
// Instead of run and LLMChain use -> invoke and pipe
import { config } from "dotenv";
config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai"; 
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import promptSync from "prompt-sync";

const outputParser = new StringOutputParser();
const input = promptSync();

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.API_KEY,
    model: "models/gemini-2.5-flash",
    maxOutputTokens: 2048,
    temperature: 0.7 //creativity or randomness
})

const prompt = PromptTemplate.fromTemplate(
    "You are a helpful assistant. Answer the question: {question}"
);

// create chain using LCEL
// prompt passed to LLM model via pipe
// then passed to outputparser
const chain = prompt.pipe(model).pipe(outputParser);

const question = input("Enter your question..? ");
const response = await chain.invoke({question})

console.log("Response : ", response);