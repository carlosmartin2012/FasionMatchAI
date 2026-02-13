import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StylistScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>AI Stylist</Text>
            <Text style={styles.subtitle}>Talk to your personal fashion assistant.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    title: { fontFamily: 'serif', fontSize: 24, marginBottom: 10 },
    subtitle: { color: '#888', fontSize: 14 }
});
