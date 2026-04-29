import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { startQuest, completeQuest, updateQuestObjective, unlockRegion } from '../store/gameSlice';
import { gainXP, gainMoney, updateStats, unlockAchievement, updateReputation } from '../store/playerSlice';
import { QUESTS } from '../data/quests';
import { Quest } from '../types';
import { REGIONS } from '../data/regions';

type Filter = 'available' | 'active' | 'completed';

export default function QuestsScreen() {
  const dispatch = useDispatch();
  const { currentRegionId, activeQuests, completedQuests, unlockedRegions } = useSelector(
    (s: RootState) => s.game
  );
  const player = useSelector((s: RootState) => s.player.data);
  const [filter, setFilter] = useState<Filter>('available');

  if (!player) return null;

  const region = REGIONS.find((r) => r.id === currentRegionId);
  const regionColor = region?.primaryColor ?? '#1DB954';

  // Available quests: in data, matching current region, not locked, not started, not completed
  const availableQuests = QUESTS.filter(
    (q) =>
      q.regionId === currentRegionId &&
      q.status !== 'locked' &&
      !completedQuests.includes(q.id) &&
      !activeQuests.find((aq) => aq.id === q.id)
  );

  const lists: Record<Filter, Quest[]> = {
    available: availableQuests,
    active: activeQuests,
    completed: QUESTS.filter((q) => completedQuests.includes(q.id)),
  };

  function handleAccept(quest: Quest) {
    dispatch(startQuest(quest));
  }

  function handleAbandon(questId: string) {
    Alert.alert('Abandon Quest?', 'Your progress will be lost.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Abandon',
        style: 'destructive',
        onPress: () => dispatch(completeQuest(questId)), // removes from active (marks as gone)
      },
    ]);
  }

  function handleForceComplete(quest: Quest) {
    // Dev shortcut — in production this would be gated by real objectives
    Alert.alert(
      `Complete "${quest.title}"?`,
      'Mark all objectives done and claim rewards.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          onPress: () => {
            dispatch(completeQuest(quest.id));
            dispatch(gainXP(quest.rewards.xp));
            dispatch(gainMoney(quest.rewards.money));
            if (quest.rewards.statBoosts) dispatch(updateStats(quest.rewards.statBoosts));
            if (quest.rewards.unlockRegion) {
              dispatch(unlockRegion(quest.rewards.unlockRegion));
            }
            dispatch(unlockAchievement(`quest_${quest.id}`));
            Alert.alert(
              '✅ Quest Complete!',
              `+${quest.rewards.xp} XP\n+$${quest.rewards.money.toLocaleString()}`
            );
          },
        },
      ]
    );
  }

  return (
    <LinearGradient colors={['#0a0a1a', '#0d0d1f']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QUESTS</Text>
        <Text style={styles.regionLabel}>📍 {region?.name}</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['available', 'active', 'completed'] as Filter[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && { borderBottomColor: regionColor, borderBottomWidth: 2 }]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && { color: regionColor }]}>
              {f.toUpperCase()}
              {f === 'active' && activeQuests.length > 0 && (
                <Text style={[styles.badge, { color: regionColor }]}> {activeQuests.length}</Text>
              )}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {lists[filter].length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>
              {filter === 'available' ? '🔍' : filter === 'active' ? '🎯' : '🏆'}
            </Text>
            <Text style={styles.emptyText}>
              {filter === 'available'
                ? 'No quests available here yet.\nBuild relationships with NPCs to unlock more.'
                : filter === 'active'
                ? 'No active quests. Accept one to get started.'
                : 'No completed quests yet.'}
            </Text>
          </View>
        ) : (
          lists[filter].map((quest) => (
            <View key={quest.id} style={[styles.questCard, { borderColor: regionColor + '44' }]}>
              <Text style={styles.questTitle}>{quest.title}</Text>
              <Text style={styles.questDesc}>{quest.description}</Text>

              {/* Objectives */}
              {filter === 'active' && (
                <View style={styles.objectivesSection}>
                  {quest.objectives.map((obj) => (
                    <View key={obj.id} style={styles.objectiveRow}>
                      <Text style={styles.objectiveCheck}>
                        {obj.completed ? '✅' : '◻️'}
                      </Text>
                      <Text style={[styles.objectiveText, obj.completed && styles.objectiveDone]}>
                        {obj.description}
                      </Text>
                      <Text style={styles.objectiveProgress}>
                        {obj.current}/{obj.target}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Rewards */}
              <View style={styles.rewardsRow}>
                <Text style={styles.rewardItem}>⭐ {quest.rewards.xp} XP</Text>
                {quest.rewards.money > 0 && (
                  <Text style={styles.rewardItem}>${quest.rewards.money.toLocaleString()}</Text>
                )}
                {quest.rewards.unlockRegion && (
                  <Text style={styles.rewardItem}>🔓 New Region</Text>
                )}
                {quest.rewards.statBoosts && Object.keys(quest.rewards.statBoosts).length > 0 && (
                  <Text style={styles.rewardItem}>
                    📈 {Object.entries(quest.rewards.statBoosts)
                      .map(([k, v]) => `+${v} ${k}`)
                      .join(', ')}
                  </Text>
                )}
              </View>

              {/* Actions */}
              {filter === 'available' && (
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: regionColor }]}
                  onPress={() => handleAccept(quest)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionBtnText}>ACCEPT</Text>
                </TouchableOpacity>
              )}

              {filter === 'active' && (
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { flex: 1, backgroundColor: regionColor }]}
                    onPress={() => handleForceComplete(quest)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.actionBtnText}>TURN IN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, { flex: 1, backgroundColor: '#222', marginLeft: 8 }]}
                    onPress={() => handleAbandon(quest.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.actionBtnText, { color: '#ff4444' }]}>ABANDON</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
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
  regionLabel: { fontSize: 13, color: '#1DB954' },
  filterRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1a1a1a', marginBottom: 4 },
  filterTab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  filterText: { fontSize: 11, color: '#444', letterSpacing: 1, fontWeight: '700' },
  badge: { fontWeight: '900' },
  scroll: { padding: 16, paddingBottom: 40 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyText: { color: '#444', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  questCard: {
    backgroundColor: '#0f0f1a', borderWidth: 1,
    borderRadius: 12, padding: 16, marginBottom: 12,
  },
  questTitle: { fontSize: 16, fontWeight: '800', color: '#fff', marginBottom: 6 },
  questDesc: { fontSize: 13, color: '#777', lineHeight: 18, marginBottom: 12 },
  objectivesSection: { marginBottom: 12 },
  objectiveRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  objectiveCheck: { fontSize: 14, marginRight: 8 },
  objectiveText: { flex: 1, fontSize: 13, color: '#aaa' },
  objectiveDone: { color: '#444', textDecorationLine: 'line-through' },
  objectiveProgress: { fontSize: 11, color: '#555' },
  rewardsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  rewardItem: { fontSize: 11, color: '#888', backgroundColor: '#1a1a1a', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  actionBtn: { paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  actionBtnText: { fontSize: 13, fontWeight: '800', color: '#000', letterSpacing: 1 },
  actionRow: { flexDirection