import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator from './src/AppNavigator';

//const Drawer = createDrawerNavigator();

// const MyDrawer = createDrawerNavigator({
//   screens: {
//     Home: HomeScreen,
//     Profile: Homepage,
//   },
// });

function App() {
 // const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
       <AppNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 200,
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
  tinyLogo: {
    width: 30,
    height: 30,
  },
});

export default App;