import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { startNewGame } from '../store/gameSlice';

export default function MainMenuScreen() {
  const dispatch = useDispatch();

  return (
    <LinearGradient colors={['#0a0a1a', '#1a0a2e', '#0a1a0a']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>WORLD STAGE</Text>
        <Text style={styles.subtitle}>A Music Industry RPG</Text>
        <Text style={styles.tagline}>
          From Lagos clubs to Tokyo Dome.{'\n'}Your journey starts with one track.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(startNewGame())}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>NEW GAME</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} activeOpacity={0.8}>
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>CONTINUE</Text>
        </TouchableOpacity>

        <View style={styles.regionPreviews}>
          {['🇳🇬', '🇬🇧', '🇰🇷', '🇺🇸', '🇧🇷', '🇿🇦', '🇯🇵'].map((flag, i) => (
            <Text key={i} style={styles.flag}>{flag}</Text>
          ))}
        </View>

        <Text style={styles.version}>v0.1.0 — Early Access</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#1DB954',
    letterSpacing: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    letterSpacing: 3,
    marginTop: 4,
    marginBottom: 24,
  },
  tagline: {
    fontSize: 15,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 48,
    fontStyle: 'italic',
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#1DB954',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  buttonTextSecondary: {
    color: '#1DB954',
  },
  regionPreviews: {
    flexDirection: 'row',
    marginTop: 48,
    gap: 12,
  },
  flag: { fontSize: 28 },
  version: {
    position: 'absolute',
    bottom: 32,
    color: '#444',
    fontSize: 12,
  },
});
