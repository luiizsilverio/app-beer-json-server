import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
// import 'react-native-gesture-handler';

import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold  
} from '@expo-google-fonts/roboto';

import { 
  Orbitron_400Regular,  
} from '@expo-google-fonts/orbitron'

import theme from './src/styles/theme';
import { Loading } from './src/components/Loading'
import { Routes } from './src/routes';
import { AppProvider } from './src/contexts';

export default function App() {  
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,  
    Orbitron_400Regular  
  });

  if (!fontsLoaded) {
    return <Loading bgColor={ theme.colors.background }/>;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor="transparent" translucent/>      
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
