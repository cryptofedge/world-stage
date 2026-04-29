import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { RootState } from '../store';
import { updateNpcAffinity, gainMoney, gainXP, updateReputation, updateStats } from '../store/playerSlice';
import { advanceTime } from '../store/gameSlice';
import { REGIONS } from '../data/regions';
import { NPCS } from '../data/npcs';
import { NPC, DialogueResponse, Venue } from '../types';
import { RootStackParamList } from '../navigation';
import { simulatePerformance } from '../utils/gameEngine';

type Props = StackScreenProps<RootStackParamList, 'Region'>;

export default function RegionScreen({ route, navigation }: Props) {
  const dispatch = useDispatch();
  const { regionId } = route.params;
  const player = useSelector((s: RootState) => s.player.data);
  const region = REGIONS.find((r) => r.id === regionId);
  const regionNpcs = NPCS.filter((n) => n.regionId === regionId);

  const [activeNpc, setActiveNpc] = useState<NPC | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [performing, setPerforming] = useState(false);

  if (!region || !player) return null;

  const relationships = player.relationships;
  const getAffinity = (npcId: string) =>
    relationships.find((r) => r.npcId === npcId)?.affinity ?? 0;

  function openDialogue(npc: NPC) {
    setActiveNpc(npc);
    setDialogueIndex(0);
  }

  function confirmPerform(venue: Venue) {
    if (!player) return;
    if (player.money < venue.performanceCost) {
      Alert.alert('Not Enough Cash', `You need $${venue.performanceCost.toLocaleString()} to book this venue.`);
      return;
    }
    Alert.alert(
      `Perform at ${venue.name}?`,
      `Entry cost: $${venue.performanceCost.toLocaleString()}\nCapacity: ${venue.capacity.toLocaleString()}\nPrestige: ${'⭐'.repeat(venue.prestige)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Perform',
          onPress: async () => {
            setPerforming(true);
            await new Promise((r) => setTimeout(r, 1000));
            const result = simulatePerformance(player.stats, venue.prestige, player.reputation[regionId] ?? 0);
            dispatch(gainMoney(-venue.performanceCost));
            dispatch(gainMoney(result.moneyEarned));
            dispatch(gainXP(result.xpEarned));
            dispatch(updateReputation({ regionId, amount: result.repGained }));
            dispatch(updateStats({ charisma: result.success ? 1 : 0 }));
            dispatch(advanceTime(1));
            setPerforming(false);

            const emoji = result.audienceReaction >= 80 ? '🔥' : result.audienceReaction >= 60 ? '👏' : result.audienceReaction >= 40 ? '😐' : '😬';
            Alert.alert(
              `${emoji} Performance ${result.success ? 'Successful!' : 'Rough Night'}`,
              `Audience reaction: ${result.audienceReaction}/100\n` +
              `Revenue: $${result.moneyEarned.toLocaleString()}\n` +
              `Rep gained: +${result.repGained}\n` +
              `XP: +${result.xpEarned}`,
              [{ text: 'Done', style: 'default' }]
            );
          },
        },
      ]
    );
  }

  function handleResponse(response: DialogueResponse) {
    if (!activeNpc) return;
    const { effect } = response;
    if (effect.affinityChange) {
      dispatch(updateNpcAffinity({ npcId: activeNpc.id, change: effect.affinityChange }));
    }
    Alert.alert(
      activeNpc.name,
      `"${response.text}"`,
      [{ text: 'Continue', onPress: () => setActiveNpc(null) }]
    );
  }

  const currentDialogue = activeNpc?.dialogues[dialogueIndex] ?? null;

  return (
    <LinearGradient colors={[`${region.primaryColor}22`, '#0a0a1a', '#0a0a1a']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.regionName}>{region.name}</Text>
          <Text style={styles.regionCountry}>{region.country} · {region.continent}</Text>
        </View>
        <View style={[styles.repBadge, { backgroundColor: region.primaryColor + '33', borderColor: region.primaryColor }]}>
          <Text style={[styles.repBadgeText, { color: region.primaryColor }]}>
            REP {player.reputation[regionId] ?? 0}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Vibe */}
        <Text style={styles.vibe}>"{region.vibe}"</Text>
        <Text style={styles.description}>{region.description}</Text>

        {/* Genres */}
        <Text style={styles.sectionLabel}>DOMINANT GENRES</Text>
        <View style={styles.genreRow}>
          {region.dominantGenres.map((g) => (
            <View key={g} style={[styles.genreTag, { borderColor: region.primaryColor }]}>
              <Text style={[styles.genreTagText, { color: region.primaryColor }]}>{g}</Text>
            </View>
          ))}
        </View>

        {/* Venues */}
        <Text style={styles.sectionLabel}>VENUES</Text>
        {region.venues.map((venue) => {
          const rep = player.reputation[regionId] ?? 0;
          const canPerform = rep >= venue.minReputation;
          return (
            <View key={venue.id} style={styles.venueCard}>
              <View style={styles.venueInfo}>
                <Text style={styles.venueName}>{venue.name}</Text>
                <Text style={styles.venueDetails}>
                  Cap: {venue.capacity.toLocaleString()} · {'⭐'.repeat(venue.prestige)} · ${venue.performanceCost.toLocaleString()} entry
                </Text>
                {!canPerform && (
                  <Text style={styles.venuelock}>🔒 Requires {venue.minReputation} rep</Text>
                )}
              </View>
              <TouchableOpacity
                style={[styles.performBtn, !canPerform && styles.performBtnDisabled, { backgroundColor: canPerform ? region.primaryColor : '#222' }]}
                disabled={!canPerform || performing}
                onPress={() => confirmPerform(venue)}
              >
                <Text style={[styles.performBtnText, !canPerform && { color: '#444' }]}>
                  {performing ? '...' : 'PERFORM'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Events */}
        {region.events.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>EVENTS</Text>
            {region.events.map((event) => (
              <View key={event.id} style={[styles.eventCard, { borderLeftColor: region.primaryColor }]}>
                <Text style={styles.eventType}>{event.type.toUpperCase()}</Text>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDesc}>{event.description}</Text>
                <Text style={[styles.eventRep, { color: region.primaryColor }]}>
                  +{event.reputationBoost} REP on success
                </Text>
              </View>
            ))}
          </>
        )}

        {/* NPCs */}
        <Text style={styles.sectionLabel}>PEOPLE ({regionNpcs.length})</Text>
        {regionNpcs.map((npc) => {
          const affinity = getAffinity(npc.id);
          return (
            <TouchableOpacity
              key={npc.id}
              style={styles.npcCard}
              onPress={() => openDialogue(npc)}
              activeOpacity={0.8}
            >
              <View style={[styles.npcAvatar, { backgroundColor: region.primaryColor + '44' }]}>
                <Text style={styles.npcAvatarText}>{npc.name.charAt(0)}</Text>
              </View>
              <View style={styles.npcInfo}>
                <Text style={styles.npcName}>{npc.name}</Text>
                <Text style={styles.npcRole}>{npc.role}</Text>
                <Text style={styles.npcDesc} numberOfLines={2}>{npc.description}</Text>
              </View>
              <View style={styles.npcAffinity}>
                <Text style={[styles.npcAffinityNum, { color: affinity >= 0 ? '#1DB954' : '#ff4444' }]}>
                  {affinity >= 0 ? '+' : ''}{affinity}
                </Text>
                <Text style={styles.npcAffinityLabel}>affinity</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Dialogue Modal */}
        {activeNpc && currentDialogue && (
          <View style={styles.dialogueOverlay}>
            <LinearGradient colors={['#111', '#0a0a1a']} style={styles.dialogueBox}>
              <Text style={styles.dialogueName}>{activeNpc.name}</Text>
              <Text style={styles.dialogueRole}>{activeNpc.role}</Text>
              <Text style={styles.dialogueText}>"{currentDialogue.text}"</Text>

              {currentDialogue.responses ? (
                currentDialogue.responses.map((resp, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.responseBtn, { borderColor: region.primaryColor }]}
                    onPress={() => handleResponse(resp)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.responseBtnText, { color: region.primaryColor }]}>{resp.text}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <TouchableOpacity
                  style={[styles.responseBtn, { borderColor: region.primaryColor }]}
                  onPress={() => setActiveNpc(null)}
                >
                  <Text style={[styles.responseBtnText, { color: region.primaryColor }]}>Got it.</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.closeDialogue} onPress={() => setActiveNpc(null)}>
                <Text style={styles.closeDialogueText}>✕</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn: { paddingRight: 12 },
  backText: { color: '#aaa', fontSize: 14 },
  regionName: { fontSize: 20, fontWeight: '900', color: '#fff' },
  regionCountry: { fontSize: 11, color: '#666' },
  repBadge: {
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 12, borderWidth: 1,
  },
  repBadgeText: { fontSize: 11, fontWeight: '700' },
  scroll: { padding: 20, paddingBottom: 60 },
  vibe: { fontSize: 14, color: '#888', fontStyle: 'italic', marginBottom: 8 },
  description: { fontSize: 14, color: '#aaa', lineHeight: 20, marginBottom: 20 },
  sectionLabel: { fontSize: 10, color: '#444', letterSpacing: 2, marginBottom: 10, marginTop: 8 },
  genreRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  genreTag: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4 },
  genreTagText: { fontSize: 12, fontWeight: '600' },
  venueCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#111', borderRadius: 10,
    padding: 14, marginBottom: 8,
  },
  venueInfo: { flex: 1 },
  venueName: { fontSize: 14, fontWeight: '700', color: '#fff', marginBottom: 3 },
  venueDetails: { fontSize: 11, color: '#666' },
  venuelock: { fontSize: 11, color: '#ff4444', marginTop: 3 },
  performBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  performBtnDisabled: {},
  performBtnText: { fontSize: 11, fontWeight: '800', color: '#000' },
  eventCard: {
    backgroundColor: '#111', borderRadius: 10,
    padding: 14, marginBottom: