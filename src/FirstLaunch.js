import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, Linking, TouchableOpacity, Alert, Image, ScrollView, Modal, FlatList, Dimensions, useWindowDimensions } from 'react-native';
import RNExitApp from 'react-native-exit-app';

const FirstLaunch = () => {
 const [showPopup, setShowPopup] = useState(false);
//  const [Decline,setDecline]=useState(false)
 
const checkFirstLaunch = async () => {
  try {
    const hasLaunched = await AsyncStorage.getItem('hasLaunchedBefore');
    console.log('launch',hasLaunched)
   // return hasLaunched === null;
    if (hasLaunched === null) {
      return true;
    } 
    // Not the first launch
    return false;
  } catch (error) {
    console.error('Error checking first launch:', error);
    return false;
  }
};


useEffect(() => {
    const initializeApp = async () => {
      const isFirstLaunch = await checkFirstLaunch();
      if (isFirstLaunch) {
        setShowPopup(true);
      }
    };
    initializeApp();
  }, []);

const handelAccept = async () => {
  await AsyncStorage.setItem('hasLaunchedBefore', 'true');
  setShowPopup(false);
}
const handelDecline = async () => {
  RNExitApp.exitApp();
}


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.gridview}>
                  <ScrollView style={styles.guidescrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.fakeheader}>Disclaimer : </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                      <Text style={styles.faketext}>
                        The Verify2Buy application requires an active internet connection to scan and retrieve product information.
                        Standard data charges from your mobile network provider may apply.
                        {"\n"}
                        {"\n"}
                        Please note that Verify2Buy relies on UPC (Universal Product Code) and GS1 standards for product verification.
                        Some products or retailers, such as IKEA and others who do not participate in the UPC or GS1 systems, may not be verifiable
                        through our application.
                        {"\n"}
                        {"\n"}
                        Verify2Buy is a product verification facilitator only. Universum Global Solutions LLC does not sell, endorse, or
                        guarantee any products scanned through the app. Consumers are solely responsible for their purchasing decisions
                        and assume all risks associated with the purchase of any product.
                        {"\n"}
                        {"\n"}
                        While we strive to provide accurate and up-to-date product information, availability and accuracy of
                        data depend on external sources and manufacturer participation. Universum Global Solutions LLC is not
                        responsible for any inaccuracies, omissions, or missing product data.
                        {"\n"}
                        {"\n"}
                        By using Verify2Buy, you acknowledge and accept these terms.
                      </Text>
                    </View>
                  </ScrollView>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7, alignSelf: 'flex-end' }}>
                  <TouchableOpacity style={styles.errorbutton}>
                    <Text style={styles.errortext} onPress={handelAccept}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.errorbutton}>
                    <Text style={styles.errortext} onPress={handelDecline}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 20,
        // backgroundColor: 'white',
        backgroundColor:'#2C2C2E',
        // opacity: 0.8 ,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth:2,
        borderColor:'#e7691b'
      },
      gridview: {
        padding: 10,
        maxHeight: 400,
      },
      fakeheader: {
        fontSize: 19,
        // color: '#04467e',
        color:'#fff',
        // flex:1,
        flexWrap: "wrap"
      },
      faketext: {
        fontSize: 17,
        // color: '#04467e'
        color:'#fff'
      },
      errorbutton: {
        padding: 10,
        height: 40,
        width: 100,
        // backgroundColor: '#04467e',
        backgroundColor:'#FF6200',
        borderRadius: 50,
        // / borderColor:'rgb(253, 126, 20)',
        flex: '1',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
      },
   errortext: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Times New Roman", Times, serif',
    fontWeight: 'bold'
  },
})

export default FirstLaunch;