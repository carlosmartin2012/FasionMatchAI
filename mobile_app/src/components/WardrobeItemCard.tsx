import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { WardrobeItem } from '../types';

interface Props {
    item: WardrobeItem;
    onPress: () => void;
}

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 40) / 2; // 2 columns with padding

const WardrobeItemCard: React.FC<Props> = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.info}>
                <Text style={styles.brand}>{item.brand || 'Unbranded'}</Text>
                <Text style={styles.title} numberOfLines={1}>
                    {item.style} {item.category}
                </Text>
                <Text style={styles.details}>
                    {item.color} • {item.material}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: COLUMN_WIDTH,
        marginBottom: 20,
        gap: 8,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 3 / 4,
        backgroundColor: '#f3f4f6',
        borderRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    info: {
        paddingHorizontal: 2,
    },
    brand: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: '#9ca3af',
        marginBottom: 2,
    },
    title: {
        fontSize: 12,
        fontWeight: '500',
        color: '#000',
    },
    details: {
        fontSize: 10,
        color: '#6b7280',
        marginTop: 2,
    },
});

export default WardrobeItemCard;
