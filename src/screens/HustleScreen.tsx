import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { gainMoney, gainXP, updateStats, updateReputation } from '../store/playerSlice';
import { advanceTime } from '../store/gameSlice';
import { DAY_JOBS, HUSTLE_GIGS } from '../data/jobs';
import { DayJob, HustleGig } from '../types';

type Tab = 'day_jobs' | 'hustle';

export default function HustleScreen() {
  const dispatch = useDispatch();
  const player = useSelector((s: RootState) => s.player.data);
  const { currentRegionId } = useSelector((s: RootState) => s.game);
  const [tab, setTab] = useState<Tab>('day_jobs');
  const [working, setWorking] = useState(false);

  if (!player) return null;

  const availableJobs = DAY_JOBS.filter((j) =>
    j.availablePhases.includes(player.artistPhase)
  );

  function meetsStatReq(gig: HustleGig): boolean {
    if (!gig.statRequirement) return true;
    return Object.entries(gig.statRequirement).every(
      ([stat, val]) => player!.stats[stat as keyof typeof player.stats] >= (val ?? 0)
    );
  }

  async function doShift(job: DayJob) {
    if (working) return;
    setWorking(true);
    await new Promise((r) => setTimeout(r, 1000));

    const earned = job.hourlyPay * job.hoursPerShift;
    dispatch(gainMoney(earned));
    dispatch(gainXP(30));
    dispatch(advanceTime(job.timeCostDays));

    // Studio intern: no pay but +production
    if (job.id === 'studio_intern') {
      dispatch(updateStats({ production: 3, talent: 1 }));
    }
    // Security guard: +charisma from networking
    if (job.id === 'security_guard') {
      dispatch(updateStats({ charisma: 1 }));
    }

    setWorking(false);
    Alert.alert(
      `Shift Done — ${job.title}`,
      earned > 0
        ? `You worked ${job.hoursPerShift} hours.\n+$${earned.toLocaleString()} earned\n+1 day passed`
        : `Unpaid internship.\n+Production +3, +Talent +1\n+1 day passed`,
      [{ text: 'Back to the grind', style: 'default' }]
    );
  }

  async function doGig(gig: HustleGig) {
    if (working || !meetsStatReq(gig)) return;
    setWorking(true);
    await new Promise((r) => setTimeout(r, 800));

    const success = Math.random() < gig.successChance;
    if (success) {
      const variance = 0.7 + Math.random() * 0.6; // 70%-130% of stated payout
      const earned = Math.round(gig.payout * variance);
      dispatch(gainMoney(earned));
      dispatch(gainXP(50));
      dispatch(advanceTime(1));

      if (gig.rewardType === 'money_and_rep') {
        dispatch(updateReputation({ regionId: currentRegionId, amount: 2 }));
      }
      if (gig.rewardType === 'money_and_xp') {
        dispatch(gainXP(50)); // double xp
      }

      Alert.alert(
        `✅ ${gig.title}`,
        `Pulled it off.\n+$${earned.toLocaleString()}\n+50 XP\n+1 day`,
        [{ text: 'Let\'s go', style: 'default' }]
      );
    } else {
      dispatch(advanceTime(1));
      Alert.alert(
        `❌ ${gig.title}`,
        'Didn\'t work out this time. No pay, but you learned something.\n+1 day',
        [{ text: 'Try again later', style: 'default' }]
      );
    }

    setWorking(false);
  }

  const moneyNeeded =
    player.artistPhase === 'origins'
      ? Math.max(0, 500 - player.money)
      : player.artistPhase === 'image'
      ? Math.max(0, 200 - player.money)
      : 0;

  return (
    <LinearGradient colors={['#0a0a1a', '#0d0d1f']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>HUSTLE</Text>
        <View style={styles.moneyRow}>
          <Text style={styles.moneyLabel}>CASH</Text>
          <Text style={styles.moneyValue}>${player.money.toLocaleString()}</Text>
        </View>
      </View>

      {/* Phase Status */}
      <View style={styles.phaseBar}>
        <Text style={styles.phaseText}>
          Phase: <Text style={styles.phaseHighlight}>{player.artistPhase.replace('_', ' ').toUpperCase()}</Text>
        </Text>
        {moneyNeeded > 0 && (
          <Text style={styles.goalText}>Need ${moneyNeeded.toLocaleString()} more to advance</Text>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {(['day_jobs', 'hustle'] as Tab[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'day_jobs' ? '💼 DAY JOBS' : '⚡ SIDE HUSTLES'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {tab === 'day_jobs' ? (
          availableJobs.map((job) => (
            <View key={job.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{job.title}</Text>
                  <Text style={styles.cardDesc}>{job.description}</Text>
                  <View style={styles.statsRow}>
                    <Text style={styles.stat}>
                      💵 {job.hourlyPay > 0 ? `$${job.hourlyPay}/hr × ${job.hoursPerShift}h = $${job.hourlyPay * job.hoursPerShift}` : 'Unpaid'}
                    </Text>
                    <Text style={styles.stat}>⚡ -{job.energyCost} energy</Text>
                    <Text style={styles.stat}>📅 {job.timeCostDays} day</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#1DB954' }, working && styles.actionBtnDisabled]}
                onPress={() => doShift(job)}
                disabled={working}
                activeOpacity={0.8}
              >
                <Text style={styles.actionBtnText}>
                  {working ? 'WORKING...' : 'DO A SHIFT'}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          HUSTLE_GIGS.map((gig) => {
            const canDo = meetsStatReq(gig);
            return (
              <View key={gig.id} style={[styles.card, !canDo && styles.cardLocked]}>
                <View style={styles.cardTop}>
                  <View style={styles.cardInfo}>
                    <Text style={[styles.cardTitle, !canDo && styles.lockedText]}>{gig.title}</Text>
                    <Text style={[styles.cardDesc, !canDo && styles.lockedText]}>{gig.description}</Text>
                    <View style={styles.statsRow}>
                      <Text style={styles.stat}>💵 ~${gig.payout}</Text>
                      <Text style={[styles.stat, { color: gig.successChance >= 0.7 ? '#1DB954' : gig.successChance >= 0.5 ? '#F5A623' : '#ff4444' }]}>
                        {Math.round(gig.successChance * 100)}% success
                      </Text>
                      {gig.rewardType === 'money_and_rep' && <Text style={styles.stat}>+2 rep</Text>}
                    </View>
                    {!canDo && gig.statRequirement && (
                      <Text style={styles.lockHint}>
                        🔒 Requires: {Object.entries(gig.statRequirement).map(([k, v]) => `${k} ${v}`).join(', ')}
                      </Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    { backgroundColor: canDo ? '#F5A623' : '#222' },
                    (working || !canDo) && styles.actionBtnDisabled,
                  ]}
                  onPress={() => doGig(gig)}
                  disabled={working || !canDo}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.actionBtnText, !canDo && { color: '#444' }]}>
                    {working ? 'RUNNING...' : canDo ? 'DO IT' : 'LOCKED'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
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
  moneyRow: { alignItems: 'flex-end' },
  moneyLabel: { fontSize: 9, color: '#555', letterSpacing: 2 },
  moneyValue: { fontSize: 20, fontWeight: '900', color: '#1DB954' },
  phaseBar: {
    marginHorizontal: 20, marginBottom: 4,
    paddingVertical: 8, paddingHorizontal: 12,
    backgroundColor: '#111', borderRadius: 8,
  },
  phaseText: { fontSize: 11, color: '#666' },
  phaseHighlight: { color: '#F5A623', fontWeight: '700' },
  goalText: { fontSize: 11, color: '#ff6b35', marginTop: 2 },
  tabRow: {
    flexDirection: 'row', borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a', marginBottom: 4,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#1DB954' },
  tabText: { fontSize: 12, color: '#444', fontWeight: '700' },
  tabTextActive: { color: '#1DB954' },
  scroll: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: '#111', borderRadius: 12,
    padding: 14, marginBottom: 10,
  },
  cardLocked: { opacity: 0.6 },
  cardTop: { marginBottom: 12 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#fff', marginBottom: 4 },
  cardDesc: { fontSize: 12, color: '#777', lineHeight: 17, marginBottom: 8 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  stat: { fontSize: 11, color: '#888' },
  lockHint: { fontSize: 11, color: '#ff4444', marginTop: 4 },
  lockedText: { color: '#444' },
  actionBtn: {
    paddingVertical: 12, borderRadius: 8, alignItems: 'center',
  },
  actionBtnDisabled: { opacity: 0.5 },
  actionBtnText: { fontSize: 13, fontWeight: '800', color: '#000', letterSpacing: 1 },
});
