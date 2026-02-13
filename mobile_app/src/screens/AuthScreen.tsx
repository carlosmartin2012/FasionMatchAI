import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, Title, HelperText } from 'react-native-paper';
import { supabase } from '../services/supabase';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function signInWithEmail() {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) setError(error.message);
        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) setError(error.message);
        else alert('Check your email for the confirmation link!');
        setLoading(false);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <Title style={styles.title}>FashionMatch AI</Title>
                    <Text style={styles.subtitle}>Your Digital Stylist</Text>
                </View>

                <View style={styles.form}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={styles.input}
                    />

                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                    />

                    {error && <HelperText type="error" visible={!!error}>{error}</HelperText>}

                    <Button
                        mode="contained"
                        onPress={signInWithEmail}
                        loading={loading}
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                    >
                        Sign In
                    </Button>

                    <Button
                        mode="outlined"
                        onPress={signUpWithEmail}
                        loading={loading}
                        style={styles.button}
                    >
                        Create Account
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontFamily: 'serif',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginTop: 8,
    },
    form: {
        gap: 16,
    },
    input: {
        backgroundColor: '#fff',
    },
    button: {
        paddingVertical: 6,
        borderRadius: 8,
    },
    buttonLabel: {
        fontWeight: 'bold',
    }
});
