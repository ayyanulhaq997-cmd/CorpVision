
import { GoogleGenAI, Type } from "@google/genai";

// Standard initialization as per guidelines
// The shim in index.html ensures process.env.API_KEY doesn't throw a ReferenceError
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateListingDescription = async (businessName: string, industry: string, keywords: string) => {
  // If key is missing, provide a graceful fallback instead of crashing
  if (!process.env.API_KEY) {
    return "API Key not configured. Please add a valid Gemini API key to your environment variables.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a sleek, professional business description for a company named "${businessName}" in the ${industry} industry. Use these keywords: ${keywords}. Keep it under 200 characters and make it sound modern and corporate.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please check your API configuration.";
  }
};
