import React from 'react';
import {
    Modal,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import { X, ExternalLink, ShoppingBag } from 'lucide-react-native';
import { WardrobeItem } from '../types';

interface Props {
    item: WardrobeItem | null;
    onClose: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ItemDetailModal({ item, onClose }: Props) {
    if (!item) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!item}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <X color="#000" size={24} />
                    </TouchableOpacity>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />

                        <View style={styles.details}>
                            <Text style={styles.brand}>{item.brand || 'Unbranded'}</Text>
                            <Text style={styles.title}>{item.style} {item.category}</Text>

                            <View style={styles.specs}>
                                <View style={styles.specItem}>
                                    <Text style={styles.specLabel}>Color</Text>
                                    <Text style={styles.specValue}>{item.color}</Text>
                                </View>
                                <View style={styles.specItem}>
                                    <Text style={styles.specLabel}>Material</Text>
                                    <Text style={styles.specValue}>{item.material}</Text>
                                </View>
                                <View style={styles.specItem}>
                                    <Text style={styles.specLabel}>Size</Text>
                                    <Text style={styles.specValue}>{item.size || 'N/A'}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.buyButton}>
                                <ShoppingBag color="#fff" size={20} />
                                <Text style={styles.buyButtonText}>View in Store</Text>
                                <ExternalLink color="#fff" size={16} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: SCREEN_HEIGHT * 0.85,
        overflow: 'hidden',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        aspectRatio: 3 / 4,
        backgroundColor: '#f3f4f6',
    },
    details: {
        padding: 24,
    },
    brand: {
        fontSize: 12,
        fontWeight: '700',
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 8,
    },
    title: {
        fontFamily: 'serif',
        fontSize: 28,
        color: '#000',
        marginBottom: 24,
    },
    specs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f3f4f6',
        paddingVertical: 20,
        marginBottom: 32,
    },
    specItem: {
        flex: 1,
    },
    specLabel: {
        fontSize: 10,
        color: '#9ca3af',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    specValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    buyButton: {
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingVertical: 18,
        borderRadius: 12,
    },
    buyButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    }
});
