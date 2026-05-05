import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const geminiService = {
  async sendMessage(prompt: string, reportContext: any) {
    if (!API_KEY) {
      return "Gemini API Key not found. Please set VITE_GEMINI_API_KEY in .env file.";
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const context = `
        You are a QA Automation Assistant. Here is the test report data:
        ${JSON.stringify(reportContext)}
        
        User question: ${prompt}
      `;

      const result = await model.generateContent(context);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Sorry, I encountered an error while processing your request.";
    }
  },

  async analyzeReport(reportData: any) {
    const prompt = "Summarize this test report in 2-3 sentences.";
    return this.sendMessage(prompt, reportData);
  },

  async summarizeFailures(reportData: any) {
    const prompt = "List all failed tests and suggest possible reasons for failure.";
    return this.sendMessage(prompt, reportData);
  }
};
