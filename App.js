/***** Commented by Raghu
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/AppNavigator';

function App() {
  return (
    <NavigationContainer>
       <AppNavigator/>
    </NavigationContainer>
  );
}

export default App;
***/

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/AppNavigator';
import { useAppTheme } from './src/theme';
import { StatusBar } from 'react-native';

function App() {
  const theme = useAppTheme();

  return (
    <>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer
        theme={{
          dark: theme.mode === 'dark',
          colors: {
            background: theme.colors.background,
            card: theme.colors.card,
            border: theme.colors.border,
            primary: theme.colors.primary,
            text: theme.colors.text,
            notification: theme.colors.accent,
          },
        }}
      >
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
