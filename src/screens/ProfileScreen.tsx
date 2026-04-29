import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getLevelTitle } from '../utils/gameEngine';
import { REGIONS } from '../data/regions';

const STAT_COLORS: Record<string, string> = {
  talent: '#1DB954',
  charisma: '#F5A623',
  business: '#6C63FF',
  production: '#FF6B8A',
  globalReach: '#00D4FF',
  hustle: '#FF6B35',
  image: '#E91E8C',
};

const STAT_LABELS: Record<string, string> = {
  talent: 'Talent',
  charisma: 'Charisma',
  business: 'Business',
  production: 'Production',
  globalReach: 'Global Reach',
  hustle: 'Hustle',
  image: 'Image',
};

export default function ProfileScreen() {
  const player = useSelector((s: RootState) => s.player.data);
  const { completedQuests, gameTime } = useSelector((s: RootState) => s.game);

  if (!player) return null;

  const title = getLevelTitle(player.level);
  const xpPercent = Math.round((player.xp / player.xpToNextLevel) * 100);
  const totalStreams = player.discography.reduce((sum, t) => sum + t.streams, 0);

  const topRegions = Object.entries(player.reputation)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <LinearGradient colors={['#0a0a1a', '#0d0d1f']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Artist Card */}
        <LinearGradient colors={['#1a1a2e', '#0d0d1f']} style={styles.artistCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {player.artistName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.artistName}>{player.artistName}</Text>
          <Text style={styles.realName}>{player.name}</Text>
          <View style={styles.titleBadge}>
            <Text style={styles.titleText}>{title}</Text>
          </View>

          {/* Level + XP */}
          <View style={styles.levelRow}>
            <Text style={styles.levelLabel}>LVL {player.level}</Text>
            <View style={styles.xpBar}>
              <View style={[styles.xpFill, { width: `${xpPercent}%` }]} />
            </View>
            <Text style={styles.xpLabel}>{player.xp}/{player.xpToNextLevel}</Text>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          {[
            { label: 'Money', value: `$${player.money.toLocaleString()}`, emoji: '💵' },
            { label: 'Tracks', value: player.discography.length, emoji: '🎵' },
            { label: 'Streams', value: totalStreams >= 1000 ? `${(totalStreams / 1000).toFixed(1)}K` : totalStreams, emoji: '🎧' },
            { label: 'Days', value: gameTime, emoji: '📅' },
            { label: 'Quests', value: completedQuests.length, emoji: '✅' },
            { label: 'Collabs', value: player.relationships.filter(r => r.status === 'collaborator').length, emoji: '🤝' },
          ].map((stat) => (
            <View key={stat.label} style={styles.quickStatChip}>
              <Text style={styles.quickStatEmoji}>{stat.emoji}</Text>
              <Text style={styles.quickStatValue}>{stat.value}</Text>
              <Text style={styles.quickStatLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Stats */}
        <Text style={styles.sectionLabel}>{player.careerPath === 'label' ? 'EXECUTIVE STATS' : 'ARTIST STATS'}</Text>
        <View style={styles.statsCard}>
          {Object.entries(player.stats).map(([key, value]) => (
            <View key={key} style={styles.statRow}>
              <Text style={styles.statName}>{STAT_LABELS[key]}</Text>
              <View style={styles.statBarBg}>
                <View
                  style={[
                    styles.statBarFill,
                    { width: `${value}%`, backgroundColor: STAT_COLORS[key] },
                  ]}
                />
              </View>
              <Text style={[styles.statNum, { color: STAT_COLORS[key] }]}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Reputation by Region */}
        {topRegions.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>REPUTATION</Text>
            <View style={styles.repCard}>
              {topRegions.map(([regionId, rep]) => {
                const region = REGIONS.find((r) => r.id === regionId);
                if (!region) return null;
                return (
                  <View key={regionId} style={styles.repRow}>
                    <Text style={styles.repRegion}>{region.name}</Text>
                    <Text style={styles.repCountry}>{region.country}</Text>
                    <View style={styles.repBarBg}>
                      <View
                        style={[
                          styles.repBarFill,
                          { width: `${rep}%`, backgroundColor: region.primaryColor },
                        ]}
                      />
                    </View>
                    <Text style={[styles.repNum, { color: region.primaryColor }]}>{rep}</Text>
                  </View>
                );
              })}
            </View>
          </>
        )}

        {/* Relationships */}
        {player.relationships.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>NETWORK ({player.relationships.length})</Text>
            <View style={styles.networkCard}>
              {player.relationships.map((rel) => (
                <View key={rel.npcId} style={styles.relRow}>
                  <View style={[styles.relDot, { backgroundColor: rel.affinity > 0 ? '#1DB954' : '#ff4444' }]} />
                  <Text style={styles.relId}>{rel.npcId.replace('npc_', '').replace(/_/g, ' ')}</Text>
                  <Text style={[styles.relStatus, { color: rel.affinity > 50 ? '#1DB954' : rel.affinity > 0 ? '#F5A623' : '#ff4444' }]}>
                    {rel.status}
                  </Text>
                  <Text style={styles.relAffinity}>{rel.affinity > 0 ? '+' : ''}{rel.affinity}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Achievements */}
        {player.achievements.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>ACHIEVEMENTS ({player.achievements.length})</Text>
            <View style={styles.achievementsWrap}>
              {player.achievements.map((a) => (
                <View key={a} style={styles.achievementChip}>
                  <Text style={styles.achievementText}>🏆 {a.replace('quest_', '').replace(/_/g, ' ')}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, paddingTop: 56, paddingBottom: 48 },
  artistCard: {
    borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 16,
  },
  avatarCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#1DB954', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  avatarText: { fontSize: 32, fontWeight: '900', color: '#000' },
  artistName: { fontSize: 24, fontWeight: '900', color: '#fff' },
  realName: { fontSize: 13, color: '#666', marginTop: 2, marginBottom: 8 },
  titleBadge: {
    backgroundColor: '#1DB95422', borderWidth: 1, borderColor: '#1DB954',
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginBottom: 16,
  },
  titleText: { fontSize: 12, color: '#1DB954', fontWeight: '700', letterSpacing: 1 },
  levelRow: { flexDirection: 'row', alignItems: 'center', width: '100%', gap: 10 },
  levelLabel: { fontSize: 12, color: '#aaa', fontWeight: '700', width: 44 },
  xpBar: { flex: 1, height: 6, backgroundColor: '#222', borderRadius: 3 },
  xpFill: { height: '100%', backgroundColor: '#1DB954', borderRadius: 3 },
  xpLabel: { fontSize: 10, color: '#555', width: 60, textAlign: 'right' },
  quickStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  quickStatChip: {
    flex: 1, minWidth: '28%', backgroundColor: '#111',
    borderRadius: 10, padding: 12, alignItems: 'center',
  },
  quickStatEmoji: { fontSize: 18, marginBottom: 4 },
  quickStatValue: { fontSize: 18, fontWeight: '900', color: '#fff' },
  quickStatLabel: { fontSize: 9, color: '#555', letterSpacing: 1, marginTop: 2 },
  sectionLabel: { fontSize: 10, color: '#444', letterSpacing: 2, marginBottom: 8, marginTop: 8 },
  statsCard: { backgroundColor: '#111', borderRadius: 12, padding: 16, marginBottom: 16 },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  statName: { width: 100, fontSize: 13, color: '#aaa' },
  statBarBg: { flex: 1, height: 6, backgroundColor: '#1a1a1a', borderRadius: 3, marginHorizontal: 8 },
  statBarFill: { height: '100%', borderRadius: 3 },
  statNum: { width: 28, fontSize: 12, fontWeight: '700', textAlign: 'right' },
  repCard: { backgroundColor: '#111', borderRadius: 12, padding: 16, marginBottom: 16 },
  repRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  repRegion: { width: 70, fontSize: 13, color: '#fff', fontWeight: '600' },
  repCountry: { width: 60, fontSize: 10, color: '#555' },
  repBarBg: { flex: 1, height: 4, backgroundColor: '#1a1a1a', borderRadius: 2, marginHorizontal: 8 },
  repBarFill: { height: '100%', borderRadius: 2 },
  repNum: { width: 24, fontSize: 12, fontWeight: '700', textAlign: 'right' },
  networkCard: { backgroundColor: '#111', borderRadius: 12, padding: 16, marginBottom: 16 },
  relRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  relDot: { width: 8, height: 8, borderRadius: 4 },
  relId: { flex: 1, fontSize: 13, color: '#aaa', textTransform: 'capitalize' },
  relStatus: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  relAffinity: { width: 32, fontSize: 12, color: '#555', textAlign: 'right' },
  achievementsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  achievementChip: {
    backgroundColor: '#1a1a0a', borderWidth: 1, borderColor: '#F5A6