
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraView from './CameraView';
import RewardScreen from './RewardScreen';
import History from './History';
import Login from './Login';
import Logout from './Logout';
import { Text, View, StyleSheet } from 'react-native';
import Guide from './Guide';
import colors from './theme/colors';


const Stack = createNativeStackNavigator();



const AppNavigator = () => {

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerTintColor: colors.blue,
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
    color: colors.blue,
    fontSize: 20
  }
})