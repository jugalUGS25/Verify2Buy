
import React, {  useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RewardScreen from './RewardScreen';
import History from './History';
import Logout from './Logout';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Guide from './Guide';
//import CameraView from './CameraView';
//import ScannerScreen from './CameraView';
import Terms from './Terms';
import Settings from './Settings';
import ThemeContext from './themes/ThemeContext';
import Login from './Login';
import ScanResultScreen from './screens/ScanResultScreen'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'



const Stack = createNativeStackNavigator();



const AppNavigator = () => {

    const { isDarkMode } = useContext(ThemeContext);

    const styles = StyleSheet.create({
  Headertext: {
    fontFamily: 'Roboto',
    color: !isDarkMode ?  '#3078a4' : '#1D211D',
    fontSize: 20
  },
   Headertextcontainer: {
    //  flex: 1, 
    //  alignItems: 'flex-end', 
    //  paddingRight: 215 
    marginLeft:10
  }
})

 const navigation = useNavigation();

  const handelback = () => {
    navigation.navigate('Home');
  };

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerTintColor: !isDarkMode ?  '#3078a4' : '#1D211D',
    }}>
    
    

      {/* <Stack.Screen name="Home" component={Login} options={{
        headerTitle: () => (
          <View>
            <Text style={styles.Headertext}>
              Home
            </Text>
          </View>
        )
      }} /> */}

{/* neel code - LoginNew page for inside dark mode change */}

       <Stack.Screen name="Home" component={Login} options={{
         headerBackVisible: false, 
        headerTitle: () => (
          <View>
            <Text style={styles.Headertext}>
              Home
            </Text>
          </View>
        ),
        
      }} />
{/* neel code - inside dark mode change */}
 
      <Stack.Screen name="Scanner" component={CameraView} options={{
        headerTitle: () => (
          <View style={styles.Headertextcontainer}>
            <Text style={styles.Headertext}>
              Scanner
            </Text>
          </View>
        ),
         headerLeft: () => (
           <TouchableOpacity  onPress={handelback}>
          <Icon
            name="arrow-back"
            size={25}
            color="#0a0a0aff"
          />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="RewardScreen" component={RewardScreen} options={{
        headerTitle: () => (
          <View style={styles.Headertextcontainer}>
            <Text style={styles.Headertext}>
              Rewards
            </Text>
          </View>
        ),
         headerLeft: () => (
          <TouchableOpacity  onPress={handelback}>
          <Icon
            name="arrow-back"
            size={25}
            color="#0a0a0aff"
          />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="History" component={History} options={{
        headerTitle: () => (
          <View style={styles.Headertextcontainer}>
            <Text style={styles.Headertext}>
              History
            </Text>
          </View>
        ),
         headerLeft: () => (
          <TouchableOpacity  onPress={handelback}>
          <Icon
            name="arrow-back"
            size={25}
            color="#0a0a0aff"
          />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="Logout" component={Logout} 
         options={() => ({
        headerLeft: () => (
          <Icon
            name="arrow-back"
            size={25}
            color="#0a0a0aff"
            onPress={handelback}
          />
        ),
      })}/>
      <Stack.Screen name="Privacy Policy" component={Terms} 
         options={() => ({
        headerLeft: () => (
          <TouchableOpacity  onPress={handelback}>
          <Icon
            name="arrow-back"
            size={25}
            color="#0a0a0aff"
          />
          </TouchableOpacity>
        ),
         headerTitle: () => (
          <View style={styles.Headertextcontainer}>
            <Text style={styles.Headertext}>
             Privacy Policy
            </Text>
          </View>
        ),
      })}
      />
      <Stack.Screen name="Settings" component={Settings} 
         options={() => ({
        headerLeft: () => (
          <TouchableOpacity  onPress={handelback}>
          <Icon
            name="arrow-back"
            size={25}
            color="#0a0a0aff"
          />
          </TouchableOpacity>
        ),
         headerTitle: () => (
          <View style={styles.Headertextcontainer}>
            <Text style={styles.Headertext}>
             Settings
            </Text>
          </View>
        ),
        
      })}
      />
      <Stack.Screen name="Guide" component={Guide} options={{
        headerTitle: () => (
          <View style={styles.Headertextcontainer}>
            <Text style={styles.Headertext}>
              App Guide
            </Text>
          </View>
        ),
         headerLeft: () => (
           <TouchableOpacity  onPress={handelback}>
          <Icon
            name="arrow-back"
            size={25}
            color="#0a0a0aff"
          />
          </TouchableOpacity>
        ),
      }} />
     <Stack.Screen name="ScanResultScreen" component={ScanResultScreen} 
      
      options={({ navigation }) => ({
          headerTitle: () => (
          <View style={styles.Headertextcontainer}>
            <Text style={styles.Headertext}>
             Scan Result
            </Text>
          </View>
        ),
        headerLeft: () => (
          // <TouchableOpacity onPress={handelback}>
          //  <Text>Back</Text>
          //   </TouchableOpacity>
        <TouchableOpacity  onPress={handelback}>
          <Icon
            name="arrow-back"
            size={25}
            color="#0a0a0aff"
          />
          </TouchableOpacity>
        ),
      })}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;

