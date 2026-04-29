import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  gainMoney, gainXP, updateStats, updateNpcAffinity,
} from '../store/playerSlice';
import { advanceTime, triggerVictory } from '../store/gameSlice';
import {
  signArtistToLabel, addStreamsToRosterArtist, RosterArtist, getCertForStreams,
} from '../store/labelSlice';

// ─── Unsigned talent pool ────────────────────────────────────────────────────

interface ProspectArtist {
  id: string;
  name: string;
  genre: string;
  region: string;
  potential: number;   // 1-10
  askingAdvance: number;
  weeklyRoyalty: number; // % label takes
  emoji: string;
  bio: string;
  currentStreams: number;
}

const TALENT_POOL: ProspectArtist[] = [
  {
    id: 'pa1', name: 'Kofi Amankwah', genre: 'Afrobeats', region: 'Lagos',
    potential: 9, askingAdvance: 2000, weeklyRoyalty: 20,
    emoji: '🎤', currentStreams: 180_000,
    bio: 'Lagos street kid. Melodies that hit different. 180K streams on a self-released song.',
  },
  {
    id: 'pa2', name: 'Zara Diallo', genre: 'Afropop / R&B', region: 'Accra',
    potential: 8, askingAdvance: 3000, weeklyRoyalty: 25,
    emoji: '🎵', currentStreams: 95_000,
    bio: "Accra-based singer with a voice that stops rooms. Waiting for the right deal.",
  },
  {
    id: 'pa3', name: 'Tunde Okafor', genre: 'Drill / Trap', region: 'Lagos',
    potential: 7, askingAdvance: 1000, weeklyRoyalty: 15,
    emoji: '🔥', currentStreams: 320_000,
    bio: 'Drill rapper with a street following. Hustle is real, just needs structure.',
  },
  {
    id: 'pa4', name: 'Amara Keita', genre: 'Dancehall', region: 'Dakar',
    potential: 10, askingAdvance: 8000, weeklyRoyalty: 30,
    emoji: '👑', currentStreams: 2_400_000,
    bio: 'Already viral in Francophone Africa. This could be global. Price reflects that.',
  },
  {
    id: 'pa5', name: 'Jide Mensah', genre: 'Gospel-Afro Fusion', region: 'Lagos',
    potential: 6, askingAdvance: 500, weeklyRoyalty: 12,
    emoji: '🙏', currentStreams: 45_000,
    bio: 'Underground talent. Humble price. Could blow up with the right push.',
  },
  {
    id: 'pa6', name: 'Nia Osei', genre: 'Afro-Electronic', region: 'London',
    potential: 9, askingAdvance: 12000, weeklyRoyalty: 35,
    emoji: '💫', currentStreams: 850_000,
    bio: 'Diaspora artist. Already in playlists. Wants a serious label to take her global.',
  },
];

// ─── Development actions for signed artists ──────────────────────────────────

interface DevAction {
  id: string;
  label: string;
  emoji: string;
  cost: number;
  streamsGain: number;
  xpGain: number;
  repGain: number;
  duration: number; // days
  desc: string;
}

