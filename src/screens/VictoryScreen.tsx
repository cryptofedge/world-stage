import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Animated, Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { startNewGame } from '../store/gameSlice';

const CERT_EMOJI: Record<string, string> = {
  gold: '🥇',
  platinum: '🪙',
  multi_platinum: '💿',
  diamond: '💎',
};

export default function VictoryScreen() {
  const dispatch = useDispatch();
  const player = useSelector((s: RootState) => s.player.data);
  const game = useSelector((s: RootState) => s.game);

  // Pulsing diamond animation
  const pulse = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.15, duration: 800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1200, useNativeDriver: false }),
        Animated.timing(glow, { toValue: 0, duration: 1200, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  if (!player) return null;

  const diamondTrack = player.discography.find(
    (t) => t.id === game.diamondArtistId || t.certification === 'diamond'
  );

  const totalStreamsB = (player.totalStreams / 1_000_000_000).toFixed(2);
  const totalMoneyK = (player.money / 1000).toFixed(1);
  const totalShows = game.gameTime; // used as proxy for days spent
  const careerLabel = player.careerPath === 'label' ? 'LABEL' : 'ARTIST';

  const certCounts = player.certifications.reduce<Record<string, number>>((acc, c) => {
    acc[c.level] = (acc[c.level] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <LinearGradient colors={['#000010', '#0a0020', '#000010']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Diamond burst */}
        <View style={styles.diamondContainer}>
          <Animated.Text style={[styles.diamondEmoji, { transform: [{ scale: pulse }] }]}>
            💎
          </Animated.Text>
          <Text style={styles.diamondRing}>✦ ✦ ✦ ✦ ✦</Text>
        </View>

        <Text style={styles.title}>DIAMOND</Text>
        <Text style={styles.titleSub}>CERTIFIED</Text>

        <Text style={styles.congrats}>
          {player.careerPath === 'label'
            ? `${player.artistName} just put their first artist on Diamond.\nThe industry will never forget this label.`
            : `${player.artistName} just went Diamond.\n1.5 billion streams. You made it from nothing.`}
        </Text>

        {/* Career Path Badge */}
        <View style={[styles.badge, { borderColor: player.careerPath === 'label' ? '#6C63FF' : '#1DB954' }]}>
          <Text style={[styles.badgeText, { color: player.careerPath === 'label' ? '#6C63FF' : '#1DB954' }]}>
            {careerLabel} PATH COMPLETE
          </Text>
        </View>

        {/* Diamond track spotlight */}
        {diamondTrack && (
          <View style={styles.trackCard}>
            <LinearGradient colors={['#1a1040', '#0a0a1a']} style={styles.trackCardInner}>
              <Text style={styles.trackCardLabel}>💎 DIAMOND TRACK</Text>
              <Text style={styles.trackCardTitle}>{diamondTrack.title}</Text>
              <Text style={styles.trackCardStreams}>
                {(diamondTrack.streams / 1_000_000_000).toFixed(2)}B streams
              </Text>
              <Text style={styles.trackCardUnits}>
                {((diamondTrack.streams / 150) / 1_000_000).toFixed(1)}M units · RIAA Diamond
              </Text>
            </LinearGradient>
          </View>
        )}

        {/* Career Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statCardVal}>{totalStreamsB}B</Text>
            <Text style={styles.statCardLabel}>Total Streams</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statCardVal}>${totalMoneyK}K</Text>
            <Text style={styles.statCardLabel}>Money Left</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statCardVal}>{player.level}</Text>
            <Text style={styles.statCardLabel}>Level Reached</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statCardVal}>{totalShows}</Text>
            <Text style={styles.statCardLabel}>Days Grinding</Text>
          </View>
        </View>

        {/* Certifications */}
        {Object.keys(certCounts).length > 0 && (
          <View style={styles.certsSection}>
            <Text style={styles.certsTitle}>CERTIFICATIONS EARNED</Text>
            <View style={styles.certsRow}>
              {Object.entries(certCounts).map(([level, count]) => (
                <View key={level} style={styles.certChip}>
                  <Text style={styles.certChipEmoji}>{CERT_EMOJI[level] ?? '🎖️'}</Text>
                  <Text style={styles.certChipText}>{count}x {level.replace('_', ' ').toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Discography */}
        {player.discography.length > 0 && (
          <View style={styles.discoSection}>
            <Text style={styles.discoTitle}>DISCOGRAPHY ({player.discography.length} tracks)</Text>
            {player.discography.slice(0, 6).map((track) => (
              <View key={track.id} style={styles.discoRow}>
                <Text style={styles.discoTrack}>{track.title}</Text>
                <Text style={styles.discoStreams}>
                  {track.streams >= 1_000_000_000
                    ? `${(track.streams / 1_000_000_000).toFixed(1)}B`
                    : track.streams >= 1_000_000
                    ? `${(track.streams / 1_000_000).toFixed(1)}M`
                    : `${(track.streams / 1000).toFixed(0)}K`} {CERT_EMOJI[track.certification] ?? ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Regions unlocked */}
        <View style={styles.regionsSection}>
          <Text style={styles.regionsTitle}>REGIONS CONQUERED</Text>
          <Text style={styles.regionsText}>
            {game.unlockedRegions.map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(' · ')}
          </Text>
        </View>

        {/* Quote */}
        <Text style={styles.quote}>
          "They said you needed a co-sign.{'\n'}
          You needed a work ethic."
        </Text>

        {/* Play Again */}
        <TouchableOpacity
          style={styles.playAgainBtn}
          onPress={() => dispatch(startNewGame())}
          activeOpacity={0.85}
        >
          <LinearGradient colors={['#1DB954', '#17a349']} style={styles.playAgainInner}>
            <Text style={styles.playAgainText}>🔄 START OVER</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footer}>World Stage · Built by Fellito</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { alignItems: 'center', paddingTop: 60, paddingBottom: 60, paddingHorizontal: 24 },

  diamondContainer: { alignItems: 'center', marginBottom: 8 },
  diamondEmoji: { fontSize: 80 },
  diamondRing: { color: '#00D4FF', fontSize: 16, letterSpacing: 8, marginTop: 4 },

  title: {
    fontSize: 52, fontWeight: '900', color: '#00D4FF',
    letterSpacing: 12, textAlign: 'center',
  },
  titleSub: {
    fontSize: 18, fontWeight: '700', color: '#6694ff',
    letterSpacing: 8, textAlign: 'center', marginBottom: 20,
  },
  congrats: {
    fontSize: 15, color: '#ccc', textAlign: 'center',
    lineHeight: 22, marginBottom: 20,
  },

  badge: {
    borderWidth: 1.5, borderRadius: 20, paddingHorizontal: 20,
    paddingVertical: 8, marginBottom: 28,
  },
  badgeText: { fontSize: 12, fontWeight: '900', letterSpacing: 2 },

  trackCard: {
    width: '100%', borderRadius: 16, overflow: 'hidden',
    borderWidth: 1, borderColor: '#3a2080', marginBottom: 24,
  },
  trackCardInner: { padding: 20, alignItems: 'center' },
  trackCardLabel: { fontSize: 11, color: '#8888cc', letterSpacing: 2, marginBottom: 8 },
  trackCardTitle: { fontSize: 22, fontWeight: '900', color: '#fff', marginBottom: 6 },
  trackCardStreams: { fontSize: 28, fontWeight: '900', color: '#00D4FF', marginBottom: 4 },
  trackCardUnits: { fontSize: 13, color: '#888' },

  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
    justifyContent: 'center', marginBottom: 24, width: '100%',
  },
  statCard: {
    width: '46%', backgroundColor: '#111', borderRadius: 12,
    padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#1a1a2e',
  },
  statCardVal: { fontSize: 22, fontWeight: '900', color: '#1DB954' },
  statCardLabel: { fontSize: 11, color: '#666', marginTop: 4, letterSpacing: 1 },

  certsSection: { width: '100%', marginBottom: 24 },
  certsTitle: { fontSize: 11, color: '#666', letterSpacing: 2, marginBottom: 10, textAlign: 'center' },
  certsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  certChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#111', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: '#222',
  },
  certChipEmoji: { fontSize: 16 },
  certChipText: { fontSize: 12, color: '#ccc', fontWeight: '700' },

  discoSection: { width: '100%', marginBottom: 24, backgroundColor: '#0d0d1a', borderRadius: 12, padding: 16 },
  discoTitle: { fontSize: 11, color: '#666', letterSpacing: 2, marginBottom: 12 },
  discoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#111' },
  discoTrack: { color: '#ccc', fontSize: 13 },
  discoStreams: { color: '#888', fontSize: 13 },

  regionsSection: { width: '100%', marginBottom: 28, alignItems: 'center' },
  regionsTitle: { fontSize: 11, color: '#666', letterSpacing: 2, marginBottom: 8 },
  regionsText: { fontSize: 13, color: '#aaa', textAlign: 'center', lineHeight: 20 },

  quote: {
    fontSize: 14, color: '#555', fontStyle: 'italic',
    textAlign: 'center', lineHeight: 22, marginBottom: 36,
  },

  playAgainBtn: { width: '100%', borderRadius: 14, overflow: 'hidden', marginBottom: 24 },
  playAgainInner: { paddingVertical: 18, alignItems: 'center' },
  playAgainText: { fontSize: 15, fontWeight: '900', color: '#000', letterSpacing: 2 },

  footer: { fontSize: 11, color: '#333', letterSpacing: 1 },
});
