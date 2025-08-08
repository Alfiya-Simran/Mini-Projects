
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function answerQuestionFromDocument(documentText: string, question: string): Promise<string> {
  const model = "gemini-2.5-flash";

  const systemInstruction = `You are a highly skilled AI assistant specialized in analyzing and answering questions based on a provided document. 
  Your task is to answer the user's question using ONLY the information contained within the text below. 
  Do not use any external knowledge or make assumptions. 
  If the answer is not found in the document, you must explicitly state: "The answer to this question cannot be found in the provided document."
  Be concise and accurate in your response.`;

  const prompt = `
--- DOCUMENT START ---
${documentText}
--- DOCUMENT END ---

Based on the document provided above, please answer the following question.
Question: "${question}"
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the Gemini API.");
  }
}
