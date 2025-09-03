const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
// const prompt = "You have a Cool Name!!!!Gemini";

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: `${prompt}`,
//   });
//   console.log(response.text);
// }
const main = async (prompt) => {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${prompt}`,
  });
  return response.text;
}
// main();

app.get("/", (req, res) => {
    res.send("Sneha | Gemini");
})

app.post("/api/content", async(req, res) => {
    try{
        const { prompt } = req.body;
        const output  = await main(prompt);
        res.json({
            response : output
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
})

app.listen(port, () => {
    console.log(`App is running on ${port}`);
})