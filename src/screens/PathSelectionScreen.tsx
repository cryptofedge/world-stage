import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { setCareerPath, setPhase } from '../store/gameSlice';
import { CareerPath } from '../types';

const { width } = Dimensions.get('window');

const PATHS = [
  {
    id: 'artist' as CareerPath,
    emoji: '🎤',
    title: 'THE ARTIST',
    tagline: 'Your name. Your voice. Your story.',
    color: '#1DB954',
    accent: '#0d5c2a',
    description:
      'Start from nothing — $50 in your pocket and an unreleasable dream. Get a day job. Build your image before you step in a studio. Record, release, perform, go viral. Build your name from the ground up until one of your tracks goes Diamond.',
    phases: [
      { emoji: '🧱', label: 'Origins', desc: 'Day job, hustle, $50 to start' },
      { emoji: '🎨', label: 'Image', desc: 'Look the part before the music drops' },
      { emoji: '✍️', label: 'Pre-Production', desc: 'Write songs, buy beats' },
      { emoji: '🎙️', label: 'Record', desc: 'Book studio time, lay the tracks' },
      { emoji: '📤', label: 'Release', desc: 'Distribute & release strategy' },
      { emoji: '📱', label: 'Promo', desc: 'Social media, videos, press' },
      { emoji: '🚌', label: 'Tour', desc: 'Local gigs → world tours' },
      { emoji: '💎', label: 'Diamond', desc: '1.5B streams — YOU WIN' },
    ],
    pros: ['Full creative control', 'Personal journey', 'Faster early progress'],
    cons: ['No team — you carry everything', 'Lower starting money ($50)', 'More vulnerable to setbacks'],
    startingMoney: 50,
  },
  {
    id: 'label' as CareerPath,
    emoji: '🏢',
    title: 'THE LABEL',
    tagline: 'Build the machine. Own the culture.',
    color: '#6C63FF',
    accent: '#2a1a5c',
    description:
      'You\'re not the artist — you\'re the architect. Start with $500 and a vision. Register your LLC, build your brand, scout raw talent, sign artists, develop them from the ground up. Manage image, recording, marketing, and tours. Win when one of your artists hits Diamond.',
    phases: [
      { emoji: '🏗️', label: 'Foundation', desc: 'LLC, bank account, branding' },
      { emoji: '🔍', label: 'Scouting', desc: 'Find unsigned talent' },
      { emoji: '✍️', label: 'Sign', desc: 'Contracts, advances, deals' },
      { emoji: '🎨', label: 'Develop', desc: 'Image, coaching, beats' },
      { emoji: '🎙️', label: 'Record', desc: 'Fund sessions & masters' },
      { emoji: '📢', label: 'Market', desc: 'Campaigns, playlists, press' },
      { emoji: '🎪', label: 'Tour', desc: 'Book & support live shows' },
      { emoji: '💎', label: 'Diamond', desc: 'One artist hits 1.5B — YOU WIN' },
    ],
    pros: ['Higher starting capital ($500)', 'Build a roster of artists', 'Multiple income streams'],
    cons: ['More complex management', 'Dependent on your artists\' performance', 'Higher upfront costs'],
    startingMoney: 500,
  },
];

