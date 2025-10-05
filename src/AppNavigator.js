
import React, {  useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RewardScreen from './RewardScreen';
import History from './History';
import Logout from './Logout';
import { Text, View, StyleSheet } from 'react-native';
import Guide from './Guide';
import CameraView from './CameraView';
import Terms from './Terms';
import Settings from './Settings';
import ThemeContext from './themes/ThemeContext';
import Login from './Login';
import LoginNew from './LoginNew';





const Stack = createNativeStackNavigator();



const AppNavigator = () => {

    const { isDarkMode } = useContext(ThemeContext);

    const styles = StyleSheet.create({
  Headertext: {
    fontFamily: 'Roboto',
    color: !isDarkMode ?  '#3078a4' : '#1D211D',
    fontSize: 20
  }
})

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerTintColor: !isDarkMode ?  '#3078a4' : '#1D211D',
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

{/* neel code - LoginNew page for inside dark mode change */}

       {/* <Stack.Screen name="Home" component={LoginNew} options={{
        headerTitle: () => (
          <View>
            <Text style={styles.Headertext}>
              Home
            </Text>
          </View>
        )
      }} /> */}
{/* neel code - inside dark mode change */}
 
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
      <Stack.Screen name="Settings" component={Settings} />
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

