import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useWardrobeStore } from '../store/wardrobeStore';
import WardrobeItemCard from '../components/WardrobeItemCard';

const CATEGORIES = ['VIEW ALL', 'TOPS', 'BOTTOMS', 'OUTERWEAR', 'SHOES', 'ACCESSORIES'];

export default function ClosetScreen() {
    const items = useWardrobeStore((state) => state.items);
    const [activeCategory, setActiveCategory] = useState('VIEW ALL');

    const filteredItems = useMemo(() => {
        if (activeCategory === 'VIEW ALL') return items;
        return items.filter(item => {
            const cat = item.category.toUpperCase();
            // Simple inclusive matching like in web
            return cat.includes(activeCategory.slice(0, -1));
        });
    }, [items, activeCategory]);

    return (
        <View style={styles.container}>
            {/* Category Scroll */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setActiveCategory(cat)}
                            style={styles.filterButton}
                        >
                            <Text style={[
                                styles.filterText,
                                activeCategory === cat && styles.activeFilterText
                            ]}>
                                {cat}
                            </Text>
                            {activeCategory === cat && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Grid */}
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={({ item }) => (
                    <WardrobeItemCard
                        item={item}
                        onPress={() => console.log('Selected:', item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No items found.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    filterContainer: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 24,
    },
    filterButton: {
        alignItems: 'center',
        gap: 4,
    },
    filterText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: '#9ca3af',
    },
    activeFilterText: {
        color: '#000',
    },
    activeIndicator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#000',
    },
    listContent: {
        padding: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontFamily: 'serif',
        fontSize: 18,
        color: '#6b7280',
    }
});
