// import { useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { exitApp } from '../utils/ExitApp'; // adjust path if needed

// export default function Logout() {
//   useEffect(() => {
//     const logout = async () => {
//       try {
//         await AsyncStorage.removeItem('access_token');
//         exitApp(); // ✅ use the wrapper here
//       } catch (e) {
//         console.log('Logout error:', e);
//       }
//     };

//     logout();
//   }, []);

//   return null;
// }
import { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNExitApp from 'react-native-exit-app';
import { Platform } from 'react-native';

export default function Logout() {

  useEffect(() => {
    logout()
  }, [])
  const logout = async () => {
    if (Platform.OS === 'ios') {
      RNExitApp.exitApp();
    }
    else {
      //BackHandler.exitApp();
      RNExitApp.exitApp();
    }
  }
  return (
    <>
    </>
  );
};