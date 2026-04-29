import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { purchaseWardrobeItem, completePhotoshoot, setupSocialAccount, setAesthetic, updateStats, gainXP, gainMoney, advanceArtistPhase } from '../store/playerSlice';
import { advanceTime } from '../store/gameSlice';
import {
  WARDROBE_ITEMS,
  PHOTOGRAPHERS,
  AESTHETIC_COLORS,
  AESTHETIC_DESCRIPTIONS,
} from '../data/imageItems';
import { ArtistAesthetic, SocialPlatform } from '../types';

type Section = 'overview' | 'wardrobe' | 'photographer' | 'social' | 'aesthetic';

const SOCIAL_PLATFORMS: { platform: SocialPlatform; emoji: string; cost: number; desc: string }[] = [
  { platform: 'Instagram', emoji: '📸', cost: 0, desc: 'Photo-first. Essential for artists. Visual portfolio.' },
  { platform: 'TikTok', emoji: '🎵', cost: 0, desc: 'Fastest organic reach. Songs go viral here first.' },
  { platform: 'YouTube', emoji: '▶️', cost: 0, desc: 'Music videos, behind the scenes, long-form.' },
  { platform: 'Twitter/X', emoji: '🐦', cost: 0, desc: 'Real-time fan connection. Culture conversations.' },
];

const AESTHETICS: ArtistAesthetic[] = [
  'Street', 'Luxury', 'Afrocentric', 'Minimalist', 'Avant-garde', 'Vintage', 'Futuristic', 'Raw & Authentic',
];

