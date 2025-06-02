
import React, { useEffect, useState,useRef } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraView from './CameraView';
import RewardScreen from './RewardScreen';
import History from './History';
import Login from './Login';
import Logout from './Logout';
import { Pressable, Text,View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Guide from './Guide';
import {openDatabase} from 'react-native-sqlite-storage'
var db = openDatabase({name:'r2a.db'})

const Stack = createNativeStackNavigator();



const AppNavigator = () => {

  //  const [rewardscode, setrewardscode]=useState([])

  // const getrewards = () => {
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM r2a_rewardstable', [], (tx, res) => {
  //       if (res.rows.length > 0) {
  //         let lastItem = res.rows.item(res.rows.length - 1); 
  //         setrewardscode([lastItem]); 
  //       } else {
  //         setrewardscode([]); 
  //       }
  //     });
  //   });
  // };

  //   useEffect(() => {
  //     getrewards()
  //     }, []) 
  

  return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerTintColor: '#3078a4', 
      }}>
         <Stack.Screen name="Home" component={Login} options={{
          headerTitle: () => (
            <View>
            <Text style={{ fontFamily: 'Roboto', color: '#3078a4', fontSize: 20 }}>
              Home
            </Text>
          </View>
          )
         }}/>
        {/* <Stack.Screen name="Home" 
        component={Login} 
        options={{
          headerLeft: () =>
            < Button onPress={() => {
              click(); 
            }}>
            <Icon
              name="menu"
              size={25}
            />,
          </Button>
        }} /> */}
        <Stack.Screen name="Scanner" component={CameraView} options={{
          headerTitle: () => (
            <View>
            <Text style={{ fontFamily: 'Roboto', color: '#3078a4', fontSize: 20 }}>
              Scanner
            </Text>
          </View>
          )
         }}/>
        {/* <Stack.Screen name="Scanner" component={CameraView} options={{ headerRight: () =>  
        <>
           <Icon
           name="star"
           size={25}
           color="#00C4CC"
          />
       {rewardscode && rewardscode.length > 0 ? (
                     rewardscode.map((item, index) =>
                       item ? (
                 <Text style={{fontSize: 20, fontWeight: '800', color: '#00C4CC'}}>{item.rewards_points}</Text>
                       ) : null
                     )
                   ) : null}
          </>}} /> */}
        <Stack.Screen name="RewardScreen" component={RewardScreen} options={{
          headerTitle: () => (
            <View>
            <Text style={{ fontFamily: 'Roboto', color: '#3078a4', fontSize: 20 }}>
              Rewards
            </Text>
          </View>
          )
         }}/>
        <Stack.Screen name="History" component={History} options={{
          headerTitle: () => (
            <View>
            <Text style={{ fontFamily: 'Roboto', color: '#3078a4', fontSize: 20 }}>
              History
            </Text>
          </View>
          )
         }}/>
        <Stack.Screen name="Logout" component={Logout}/>
        <Stack.Screen name="Guide" component={Guide} options={{
          headerTitle: () => (
            <View>
            <Text style={{ fontFamily: 'Roboto', color: '#3078a4', fontSize: 20 }}>
              App Guide
            </Text>
          </View>
          )
         }}/>
      </Stack.Navigator>
  );
};

export default AppNavigator;