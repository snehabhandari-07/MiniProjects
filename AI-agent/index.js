import OpenAI from 'openai';
import 'dotenv/config';
import readlineSync from 'readline-sync';

const client = new OpenAI({
    apiKey : process.env['OPENAI_API_KEY']
})

// Tools
function getWeatherData(city = ""){
    if (city.toLowerCase() === "pune") return "10°C";
    if (city.toLowerCase() === "delhi") return "20°C";
    if (city.toLowerCase() === "banglore") return "30°C";
    if (city.toLowerCase() === "chennai") return "8°C";
    if (city.toLowerCase() === "hyderabad") return "14°C";
}

const tools = {
    "getWeatherData": getWeatherData
}

const SYSTEM_PROMPT = `
  You are an AI assistant with START, PLAN, ACTION, OBSERVATION and OUTPUT STATE
  Wait for the user prompt and first PLAN using available tools.
  After Planning take the action with appropritate tools and wait for OBSERVATION based on Action.
  Once you get the OBSERVATION, Return the AI response based on START prompt and OBSERVATION 

  Strictly follow JSON Format as in examples

  Available Tools:
  -getWeatherData(city : String) : String
  -getWeatherData is a function that accepts the String and returns the weather details
  

  Example:
  START
  {"type": "user", "user":"What is the sum of weather of pune and delhi"}
  {"type": "plan", "plan":"I will call getWeatherData for pune"}
  {"type": "action", "function":"getWeatherData", "input":"pune"}
  {"type": "observation", "observation": "10°C"}
  {"type": "plan", "plan":"I will call getWeatherData for delhi"}
  {"type": "action", "function":"getWeatherData", "input":"delhi"}
  {"type": "observation", "observation": "20°C"}
  {"type":"output", "output":"The sum of weather of Pune and Delhi is 30°C"}

`
const messages = [
    {"role": "system", content: SYSTEM_PROMPT},
]

while(true){
    const query = readlineSync.question('>> ');
    const q = {
        "type": "user", user : query
    }

    messages.push({"role":"user", content: JSON.stringify(q)});

    while(true){
        const chat = await client.chat.completions.create({
           model: "gpt-4o",
           messages: messages,
           response_format: {"type": "json_object"}
        })

        const result = chat.choices[0].message.content;
        messages.push({role: "assistant", content: result});

        console.log(`\n\n------------------ START AI ------------------`);
        console.log(result);
        console.log(`------------------ END AI ------------------\n\n`);

        const call = JSON.parse(result);
        if(call.type == "output"){
            console.log(`Bot: ${call.output}`);
            break;
        }else if(call.type == "action"){
            const fn = tools[call.function];
            const observation = fn(call.input);
            const obs = {"type": "observation", "observation": observation}
            messages.push({role: "developer", content: JSON.stringify(obs)});
        }
    }
}

// const user = "Hey, What is the Weather of Delhi??";

// async function chat() {
//     let result = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages : [
//         {role: "system", content: SYSTEM_PROMPT},
//         {role: "user", content: user}]
//     })

//     console.log(result.choices[0].message.content);
// }

// chat();
