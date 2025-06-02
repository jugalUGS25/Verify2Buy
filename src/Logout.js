import { useEffect, useState,useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNExitApp from 'react-native-exit-app';
import {Platform} from 'react-native';

export default function Logout() {

    useEffect(() => {
        logout()
    }, [])
    const logout = async () => {
        await AsyncStorage.removeItem('access_token',);
        if(Platform.OS === 'ios')
          {
            RNExitApp.exitApp();
          }
          else{
            //BackHandler.exitApp();
            RNExitApp.exitApp();
          }
    }
    return (
        <>
        </>
    );
};
