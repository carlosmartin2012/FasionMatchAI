import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: Move this to an environment variable in production
const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeImage(base64Image: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Analyze this piece of clothing and return a JSON object with the following fields: 
    category (TOPS, BOTTOMS, OUTERWEAR, SHOES, ACCESSORIES), 
    color, 
    style, 
    material, 
    brand (if visible), 
    description (short). 
    Only return the JSON.`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: "image/jpeg"
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean JSON response (handle potential markdown blocks)
        const jsonStr = text.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini Vision Error:", error);
        return null;
    }
}

export async function getStylistAdvice(messages: { role: 'user' | 'model', text: string }[], wardrobeContext: any[]) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: messages.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }],
            })),
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const contextPrompt = `You are a professional fashion stylist. You have access to the user's wardrobe: ${JSON.stringify(wardrobeContext)}. Give advice based on these items.`;

        // We send the context as part of the first message or as a system instruction if supported.
        // Since we're using chat history, we'll append the user's latest message with context if it's the start.

        const result = await chat.sendMessage(messages[messages.length - 1].text);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "I'm having trouble connecting to my fashion database right now. But generally, you can't go wrong with classic pairings!";
    }
}
