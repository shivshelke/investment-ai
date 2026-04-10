import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

router.post('/', async (req, res) => {
  const { messages } = req.body; // array of { role: 'user' | 'model', text: string }
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages payload is required and must be an array.' });
  }

  // Get the last message from user
  const lastUserMessage = messages[messages.length - 1]?.text;
  
  if (!lastUserMessage) {
    return res.status(400).json({ error: 'A message string is required.' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('No GEMINI_API_KEY found, sending mock response.');
      return res.json({ 
        role: 'model', 
        text: 'I am a mock response because the Gemini API Key is not set in the environment. Please check your server/.env file!' 
      });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    // Build the chat history format that @google/genai format expects if needed,
    // but for simplicity, we pass everything as context using the full text format.
    // An actual robust implementation would use `model.startChat()` but let's do generateContent for simplicity.
    const systemPrompt = "You are a helpful, professional, and concise financial web assistant for 'Investment AI'. You provide smart investment tips and help navigate calculations for SIPs, corpus tracking, and asset allocation. Always answer in Markdown format. Keep answers brief (under 100 words unless explicitly asked for detail).";
    
    // Construct conversation string for genai format
    const conversationContext = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
    
    const prompt = `${systemPrompt}\n\nHere is the conversation history:\n${conversationContext}\n\nAssistant:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      role: 'model',
      text: response.text
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI service.', details: error.message });
  }
});

export default router;
