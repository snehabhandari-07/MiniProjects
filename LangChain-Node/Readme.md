## LangChain + Gemini

### This project demonstrates how to use LangChain with Google Gemini in two different ways:
- Using LCEL (LangChain Expression Language) – modern, chainable syntax with .pipe() and .invoke().

- Using LLMChain – the classic way of combining a model and a prompt.

- Both scripts accept user input from the terminal and send it to Gemini, then display the response.

## Old Style – Using LLMChain

- We use LLMChain to connect (or bundle) together the prompt and the model.

- Here, LangChain acts as the glue:
    - Prompt → LangChain → Model

- This is the classic way of making a chain.

## New Style – Using LCEL (pipe)

- With LangChain Expression Language (LCEL), instead of LLMChain, we use .pipe() to pass the prompt to the model and then to an output parser.

- Flow looks like:
    - Prompt → Model → Parser

- This approach is more composable and modern.

## What is LangChain?

LangChain is a framework for building AI-powered applications.

It allows you to chain together multiple steps (prompting, parsing, tools, memory, etc.).

- Two main focus areas:

   - Chains → fixed flows of execution.

   - Agents → dynamic flows where the model decides the next step.

## When to Use a Chain

- Use a chain when your application follows fixed steps.

- A chain can be built in two ways:

- Old style → LLMChain (LangChain bundles prompt + model).

- New style → LCEL (pipe) (you directly connect prompt → model → parser).