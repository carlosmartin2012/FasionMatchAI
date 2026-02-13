import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useWardrobeStore } from '../store/wardrobeStore';

export default function ClosetScreen() {
    const items = useWardrobeStore((state) => state.items);

    return (
        <View style={styles.container}>
            {items.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>Your wardrobe is empty.</Text>
                    <Text style={styles.subtitle}>Digitize your first item to start!</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text>{item.category}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontFamily: 'serif', fontSize: 24, marginBottom: 10 },
    subtitle: { color: '#888', fontSize: 14 }
});
