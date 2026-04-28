import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { createPlayer } from '../store/playerSlice';
import { setPhase } from '../store/gameSlice';

export default function CharacterCreationScreen() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [error, setError] = useState('');

  function handleStart() {
    if (!name.trim()) { setError('Enter your real name.'); return; }
    if (!artistName.trim()) { setError('Every artist needs a name.'); return; }
    dispatch(createPlayer({ name: name.trim(), artistName: artistName.trim() }));
    dispatch(setPhase('playing'));
  }

  return (
    <LinearGradient colors={['#0a0a1a', '#0d1a10']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>YOUR STORY BEGINS</Text>
          <Text style={styles.subheading}>
            You're starting out in Lagos, Nigeria — the birthplace of Afrobeats.{'\n'}
            Build your reputation, then conquer the world.
          </Text>

          <Text style={styles.label}>YOUR NAME</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Fellito Rodriguez"
            placeholderTextColor="#444"
            maxLength={30}
          />

          <Text style={styles.label}>ARTIST NAME</Text>
          <TextInput
            style={styles.input}
            value={artistName}
            onChangeText={setArtistName}
            placeholder="The name the world will know"
            placeholderTextColor="#444"
            maxLength={30}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.statsPreview}>
            <Text style={styles.statsTitle}>STARTING STATS</Text>
            {[
              { label: 'Talent', value: 10, color: '#1DB954' },
              { label: 'Charisma', value: 10, color: '#F5A623' },
              { label: 'Business', value: 5, color: '#6C63FF' },
              { label: 'Production', value: 5, color: '#FF6B8A' },
              { label: 'Global Reach', value: 0, color: '#00D4FF' },
            ].map((stat) => (
              <View key={stat.label} style={styles.statRow}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <View style={styles.statBar}>
                  <View style={[styles.statFill, { width: `${stat.value}%`, backgroundColor: stat.color }]} />
                </View>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              </View>
            ))}
            <Text style={styles.statsNote}>Stats grow as you play, record, and perform.</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleStart} activeOpacity={0.8}>
            <Text style={styles.buttonText}>START IN LAGOS 🇳🇬</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  kav: { flex: 1 },
  content: { padding: 28, paddingTop: 60 },
  heading: {
    fontSize: 28, fontWeight: '900', color: '#1DB954',
    letterSpacing: 4, marginBottom: 12,
  },
  subheading: {
    fontSize: 14, color: '#aaa', lineHeight: 20,
    marginBottom: 36,
  },
  label: {
    fontSize: 11, color: '#666', letterSpacing: 2,
    marginBottom: 6, marginTop: 16,
  },
  input: {
    backgroundColor: '#111', borderWidth: 1, borderColor: '#222',
    borderRadius: 8, padding: 14, color: '#fff', fontSize: 16,
  },
  error: { color: '#ff4444', marginTop: 8, fontSize: 13 },
  statsPreview: {
    marginTop: 28, backgroundColor: '#111',
    borderRadius: 12, padding: 16,
  },
  statsTitle: {
    fontSize: 11, color: '#666', letterSpacing: 2, marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
  },
  statLabel: { width: 90, color: '#aaa', fontSize: 13 },
  statBar: {
    flex: 1, height: 6, backgroundColor: '#222',
    borderRadius: 3, marginHorizontal: 8,
  },
  statFill: { height: '100%', borderRadius: 3 },
  statValue: { width: 24, fontSize: 12, fontWeight: '700', textAlign: 'right' },
  statsNote: { fontSize: 11, color: '#444', marginTop: 8, fontStyle: 'italic' },
  button: {
    marginTop: 32, paddingVertical: 18,
    backgroundColor: '#1DB954', borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#000', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
});
