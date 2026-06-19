import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-quiz', async (req, res) => {
    const { text } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Based on the following text, generate 5 multiple-choice questions. 
Return the response as a valid JSON array of objects. 
Each object must have: "question", "options" (array of 4 strings), and "answer" (the string matching the correct option).
Text: ${text}`;

    try {
        const result = await model.generateContent(prompt);       
        const responseText = result.response.text().replace(/```json|```/g, "").trim();
        const quizJson = JSON.parse(responseText);

        res.json(quizJson);
    } catch (error) {
        console.error("Quiz generation error:", error);
        res.status(500).json({ error: "Failed to generate quiz" });
    }
});

export default router;