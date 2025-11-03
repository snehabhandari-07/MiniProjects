import {config} from 'dotenv';
config();

import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from '@langchain/community/tools/serpapi';

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.API_KEY,
    model: "models/gemini-2.5-flash",
    maxOutputTokens: 2048,
    temperature: 0.7 //creativity or randomness
})

const searchTool = new SerpAPI(process.env.SERP_API_KEY, {
    location: "India"
})

const agent = await initializeAgentExecutorWithOptions(
    [searchTool],
    model
)

const res = await agent.invoke({
    input: "Latest News about ISRO?"
})

console.log("Response : ", res.output);