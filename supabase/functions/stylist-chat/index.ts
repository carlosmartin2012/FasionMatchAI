import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.0"

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!)

serve(async (req) => {
    try {
        const { message, context } = await req.json()

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })
        const chat = model.startChat({
            history: context || [],
            generationConfig: {
                maxOutputTokens: 500,
            },
        })

        const result = await chat.sendMessage(message)
        const response = await result.response
        const text = response.text()

        return new Response(JSON.stringify({ reply: text }), {
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
})
