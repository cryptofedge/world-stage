import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { createPlayer } from '../store/playerSlice';
import { setPhase } from '../store/gameSlice';

const PATH_CONFIG = {
  artist: {
    heading: 'YOUR STORY BEGINS',
    subheading: "You're starting out in Lagos with $50 and a dream.\nHustle for cash, build your image, then drop the music.",
    namePlaceholder: 'Fellito Rodriguez',
    artistLabel: 'ARTIST NAME',
    artistPlaceholder: 'The name the world will know',
    buttonLabel: 'START IN LAGOS 🇳🇬',
    accentColor: '#1DB954',
    gradientColors: ['#0a0a1a', '#0d1a10'] as [string, string],
    startingMoney: 50,
    stats: [
      { label: 'Talent', value: 10, color: '#1DB954' },
      { label: 'Charisma', value: 10, color: '#F5A623' },
      { label: 'Business', value: 5, color: '#6C63FF' },
      { label: 'Hustle', value: 5, color: '#FF6B8A' },
      { label: 'Global Reach', value: 0, color: '#00D4FF' },
    ],
  },
  label: {
    heading: 'BUILD YOUR EMPIRE',
    subheading: "You're a label exec with $500 and zero roster.\nSign hungry talent, develop them, get someone to Diamond.",
    namePlaceholder: 'Your real name',
    artistLabel: 'LABEL NAME',
    artistPlaceholder: 'e.g. Black Wave Records',
    buttonLabel: 'OPEN YOUR LABEL 🏢',
    accentColor: '#6C63FF',
    gradientColors: ['#0a0a1a', '#0d0a1a'] as [string, string],
    startingMoney: 500,
    stats: [
      { label: 'Business', value: 10, color: '#6C63FF' },
      { label: 'Charisma', value: 8, color: '#F5A623' },
      { label: 'Scouting', value: 5, color: '#1DB954' },
      { label: 'Production', value: 3, color: '#FF6B8A' },
      { label: 'Global Reach', value: 0, color: '#00D4FF' },
    ],
  },
};

export default function CharacterCreationScreen() {
  const dispatch = useDispatch();
  const careerPath = useSelector((s: RootState) => s.game.careerPath) ?? 'artist';
  const config = PATH_CONFIG[careerPath];

  const [name, setName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [error, setError] = useState('');

  function handleStart() {
    if (!name.trim()) { setError('Enter your real name.'); return; }
    if (!artistName.trim()) {
      setError(careerPath === 'label' ? 'Every label needs a name.' : 'Every artist needs a name.');
      return;
    }
    dispatch(createPlayer({ name: name.trim(), artistName: artistName.trim(), careerPath }));
    dispatch(setPhase('playing'));
  }

  return (
    <LinearGradient colors={config.gradientColors} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.heading, { color: config.accentColor }]}>{config.heading}</Text>
          <Text style={styles.subheading}>{config.subheading}</Text>

          <View style={[styles.moneyBadge, { borderColor: config.accentColor }]}>
            <Text style={[styles.moneyBadgeText, { color: config.accentColor }]}>
              💵 Starting cash: ${config.startingMoney}
            </Text>
          </View>

          <Text style={styles.label}>YOUR NAME</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={config.namePlaceholder}
            placeholderTextColor="#444"
            maxLength={30}
          />

          <Text style={styles.label}>{config.artistLabel}</Text>
          <TextInput
            style={styles.input}
            value={artistName}
            onChangeText={setArtistName}
            placeholder={config.artistPlaceholder}
            placeholderTextColor="#444"
            maxLength={30}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.statsPreview}>
            <Text style={styles.statsTitle}>STARTING STATS</Text>
            {config.stats.map((stat) => (
              <View key={stat.label} style={styles.statRow}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <View style={styles.statBar}>
                  <View style={[styles.statFill, { width: `${stat.value}%`, backgroundColor: stat.color }]} />
                </View>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              </View>
            ))}
            <Text style={styles.statsNote}>Stats grow as you hustle, record, and perform.</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: config.accentColor }]}
            onPress={handleStart