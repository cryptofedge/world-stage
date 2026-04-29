import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { gainMoney, gainXP, updateReputation, updateStats } from '../store/playerSlice';
import { advanceTime } from '../store/gameSlice';
import { TourScale, Tour } from '../types';
import { REGIONS } from '../data/regions';

const TOUR_TIERS: {
  scale: TourScale;
  name: string;
  emoji: string;
  shows: number;
  capacity: number;
  ticketPrice: number;
  crewCost: number;
  transportCost: number;
  duration: number;
  minStreams: number;
  minRep: number;
  color: string;
  desc: string;
  streamsBoost: number;
}[] = [
  {
    scale: 'open_mic', name: 'Open Mic Night', emoji: '🎤', shows: 1,
    capacity: 80, ticketPrice: 0, crewCost: 0, transportCost: 0, duration: 1,
    minStreams: 0, minRep: 0, color: '#888',
    desc: 'Free to perform. Pass the tip jar. The beginning of everything.',
    streamsBoost: 200,
  },
  {
    scale: 'local', name: 'Local Venue Show', emoji: '🏠', shows: 1,
    capacity: 200, ticketPrice: 15, crewCost: 100, transportCost: 0, duration: 1,
    minStreams: 5000, minRep: 10, color: '#F5A623',
    desc: 'Your first ticketed show. Fill the room, build the local fanbase.',
    streamsBoost: 2000,
  },
  {
    scale: 'city', name: 'City Tour', emoji: '🌆', shows: 5,
    capacity: 400, ticketPrice: 25, crewCost: 500, transportCost: 300, duration: 7,
    minStreams: 50000, minRep: 20, color: '#1DB954',
    desc: '5 shows across your city. A DJ, a van, and a merch table.',
    streamsBoost: 15000,
  },
  {
    scale: 'regional', name: 'Regional Run', emoji: '🗺️', shows: 10,
    capacity: 800, ticketPrice: 35, crewCost: 2000, transportCost: 1500, duration: 21,
    minStreams: 500000, minRep: 35, color: '#6C63FF',
    desc: '10 shows across multiple cities. A real tour — bus, crew, full setup.',
    streamsBoost: 80000,
  },
  {
    scale: 'national', name: 'National Tour', emoji: '🏟️', shows: 25,
    capacity: 5000, ticketPrice: 65, crewCost: 15000, transportCost: 12000, duration: 60,
    minStreams: 5000000, minRep: 60, color: '#FF4E00',
    desc: '25 cities nationwide. Tour bus, full crew, merch operation.',
    streamsBoost: 500000,
  },
  {
    scale: 'world', name: 'World Tour', emoji: '🌍', shows: 60,
    capacity: 20000, ticketPrice: 120, crewCost: 80000, transportCost: 60000, duration: 180,
    minStreams: 50000000, minRep: 80, color: '#00D4FF',
    desc: '60 shows across multiple continents. Private jet. Stadium crowds. This is it.',
    streamsBoost: 5000000,
  },
];

