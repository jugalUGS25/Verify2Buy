// App.js - Updated with Stack Navigator for ScanResultScreen

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, Platform } from 'react-native';

// Import screens
import HomeScreen from './src/HomeScreen';
import History from './src/History';
import RewardScreen from './src/RewardScreen';
import MoreScreen from './src/MoreScreen';
import CameraView from './src/CameraView';
import ScanResultScreen from './src/screens/ScanResultScreen';  // ← FIXED PATH
import Settings from './src/Settings';
import Guide from './src/Guide';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logout from './src/Logout';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab Navigator
function BottomTabs() {
   const insets = useSafeAreaInsets(); 
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6200',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        // tabBarStyle: {
        //   backgroundColor: '#1A1A1A',
        //   borderTopWidth: 2,
        //   borderTopColor: '#FF6200',
        //   height: Platform.OS === 'ios' ? 85 : 65,
        //   paddingBottom: Platform.OS === 'ios' ? 25 : 10,
        //   paddingTop: 10,
        //   elevation: 8,
        //   shadowColor: '#FF6200',
        //   shadowOffset: { width: 0, height: -2 },
        //   shadowOpacity: 0.3,
        //   shadowRadius: 8,
        // },
         tabBarStyle: {
          backgroundColor: '#1A1A1A',
          // borderTopWidth: 2,
          // borderTopColor: '#FF6200',
          // height: Platform.OS === 'ios' ? 85 : 65,
          height: 70 + insets.bottom,
         // paddingBottom: Platform.OS === 'ios' ? 25 : 10,
         paddingBottom: insets.bottom, 
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#FF6200',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
           position: 'absolute',
          borderTopWidth: 2, 
          borderTopColor: '#e7691b',
          borderRightWidth:2,
          borderRightColor:'#e7691b',
          borderLeftWidth:2,
          borderLeftColor:'#e7691b',
          borderBottomWidth: 2, 
        borderBottomColor: '#e7691b',
        borderColor:'#e7691b'
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="History" 
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Scan" 
        component={CameraView}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={styles.scanButtonContainer}>
              <View style={styles.scanButton}>
                <Icon name="barcode-scan" size={32} color="#FFFFFF" />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Rewards" 
        component={RewardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="gift" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="dots-horizontal" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen 
          name="ScanResultScreen" 
          component={ScanResultScreen}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Guide" component={Guide} />
        <Stack.Screen name="Logout" component={Logout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scanButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#FF6200',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#1A1A1A',
  },
});

export default App;