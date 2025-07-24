#  AI-Agent Using OpenAI + Tool Use (CLI-Based)

This is a basic CLI-based AI agent built using Node.js and OpenAI's API. The project demonstrates how to connect a Large Language Model (LLM) with external **tools/functions**, turning the model into a simple but effective AI agent.

> Inspired by a YouTube tutorial and coded with the goal of learning how LLMs can take real-world actions based on user input.

---

##  What This Project Does

- Takes user input via the command line using `readline-sync`
- Passes the input to OpenAI's `gpt-4o` model with a structured system prompt
- The model **plans actions**, **uses tools**, and **responds based on tool output**
- Demonstrates how an LLM can act like an agent — not just a chatbot

---

##  Tools Implemented

### `getWeatherData(city: string): string`
This is a mock tool that returns hardcoded weather data for select Indian cities:

  {
    pune: "10°C",
    delhi: "20°C",
    banglore: "30°C",
    chennai: "8°C",
    hyderabad: "14°C"
  }

## How the Agent Thinks (LLM Reasoning Loop)
   - The LLM is instructed via a system prompt to follow a specific loop:
   - START – Receive user input
   - PLAN – Decide the next step
   - ACTION – Call a tool (e.g., getWeatherData)
   - OBSERVATION – Use tool’s result
   - OUTPUT – Give final answer based on all steps

## What I Learned
  “An LLM with a tool is an AI agent.”
  - This project helped me understand how to:
    - Structure a system prompt for reasoning
    - Parse and respond to LLM outputs
    - Use a loop to simulate multi-step planning
    - Dynamically call functions based on LLM responses
