import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DiscoverScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Discover</Text>
            <Text style={styles.subtitle}>Explore wardrobes from the community.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    title: { fontFamily: 'serif', fontSize: 24, marginBottom: 10 },
    subtitle: { color: '#888', fontSize: 14 }
});
