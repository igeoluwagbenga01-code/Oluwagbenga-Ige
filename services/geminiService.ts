
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. App will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

// Utility to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

export const generateMarketingVisual = async (
    base64ImageData: string,
    mimeType: string,
    prompt: string
): Promise<{imageUrl: string; textResponse: string}> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let imageUrl = '';
    let textResponse = "No text response generated.";

    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        textResponse = part.text;
      } else if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    if (!imageUrl) {
        throw new Error("API did not return an image. It might be due to safety policies.");
    }

    return {imageUrl, textResponse};
  } catch (error) {
    console.error("Error generating marketing visual:", error);
    throw new Error("Failed to generate image. Please check the console for details.");
  }
};
