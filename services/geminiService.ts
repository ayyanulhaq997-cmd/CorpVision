import { GoogleGenAI } from "@google/genai";

export const generateListingDescription = async (businessName: string, industry: string, keywords: string) => {
  // If key is missing or is the default empty string from the shim, provide a graceful fallback
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    return "API Key not configured. Please ensure the API_KEY environment variable is set.";
  }

  try {
    // Initialize inside the function to prevent top-level crashes
    const ai = new GoogleGenAI({ apiKey });
    
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