export default function PathSelectionScreen() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<CareerPath | null>(null);

  function handleConfirm() {
    if (!selected) return;
    dispatch(setCareerPath(selected));
    dispatch(setPhase('character_creation'));
  }

  return (
    <LinearGradient colors={['#0a0a1a', '#0d0d1f']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>CHOOSE YOUR PATH</Text>
        <Text style={styles.subheading}>
          Both roads lead to Diamond.{'\n'}One question: are you the artist or the architect?
        </Text>

        {PATHS.map((path) => {
          const isSelected = selected === path.id;
          return (
            <TouchableOpacity
              key={path.id}
              onPress={() => setSelected(path.id)}
              activeOpacity={0.9}
              style={[styles.card, isSelected && { borderColor: path.color, borderWidth: 2 }]}
            >
              <LinearGradient
                colors={isSelected ? [path.accent, '#0a0a1a'] : ['#111', '#0a0a1a']}
                style={styles.cardInner}
              >
                {/* Header */}
                <View style={styles.cardHeader}>
                  <Text style={styles.cardEmoji}>{path.emoji}</Text>
                  <View style={styles.cardTitleBlock}>
                    <Text style={[styles.cardTitle, { color: path.color }]}>{path.title}</Text>
                    <Text style={styles.cardTagline}>{path.tagline}</Text>
                  </View>
                  <View style={[styles.moneyBadge, { borderColor: path.color }]}>
                    <Text style={[styles.moneyBadgeText, { color: path.color }]}>
                      START ${path.startingMoney}
                    </Text>
                  </View>
                </View>

                <Text style={styles.cardDescription}>{path.description}</Text>

                {/* Journey phases */}
                <View style={styles.phasesRow}>
                  {path.phases.map((p, i) => (
                    <View key={i} style={styles.phaseChip}>
                      <Text style={styles.phaseEmoji}>{p.emoji}</Text>
                      <Text style={styles.phaseLabel}>{p.label}</Text>
                    </View>
                  ))}
                </View>

                {/* Pros / Cons */}
                <View style={styles.prosConsRow}>
                  <View style={styles.prosCol}>
                    {path.pros.map((p, i) => (
                      <Text key={i} style={styles.proText}>✅ {p}</Text>
                    ))}
                  </View>
                  <View style={styles.consCol}>
                    {path.cons.map((c, i) => (
                      <Text key={i} style={styles.conText}>⚠️ {c}</Text>
                    ))}
                  </View>
                </View>

                {isSelected && (
                  <View style={[styles.selectedBadge, { backgroundColor: path.color }]}>
                    <Text style={styles.selectedBadgeText}>SELECTED</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.confirmBtn, !selected && styles.confirmBtnDisabled]}
          onPress={handleConfirm}
          disabled={!selected}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmBtnText}>
            {selected
              ? `START AS ${selected === 'artist' ? 'THE ARTIST' : 'THE LABEL'} →`
              : 'SELECT A PATH TO CONTINUE'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingTop: 60, paddingBottom: 48 },
  heading: {
    fontSize: 28, fontWeight: '900', color: '#fff',
    letterSpacing: 4, textAlign: 'center', marginBottom: 8,
  },
  subheading: {
    fontSize: 14, color: '#777', textAlign: 'center',
    lineHeight: 20, marginBottom: 32,
  },
  card: {
    borderRadius: 16, borderWidth: 1, borderColor: '#1a1a1a',
    marginBottom: 20, overflow: 'hidden',
  },
  cardInner: { padding: 20 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  cardEmoji: { fontSize: 36 },
  cardTitleBlock: { flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: '900', letterSpacing: 2 },
  cardTagline: { fontSize: 12, color: '#888', marginTop: 2 },
  moneyBadge: {
    borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  moneyBadgeText: { fontSize: 11, fontWeight: '800' },
  cardDescription: {
    fontSize: 13, color: '#aaa', lineHeight: 19,
    marginBottom: 16,
  },
  phasesRow: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16,
  },
  phaseChip: {
    backgroundColor: '#1a1a1a', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 6,
    alignItems: 'center', minWidth: 60,
  },
  phaseEmoji: { fontSize: 14 },
  phaseLabel: { fontSize: 9, color: '#666', letterSpacing: 0.5, marginTop: 2 },
  prosConsRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  prosCol: { flex: 1 },
  consCol: { flex: 1 },
  proText: { fontSize: 11, color: '#1DB954', marginBottom: 4, lineHeight: 15 },
  conText: { fontSize: 11, color: '#F5A623', marginBottom: 4, lineHeight: 15 },
  selectedBadge: {
    alignSelf: 'flex-end', marginTop: 12,
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 20,
  },
  selectedBadgeText: { fontSize: 11, fontWeight: '900', color: '#000', letterSpacing: 2 },
  confirmBtn: {
    paddingVertical: 18, backgroundColor: '#1DB954',
    borderRadius: 12, alignItems: 'center', marginTop: 8,
  },
  confirmBtnDisabled: { backgroundColor: '#1a1a1a' },
  confirmBtnText: { fontSize: 15, fontWeight: '900', color: '#000', letterSpacing: 1 },
});
