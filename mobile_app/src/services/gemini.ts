import { supabase } from './supabase';

export async function analyzeImage(base64Image: string) {
    try {
        const { data, error } = await supabase.functions.invoke('analyze-garment', {
            body: { imageBase64: base64Image }
        });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Analyze Image Edge Function Error:", error);
        return null;
    }
}

export async function getStylistAdvice(messages: { role: 'user' | 'model', text: string }[], wardrobeContext: any[]) {
    try {
        const { data, error } = await supabase.functions.invoke('stylist-chat', {
            body: {
                message: messages[messages.length - 1].text,
                context: messages.map(m => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.text }]
                })),
                wardrobe: wardrobeContext
            }
        });

        if (error) throw error;
        return data.reply;
    } catch (error) {
        console.error("Stylist Chat Edge Function Error:", error);
        return "I'm having trouble connecting to my fashion brain. But generally, you can't go wrong with classic pairings!";
    }
}
