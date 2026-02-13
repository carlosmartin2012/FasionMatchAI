import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import MainNavigation from './src/navigation/MainNavigation';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <MainNavigation />
        <StatusBar style="auto" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
