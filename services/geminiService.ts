import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBusinessCoachResponse = async (
  query: string,
  context: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are an expert Business Consultant and Career Coach named "WealthBot". 
    Your goal is to help users find profitable business ideas, optimize their course sales, and solve entrepreneurial challenges.
    Keep answers concise, actionable, and encouraging. 
    Format your response with Markdown (bolding key points, lists where applicable).
    Context: ${context}`;

    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate a response at this time. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the knowledge base right now. Please check your connection or API key.";
  }
};

export const generateBusinessIdea = async (niche: string, language: 'zh' | 'en'): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        const langInstruction = language === 'zh' 
          ? 'Response MUST be in Chinese (Simplified).' 
          : 'Response MUST be in English.';

        const prompt = `Generate a unique, modern business idea or money-making tactic for the niche: "${niche}". 
        ${langInstruction}
        Include:
        1. Concept Title
        2. How it works (2-3 sentences)
        3. Potential Difficulty (Low/Medium/High)
        4. First Step to execute.
        Return in valid JSON format only, structured as fields: title, description, difficulty, firstStep.`;
    
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });
    
        return response.text || "{}";
      } catch (error) {
        console.error("Gemini Idea Gen Error:", error);
        return "{}";
      }
}