import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Screens
import MainMenuScreen from '../screens/MainMenuScreen';
import CharacterCreationScreen from '../screens/CharacterCreationScreen';
import WorldMapScreen from '../screens/WorldMapScreen';
import RegionScreen from '../screens/RegionScreen';
import StudioScreen from '../screens/StudioScreen';
import QuestsScreen from '../screens/QuestsScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  MainMenu: undefined;
  CharacterCreation: undefined;
  Game: undefined;
  Region: { regionId: string };
};

export type TabParamList = {
  WorldMap: undefined;
  Studio: undefined;
  Quests: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function GameTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0a1a',
          borderTopColor: '#1a1a2e',
        },
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: '#555',
      }}
    >
      <Tab.Screen name="WorldMap" component={WorldMapScreen} options={{ title: 'World' }} />
      <Tab.Screen name="Studio" component={StudioScreen} options={{ title: 'Studio' }} />
      <Tab.Screen name="Quests" component={QuestsScreen} options={{ title: 'Quests' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Artist' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const phase = useSelector((state: RootState) => state.game.phase);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {phase === 'main_menu' && (
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        )}
        {phase === 'character_creation' && (
          <Stack.Screen name="CharacterCreation" component={CharacterCreationScreen} />
        )}
        {(phase === 'playing') && (
          <>
            <Stack.Screen name="Game" component={GameTabs} />
            <Stack.Screen name="Region" component={RegionScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
