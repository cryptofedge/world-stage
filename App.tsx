// Must be the FIRST import — required by @react-navigation/stack
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation';

export default function App() {
  return (
  