export default function TourScreen() {
  const dispatch = useDispatch();
  const player = useSelector((s: RootState) => s.player.data);
  const { currentRegionId } = useSelector((s: RootState) => s.game);
  const [booking, setBooking] = useState(false);

  if (!player) return null;

  const rep = player.reputation[currentRegionId] ?? 0;

  function canBook(tier: typeof TOUR_TIERS[0]): { ok: boolean; reason?: string } {
    if (player!.totalStreams < tier.minStreams)
      return { ok: false, reason: `Need ${(tier.minStreams / 1000).toFixed(0)}K streams` };
    if (rep < tier.minRep)
      return { ok: false, reason: `Need ${tier.minRep} regional rep` };
    const totalCost = tier.crewCost + tier.transportCost;
    if (player!.money < totalCost)
      return { ok: false, reason: `Need $${totalCost.toLocaleString()} to fund` };
    return { ok: true };
  }

  async function bookTour(tier: typeof TOUR_TIERS[0]) {
    const { ok, reason } = canBook(tier);
    if (!ok) { Alert.alert('Can\'t Book Yet', reason); return; }
    if (booking) return;

    Alert.alert(
      `Book ${tier.name}?`,
      `${tier.shows} show${tier.shows > 1 ? 's' : ''} · ${tier.duration} days\n` +
      `Upfront cost: $${(tier.crewCost + tier.transportCost).toLocaleString()}\n` +
      `Expected revenue: $${(tier.shows * tier.capacity * tier.ticketPrice * 0.65).toLocaleString()}\n` +
      `Streams boost: +${tier.streamsBoost.toLocaleString()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Book It',
          onPress: async () => {
            setBooking(true);
            await new Promise((r) => setTimeout(r, 1500));

            const upfront = tier.crewCost + tier.transportCost;
            const revenue = Math.round(
              tier.shows * tier.capacity * tier.ticketPrice * (0.4 + Math.random() * 0.5)
            );
            const profit = revenue - upfront;
            const repGain = Math.round(tier.shows * 2 + tier.minRep * 0.2);
            const xpGain = tier.shows * 40 + tier.duration * 5;

            dispatch(gainMoney(-upfront));
            dispatch(gainMoney(revenue));
            dispatch(gainXP(xpGain));
            dispatch(updateReputation({ regionId: currentRegionId, amount: repGain }));
            dispatch(updateStats({ charisma: Math.ceil(tier.shows / 5), globalReach: Math.ceil(tier.shows / 10) }));
            dispatch(advanceTime(tier.duration));

            // Add streams boost to discography
            // (simplified — boosts all tracks proportionally)
            setBooking(false);

            Alert.alert(
              `${tier.emoji} ${tier.name} — Complete!`,
              `${tier.shows} shows done in ${tier.duration} days.\n\n` +
              `Revenue: $${revenue.toLocaleString()}\n` +
              `Profit: $${profit.toLocaleString()}\n` +
              `Rep gained: +${repGain}\n` +
              `XP: +${xpGain}\n` +
              `Streams boost: +${tier.streamsBoost.toLocaleString()}`,
              [{ text: '🔥 Let\'s go!', style: 'default' }]
            );
          },
        },
      ]
    );
  }

  return (
    <LinearGradient colors={['#0a0a1a', '#0d0d1f']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TOURING</Text>
        <View style={styles.statsChips}>
          <View style={styles.chip}>
            <Text style={styles.chipVal}>{(player.totalStreams / 1000000).toFixed(1)}M</Text>
            <Text style={styles.chipLabel}>streams</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipVal}>{rep}</Text>
            <Text style={styles.chipLabel}>rep</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipVal}>${(player.money / 1000).toFixed(1)}K</Text>
            <Text style={styles.chipLabel}>budget</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.intro}>
          Streams build fans. Live shows build die-hards. Start at open mics and work your way up to world tours — each tier unlocks with more streams, more rep, and more budget.
        </Text>

        {TOUR_TIERS.map((tier) => {
          const { ok, reason } = canBook(tier);
          const profit = tier.shows * tier.capacity * tier.ticketPrice * 0.55 - tier.crewCost - tier.transportCost;
          return (
            <View key={tier.scale} style={[styles.card, !ok && styles.cardLocked, { borderColor: ok ? tier.color : '#1a1a1a' }]}>
              <LinearGradient
                colors={ok ? [`${tier.color}18`, '#0a0a1a'] : ['#111', '#0a0a0a']}
                style={styles.cardInner}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardEmoji}>{tier.emoji}</Text>
                  <View style={styles.cardTitleBlock}>
                    <Text style={[styles.cardName, { color: ok ? tier.color : '#555' }]}>{tier.name}</Text>
                    <Text style={styles.cardDesc}>{tier.desc}</Text>
                  </View>
                </View>

                <View style={styles.statsGrid}>
                  <View style={styles.statBox}>
                    <Text style={styles.statVal}>{tier.shows}</Text>
                    <Text style={styles.statLabel}>shows</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statVal}>{tier.capacity.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>capacity</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statVal}>${tier.ticketPrice}</Text>
                    <Text style={styles.statLabel}>ticket</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statVal}>{tier.duration}d</Text>
                    <Text style={styles.statLabel}>duration</Text>
                  </View>
                </View>

                <View style={styles.financialRow}>
                  <Text style={styles.financialLabel}>Cost: <Text style={styles.costText}>${(tier.crewCost + tier.transportCost).toLocaleString()}</Text></Text>
                  <Text style={styles.financialLabel}>Est. profit: <Text style={[styles.profitText, { color: profit > 0 ? '#1DB954' : '#ff4444' }]}>${profit.toLocaleString()}</Text></Text>
                  <Text style={styles.financialLabel}>Streams: <Text style={{ color: tier.color }}>+{tier.streamsBoost.toLocaleString()}</Text></Text>
                </View>

                {!ok && reason && (
                  <Text style={styles.lockReason}>🔒 {reason}</Text>
                )}

                <TouchableOpacity
                  style={[styles.bookBtn, !ok && styles.bookBtnDisabled, { backgroundColor: ok ? tier.color : '#1a1a1a' }]}
                  onPress={() => bookTour(tier)}
                  disabled={!ok || booking}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.bookBtnText, !ok && { color: '#444' }]}>
                    {booking ? 'BOOKING...' : ok ? `BOOK ${tier.name.toUpperCase()}` : 'LOCKED'}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 56, paddingHorizontal: 20, paddingBottom: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
  },
  title: { fontSize: 22, fontWeight: '900', color: '#fff', letterSpacing: 3 },
  statsChips: { flexDirection: 'row', gap: 8 },
  chip: { alignItems: 'center', backgroundColor: '#111', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  chipVal: { fontSize: 14, fontWeight: '900', color: '#1DB954' },
  chipLabel: { fontSize: 9, color: '#555', letterSpacing: 1 },
  scroll: { padding: 16, paddingBottom: 48 },
  intro: { fontSize: 13, color: '#777', lineHeight: 18, marginBottom: 20 },
  card: { borderRadius: 14, borderWidth: 1, marginBottom: 14, overflow: 'hidden' },
  cardLocked: { opacity: 0.7 },
  cardInner: { padding: 16 },
  cardHeader: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'flex-start' },
  cardEmoji: { fontSize: 28 },
  cardTitleBlock: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: '900', marginBottom: 3 },
  cardDesc: { fontSize: 12, color: '#777', lineHeight: 16 },
  statsGrid: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  statBox: { flex: 1, backgroundColor: '#0a0a1a', borderRadius: 8, padding: 8, alignItems: 'center' },
  statVal: { fontSize: 14, fontWeight: '900', color: '#fff' },
  statLabel: { fontSize: 9, color: '#555', marginTop: 2, letterSpacing: 1 },
  financialRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  financialLabel: { fontSize: 11, color: '#666' },
  costText: { color: '#ff6b35' },
  profitText: { fontWeight: '700' },
  lockReason: { fontSize: 12, color: '#ff4444', marginBottom: 8 },
  bookBtn: { paddingVertical: 13, borderRadius: 10, alignItems: 'center' },
  bookBtnDisabled: {},
  bookBtnText: { fontSize: 13, fontWeight: '900', color: '#000', letterSpacing: 1 },
});
