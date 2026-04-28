import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { travelToRegion as travelGame } from '../store/gameSlice';
import { travelToRegion as travelPlayer } from '../store/playerSlice';
import { REGIONS } from '../data/regions';

const { width } = Dimensions.get('window');

const CONTINENT_FLAGS: Record<string, string> = {
  Africa: '🌍',
  Asia: '🌏',
  Europe: '🌍',
  'North America': '🌎',
  'South America': '🌎',
  Oceania: '🌏',
};

export default function WorldMapScreen() {
  const dispatch = useDispatch();
  const { unlockedRegions, currentRegionId } = useSelector((s: RootState) => s.game);
  const player = useSelector((s: RootState) => s.player.data);

  function handleTravel(regionId: string) {
    if (regionId === currentRegionId) return;
    dispatch(travelGame(regionId));
    dispatch(travelPlayer(regionId));
  }

  const continents = [...new Set(REGIONS.map((r) => r.continent))];

  return (
    <LinearGradient colors={['#0a0a1a', '#0d0d1f']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WORLD MAP</Text>
        {player && (
          <Text style={styles.location}>
            📍 {REGIONS.find((r) => r.id === currentRegionId)?.name ?? '—'}
          </Text>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {continents.map((continent) => {
          const regions = REGIONS.filter((r) => r.continent === continent);
          return (
            <View key={continent} style={styles.continentSection}>
              <Text style={styles.continentTitle}>
                {CONTINENT_FLAGS[continent]} {continent.toUpperCase()}
              </Text>
              <View style={styles.regionGrid}>
                {regions.map((region) => {
                  const unlocked = unlockedRegions.includes(region.id);
                  const isCurrent = region.id === currentRegionId;
                  const rep = player?.reputation[region.id] ?? 0;

                  return (
                    <TouchableOpacity
                      key={region.id}
                      style={[
                        styles.regionCard,
                        { borderColor: region.primaryColor },
                        !unlocked && styles.lockedCard,
                        isCurrent && styles.currentCard,
                      ]}
                      onPress={() => unlocked && handleTravel(region.id)}
                      activeOpacity={unlocked ? 0.8 : 1}
                    >
                      <LinearGradient
                        colors={
                          unlocked
                            ? [`${region.primaryColor}22`, '#0a0a1a']
                            : ['#111', '#0a0a0a']
                        }
                        style={styles.cardGradient}
                      >
                        {isCurrent && (
                          <View style={[styles.currentBadge, { backgroundColor: region.primaryColor }]}>
                            <Text style={styles.currentBadgeText}>HERE</Text>
                          </View>
                        )}
                        <Text style={[styles.regionName, !unlocked && styles.lockedText]}>
                          {unlocked ? region.name : '???'}
                        </Text>
                        <Text style={[styles.regionCountry, !unlocked && styles.lockedText]}>
                          {unlocked ? region.country : 'Locked'}
                        </Text>

                        {unlocked && (
                          <>
                            <View style={styles.repRow}>
                              <Text style={styles.repLabel}>REP</Text>
                              <View style={styles.repBar}>
                                <View
                                  style={[
                                    styles.repFill,
                                    { width: `${rep}%`, backgroundColor: region.primaryColor },
                                  ]}
                                />
                              </View>
                              <Text style={[styles.repValue, { color: region.primaryColor }]}>
                                {rep}
                              </Text>
                            </View>
                            <Text style={styles.vibe}>{region.vibe}</Text>
                          </>
                        )}

                        {!unlocked && region.unlockRequirement.minLevel && (
                          <Text style={styles.lockHint}>
                            🔒 Level {region.unlockRequirement.minLevel}
                          </Text>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}

const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
  },
  title: { fontSize: 22, fontWeight: '900', color: '#fff', letterSpacing: 3 },
  location: { fontSize: 13, color: '#1DB954' },
  scroll: { paddingHorizontal: 16, paddingBottom: 32 },
  continentSection: { marginBottom: 24 },
  continentTitle: { fontSize: 11, color: '#555', letterSpacing: 2, marginBottom: 10 },
  regionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  regionCard: {
    width: cardWidth, borderRadius: 12, borderWidth: 1,
    overflow: 'hidden',
  },
  lockedCard: { borderColor: '#222', opacity: 0.6 },
  currentCard: { borderWidth: 2 },
  cardGradient: { padding: 14, minHeight: 120 },
  currentBadge: {
    position: 'absolute', top: 8, right: 8,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4,
  },
  currentBadgeText: { fontSize: 8, fontWeight: '900', color: '#000', letterSpacing: 1 },
  regionName: { fontSize: 16, fontWeight: '800', color: '#fff', marginBottom: 2 },
  regionCountry: { fontSize: 11, color: '#888', marginBottom: 10 },
  lockedText: { color: '#444' },
  repRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  repLabel: { fontSize: 9, color: '#666', letterSpacing: 1, width: 28 },
  repBar: { flex: 1, height: 4, backgroundColor: '#222', borderRadius: 2, marginHorizontal: 6 },
  repFill: { height: '100%', borderRadius: 2 },
  repValue: { fontSize: 10, fontWeight: '700', width: 20, textAlign: 'right' },
  vibe: { fontSize: 10, color: '#555', fontStyle: 'italic' },
  lockHint: { fontSize: 11, color: '#444', marginTop: 4 },
});
