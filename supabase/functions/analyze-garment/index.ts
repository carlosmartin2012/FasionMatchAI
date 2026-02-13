import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.0"

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!)

serve(async (req) => {
    try {
        const { imageBase64 } = await req.json()

        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })
        const prompt = "Analyze this clothing item and return a JSON with category, color, brand (if visible), and style tags. Format: { category: string, color: string, brand: string, style_tags: string[] }"

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: "image/jpeg"
                }
            }
        ])

        const response = await result.response
        const text = response.text()

        // Attempt to parse JSON from text response
        const jsonMatch = text.match(/\{.*\}/s)
        const tags = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse AI response" }

        return new Response(JSON.stringify(tags), {
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
})
