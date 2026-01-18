
import { GoogleGenAI, Type } from "@google/genai";
import { PlaylistSuggestion } from "../types";

// Always create the GoogleGenAI instance inside the calling function to ensure it uses the most up-to-date API key.
export const generatePlaylistMockup = async (mood: string): Promise<PlaylistSuggestion> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a professional YouTube playlist concept for the following mood/theme: "${mood}". 
    The tone should be cinematic and high-end. Provide a catchy title, a short description, 
    a list of 5 fictional track names with artists, and a visual theme suggestion for the video background.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          tracks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                artist: { type: Type.STRING },
                duration: { type: Type.STRING }
              },
              required: ["title", "artist", "duration"]
            }
          },
          visualTheme: { type: Type.STRING }
        },
        required: ["title", "description", "tracks", "visualTheme"]
      }
    }
  });

  // response.text is a property (not a method) and returns string | undefined.
  const text = response.text;
  if (!text) {
    throw new Error("The AI model failed to return a content response.");
  }

  return JSON.parse(text) as PlaylistSuggestion;
};