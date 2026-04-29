import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import { RootState } from '../store';

import MainMenuScreen from '../screens/MainMenuScreen';
import PathSelectionScreen from '../screens/PathSelectionScreen';
import CharacterCreationScreen from '../screens/CharacterCreationScreen';
import WorldMapScreen from '../screens/WorldMapScreen';
import RegionScreen from '../screens/RegionScreen';
import StudioScreen from '../screens/StudioScreen';
import QuestsScreen from '../screens/QuestsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HustleScreen from '../screens/HustleScreen';
import ImageScreen from '../screens/ImageScreen';
import TourScreen from '../screens/TourScreen';

export type RootStackParamList = {
  MainMenu: undefined;
  PathSelection: undefined;
  CharacterCreation: undefined;
  Game: undefined;
  Region: { regionId: string };
  Victory: undefined;
};

export type TabParamList = {
  WorldMap: undefined;
  Hustle: undefined;
  Image: undefined;
  Studio: undefined;
  Tour: undefined;
  Quests: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICON: Record<string, string> = {
  WorldMap: '🌍',
  Hustle: '💼',
  Image: '🎨',
  Studio: '🎙️',
  Tour: '🚌',
  Quests: '🎯',
  Profile: '👤',
};

function GameTabs() {
  const player = useSelector((s: RootState) => s.player.data);
  const phase = player?.artistPhase ?? 'origins';

  // Show tabs relevant to current phase
  const showImage = ['image', 'pre_production', 'recording', 'distribution', 'promotion', 'touring', 'certified'].includes(phase);
  const showStudio = ['pre_production', 'recording', 'distribution', 'promotion', 'touring', 'certified'].includes(phase);
  const showTour = ['touring', 'certified'].includes(phase);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0a0a1a', borderTopColor: '#1a1a2e' },
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: '#444',
        tabBarLabel: ({ color }) => (
          <Text style={{ color, fontSize: 9, letterSpacing: 0.5 }}>
            {route.name === 'WorldMap' ? 'WORLD' : r