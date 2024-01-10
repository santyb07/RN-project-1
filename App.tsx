/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Appearance
} from 'react-native';

import AppNavigation from './src/navigation/appNavigation';
import AuthProvider from './src/context/AuthContext';
import SplashScreen from 'react-native-splash-screen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;


function App(): React.JSX.Element {


  return (
    <AuthProvider>
      <AppNavigation/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
