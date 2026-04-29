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
import VictoryScreen from '../screens/VictoryScreen';
import LabelDashboardScreen from '../screens/LabelDashboardScreen';

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
  Label: undefined;
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
  Label: '🏢',
  Image: '🎨',
  Studio: '🎙️',
  Tour: '🚌',
  Quests: '🎯',
  Profile: '👤',
};

function GameTabs() {
  const player = useSelector((s: RootState) => s.player.data);
  const phase = player?.artistPhase ?? 'origins';
  const careerPath = player?.careerPath ?? 'artist';

  // Artist path: phase-gated tabs
  const showImage = careerPath === 'artist' && ['image', 'pre_production', 'recording', 'distribution', 'promotion', 'touring', 'certified'].includes(phase);
  const showStudio = careerPath === 'artist' && ['pre_production', 'recording', 'distribution', 'promotion', 'touring', 'certified'].includes(phase);
  const showTour = careerPath === 'artist' && ['touring', 'certified'].includes(phase);

  // Label path: always show Label tab instead of artist-specific tabs
  const showLabel = careerPath === 'label';

  return (
    