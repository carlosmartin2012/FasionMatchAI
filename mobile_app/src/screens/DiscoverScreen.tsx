import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../services/supabase';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Users, Sparkles, TrendingUp } from 'lucide-react-native';

export default function DiscoverScreen() {
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState<any[]>([]);
    const [dailyPicks, setDailyPicks] = useState<any[]>([]);

    useEffect(() => {
        if (user) fetchDiscoverData();
    }, [user]);

    const fetchDiscoverData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Height Matches
            const { data: profile } = await supabase.from('profiles').select('height').eq('id', user?.id).single();

            if (profile?.height) {
                const { data: heightMatches, error } = await supabase.rpc('find_height_matches', { user_height: profile.height });
                if (heightMatches) setMatches(heightMatches);
            }

            // 2. Fetch Daily Picks
            const { data: picks } = await supabase
                .from('daily_picks')
                .select('*, wardrobe_items(*)')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false })
                .limit(1);

            if (picks && picks.length > 0) setDailyPicks(picks[0].wardrobe_items || []);

        } catch (error) {
            console.error("Discover fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner fullScreen message="Looking for matches..." />;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>Discover</Text>
                <Text style={styles.subtitle}>Curated for your style and height.</Text>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Sparkles size={20} color="#f59e0b" />
                    <Text style={styles.sectionTitle}>DAILY PICKS</Text>
                </View>
                {dailyPicks.length > 0 ? (
                    <FlatList
                        data={dailyPicks}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.pickItem}>
                                <Image source={{ uri: item.image_url }} style={styles.pickImage} />
                                <Text style={styles.pickCategory}>{item.category}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Card style={styles.emptyCard}>
                        <Text style={styles.emptyText}>Upload more items to get daily picks!</Text>
                    </Card>
                )}
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Users size={20} color="#6366f1" />
                    <Text style={styles.sectionTitle}>FACTOR ALTURA MATCHES</Text>
                </View>
                {matches.length > 0 ? (
                    matches.map((match) => (
                        <Card key={match.profile_id} style={styles.matchCard}>
                            <View style={styles.matchInfo}>
                                <Text style={styles.matchName}>@{match.nickname || 'style_guru'}</Text>
                                <Text style={styles.matchHeight}>{match.height} cm</Text>
                            </View>
                            <View style={styles.matchScore}>
                                <TrendingUp size={14} color="#10b981" />
                                <Text style={styles.scoreText}>{Math.round(match.match_score * 100)}% Match</Text>
                            </View>
                        </Card>
                    ))
                ) : (
                    <Card style={styles.emptyCard}>
                        <Text style={styles.emptyText}>No height matches found yet. Make sure your height is set!</Text>
                    </Card>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 24 },
    header: { marginBottom: 32 },
    title: { fontFamily: 'serif', fontSize: 32, fontWeight: 'bold' },
    subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },

    section: { marginBottom: 32 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
    sectionTitle: { fontSize: 12, fontWeight: '800', color: '#000', letterSpacing: 1.5 },

    pickItem: { marginRight: 16, width: 120 },
    pickImage: { width: 120, height: 160, borderRadius: 12, backgroundColor: '#f3f4f6' },
    pickCategory: { fontSize: 10, fontWeight: '700', color: '#6b7280', marginTop: 8, textTransform: 'uppercase' },

    matchCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    matchInfo: { gap: 2 },
    matchName: { fontSize: 16, fontWeight: '700' },
    matchHeight: { fontSize: 12, color: '#6b7280' },
    matchScore: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ecfdf5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
    scoreText: { color: '#059669', fontSize: 12, fontWeight: '700' },

    emptyCard: { padding: 32, alignItems: 'center', backgroundColor: '#f9fafb', borderStyle: 'dotted' },
    emptyText: { color: '#9ca3af', fontSize: 13, textAlign: 'center' }
});
