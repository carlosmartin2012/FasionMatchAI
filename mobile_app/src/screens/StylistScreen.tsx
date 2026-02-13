import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Send } from 'lucide-react-native';
import { ChatMessage } from '../types';
import { getStylistAdvice } from '../services/gemini';
import { useWardrobeStore } from '../store/wardrobeStore';

export default function StylistScreen() {
    const { items: wardrobe } = useWardrobeStore();
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'model',
            text: "Hello! I'm your AI Stylist. I can help you create outfits from your wardrobe or recommend new items. What are we dressing for today?",
            timestamp: Date.now()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: Date.now()
        };

        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput('');
        setIsTyping(true);

        try {
            const advice = await getStylistAdvice(
                updatedMessages.map(m => ({ role: m.role, text: m.text })),
                wardrobe
            );

            const modelMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: advice,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, modelMsg]);
        } catch (error) {
            console.error("Stylist advice error:", error);
            const errorMsg: ChatMessage = {
                id: Date.now().toString(),
                role: 'model',
                text: "I'm sorry, I'm having trouble connecting to my fashion brain. Please try again later.",
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        }
    }, [messages]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
                renderItem={({ item }) => (
                    <View style={[
                        styles.messageWrapper,
                        item.role === 'user' ? styles.userMessageWrapper : styles.modelMessageWrapper
                    ]}>
                        <View style={[
                            styles.messageBubble,
                            item.role === 'user' ? styles.userBubble : styles.modelBubble
                        ]}>
                            <Text style={[
                                styles.messageText,
                                item.role === 'user' ? styles.userText : styles.modelText
                            ]}>
                                {item.text}
                            </Text>
                        </View>
                    </View>
                )}
                ListFooterComponent={isTyping ? (
                    <View style={styles.typingContainer}>
                        <Text style={styles.typingText}>Stylist is thinking...</Text>
                    </View>
                ) : null}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Ask your stylist..."
                    placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity
                    onPress={handleSend}
                    style={styles.sendButton}
                    activeOpacity={0.8}
                    disabled={isTyping}
                >
                    <Send color="#fff" size={20} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    messageList: { padding: 20, gap: 16 },
    messageWrapper: { flexDirection: 'row', width: '100%' },
    userMessageWrapper: { justifyContent: 'flex-end' },
    modelMessageWrapper: { justifyContent: 'flex-start' },
    messageBubble: {
        maxWidth: '80%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    userBubble: {
        backgroundColor: '#000',
        borderBottomRightRadius: 4,
    },
    modelBubble: {
        backgroundColor: '#f3f4f6',
        borderBottomLeftRadius: 4,
    },
    messageText: { fontSize: 14, lineHeight: 20 },
    userText: { color: '#fff' },
    modelText: { color: '#000' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        backgroundColor: '#fff',
        gap: 12,
    },
    input: {
        flex: 1,
        backgroundColor: '#f9fafb',
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 14,
        color: '#000',
    },
    sendButton: {
        width: 44,
        height: 44,
        backgroundColor: '#000',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    typingContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    typingText: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#9ca3af',
    }
});
