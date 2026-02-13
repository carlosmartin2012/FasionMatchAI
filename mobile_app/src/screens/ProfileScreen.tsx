import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Avatar, ListItem } from 'react-native-paper';
import { User, Shield, CreditCard, Ruler, Tag, LogOut } from 'lucide-react-native';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../services/supabase';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function ProfileScreen() {
    const { user, signOut } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [height, setHeight] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) fetchProfile();
    }, [user]);

    const fetchProfile = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user?.id)
            .single();

        if (data) {
            setProfile(data);
            setHeight(data.height || '');
        }
        setLoading(false);
    };

    const handleUpdateProfile = async () => {
        if (!user) return;
        setLoading(true);
        const { error } = await supabase
            .from('profiles')
            .update({ height })
            .eq('id', user.id);

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Success', 'Profile updated!');
            setIsEditing(false);
            fetchProfile();
        }
        setLoading(false);
    };

    if (loading && !profile) return <LoadingSpinner fullScreen message="Loading profile..." />;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Avatar.Text
                    size={80}
                    label={profile?.nickname?.substring(0, 2).toUpperCase() || 'U'}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{profile?.nickname || 'Fashion Enthusiast'}</Text>
                <Text style={styles.email}>{user?.email}</Text>

                <View style={[styles.badge, styles[`badge_${profile?.plan || 'basic'}`]]}>
                    <Shield size={12} color="#fff" />
                    <Text style={styles.badgeText}>{(profile?.plan || 'BASIC').toUpperCase()}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>
                <Card>
                    <View style={styles.row}>
                        <View style={styles.rowIcon}>
                            <Ruler size={20} color="#6b7280" />
                        </View>
                        <View style={styles.rowContent}>
                            <Text style={styles.rowLabel}>Height (cm)</Text>
                            {isEditing ? (
                                <Input
                                    value={height}
                                    onChangeText={setHeight}
                                    keyboardType="numeric"
                                    placeholder="e.g. 175"
                                    containerStyle={styles.rowInput}
                                />
                            ) : (
                                <Text style={styles.rowValue}>{profile?.height ? `${profile.height} cm` : 'Not set'}</Text>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}>
                            <Text style={styles.editLink}>{isEditing ? 'SAVE' : 'EDIT'}</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>
                <Card style={styles.premiumCard}>
                    <CreditCard size={24} color="#000" />
                    <View style={{ flex: 1, marginLeft: 16 }}>
                        <Text style={styles.premiumTitle}>Upgrade to Gold</Text>
                        <Text style={styles.premiumSubtitle}>Unlock AI Stylist and Daily Picks.</Text>
                    </View>
                    <Button
                        title="GO"
                        onPress={() => Alert.alert('Coming Soon', 'Subscription system integration.')}
                        variant="primary"
                        style={styles.goBtn}
                    />
                </Card>
            </View>

            <Button
                title="LOG OUT"
                onPress={signOut}
                variant="outline"
                style={styles.logoutBtn}
                textStyle={{ color: '#ef4444' }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 24, paddingBottom: 40 },
    header: { alignItems: 'center', marginBottom: 32 },
    avatar: { backgroundColor: '#000', marginBottom: 16 },
    name: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
    email: { fontSize: 14, color: '#6b7280', marginBottom: 12 },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 6
    },
    badge_basic: { backgroundColor: '#9ca3af' },
    badge_premium: { backgroundColor: '#6366f1' },
    badge_gold: { backgroundColor: '#f59e0b' },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },

    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 12, fontWeight: '800', color: '#9ca3af', marginBottom: 12, letterSpacing: 1 },

    row: { flexDirection: 'row', alignItems: 'center' },
    rowIcon: { width: 32 },
    rowContent: { flex: 1, marginLeft: 8 },
    rowLabel: { fontSize: 12, color: '#6b7280' },
    rowValue: { fontSize: 16, fontWeight: '600', color: '#111827' },
    rowInput: { marginBottom: 0, marginTop: 4 },
    editLink: { fontSize: 12, fontWeight: '700', color: '#000', marginLeft: 12 },

    premiumCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', borderColor: '#fde68a' },
    premiumTitle: { fontSize: 16, fontWeight: '700', color: '#92400e' },
    premiumSubtitle: { fontSize: 12, color: '#b45309' },
    goBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },

    logoutBtn: { marginTop: 20, borderColor: '#fee2e2' }
});
