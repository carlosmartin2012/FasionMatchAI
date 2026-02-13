import React, { useState, useRef, useEffect } from 'react';
import { WardrobeItem, ChatMessage } from '../types';

interface Props {
    wardrobe: WardrobeItem[];
}

const StylistChat: React.FC<Props> = ({ wardrobe }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'model',
            text: "Hello! I'm your AI Stylist. I can help you create outfits from your wardrobe or recommend new items. What are we dressing for today?",
            timestamp: Date.now()
        }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            const modelMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "That sounds like a great plan! Given your style, I'd suggest pairing your White Basic Tee with the Beige Chinos for a classic, effortless look.",
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, modelMsg]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                ? 'bg-brand-black text-white rounded-tr-none'
                                : 'bg-gray-100 text-brand-black rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask your stylist..."
                        className="flex-1 bg-gray-50 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-black outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-brand-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                        ↑
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StylistChat;