export default function ImageScreen() {
  const dispatch = useDispatch();
  const player = useSelector((s: RootState) => s.player.data);
  const [section, setSection] = useState<Section>('overview');

  if (!player) return null;

  const { imageProfile } = player;
  const ownedWardrobeIds = player.inventory.wardrobeItems.map((w) => w.id);
  const setupPlatforms = player.socialAccounts.map((s) => s.platform);

  const totalImageScore = imageProfile.imageScore;
  const canAdvance = totalImageScore >= 60 && imageProfile.photoshootDone && player.socialAccounts.length >= 2;

  function handleBuyWardrobe(id: string) {
    const item = WARDROBE_ITEMS.find((w) => w.id === id)!;
    if (player!.money < item.cost) {
      Alert.alert('Not enough money', `You need $${item.cost}. You have $${player!.money}.`);
      return;
    }
    dispatch(gainMoney(-item.cost));
    dispatch(purchaseWardrobeItem(item));
    dispatch(updateStats({ image: item.imageBonus }));
    dispatch(gainXP(40));
    Alert.alert('🛍️ Wardrobe Updated', `${item.name} added. Image +${item.imageBonus}`);
  }

  function handleBookPhotoshoot(photographerId: string) {
    const photographer = PHOTOGRAPHERS.find((p) => p.id === photographerId)!;
    if (player!.money < photographer.cost) {
      Alert.alert('Not enough money', `You need $${photographer.cost}.`);
      return;
    }
    if (player!.inventory.wardrobeItems.length === 0) {
      Alert.alert('Get a wardrobe first', 'You need at least one wardrobe item before the shoot.');
      return;
    }
    dispatch(gainMoney(-photographer.cost));
    dispatch(completePhotoshoot({ photographerQuality: photographer.quality }));
    dispatch(gainXP(80));
    dispatch(advanceTime(1));
    Alert.alert(
      '📸 Photoshoot Complete!',
      `Shot with ${photographer.name}.\nImage score boosted by ${photographer.quality * 8}.\n+80 XP`
    );
  }

  function handleSetupSocial(platform: SocialPlatform) {
    if (setupPlatforms.includes(platform)) return;
    dispatch(setupSocialAccount(platform));
    dispatch(gainXP(30));
    Alert.alert('📱 Account Created', `@${player!.artistName.toLowerCase().replace(/\s/g, '_')} on ${platform}\n+30 XP`);
  }

  function handleSetAesthetic(aesthetic: ArtistAesthetic) {
    dispatch(setAesthetic(aesthetic));
    dispatch(gainXP(20));
  }

  function handleAdvancePhase() {
    if (!canAdvance) return;
    dispatch(advanceArtistPhase('pre_production'));
    Alert.alert(
      '🎨 Image Phase Complete!',
      'Your brand is locked in. The look is right. Now it\'s time to make the music.\n\nWelcome to Pre-Production.',
      [{ text: 'Let\'s Go 🎤', style: 'default' }]
    );
  }

  const nav = [
    { id: 'overview', label: '📋 Overview' },
    { id: 'aesthetic', label: '🎨 Aesthetic' },
    { id: 'wardrobe', label: '👔 Wardrobe' },
    { id: 'photographer', label: '📸 Photoshoot' },
    { id: 'social', label: '📱 Social' },
  ] as { id: Section; label: string }[];

  return (
    <LinearGradient colors={['#0a0a1a', '#0d0d1f']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>IMAGE</Text>
        <View style={[styles.scoreBadge, { borderColor: totalImageScore >= 60 ? '#1DB954' : '#F5A623' }]}>
          <Text style={[styles.scoreNum, { color: totalImageScore >= 60 ? '#1DB954' : '#F5A623' }]}>
            {totalImageScore}
          </Text>
          <Text style={styles.scoreLabel}>/100</Text>
        </View>
      </View>

      {/* Nav */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navScroll} contentContainerStyle={styles.navContent}>
        {nav.map((n) => (
          <TouchableOpacity
            key={n.id}
            style={[styles.navItem, section === n.id && styles.navItemActive]}
            onPress={() => setSection(n.id)}
          >
            <Text style={[styles.navText, section === n.id && styles.navTextActive]}>{n.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* ── OVERVIEW ── */}
        {section === 'overview' && (
          <View>
            <Text style={styles.sectionDesc}>
              In today's music industry, your image travels before your music does. Before you record a single note, the world needs to know WHO you are. Complete all steps to unlock the studio.
            </Text>

            {[
              { label: 'Aesthetic chosen', done: !!imageProfile.aesthetic, emoji: '🎨' },
              { label: 'Wardrobe purchased', done: player.inventory.wardrobeItems.length > 0, emoji: '👔' },
              { label: 'Photoshoot completed', done: imageProfile.photoshootDone, emoji: '📸' },
              { label: '2+ social accounts set up', done: player.socialAccounts.length >= 2, emoji: '📱' },
              { label: '3 posts published', done: false, emoji: '📝' },
              { label: 'Image Score ≥ 60', done: totalImageScore >= 60, emoji: '⭐' },
            ].map((step, i) => (
              <View key={i} style={styles.checkRow}>
                <Text style={styles.checkEmoji}>{step.done ? '✅' : '◻️'}</Text>
                <Text style={styles.checkEmoji}>{step.emoji}</Text>
                <Text style={[styles.checkLabel, step.done && styles.checkDone]}>{step.label}</Text>
              </View>
            ))}

            <View style={styles.scoreBar}>
              <Text style={styles.scoreBarLabel}>Image Score</Text>
              <View style={styles.scoreBarTrack}>
                <View style={[styles.scoreBarFill, {
                  width: `${totalImageScore}%`,
                  backgroundColor: totalImageScore >= 60 ? '#1DB954' : '#F5A623',
                }]} />
                <View style={styles.scoreBarTarget} />
              </View>
              <Text style={styles.scoreBarNum}>{totalImageScore}/100 (need 60)</Text>
            </View>

            {canAdvance ? (
              <TouchableOpacity style={styles.advanceBtn} onPress={handleAdvancePhase} activeOpacity={0.8}>
                <Text style={styles.advanceBtnText}>✅ IMAGE COMPLETE — ENTER PRE-PRODUCTION →</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.advanceBtnDisabled}>
                <Text style={styles.advanceBtnDisabledText}>Complete all steps to unlock Pre-Production</Text>
              </View>
            )}
          </View>
        )}

        {/* ── AESTHETIC ── */}
        {section === 'aesthetic' && (
          <View>
            <Text style={styles.sectionDesc}>
              Your aesthetic is your visual DNA. It should feel authentic — not like a costume. Everything from your wardrobe to your photoshoot to your social feed will be filtered through this lens.
            </Text>
            {AESTHETICS.map((ae) => {
              const isSelected = imageProfile.aesthetic === ae;
              const color = AESTHETIC_COLORS[ae];
              return (
                <TouchableOpacity
                  key={ae}
                  style={[styles.aestheticCard, { borderColor: isSelected ? color : '#1a1a1a' }]}
                  onPress={() => handleSetAesthetic(ae)}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={isSelected ? [`${color}22`, '#0a0a1a'] : ['#111', '#0a0a1a']} style={styles.aestheticInner}>
                    <Text style={[styles.aestheticName, { color: isSelected ? color : '#fff' }]}>{ae}</Text>
                    <Text style={styles.aestheticDesc}>{AESTHETIC_DESCRIPTIONS[ae]}</Text>
                    {isSelected && <Text style={[styles.selectedTag, { color }]}>✓ SELECTED</Text>}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* ── WARDROBE ── */}
        {section === 'wardrobe' && (
          <View>
            <Text style={styles.sectionDesc}>
              You don't need designer to look intentional — but you do need to look like someone who has a vision. Each piece boosts your Image Score.
            </Text>
            {WARDROBE_ITEMS.filter((w) =>
              !imageProfile.aesthetic || w.aesthetic === imageProfile.aesthetic || w.aesthetic === 'Raw & Authentic'
            ).map((item) => {
              const owned = ownedWardrobeIds.includes(item.id);
              const canAfford = player.money >= item.cost;
              return (
                <View key={item.id} style={[styles.itemCard, owned && styles.itemOwned]}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemAesthetic}>{item.aesthetic}</Text>
                    <Text style={styles.itemDesc}>{item.description}</Text>
                    <Text style={styles.itemBonus}>Image +{item.imageBonus}</Text>
                  </View>
                  {owned ? (
                    <View style={styles.ownedBadge}><Text style={styles.ownedText}>OWNED</Text></View>
                  ) : (
                    <TouchableOpacity
                      style={[styles.buyBtn, !canAfford && styles.buyBtnDisabled]}
                      onPress={() => handleBuyWardrobe(item.id)}
                      disabled={!canAfford}
                    >
                      <Text style={[styles.buyBtnText, !canAfford && { color: '#444' }]}>${item.cost}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* ── PHOTOGRAPHER ── */}
        {section === 'photographer' && (
          <View>
            <Text style={styles.sectionDesc}>
              A great photographer doesn't just take photos — they create an image. The right press photo follows you throughout your career. Invest wisely.
            </Text>
            {imageProfile.photoshootDone && (
              <View style={styles.doneBanner}>
                <Text style={styles.doneBannerText}>✅ Photoshoot completed! Your press photos are ready.</Text>
              </View>
            )}
            {PHOTOGRAPHERS.map((p) => (
              <View key={p.id} style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{p.name}</Text>
                  <Text style={styles.itemAesthetic}>{p.specialty} · {'⭐'.repeat(p.quality)}</Text>
                  <Text style={styles.itemDesc}>{p.description}</Text>
                  <Text style={styles.itemBonus}>Image +{p.quality * 8}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.buyBtn, player.money < p.cost && styles.buyBtnDisabled]}
                  onPress={() => handleBookPhotoshoot(p.id)}
                  disabled={player.money < p.cost}
                >
                  <Text style={[styles.buyBtnText, player.money < p.cost && { color: '#444' }]}>${p.cost.toLocaleString()}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* ── SOCIAL ── */}
        {section === 'social' && (
          <View>
            <Text style={styles.sectionDesc}>
              Your social media presence needs to exist BEFORE you drop music. Set up your accounts, secure your handle, and start posting content that builds anticipation.
            </Text>
            {SOCIAL_PLATFORMS.map(({ platform, emoji, desc }) => {
              const isSetup = setupPlatforms.includes(platform);
              return (
                <View key={platform} style={[styles.itemCard, isSetup && styles.itemOwned]}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{emoji} {platform}</Text>
                    <Text style={styles.itemDesc}>{desc}</Text>
                    {isSetup && (
                      <Text style={styles.itemBonus}>
                        @{player.artistName.toLowerCase().replace(/\s/g, '_')} · {
                          player.socialAccounts.find((s) => s.platform === platform)?.followers ?? 0
                        } followers
                      </Text>
                    )}
                  </View>
                  {isSetup ? (
                    <View style={styles.ownedBadge}><Text style={styles.ownedText}>LIVE</Text></View>
                  ) : (
                    <TouchableOpacity style={styles.buyBtn} onPress={() => handleSetupSocial(platform)}>
                      <Text style={styles.buyBtnText}>FREE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
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
  scoreBadge: { flexDirection: 'row', alignItems: 'baseline', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  scoreNum: { fontSize: 22, fontWeight: '900' },
  scoreLabel: { fontSize: 12, color: '#555', marginLeft: 2 },
  navScroll: { maxHeight: 44 },
  navContent: { paddingHorizontal: 16, gap: 8 },
  navItem: { paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  navItemActive: { borderBottomColor: '#1DB954' },
  navText: { fontSize: 12, color: '#555', fontWeight: '700' },
  navTextActive: { color: '#1DB954' },
  scroll: { padding: 16, paddingBottom: 40 },
  sectionDesc: { fontSize: 13, color: '#888', lineHeight: 19, marginBottom: 16 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  checkEmoji: { fontSize: 16 },
  checkLabel: { fontSize: 13, color: '#aaa', flex: 1 },
  checkDone: { color: '#1DB954', textDecorationLine: 'line-through' },
  scoreBar: { marginTop: 16, marginBottom: 20 },
  scoreBarLabel: { fontSize: 10, color: '#555', letterSpacing: 2, marginBottom: 6 },
  scoreBarTrack: { height: 8, backgroundColor: '#1a1a1a', borderRadius: 4, position: 'relative' },
  scoreBarFill: { position: 'absolute', height: '100%', borderRadius: 4 },
  scoreBarTarget: { position: 'absolute', left: '60%', top: -2, width: 2, height: 12, backgroundColor: '#fff' },
  scoreBarNum: { fontSize: 11, color: '#666', marginTop: 6 },
  advanceBtn: { backgroundColor: '#1DB954', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  advanceBtnText: { fontSize: 13, fontWeight: '900', color: '#000', letterSpacing: 1 },
  advanceBtnDisabled: { backgroundColor: '#111', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  advanceBtnDisabledText: { fontSize: 12, color: '#444', textAlign: 'center' },
  aestheticCard: { borderRadius: 12, borderWidth: 1, marginBottom: 10, overflow: 'hidden' },
  aestheticInner: { padding: 14 },
  aestheticName: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  aestheticDesc: { fontSize: 12, color: '#777', lineHeight: 17 },
  selectedTag: { fontSize: 10, fontWeight: '900', letterSpacing: 2, marginTop: 8 },
  itemCard: { backgroundColor: '#111', borderRadius: 10, padding: 14, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemOwned: { borderWidth: 1, borderColor: '#1DB95444' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '800', color: '#fff', marginBottom: 2 },
  itemAesthetic: { fontSize: 10, color: '#888', marginBottom: 4, letterSpacing: 1 },
  itemDesc: { fontSize: 12, color: '#666', lineHeight: 16, marginBottom: 4 },
  itemBonus: { fontSize: 11, color: '#1DB954', fontWeight: '700' },
  buyBtn: { backgroundColor: '#1DB954', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, minWidth: 60, alignItems: 'center' },
  buyBtnDisabled: { backgroundColor: '#222' },
  buyBtnText: { fontSize: 12, fontWeight: '800', color: '#000' },
  ownedBadge: { backgroundColor: '#1DB95422', borderWidth: 1, borderColor: '#1DB954', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  ownedText: { fontSize: 10, color: '#1DB954', fontWeight: '900', letterSpacing: 1 },
  doneBanner: { backgroundColor: '#1DB95422', borderRadius: 8, padding: 12, marginBottom: 12 },
  doneBannerText: { fontSize: 13, color: '#1DB954' },
});
