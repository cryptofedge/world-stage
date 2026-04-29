import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { releaseTrack, gainXP, updateReputation, gainMoney } from '../store/playerSlice';
import { advanceTime, triggerVictory } from '../store/gameSlice';
import { REGIONS } from '../data/regions';
import { MusicGenre, CERT_THRESHOLDS } from '../types';
import { calculateTrackQuality, projectInitialStreams, calculateRepGain, calculateTrackXP } from '../utils/gameEngine';

function getCertLevel(streams: number) {
  if (streams >= CERT_THRESHOLDS.diamond) return 'diamond' as const;
  if (streams >= CERT_THRESHOLDS.multi_platinum) return 'multi_platinum' as const;
  if (streams >= CERT_THRESHOLDS.platinum) return 'platinum' as const;
  if (streams >= CERT_THRESHOLDS.gold) return 'gold' as const;
  return 'none' as const;
}

const GENRE_EMOJIS: Partial<Record<MusicGenre, string>> = {
  'Afrobeats': '🥁', 'Amapiano': '🎹', 'K-Pop': '✨', 'Hip-Hop': '🎤',
  'R&B': '🎵', 'Grime': '⚡', 'Drill': '🔩', 'Electronic': '🎧',
  'Country': '🤠', 'Baile Funk': '🎶', 'Samba': '💃', 'Pop': '⭐',
  'Reggaeton': '🔥', 'J-Pop': '🌸',
};

export default function StudioScreen() {
  const dispatch = useDispatch();
  const player = useSelector((s: RootState) => s.player.data);
  const { currentRegionId, winConditionMet } = useSelector((s: RootState) => s.game);
  const region = REGIONS.find((r) => r.id === currentRegionId);

  const [trackTitle, setTrackTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<MusicGenre | null>(null);
  const [recording, setRecording] = useState(false);

  if (!player || !region) return null;

  const availableGenres = region.dominantGenres;

  async function handleRecord() {
    if (!trackTitle.trim()) { Alert.alert('Give your track a name.'); return; }
    if (!selectedGenre) { Alert.alert('Pick a genre.'); return; }
    if (!player) return;

    setRecording(true);
    // Simulate recording time
    await new Promise((r) => setTimeout(r, 1500));

    const quality = calculateTrackQuality(
      player.stats, selectedGenre, null, player.inventory.equipment
    );
    const streams = projectInitialStreams(quality, player.reputation[currentRegionId] ?? 0, player.stats.globalReach);
    const repGain = calculateRepGain({ id: '', title: trackTitle, genre: selectedGenre, regionId: currentRegionId, qualityScore: quality, streams, releaseDate: Date.now(), collaborators: [], reputationGained: {} }, player.stats.charisma);
    const xpGain = calculateTrackXP(quality, streams);
    const earnings = Math.floor(streams * 0.004);

    const trackId = Date.now().toString();
    const cert = getCertLevel(streams);

    dispatch(releaseTrack({
      id: trackId,
      title: trackTitle.trim(),
      genre: selectedGenre,
      regionId: currentRegionId,
      qualityScore: quality,
      streams,
      certification: cert,
      hasVideo: false,
      videoViews: 0,
      releaseDate: Date.now(),
      collaborators: [],
      reputationGained: { [currentRegionId]: repGain },
    }));
    dispatch(gainXP(xpGain));
    dispatch(updateReputation({ regionId: currentRegionId, amount: repGain }));
    dispatch(gainMoney(earnings));
    dispatch(advanceTime(3));

    // Artist path win condition: first Diamond track triggers victory
    if (cert === 'diamond' && !winConditionMet && player?.careerPath === 'artist') {
      dispatch(triggerVictory({ artistId: trackId }));
    }

    setRecording(false);
    setTrackTitle('');
    setSelectedGenre(null);

    const certMsg = cert !== 'none' ? `\n🎖️ Certified ${cert.replace('_', ' ').toUpperCase()}!` : '';
    Alert.alert(
      `"${trackTitle}" Released!`,
      `Quality: ${quality}/100\nStreams: ${streams.toLocaleString()}\nRep gained: +${repGain}\nXP: +${xpGain}\nEarnings: $${earnings.toLocaleString()}${certMsg}`,
      [{ text: 'LFG 🔥', style: 'default' }]
    );
  }

  return (
    <LinearGradient colors={['#0a0a1a', '#0d0d1f']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>STUDIO</Text>
        <Text style={styles.regionLabel}>📍 {region.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Talent', value: player.stats.talent, color: '#1DB954' },
            { label: 'Production', value: player.stats.production, color: '#6C63FF' },
            { label: 'Global Reach', value: player.stats.globalReach, color: '#00D4FF' },
          ].map((s) => (
            <View key={s.label} style={styles.statChip}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Track Title */}
        <Text style={styles.sectionLabel}>TRACK TITLE</Text>
        <TextInput
          style={styles.input}
          value={trackTitle}
          onChangeText={setTrackTitle}
          placeholder="Name your track..."
          placeholderTextColor="#333"
          maxLength={50}
        />

        {/* Genre Selection */}
        <Text style={styles.sectionLabel}>GENRE</Text>
        <View style={styles.genreGrid}>
          {availableGenres.map((genre) => (
            <TouchableOpacity
              key={genre}
              style={[
                styles.genreChip,
                selectedGenre === genre && { backgroundColor: region.primaryColor, borderColor: region.primaryColor },
              ]}
              onPress={() => setSelectedGenre(genre)}
              activeOpacity={0.8}
            >
              <Text style={styles.genreEmoji}>{GENRE_EMOJIS[genre] ?? '🎵'}</Text>
              <Text style={[styles.genreText, selectedGenre === genre && styles.genreTextSelected]}>
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Discography */}
        {player.discography.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>YOUR DISCOGRAPHY ({player.discography.length})</Text>
            {[...player.discography].reverse().slice(0, 5).map((track) => (
              <View key={track.id} style={styles.trackRow}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackGenre}>{track.genre}</Text>
                <Text style={styles.trackStreams}>{track.streams.toLocaleString()} streams</Text>
                <Text style={[styles.trackQuality, { color: track.qualityScore >= 70 ? '#1DB954' : track.qualityScore >= 40 ? '#F5A623' : '#ff4444' }]}>
                  {track.qualityScore}/100
                </Text>
              </View>
            ))}
          </>
        )}

        <TouchableOpacity
          style={[styles.recordButton, recording && styles.recordButtonDisabled]}
          onPress={handleRecord}
          disabled={recording}
          activeOpacity={0.8}
        >
          <Text style={styles.recordButtonText}>
            {recording ? 'RECORDING...' : '🎤 RECORD & RELEASE'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
  },
  title: { fontSize: 22, fontWeight: '900', color: '#fff', letterSpacing: 3 },
  regionLabel: { fontSize: 13, color: '#1DB954' },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statChip: { flex: 1, backgroundColor: '#111', borderRadius: 8, padding: 12, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '900' },
  statLabel: { fontSize: 9, color: '#555', letterSpacing: 1, marginTop: 2 },
  sectionLabel: { fontSize: 10, color: '#555', letterSpacing: 2, marginBottom: 8, marginTop: 16 },
  input: {
    backgroundColor: '#111', borderWidth: 1, borderColor: '#1a1a1a',
    borderRadius: 8, padding: 14, color: '#fff', fontSize: 16,
  },
  genreGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  genreChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#111', borderWidth: 1, borderColor: '#222',
    borderRadius: 20, paddingVertical: 8, paddingHor