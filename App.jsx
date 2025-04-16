import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AppContextProvider } from './src/context/AppContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </AppContextProvider>
    </SafeAreaProvider>
  );
}