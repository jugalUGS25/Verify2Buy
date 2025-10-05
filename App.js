import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from '@react-navigation/native';

import AppNavigator from './src/AppNavigator';
import ThemeProvider from './src/themes/ThemeProvider';
import { useAppTheme } from './src/theme';
 import { StatusBar } from 'react-native';

function App() {
   const theme = useAppTheme();
  
 const MyTheme = {
  ...DefaultTheme,
   colors: {
    ...(theme.mode === 'dark'
      ? {
            background: theme.colors.background,
            primary: theme.colors.primary,
            text: theme.colors.text,
            border: theme.colors.border,
            card: theme.colors.card,
            notification: theme.colors.accent
        }
      : {
            background: theme.colors.background,
            primary: theme.colors.primary,
            text: theme.colors.text,
            border: theme.colors.border,
            card: theme.colors.card,
            notification: theme.colors.accent
        }),
  },
};

// const Navigation = createStaticNavigation(Drawer);

  return (
    <>
{/* --------------------------------------------------------------------------------------------------------------------- */}
    {/* Raghu sir old code  */}
      {/* <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer
        theme={{
          dark: theme.mode === 'dark',
          colors: {
            background: theme.colors.background,
            primary: theme.colors.primary,
            text: theme.colors.text,
            border: theme.colors.border,
            card: theme.colors.card,
            notification: theme.colors.accent
          }
        }}>
        <AppNavigator/>
      </NavigationContainer> */}

  

 
{/* --------------------------------------------------------------------------------------------------------------------- */}
{/* updated code  */}
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer theme={MyTheme} >
        <AppNavigator />
      </NavigationContainer >
  


{/* --------------------------------------------------------------------------------------------------------------------- */}
{/* neel code - inside dark mode change */}

{/* <ThemeProvider>
    <NavigationContainer>
        <AppNavigator />
    </NavigationContainer >
  </ThemeProvider> */}
          
 


   </>

  );
}

export default App;