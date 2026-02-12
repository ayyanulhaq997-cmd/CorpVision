
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateListingDescription = async (businessName: string, industry: string, keywords: string) => {
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
    return "Error generating content. Please try again.";
  }
};