const DEV_ACTIONS: DevAction[] = [
  {
    id: 'image_consult', label: 'Image Consultation', emoji: '🪞',
    cost: 500, streamsGain: 50_000, xpGain: 100, repGain: 3, duration: 7,
    desc: 'Hire a stylist and photographer. First impression is everything.',
  },
  {
    id: 'studio_session', label: 'Studio Session', emoji: '🎙️',
    cost: 1200, streamsGain: 200_000, xpGain: 200, repGain: 5, duration: 14,
    desc: 'Book a top producer. 2 weeks, 3 records.',
  },
  {
    id: 'music_video', label: 'Music Video', emoji: '🎬',
    cost: 3000, streamsGain: 800_000, xpGain: 350, repGain: 10, duration: 21,
    desc: 'A visual drops streaming numbers. Budget shoot, viral potential.',
  },
  {
    id: 'playlist_pitch', label: 'Playlist Pitch Campaign', emoji: '📋',
    cost: 2000, streamsGain: 1_500_000, xpGain: 250, repGain: 8, duration: 30,
    desc: 'Pitch to Afrobeats DSP playlists. Editorial placement = real numbers.',
  },
  {
    id: 'pr_campaign', label: 'PR & Press Campaign', emoji: '📰',
    cost: 4000, streamsGain: 3_000_000, xpGain: 400, repGain: 15, duration: 45,
    desc: 'BET Africa, OkayAfrica, Audiomack features. Build the narrative.',
  },
  {
    id: 'tour_support', label: 'Book a Regional Tour', emoji: '🚌',
    cost: 8000, streamsGain: 10_000_000, xpGain: 700, repGain: 25, duration: 60,
    desc: 'Put the artist on the road. Nothing builds a fanbase like live shows.',
  },
  {
    id: 'global_push', label: 'Global Distribution Push', emoji: '🌍',
    cost: 20000, streamsGain: 80_000_000, xpGain: 1500, repGain: 40, duration: 90,
    desc: 'Full global rollout. Pitches to Spotify Global, Apple Music editorial.',
  },
  {
    id: 'collab', label: 'Arrange a Major Collab', emoji: '🤝',
    cost: 15000, streamsGain: 150_000_000, xpGain: 1200, repGain: 35, duration: 60,
    desc: 'Feature with a certified artist. One hook can change everything.',
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const CERT_COLOR: Record<string, string> = {
  none: '#555', gold: '#F5A623', platinum: '#aaa',
  multi_platinum: '#d0e8ff', diamond: '#00D4FF',
};

const CERT_LABEL: Record<string, string> = {
  none: 'Unsigned Potential', gold: '🥇 Gold',
  platinum: '🪙 Platinum', multi_platinum: '💿 Multi-Platinum', diamond: '💎 Diamond',
};

// ─── Main Component ───────────────────────────────────────────────────────────

type Tab = 'roster' | 'scout' | 'develop';

export default function LabelDashboardScreen() {
  const dispatch = useDispatch();
  const player = useSelector((s: RootState) => s.player.data);
  const game = useSelector((s: RootState) => s.game);
  // ✅ Roster now lives in Redux (persists across tab switches)
  const roster = useSelector((s: RootState) => s.label.roster);

  const [tab, setTab] = useState<Tab>('roster');
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  if (!player) return null;

  const selectedArtist = roster.find((a) => a.id === selectedArtistId) ?? null;

  // Check for diamond victory
  const hasDiamond = roster.some((a) => a.certification === 'diamond');

  function signArtist(prospect: ProspectArtist) {
    if (player!.money < prospect.askingAdvance) {
      Alert.alert('Not Enough Cash', `You need $${prospect.askingAdvance.toLocaleString()} to sign ${prospect.name}.`);
      return;
    }
    if (roster.find((a) => a.id === prospect.id)) {
      Alert.alert('Already Signed', `${prospect.name} is already on your roster.`);
      return;
    }

    Alert.alert(
      `Sign ${prospect.name}?`,
      `Advance: $${prospect.askingAdvance.toLocaleString()}\nLabel royalty: ${prospect.weeklyRoyalty}%\nPotential: ${prospect.potential}/10\n\nThis artist will be on your roster.`,
      [
        { text: 'Pass', style: 'cancel' },
        {
          text: 'Sign It',
          onPress: () => {
            dispatch(gainMoney(-prospect.askingAdvance));
            dispatch(gainXP(150));
            // ✅ Dispatch to Redux — roster survives tab navigation
            const newArtist: RosterArtist = {
              id: prospect.id,
              name: prospect.name,
              genre: prospect.genre,
              region: prospect.region,
              potential: prospect.potential,
              emoji: prospect.emoji,
              streams: prospect.currentStreams,
              advancePaid: prospect.askingAdvance,
              royaltyRate: prospect.weeklyRoyalty,
              signedAt: Date.now(),
              certification: getCertForStreams(prospect.currentStreams),
            };
            dispatch(signArtistToLabel(newArtist));
            dispatch(updateNpcAffinity({ npcId: prospect.id, change: 30 }));
            setTab('roster');
            Alert.alert('✅ Signed!', `${prospect.name} is now on your label.`);
          },
        },
      ]
    );
  }

  async function runDevAction(action: DevAction) {
    if (!selectedArtist) return;
    if (player!.money < action.cost) {
      Alert.alert('Not Enough Cash', `This costs $${action.cost.toLocaleString()}.`);
      return;
    }
    if (working) return;

    Alert.alert(
      `${action.emoji} ${action.label}`,
      `Cost: $${action.cost.toLocaleString()}\nExpected streams: +${action.streamsGain.toLocaleString()}\nDuration: ${action.duration} days\n\n${action.desc}`,
      [
        { text: 'Not now', style: 'cancel' },
        {
          text: 'Go',
          onPress: async () => {
            setWorking(true);
            await new Promise((r) => setTimeout(r, 1200));

            const variance = 0.6 + Math.random() * 0.8 + (selectedArtist.potential / 10) * 0.4;
            const earned = Math.round(action.streamsGain * variance);
            const royaltyRevenue = Math.round(earned * (selectedArtist.royaltyRate / 100) * 0.004);

            dispatch(gainMoney(-action.cost));
            dispatch(gainMoney(royaltyRevenue));
            dispatch(gainXP(action.xpGain));
            dispatch(updateStats({ business: 1, globalReach: Math.ceil(earned / 5_000_000) }));
            dispatch(advanceTime(action.duration));

            // ✅ Update artist streams in Redux
            const prevCert = selectedArtist.certification;
            dispatch(addStreamsToRosterArtist({
              artistId: selectedArtist.id,
              streams: earned,
              royaltyRevenue,
            }));

            // Check diamond win condition AFTER dispatch (check new cert)
            const newStreams = selectedArtist.streams + earned;
            const newCert = getCertForStreams(newStreams);
            if (newCert === 'diamond' && prevCert !== 'diamond' && !game.winConditionMet) {
              setTimeout(() => dispatch(triggerVictory({ artistId: selectedArtist.id })), 600);
            }

            setWorking(false);

            const certMsg = newCert !== prevCert && newCert !== 'none'
              ? `\n🎖️ ${selectedArtist.name} is now ${newCert.replace('_', ' ').toUpperCase()}!`
              : '';
            Alert.alert(
              `${action.emoji} Done!`,
              `${selectedArtist.name} gained ${earned.toLocaleString()} streams.\nYour label earned $${royaltyRevenue.toLocaleString()} in royalties.${certMsg}`,
              [{ text: '🔥', style: 'default' }]
            );
          },
        },
      ]
    );
  }

  // ── RENDER ────────────────────────────────────────────────────────────────

  return (
    <LinearGradient colors={['#0a0a1a', '#0d0a1f']} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.labelName}>{player.artistName}</Text>
          <Text style={styles.labelSub}>RECORD LABEL</Text>
        </View>
        <View style={styles.headerStats}>
          <View style={styles.hChip}>
            <Text style={styles.hChipVal}>${(player.money / 1000).toFixed(1)}K</Text>
            <Text style={styles.hChipLabel}>budget</Text>
          </View>
          <View style={styles.hChip}>
            <Text style={styles.hChipVal}>{roster.length}</Text>
            <Text style={styles.hChipLabel}>artists</Text>
          </View>
          <View style={styles.hChip}>
            <Text style={styles.hChipVal}>{player.level}</Text>
            <Text style={styles.hChipLabel}>level</Text>
          </View>
        </View>
      </View>

      {hasDiamond && (
        <View style={styles.diamondBanner}>
          <Text style={styles.diamondBannerText}>💎 YOU HAVE A DIAMOND ARTIST — GO TO VICTORY!</Text>
        </View>
      )}

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {(['roster', 'scout', 'develop'] as Tab[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabBtnText, tab === t && styles.tabBtnTextActive]}>
              {t === 'roster' ? '📋 ROSTER' : t === 'scout' ? '🔍 SCOUT' : '🚀 DEVELOP'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* ─── ROSTER TAB ────────────────────────────────────────────── */}
        {tab === 'roster' && (
          <>
            {roster.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🎙️</Text>
                <Text style={styles.emptyTitle}>No Artists Signed</Text>
                <Text style={styles.emptyText}>
                  Go to Scout to find talent. Sign someone to get the label moving.
                </Text>
                <TouchableOpacity style={styles.emptyBtn} onPress={() => setTab('scout')}>
                  <Text style={styles.emptyBtnText}>FIND TALENT →</Text>
                </TouchableOpacity>
              </View>
            ) : (
              roster.map((artist) => (
                <TouchableOpacity
                  key={artist.id}
                  style={[
                    styles.artistCard,
                    selectedArtistId === artist.id && styles.artistCardSelected,
                    { borderColor: CERT_COLOR[artist.certification] },
                  ]}
                  onPress={() => setSelectedArtistId(selectedArtistId === artist.id ? null : artist.id)}
                  activeOpacity={0.85}
                >
                  <View style={styles.artistCardRow}>
                    <Text style={styles.artistEmoji}>{artist.emoji}</Text>
                    <View style={styles.artistInfo}>
                      <Text style={styles.artistName}>{artist.name}</Text>
                      <Text style={styles.artistGenre}>{artist.genre} · {artist.region}</Text>
                    </View>
                    <View style={styles.artistRight}>
                      <Text style={[styles.certBadge, { color: CERT_COLOR[artist.certification] }]}>
                        {CERT_LABEL[artist.certification]}
                      </Text>
                      <Text style={styles.artistStreams}>
                        {artist.streams >= 1_000_000_000
                          ? `${(artist.streams / 1_000_000_000).toFixed(2)}B`
                          : artist.streams >= 1_000_000
                          ? `${(artist.streams / 1_000_000).toFixed(1)}M`
                          : `${(artist.streams / 1000).toFixed(0)}K`} streams
                      </Text>
                    </View>
                  </View>

                  {/* Progress to next cert */}
                  <View style={styles.progressRow}>
                    <View style={styles.progressBar}>
                      <View style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(100, (artist.streams / 1_500_000_000) * 100)}%`,
                          backgroundColor: CERT_COLOR[artist.certification],
                        }
                      ]} />
                    </View>
                    <Text style={styles.progressLabel}>
                      {((artist.streams / 1_500_000_000) * 100).toFixed(1)}% to Diamond
                    </Text>
                  </View>

                  <View style={styles.artistMeta}>
                    <Text style={styles.metaChip}>Potential {artist.potential}/10</Text>
                    <Text style={styles.metaChip}>Label: {artist.royaltyRate}%</Text>
                    <Text style={styles.metaChip}>Advance: ${artist.advancePaid.toLocaleString()}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </>
        )}

        {/* ─── SCOUT TAB ─────────────────────────────────────────────── */}
        {tab === 'scout' && (
          <>
            <Text style={styles.scoutIntro}>
              These artists are unsigned and hungry. The right advance at the right time = a Diamond record.
            </Text>
            {TALENT_POOL.filter((p) => !roster.find((r) => r.id === p.id)).map((prospect) => {
              const canSign = player.money >= prospect.askingAdvance;
              return (
                <View key={prospect.id} style={[styles.prospectCard, !canSign && styles.prospectLocked]}>
                  <LinearGradient
                    colors={canSign ? ['#111', '#0d0d1a'] : ['#0a0a0a', '#050505']}
                    style={styles.prospectInner}
                  >
                    <View style={styles.prospectHeader}>
                      <Text style={styles.prospectEmoji}>{prospect.emoji}</Text>
                      <View style={styles.prospectInfo}>
                        <Text style={[styles.prospectName, { color: canSign ? '#fff' : '#555' }]}>
                          {prospect.name}
                        </Text>
                        <Text style={styles.prospectGenre}>{prospect.genre} · {prospect.region}</Text>
                      </View>
                      <View style={styles.potentialBadge}>
                        <Text style={styles.potentialLabel}>POTENTIAL</Text>
                        <Text style={[styles.potentialVal, {
                          color: prospect.potential >= 9 ? '#F5A623' : prospect.potential >= 7 ? '#1DB954' : '#888'
                        }]}>
                          {prospect.potential}/10
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.prospectBio}>{prospect.bio}</Text>

                    <View style={styles.prospectStats}>
                      <View style={styles.pStatBox}>
                        <Text style={styles.pStatVal}>
                          {prospect.currentStreams >= 1_000_000
                            ? `${(prospect.currentStreams / 1_000_000).toFixed(1)}M`
                            : `${(prospect.currentStreams / 1000).toFixed(0)}K`}
                        </Text>
                        <Text style={styles.pStatLabel}>streams</Text>
                      </View>
                      <View style={styles.pStatBox}>
                        <Text style={styles.pStatVal}>${prospect.askingAdvance.toLocaleString()}</Text>
                        <Text style={styles.pStatLabel}>advance</Text>
                      </View>
                      <View style={styles.pStatBox}>
                        <Text style={styles.pStatVal}>{prospect.weeklyRoyalty}%</Text>
                        <Text style={styles.pStatLabel}>your cut</Text>
                      </View>
                    </View>

                    {!canSign && (
                      <Text style={styles.lockReason}>
                        🔒 Need ${(prospect.askingAdvance - player.money).toLocaleString()} more
                      </Text>
                    )}

                    <TouchableOpacity
                      style={[styles.signBtn, { backgroundColor: canSign ? '#6C63FF' : '#111' }]}
                      onPress={() => signArtist(prospect)}
                      disabled={!canSign}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.signBtnText, !canSign && { color: '#444' }]}>
                        {canSign ? `SIGN ${prospect.name.split(' ')[0].toUpperCase()}` : 'NOT ENOUGH CASH'}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              );
            })}
            {TALENT_POOL.every((p) => roster.find((r) => r.id === p.id)) && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>✅</Text>
                <Text style={styles.emptyTitle}>All Available Artists Signed</Text>
                <Text style={styles.emptyText}>You've got everyone. Now develop them to Diamond.</Text>
              </View>
            )}
          </>
        )}

        {/* ─── DEVELOP TAB ───────────────────────────────────────────── */}
        {tab === 'develop' && (
          <>
            {roster.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🎵</Text>
                <Text style={styles.emptyTitle}>Sign an Artist First</Text>
                <Text style={styles.emptyText}>You need at least one signed artist to develop.</Text>
                <TouchableOpacity style={styles.emptyBtn} onPress={() => setTab('scout')}>
                  <Text style={styles.emptyBtnText}>SCOUT TALENT →</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {/* Artist picker */}
                <Text style={styles.devPickLabel}>SELECT ARTIST TO DEVELOP</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.artistPicker}>
                  {roster.map((a) => (
                    <TouchableOpacity
                      key={a.id}
                      style={[styles.artistPill, selectedArtistId === a.id && styles.artistPillActive]}
                      onPress={() => setSelectedArtistId(a.id)}
                    >
                      <Text style={styles.artistPillEmoji}>{a.emoji}</Text>
                      <Text style={[styles.artistPillName, selectedArtistId === a.id && { color: '#fff' }]}>
                        {a.name.split(' ')[0]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {selectedArtist ? (
                  <>
                    {/* Selected artist summary */}
                    <View style={[styles.devArtistSummary, { borderColor: CERT_COLOR[selectedArtist.certification] }]}>
                      <Text style={styles.devArtistName}>{selectedArtist.emoji} {selectedArtist.name}</Text>
                      <Text style={[styles.devCertLabel, { color: CERT_COLOR[selectedArtist.certification] }]}>
                        {CERT_LABEL[selectedArtist.certification]}
                      </Text>
                      <Text style={styles.devStreams}>
                        {selectedArtist.streams >= 1_000_000_000
                          ? `${(selectedArtist.streams / 1_000_000_000).toFixed(2)}B`
                          : selectedArtist.streams >= 1_000_000
                          ? `${(selectedArtist.streams / 1_000_000).toFixed(1)}M`
                          : `${(selectedArtist.streams / 1000).toFixed(0)}K`} streams
                      </Text>
                      <View style={styles.devProgressBar}>
                        <View style={[
                          styles.devProgressFill,
                          {
                            width: `${Math.min(100, (selectedArtist.streams / 1_500_000_000) * 100)}%`,
                            backgroundColor: CERT_COLOR[selectedArtist.certification],
                          }
                        ]} />
                      </View>
                      <Text style={styles.devProgressText}>
                        {((selectedArtist.streams / 1_500_000_000) * 100).toFixed(2)}% to Diamond
                      </Text>
                    </View>

                    {/* Dev actions */}
                    {DEV_ACTIONS.map((action) => {
                      const canAfford = player.money >= action.cost;
                      return (
                        <View key={action.id} style={[styles.devCard, !canAfford && styles.devCardLocked]}>
                          <View style={styles.devCardRow}>
                            <Text style={styles.devCardEmoji}>{action.emoji}</Text>
                            <View style={styles.devCardInfo}>
                              <Text style={[styles.devCardName, !canAfford && { color: '#555' }]}>
                                {action.label}
                              </Text>
                              <Text style={styles.devCardDesc}>{action.desc}</Text>
                            </View>
                          </View>
                          <View style={styles.devCardStats}>
                            <Text style={styles.devStat}>
                              💰 Cost: <Text style={{ color: canAfford ? '#fff' : '#ff4444' }}>${action.cost.toLocaleString()}</Text>
                            </Text>
                            <Text style={styles.devStat}>
                              📈 Streams: <Text style={{ color: '#1DB954' }}>+{action.streamsGain.toLocaleString()}</Text>
                            </Text>
                            <Text style={styles.devStat}>
                              ⏱ Duration: <Text style={{ color: '#aaa' }}>{action.duration}d</Text>
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={[styles.devBtn, { backgroundColor: canAfford ? '#6C63FF' : '#111' }]}
                            onPress={() => runDevAction(action)}
                            disabled={!canAfford || working}
                            activeOpacity={0.8}
                          >
                            <Text style={[styles.devBtnText, !canAfford && { color: '#444' }]}>
                              {working ? 'WORKING...' : canAfford ? 'EXECUTE' : 'NEED MORE CASH'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </>
                ) : (
                  <Text style={styles.devPickHint}>👆 Select an artist above to see development options</Text>
                )}
              </>
            )}
          </>
        )}
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
  labelName: { fontSize: 20, fontWeight: '900', color: '#6C63FF', letterSpacing: 2 },
  labelSub: { fontSize: 10, color: '#444', letterSpacing: 3, marginTop: 2 },
  headerStats: { flexDirection: 'row', gap: 8 },
  hChip: { alignItems: 'center', backgroundColor: '#111', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  hChipVal: { fontSize: 14, fontWeight: '900', color: '#6C63FF' },
  hChipLabel: { fontSize: 9, color: '#555', letterSpacing: 1 },

  diamondBanner: {
    marginHorizontal: 16, marginBottom: 8, backgroundColor: '#001a30',
    borderRadius: 8, padding: 10, borderWidth: 1, borderColor: '#00D4FF',
  },
  diamondBannerText: { color: '#00D4FF', fontSize: 11, fontWeight: '800', textAlign: 'center', letterSpacing: 1 },

  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#111' },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabBtnActive: { borderBottomWidth: 2, borderBottomColor: '#6C63FF' },
  tabBtnText: { fontSize: 11, color: '#555', fontWeight: '700', letterSpacing: 0.5 },
  tabBtnTextActive: { color: '#6C63FF' },

  scroll: { padding: 16, paddingBottom: 60 },

  emptyState: { alignItems: 'center', paddingTop: 48, paddingHorizontal: 24 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '900', color: '#fff', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  emptyBtn: { backgroundColor: '#6C63FF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  emptyBtnText: { color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 1 },

  // Artist cards
  artistCard: {
    borderRadius: 12, borderWidth: 1, marginBottom: 12,
    backgroundColor: '#0d0d1a', padding: 14,
  },
  artistCardSelected: { borderWidth: 2 },
  artistCardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  artistEmoji: { fontSize: 28, marginRight: 12 },
  artistInfo: { flex: 1 },
  artistName: { fontSize: 15, fontWeight: '900', color: '#fff' },
  artistGenre: { fontSize: 12, color: '#666', marginTop: 2 },
  artistRight: { alignItems: 'flex-end' },
  certBadge: { fontSize: 12, fontWeight: '800', marginBottom: 2 },
  artistStreams: { fontSize: 11, color: '#666' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  progressBar: { flex: 1, height: 4, backgroundColor: '#1a1a1a', borderRadius: 2 },
  progressFill: { height: '100%', borderRadius: 2 },
  progressLabel: { fontSize: 10, color: '#555', width: 100, textAlign: 'right' },
  artistMeta: { flexDirection: 'row', gap: 6 },
  metaChip: { fontSize: 10, color: '#555', backgroundColor: '#111', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },

  // Scout
  scoutIntro: { fontSize: 13, color: '#666', lineHeight: 18, marginBottom: 16 },
  prospectCard: { borderRadius: 14, borderWidth: 1, borderColor: '#1a1a1a', marginBottom: 14, overflow: 'hidden' },
  prospectLocked: { opacity: 0.7 },
  prospectInner: { padding: 16 },
  prospectHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  prospectEmoji: { fontSize: 26, marginRight: 12 },
  prospectInfo: { flex: 1 },
  prospectName: { fontSize: 15, fontWeight: '900' },
  prospectGenre: { fontSize: 12, color: '#666', marginTop: 2 },
  potentialBadge: { alignItems: 'center' },
  potentialLabel: { fontSize: 9, color: '#555', letterSpacing: 1 },
  potentialVal: { fontSize: 20, fontWeight: '900' },
  prospectBio: { fontSize: 12, color: '#777', lineHeight: 16, marginBottom: 12 },
  prospectStats: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  pStatBox: { flex: 1, backgroundColor: '#0a0a0a', borderRadius: 8, padding: 8, alignItems: 'center' },
  pStatVal: { fontSize: 14, fontWeight: '900', color: '#fff' },
  pStatLabel: { fontSize: 9, color: '#555', marginTop: 2, letterSpacing: 1 },
  lockReason: { fontSize: 12, color: '#ff4444', marginBottom: 8 },
  signBtn: { paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  signBtnText: { fontSize: 13, fontWeight: '900', color: '#fff', letterSpacing: 1 },

  // Develop
  devPickLabel: { fontSize: 10, color: '#555', letterSpacing: 2, marginBottom: 10 },
  artistPicker: { marginBottom: 16 },
  artistPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#111', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8,
    marginRight: 8, borderWidth: 1, borderColor: '#1a1a1a',
  },
  artistPillActive: { borderColor: '#6C63FF', backgroundColor: '#1a1040' },
  artistPillEmoji: { fontSize: 16 },
  artistPillName: { fontSize: 13, color: '#666', fontWeight: '700' },

  devArtistSummary: {
    backgroundColor: '#0d0d1a', borderRadius: 12, borderWidth: 1,
    padding: 16, marginBottom: 16, alignItems: 'center',
  },
  devArtistName: { fontSize: 16, fontWeight: '900', color: '#fff', marginBottom: 4 },
  devCertLabel: { fontSize: 12, fontWeight: '800', marginBottom: 8 },
  devStreams: { fontSize: 22, fontWeight: '900', color: '#fff', marginBottom: 8 },
  devProgressBar: { width: '100%', height: 6, backgroundColor: '#111', borderRadius: 3, marginBottom: 6 },
  devProgressFill: { height: '100%', borderRadius: 3 },
  devProgressText: { fontSize: 11, color: '#666' },

  devCard: { backgroundColor: '#0d0d1a', borderRadius: 12, borderWidth: 1, borderColor: '#1a1a1a', padding: 14, marginBottom: 10 },
  devCardLocked: { opacity: 0.6 },
  devCardRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  devCardEmoji: { fontSize: 22 },
  devCardInfo: { flex: 1 },
  devCardName: { fontSize: 14, fontWeight: '900', color: '#fff', marginBottom: 2 },
  devCardDesc: { fontSize: 11, color: '#666', lineHeight: 15 },
  devCardStats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  devStat: { fontSize: 11, color: '#666' },
  devBtn: { paddingVertical: 11, borderRadius: 8, alignItems: 'center' },
  devBtnText: { fontSize: 12, fontWeight: '900', color: '#fff', letterSpacing: 1 },
  devPickHint: { textAlign: 'center', color: '#444', fontSize: 13, marginTop: 24 },
});
                                                                                                                                                        