import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Camera, Image as ImageIcon, Upload, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, Button } from 'react-native-paper';
import { useWardrobeStore } from '../store/wardrobeStore';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../services/supabase';
import { analyzeImage } from '../services/gemini';
import * as FileSystem from 'expo-file-system';

export default function UploadScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');

    const { addItem } = useWardrobeStore();
    const { user } = useAuthStore();

    const pickImage = async (useCamera: boolean) => {
        let result;
        if (useCamera) {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'We need camera access to take photos.');
                return;
            }
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.8,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.8,
            });
        }

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
            autoTagImage(uri);
        }
    };

    const autoTagImage = async (uri: string) => {
        setIsAnalyzing(true);
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
            const tags = await analyzeImage(base64);
            if (tags) {
                if (tags.category) setCategory(tags.category);
                if (tags.color) setColor(tags.color);
                if (tags.brand) setBrand(tags.brand);
            }
        } catch (error) {
            console.error("Auto-tag error:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleUpload = async () => {
        if (!image || !user) return;
        setIsUploading(true);

        try {
            // 1. Upload to Supabase Storage
            const fileName = `${user.id}/${Date.now()}.jpg`;
            const formData = new FormData();
            formData.append('file', {
                uri: image,
                name: 'upload.jpg',
                type: 'image/jpeg',
            } as any);

            const { data: storageData, error: storageError } = await supabase.storage
                .from('wardrobe')
                .upload(fileName, formData);

            if (storageError) throw storageError;

            const { data: { publicUrl } } = supabase.storage
                .from('wardrobe')
                .getPublicUrl(fileName);

            // 2. Add to Database
            await addItem({
                userId: user.id,
                imageUrl: publicUrl,
                category: category || 'Uncategorized',
                color: color || 'Unknown',
                brand: brand || 'Unbranded',
                style: 'Modern',
                material: 'Other',
                createdAt: Date.now(),
            });

            Alert.alert('Success', 'Item added to your closet!');
            setImage(null);
            setCategory('');
            setColor('');
            setBrand('');
        } catch (error: any) {
            Alert.alert('Upload failed', error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {!image ? (
                <View style={styles.placeholderContainer}>
                    <View style={styles.iconCircle}>
                        <Upload color="#9ca3af" size={40} />
                    </View>
                    <Text style={styles.title}>Digitize your clothing</Text>
                    <Text style={styles.subtitle}>
                        Upload a clear photo of your item.
                    </Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => pickImage(true)}>
                            <Camera color="#fff" size={24} />
                            <Text style={styles.actionText}>TAKE PHOTO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={() => pickImage(false)}>
                            <ImageIcon color="#000" size={24} />
                            <Text style={[styles.actionText, styles.secondaryText]}>LIBRARY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.previewContainer}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setImage(null)}>
                        <X color="#fff" size={20} />
                    </TouchableOpacity>

                    <Image source={{ uri: image }} style={styles.previewImage} />

                    {isAnalyzing && (
                        <View style={styles.analyzingOverlay}>
                            <ActivityIndicator color="#000" size="small" />
                            <Text style={styles.analyzingText}>AI ANALYZING...</Text>
                        </View>
                    )}

                    <View style={styles.form}>
                        <TextInput
                            label="Category (e.g. Tops, Bottoms)"
                            value={category}
                            onChangeText={setCategory}
                            mode="outlined"
                            style={styles.input}
                        />
                        <TextInput
                            label="Color"
                            value={color}
                            onChangeText={setColor}
                            mode="outlined"
                            style={styles.input}
                        />
                        <TextInput
                            label="Brand"
                            value={brand}
                            onChangeText={setBrand}
                            mode="outlined"
                            style={styles.input}
                        />

                        <Button
                            mode="contained"
                            onPress={handleUpload}
                            loading={isUploading}
                            disabled={isUploading}
                            style={styles.uploadBtn}
                        >
                            ADD TO CLOSET
                        </Button>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { flexGrow: 1, padding: 24, justifyContent: 'center' },
    placeholderContainer: { alignItems: 'center' },
    iconCircle: {
        width: 80,
        height: 80,
        backgroundColor: '#f3f4f6',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontFamily: 'serif',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 40,
    },
    actions: { width: '100%', gap: 16 },
    actionButton: {
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 12,
    },
    actionText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 2,
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    secondaryText: { color: '#000' },
    previewContainer: { width: '100%' },
    previewImage: {
        width: '100%',
        aspectRatio: 3 / 4,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        marginBottom: 24,
    },
    closeBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 8,
    },
    analyzingOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        gap: 8,
    },
    analyzingText: {
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#6b7280',
    },
    form: { gap: 16 },
    input: { backgroundColor: '#fff' },
    uploadBtn: {
        marginTop: 16,
        paddingVertical: 8,
        backgroundColor: '#000',
        borderRadius: 12,
    }
});
