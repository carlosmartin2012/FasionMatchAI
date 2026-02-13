import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.14.0"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.0"

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!)

serve(async (req) => {
    try {
        const { user_id, weather } = await req.json()

        // 1. Get user's wardrobe
        const { data: items } = await supabase
            .from('wardrobe_items')
            .select('*')
            .eq('user_id', user_id)

        if (!items || items.length === 0) {
            return new Response(JSON.stringify({ error: "No wardrobe items found" }), { status: 404 })
        }

        // 2. Use Gemini to pick items
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })
        const prompt = `Based on these wardrobe items: ${JSON.stringify(items)}. The weather is ${weather || 'Sunny'}. Pick an outfit for today. Return only the IDs of the items as a JSON array.`

        const result = await model.generateContent(prompt)
        const itemIds = JSON.parse(result.response.text().match(/\[.*\]/s)?.[0] || "[]")

        // 3. Save to daily_picks
        if (itemIds.length > 0) {
            await supabase.from('daily_picks').insert({
                user_id,
                item_ids: itemIds,
                occasion: 'Daily Stylist Choice'
            })
        }

        return new Response(JSON.stringify({ itemIds }), {
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
})
