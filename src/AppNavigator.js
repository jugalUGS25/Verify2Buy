
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RewardScreen from './RewardScreen';
import History from './History';
import Login from './Login';
import Logout from './Logout';
import { Text, View, StyleSheet } from 'react-native';
import Guide from './Guide';
import CameraView from './CameraView';
import Terms from './Terms';
// import CameraView2 from './CameraView2';





const Stack = createNativeStackNavigator();



const AppNavigator = () => {

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerTintColor: '#3078a4',
    }}>
      <Stack.Screen name="Home" component={Login} options={{
        headerTitle: () => (
          <View>
            <Text style={styles.Headertext}>
              Home
            </Text>
          </View>
        )
      }} />
      <Stack.Screen name="Scanner" component={CameraView} options={{
        headerTitle: () => (
          <View>
            <Text style={styles.Headertext}>
              Scanner
            </Text>
          </View>
        )
      }} />
      <Stack.Screen name="RewardScreen" component={RewardScreen} options={{
        headerTitle: () => (
          <View>
            <Text style={styles.Headertext}>
              Rewards
            </Text>
          </View>
        )
      }} />
      <Stack.Screen name="History" component={History} options={{
        headerTitle: () => (
          <View>
            <Text style={styles.Headertext}>
              History
            </Text>
          </View>
        )
      }} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="Privacy Policy" component={Terms} />
      <Stack.Screen name="Guide" component={Guide} options={{
        headerTitle: () => (
          <View>
            <Text style={styles.Headertext}>
              App Guide
            </Text>
          </View>
        )
      }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  Headertext: {
    fontFamily: 'Roboto',
    color: '#3078a4',
    fontSize: 20
  }
})