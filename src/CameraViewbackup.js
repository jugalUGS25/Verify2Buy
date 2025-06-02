import React, { useEffect, useState,useRef,useCallback } from 'react';
import { StyleSheet,View, Text, Platform, Linking, TouchableOpacity, Alert, Image, ScrollView,Animated, Modal,FlatList,Dimensions,ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Overlay } from './Overlay';
import { StatusBar } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner, useFrameProcessor,
  
 } from 'react-native-vision-camera';
import { Gesture, GestureDetector,GestureHandlerRootView } from 'react-native-gesture-handler'
import Dialog from "react-native-dialog";
import { PermissionsAndroid } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import ImageViewer from 'react-native-image-zoom-viewer';
import closeimg from '../assets/closeicon.png';
// import transimg from '../assets/trans.png'
import Translatelanguages from './Translate';
import glass from '../assets/glass.jpg'
import logo from '../assets/logo.png'
import logomain from '../assets/logomain.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// import firebase from '@react-native-firebase/app';
import DeviceInfo, { useIsEmulator } from 'react-native-device-info'
// import messaging from '@react-native-firebase/messaging';
import GetLocation from 'react-native-get-location'
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import RNExitApp from 'react-native-exit-app';
import MenuDrawer from 'react-native-side-drawer';
// import { runOnJS } from 'react-native-reanimated'
// import ImagePicker from 'react-native-image-crop-picker';
// import * as jsQR from 'jsqr'; 
// import Slider from './Slider';
// import RewardScreen from './RewardScreen';
// import { QRreader } from "react-native-qr-decode-image-camera";
// import logoutimg from '../assets/logout.jpg'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
//import axios from 'axios';

export default function CameraView({navigation}) {

  const [datacode, setdatacode] = useState('')
  const [product, setproduct] = useState('')
  const [productname, setproductname] = useState('')
  const [des, setdes] = useState('')
  const [category, setcategory] = useState('')
  const [region, setregion] = useState('')
  const [imageurl, setImage] = useState('')
  const [visible, setvisible] = useState(false)
  const [visibleimg, setvisibleimg] = useState(false)
  const [modalVisible, setmodalvisible] = useState(false)
  const [modalNofound, setmodalNofound] = useState(false)
  const [camerview, setcamerview] = React.useState(false);
  const [value, setvalue] = React.useState('');
  const [button, setbutton] = React.useState(false);
  const [devicebrand, setbarnd] = React.useState('');
  const [OS, setOS] = React.useState('');
  const [latitude, setlatitude] = React.useState('');
  const [longitude, setlongitude] = React.useState('');
  const [code_type, setcodetype] = React.useState('');
  const [fontSize, setFontSize] = useState(15);
  const [translatestate,Settranslatestate]=useState(false)
  const [translatetext,Settranslatetext]=useState('')
  const [counter, setCounter] = useState(0);
  // const [historydatas,setHistorydatas] = useState([])
  const[galleryimage,Setgalleryimage]=useState('')
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const[trochbutton,setTrochbutton]=useState("off")
  const[trochicon,setTrochicon]=useState(true)
  const [isOpen, setIsOpen] = useState(false);
  const [responsefail, setresponsefail] = useState(false);
  const [networkerror, setnetworkerror] = useState(false);
  const [scanbutton,setScanbutton]=useState(true)
  // const camera = useRef<Camera>(null)
  const devices = useCameraDevice(value)
  const translateY = useRef(new Animated.Value(0)).current;

  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet'
  //   console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
  // }, [])

  // const focus = useCallback((point) => {
  //   const c = camera.current
  //   if (c == null) return
  //   const normalizedPoint = {
  //     x: point.x / width,
  //     y: point.y / height,
  //   }
  
  //   c.setPointOfInterest(normalizedPoint)
  // }, [width, height])

  // const gesture = Gesture.Tap()
  // .onEnd(({ x, y }) => {
  //   runOnJS(focus)({ x, y })
  // })


  // const reagister = async()=>{
   
  //   const fcmToken = await messaging().getToken();
  //   console.log('fcmtoken',fcmToken)

  //   // if (Platform.OS === 'android') {
  //   //   try {
  //   //     const enableResult = await promptForEnableLocationIfNeeded();
  //   //     console.log('enableResult', enableResult)
  //   //     let brand = DeviceInfo.getBrand()
  //   //     console.log(brand)
  //   //     setbarnd(brand)
  //   //     setOS(Platform.OS)
  //   //   }
  //   //   catch (error) {
  //   //     if (error instanceof Error) {
  //   //       console.error(error.message);
  //   //     }
  //   //   }
  //   // }
  //     GetLocation.getCurrentPosition({
  //       enableHighAccuracy: true,
  //       // timeout: 60000,
  //     })
  //       .then(location => {
  //         setlatitude(location.latitude);
  //         setlongitude(location.longitude)
  //       })
  //       .catch(error => {
  //         const { code, message } = error;
  //         console.warn(code, message);
  //       })

  //   let data = {
  //     method: 'POST',
  //     credentials: 'same-origin',
  //     mode: 'same-origin',
  //     body: JSON.stringify({
  //       "userDeviceType":OS,
  //       "userDeviceId":deviceid,
  //       "userDeviceModel":devicebrand,
  //       "userDeviceLatitude": latitude,
  //       "userDeviceLongitude": longitude,
  //       "userDeviceLocation":"",
  //       "userDeviceCountry":"USA"
    
  //     }),
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }
  
  //   try {
  //     const response = await fetch("http://demo.solfordoc.com:8080/anticounterfeit/api/register", data);
  //     const res = await response.json();
  //     if (res) {
  //       // await AsyncStorage.setItem(
  //       //   'access_token',
  //       //   res.token
  //       // );
  //       console.log('deviceiddetails',res)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //       Alert.alert('', 'Network Error', [
  //           {
  //             text: 'Cancel',
  //             onPress: () => console.log('Cancel Pressed'),
  //             style: 'cancel',
  //           },
  //           {text: 'OK', onPress: () => console.log('OK Pressed')},
  //         ]);
  //   }

  //  }


  // const findFcmToken = async()=>{

  //   await messaging().registerDeviceForRemoteMessages();
  //   const granted = await messaging().requestPermission({
  //     alert: true,
  //     announcement: false,
  //     badge: true,
  //     carPlay: true,
  //     provisional: false,
  //     sound: true,
  //   });
  //   if (granted) {
  //     const fcmToken = await messaging().getToken();
  //     console.log("fcmToken::: ",fcmToken);
  //     await AsyncStorage.setItem(
  //       'deviceid',
  //       fcmToken
  //     );
  //   }
  //  }
  
 const trochon=()=>{
  setTrochbutton("on")
  setTrochicon(false)
 }

 const trochoff=()=>{
  setTrochbutton("off")
  setTrochicon(true)
 }




  const { width, height } = Dimensions.get('window'); 
  const isLandscape = width > height;
    // const opacity = useRef(new Animated.Value(1)).current;

    // const blink = () => {
    //   const blinkAnimation = Animated.loop(
    //     Animated.sequence([
    //       Animated.timing(opacity, {
    //         toValue: 0,
    //         duration: 500,
    //         useNativeDriver: true,
    //       }),
    //       Animated.timing(opacity, {
    //         toValue: 1,
    //         duration: 500,
    //         useNativeDriver: true,
    //       }),
    //     ])
    //   );
  
    //   blinkAnimation.start();
  
    //   return () => blinkAnimation.stop();
    // }
   

  const translate =()=>{
    Settranslatestate(true)
  }

  const closeError=()=>{
    setresponsefail(false)
    setcamerview(true)
    setdatacode('')
  }

  const networkError= async()=>{
    setnetworkerror(false)
    await AsyncStorage.removeItem('access_token',);
    RNExitApp.exitApp();
  }

  // const Scan = async () => {
  //   setScanbutton(false)
  //   setproduct("");
  //   setproductname("");
  //   setdes('')
  //   setregion('');
  //   setImage('');
  //   setcategory('');
  //   setcamerview(true)
  //   //  setvalue('back')
  //   setdatacode('')
  //   setbutton(true)

  //   //getIp()

  //   if (Platform.OS === 'android') {
  //     try {
  //       const enableResult = await promptForEnableLocationIfNeeded();
  //       console.log('enableResult', enableResult)
  //       let brand = DeviceInfo.getBrand()
  //       console.log(brand)
  //       setbarnd(brand)
  //       setOS(Platform.OS)
  //     }
  //     catch (error) {
  //       if (error instanceof Error) {
  //         console.error(error.message);
  //       }
  //     }
  //   }
   
  //     GetLocation.getCurrentPosition({
  //       enableHighAccuracy: true,
  //       // timeout: 60000,
  //     })
  //       .then(location => {
  //         setlatitude(location.latitude);
  //         setlongitude(location.longitude)
  //       })
  //       .catch(error => {
  //         const { code, message } = error;
  //         console.warn(code, message);
  //       })

  //       let authenticatedata = {
  //         method: 'POST',
  //         credentials: 'same-origin',
  //         mode: 'same-origin',
  //         body: JSON.stringify({
  //           "username": "mgx_000018",
  //           "password": "qwerty"
  //         }),
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         }
  //       }
      
  //       try {
  //         const response = await fetch("http://demo.solfordoc.com:8080/anticounterfeit/api/token", authenticatedata);
  //         const res = await response.json();
  //         if (res) {
  //           await AsyncStorage.setItem(
  //             'access_token',
  //             res.token
  //           );
  //           // navigation.navigate('Scanner')
  //           console.log(res.token)
  //         }
  //       } catch (error) {
  //         console.log(error)
  //           // Alert.alert('', 'Network Error', [
  //           //     {
  //           //       text: 'Cancel',
  //           //       onPress: () => console.log('Cancel Pressed'),
  //           //       style: 'cancel',
  //           //     },
  //           //     {text: 'OK', onPress: () => console.log('OK Pressed')},
  //           //   ]);
  //           setnetworkerror(true)
  //       }

  // }


  const tokensubmit = async()=>{
      let authenticatedata = {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
          body: JSON.stringify({
            "username": "mgx_000018",
            "password": "qwerty"
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      
        try {
          const response = await fetch("http://demo.solfordoc.com:8080/anticounterfeit/api/token", authenticatedata);
          const res = await response.json();
          if (res) {
            await AsyncStorage.setItem(
              'access_token',
              res.token
            );
            // navigation.navigate('Scanner')
            console.log(res.token)
          }
        } catch (error) {
          console.log(error)
            // Alert.alert('', 'Network Error', [
            //     {
            //       text: 'Cancel',
            //       onPress: () => console.log('Cancel Pressed'),
            //       style: 'cancel',
            //     },
            //     {text: 'OK', onPress: () => console.log('OK Pressed')},
            //   ]);
            setnetworkerror(true)
        }
  }

  const getIp = async()=>{
    try {
      const response = await fetch ('https://ipapi.co/json/');
      const res = await response.json();
      if(res)
      {
        console.log(res)
        setcountry_name(res.country_name)
        setcity(res.city)
      }
    }
    catch(error){
      console.log('error IP')
    }
   }


 

  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission granted");
      setvalue('back')
      setcamerview(true)

    } else {
      console.log("Camera permission denied");
    }
  };

  

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'ean-8', 'upc-e', 'code-128', 'code-39'],
    onCodeScanned: (codes) => {
      for (const code of codes) {
        console.log(`Code Value: ${code.value}`);
        console.log(code)
        setdatacode(code.value)
        setcodetype(code.type)

        console.log(code)
        if (code.value.startsWith("https")) {
          Linking.openURL(code.value)
          setdatacode(code.value)
        }
        else if (code.value.startsWith("www")) {
          Linking.openURL("https:" + code.value)
          setdatacode("https:" + code.value)
        }
        else if (code.value.startsWith("http")) {
          Linking.openURL(code.value)
          setdatacode(code.value)
        }
      }
      submit()
    }
  })

  // const chooseGallery =()=>{
  //   ImagePicker.openPicker({
  //     // width: 300,
  //     // height: 400,
  //     cropping: true
  //   })
  //   .then((image) => {
  //     Setgalleryimage(image.path);  
  //     console.log(image.path)
  //     scanImageFromGallery(image.path)
  //   })
  //   .catch((error) => {
  //     console.error("Error picking image:", error);
  //   });


  // }

  // const scanImageFromGallery = async (imagePath) => {
  //   const imageResponse = await fetch(imagePath);
  //    const data =imageResponse._bodyBlob
  //   // const imageBlob = await imageResponse.blob();
  //  const imageURL = URL.createObjectURL(data);
  //   console.log ('imageURL',imageURL)
  //   const img = new Image();
  //   img.onload = () => {
  //     const qrCodeData = jsQR(img, img.width, img.height);
  //     if (qrCodeData) {
  //       console.log(qrCodeData)
  //     } else {
  //       console.error('QR code not found in the image.');
  //     }
  //   };
  //   img.src = imageURL;
  // };


  // const readimage=(result)=>{
  //   if(result){
  //    console.log(result)
  //   }
  // }

  const submit = async () => {
    setbutton(false)
    setmodalvisible(true)
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 180, // Moves the scanning line down
          duration: 2000, // Adjust speed
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0, // Moves back up
          duration: 0, // Instant reset
          useNativeDriver: true,
        }),
      ])
    ).start();
    if (datacode !== "") {
       setcamerview(false);
      const token = await AsyncStorage.getItem('access_token');
      const device_id = await AsyncStorage.getItem('deviceid');
      //console.log(device_id)

      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          "code": datacode,
          "encryptResponse": false,
          "codeType": code_type,
          "deviceType": OS,
          "deviceModel": devicebrand,
          "latitude": latitude,
          "longitude": longitude,
          "deviceId": device_id,
          "location": "",
          "country": ""
          // "AppiontmentID": appointmentID,
          // "AppointmentStatusId": "2",
          // "AppointmentDate": appointmentDate,
          // "AppointmentTime": appointmentTime,
          // "DoctorMasterSeqNumber": doctorValue,
          // "FacilityMasterSeqNumber": facilityValue,
          // "ReasonMasterSequenceNumber": visitreasonValue,
          // "PatientCode": patientUHID,
          // "PatientSeqNumber": patientID,
          // "CreatedUser": patientID,
          // "UpdatedUser": "0",
          // "Amount": AppTariffAmount,
          // "Type": "ONLINE",
          // "Active": "1",
        }),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      //console.log('datastored',data)

      try {
        const response = await fetch("http://demo.solfordoc.com:8080/anticounterfeit/api/upc/product/search", data);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const res = await response.json();
        if (response.status === 200) {
          // console.log('res',res.product)
          if(res.success === false)
          {
            setresponsefail(true)
            setmodalvisible(false)
          }
          else
          {
          setTimeout(() => {
            setvisible(true)
            setmodalvisible(false)
          }, 4000)
           saveHistoryData(res)
          setproduct(res.product.brand);
          setproductname(res.product.name);
          setcategory(res.product.category)
          setCounter(counter + 1);
          let counterdata = `${counter}`
         // setcounterdata(counterdata)
          console.log('counterdata',counterdata)
          //let counterText = counter.toString();
          // console.log(counter.toString())
          await AsyncStorage.setItem(
            'counter',
            counterdata
          );
          if (res.product.description !== "") {
            setdes(res.product.description);
          }
          else {
            setdes('')
          }
          // const hisdata = res
          // const jsonhisdataValue = JSON.stringify(hisdata);
          // await AsyncStorage.setItem('histyusers', jsonhisdataValue);
          // setregion(res.product.region);
          // setImage(res.product.imageUrl);
          // setHistorydatas((prevHistory) => [...prevHistory, hisdata]);
          await AsyncStorage.setItem(
            'counter',
            counterdata
          );
        }
      }
      else {
        setmodalvisible(false)
        Alert.alert('', 'error', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

        } 
        
      catch (error) {
        console.log('errorapi',error)
        let authenticatedata = {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
          body: JSON.stringify({
            "username": "mgx_000018",
            "password": "qwerty"
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
        try {
          const response = await fetch("http://demo.solfordoc.com:8080/anticounterfeit/api/token", authenticatedata);
          const res = await response.json();
          if (res) {
            await AsyncStorage.setItem(
              'access_token',
              res.token
            );
            console.log(res.token)
          }
        } catch (error) {
          setmodalvisible(false)
          // Alert.alert('', 'Authentication Error', [
          //   {
          //     text: 'Cancel',
          //     onPress: () => console.log('Cancel Pressed'),
          //     style: 'cancel',
          //   },
          //   { text: 'OK', onPress: () => console.log('OK Pressed') },
          // ]);
          setnetworkerror(true)
        }
      }
    }
    else {
      // Alert.alert('', 'Invalid Barcode or QR Code', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => console.log('Cancel Pressed'),
      //     style: 'cancel',
      //   },
      //   { text: 'OK', onPress: () => console.log('OK Pressed') },
      // ]);
    }
}

const saveHistoryData = async (res) => {
  try {
   
    const existingData = await AsyncStorage.getItem('histyusers');   // Retrieve existing history data
    let historydata = existingData ? JSON.parse(existingData) : [];

    if (!Array.isArray(historydata)) {
      historydata = [];                 // Ensure historydata is an array
    }

    const newData = res.product;        
    historydata.push(newData);         // Add the new product name to history

    await AsyncStorage.setItem('histyusers', JSON.stringify(historydata));     // Save updated history back to AsyncStorage

    console.log('Updated history:', historydata);
  } catch (error) {
    console.error('Error saving history data:', error);
  }
};

  // const clear = () => {
  //   setdatacode('')
  //   setproduct("");
  //   setproductname("");
  //   setdes('')
  //   setregion('');
  //   setImage('');
  //   setcategory('');
  //   setcamerview(false)
  //   setScanbutton(true)
  //   setbutton(false)
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(translateY, {
  //         toValue: 180, // Moves the scanning line down
  //         duration: 2000, // Adjust speed
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(translateY, {
  //         toValue: 0, // Moves back up
  //         duration: 0, // Instant reset
  //         useNativeDriver: true,
  //       }),
  //     ])
  //   ).start();
  // }

  const openImage = () => {
    setvisibleimg(true)
  }

  const close = () => {
    setdatacode('')
    setproduct("");
    setproductname("");
    setdes('')
    setregion('');
    setImage('');
    setvisible(false)
    setFontSize(15)
    setcamerview(true)
    setvalue('back')
    // setbutton(false)
    // Animated.loop(
    //       Animated.sequence([
    //         Animated.timing(translateY, {
    //           toValue: 180, // Moves the scanning line down
    //           duration: 2000, // Adjust speed
    //           useNativeDriver: true,
    //         }),
    //         Animated.timing(translateY, {
    //           toValue: 0, // Moves back up
    //           duration: 0, // Instant reset
    //           useNativeDriver: true,
    //         }),
    //       ])
    //     ).start();
  }
  const closeImage = () => {
    setvisibleimg(false)
  }

   const increaseFontSize = () => {
     setFontSize(prevSize => prevSize + 2);
   };
 
   const decreaseFontSize = () => {
     setFontSize(prevSize => prevSize - 2);
   };
 
  const closeicon =()=>{
    setdatacode('')
    setproduct("");
    setproductname("");
    setdes('')
    setregion('');
    setImage('');
    setvisible(false)
    setFontSize(15)
    setcamerview(true)
    setbutton(false)
    // setvalue('back')
    // Animated.loop(
    //   Animated.sequence([
    //     Animated.timing(translateY, {
    //       toValue: 180, // Moves the scanning line down
    //       duration: 2000, // Adjust speed
    //       useNativeDriver: true,
    //     }),
    //     Animated.timing(translateY, {
    //       toValue: 0, // Moves back up
    //       duration: 0, // Instant reset
    //       useNativeDriver: true,
    //     }),
    //   ])
    // ).start();
  }

  const closeicontranslate =()=>{
    Settranslatestate(false)
  }

const languageselect =(item)=>{
  Settranslatetext(item)
  console.log(item)
}


// const translateapi = async () => {

//     const options = {
//     method: 'GET',
//     url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
//     params: {text:productname , to: translatetext, from: 'English'},
//     headers: {
//         'X-RapidAPI-Key': '7fb15711b0mshdcf75f9ebce235ep112814jsne23cb9110ba4',
//         'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
//     }
//     };

//     const response = await axios.request(options).catch(function (error) {
//         console.error(error);
//     });

//     if (response.status !== 200) {
//         console.log(response);
//         throw new Error("Translate call failed. Response status: " + response.status);
//     }

//     return response.data;
// }
// const rewards = async()=>{
//   navigation.navigate('Rewards')
// }

// const logout = async()=>{
//   await AsyncStorage.removeItem('access_token',);
// //console.log('access_token',tokenexpier)
//   RNExitApp.exitApp();
//  }


const menucontent =()=>{
    return(
    <View style={styles.sidemenu}>
    {navigationView()}
  </View>
    )
  }

  const naviagtion =(id)=>{
    if(id===1){
      navigation.navigate('Scanner')
    }
    if(id === 2){
     navigation.navigate('RewardScreen')
    }
    if(id === 3){
     navigation.navigate('History')
    }
    if(id === 4){
     navigation.navigate('Guide')
    }
    if(id === 5){
     navigation.navigate('Logout')
    }
   
   }
  

 const menuItems = [
   { id: 1, label: 'Barcode & QR Scanner', icon: 'barcode-scan', iconColor: '#00C4CC'},
   { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: '#00C4CC' },
   { id: 3, label: 'History', icon: 'history', iconColor: '#00C4CC' },
   { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: '#00C4CC' },
   { id: 5, label: 'Close App', icon: 'logout', iconColor: '#00C4CC' },
 ];

   const footermenuItems = [
    { id: 1, icon: 'google-play', iconColor: '#00C4CC' },
    { id: 2, icon: 'apple', iconColor: '#00C4CC' },
    { id: 3, icon: 'linkedin', iconColor: '#00C4CC'},
    { id: 4, icon: 'file-excel-box', iconColor: '#00C4CC' },
    { id: 5, icon: 'instagram', iconColor: '#00C4CC' },
  ];
  
  const appicon =()=>{
    navigation.navigate('Home')
  }
 
 const navigationView = () => (
   <>
      <ScrollView>
          <View style={styles.close}>
              <TouchableOpacity onPress={closeDrawer}>
              <Icon
                  name="close-circle"
                  size={25}
                  color="#00C4CC"
                />
              </TouchableOpacity>
            </View>
     <View style={styles.sideimgcontainer}>
     <Image
     style={styles.sidetinyLogo}
     source={logo}
     />
     <TouchableOpacity onPress={appicon}>
     <Text style={{ color: '#333333', fontSize:20, paddingLeft:5,paddingTop:3,fontStyle:'italic',fontFamily:"Georgia",fontWeight:'bold'}}>Verify2Buy</Text>
     </TouchableOpacity>
     </View>
   <View style={styles.menncontainer}>
   {menuItems.map((item, index) => (
     <TouchableOpacity
       key={item.id}
       style={[
         styles.menubar,
         hoveredIndex === index && styles.menubarHovered, 
       ]}
       onPressIn={() => setHoveredIndex(index)}
       onPressOut={() => setHoveredIndex(null)}
       onPress={()=>naviagtion(item.id)}
     >
       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Icon
           name={item.icon}
           size={25}
           color={item.iconColor}
           style={{ marginLeft:10,marginTop:5}}
         />
          <Text style={{ color: ' #333333', fontSize: 20, paddingLeft:15,paddingTop:3}}>{item.label}</Text>
       </View>
     </TouchableOpacity>
   ))}
 </View>
 <View style={styles.footerTextcontainer}>
   <Text style={{ color: '#333333', fontSize: 20,paddingLeft:15,paddingTop:10}}>Follow us on</Text>
 </View>
 <View style={styles.footerContainer}>
 {footermenuItems.map((item, index) => (
     <TouchableOpacity
       key={item.id}
       style={styles.footerbar}
       // style={[
       //   styles.menubar,
       //   hoveredIndex === index && styles.menubarHovered, 
       // ]}
       // onPressIn={() => setHoveredIndex(index)}
       // onPressOut={() => setHoveredIndex(null)}
       //onPress={()=>naviagtion(index)}
     >
       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Icon
           name={item.icon}
           size={25}
           color={item.iconColor}
           style={{ marginLeft:10,marginTop:5}}
         />
       </View>
     </TouchableOpacity>
   ))}
 </View>
 </ScrollView>
 </>
   );

   const openDrawer=()=>{
    setIsOpen(true)
  }

  const closeDrawer=()=>{
    setIsOpen(false)
  }

  useEffect(() => {
    tokensubmit()
    }, []) 

  useEffect(() => {
    requestPermissions()
    }, []) 

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: 180, // Moves the scanning line down
            duration: 2000, // Adjust speed
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0, // Moves back up
            duration: 0, // Instant reset
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [translateY])

  // useEffect(() => {
  //     findFcmToken();
  //     reagister()
  //   }, []) 
 
  return (
    <>
         <MenuDrawer
            open={isOpen}
            position={'left'}
            drawerContent={menucontent()}
            drawerPercentage={300}
            // animationTime={250}
            // overlay={true}
          >
   <ImageBackground source={glass} resizeMode="cover" style={styles.backgroundimage}>
    <ScrollView>
      <SafeAreaView style={{ flex: 1,}}>
         <SafeAreaProvider>
          <SafeAreaView style={styles.scrollcontainer} edges={['top']}>
        {/* <View style={styles.translate}>
       <TouchableOpacity onPress={translate}>
        <Text style={{textAlign:'center',color:'white',fontSize:15}}>Translate
        <Image
            style={styles.transLogo}
            source={transimg}
            />
            </Text>
       </TouchableOpacity>
        </View> */}
      <View style={styles.menuopen}>
        <TouchableOpacity onPress={openDrawer}>
          <Icon
            name="menu-open"
            size={27}
            color="#FFFF"
          />
        </TouchableOpacity>
      </View>
       {camerview === true ? (
        <>
          <View style={StyleSheet.container}>
            <Camera
              style={styles.absoluteFill}
              device={devices}
              isActive={true}
              codeScanner={codeScanner}
              torch={trochbutton}
              // frameProcessor={frameProcessor}
            //ref={camera}
            />
          </View>
          <View style={styles.trochConatiner}>
           {/* <Text style={{ color: '#333333', fontSize: 17,fontWeight:'bold'}}>Anticounterfeit</Text> */}
           <Text></Text>
            {trochicon === true ? (
              <TouchableOpacity onPress={trochon}>
           <Icon name='flashlight-off' size={30} color="#00C4CC"/>
           </TouchableOpacity>
            ):(
            <TouchableOpacity onPress={trochoff}>
           <Icon name='flashlight' size={30} color="#00C4CC"/>
           </TouchableOpacity>
            )}
          </View>
          </>
        ) : (
        <></>
        )}
       
         {/* {datacode !== "" ? (
          <View style={styles.codecontainer}>
            <Text style={styles.text}>{datacode}</Text>
          </View>
        ) : (
          <></>
        )} */}
         {/* <View style={styles.btncontainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.buttonrow,isLandscape && styles.rowLandscape]}
              onPress={Scan}
            >
              <Text style={{ color: 'white',fontSize:15, textAlign:'center' }}>SCAN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonrow}
              onPress={clear}
            >
              <Text style={{ color: 'white',fontSize:15, textAlign:'center' }}>CLEAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonrow}
              onPress={logout}
            >
              <Text style={{ color: 'white',fontSize:15, textAlign:'center'}}>CLOSE</Text>
            </TouchableOpacity>
         </View>
         </View> */}
        
        
          <View style={styles.btncontainertrue}>
               {datacode !== "" ? (
          <View style={styles.codecontainer}>
            <Text style={styles.datacodetext}>{datacode}</Text>
          </View>
          ) : (
          <></>
           )}
             {/* {scanbutton === true ?(
              <TouchableOpacity style={styles.primarybutton} onPress={Scan}>
              <Text style={styles.primaytext}>SCAN</Text>
            </TouchableOpacity>
             ):(
               <></>
             )} */}
            {/* <TouchableOpacity style={styles.primarybutton} onPress={clear}>
              <Text style={styles.primaytext}>CLEAR</Text>
            </TouchableOpacity> */}
            {button === false ? (
            <View style={styles.container}>
         <View style={styles.imageWrapper}>
        <Image source={logomain} style={styles.image} />
       
        <Animated.View style={[styles.scannerLine, { transform: [{ translateY }] }]} />
      </View>
    </View>
            ):(
              <></>
            )}
        </View>
     
        </SafeAreaView>
        </SafeAreaProvider> 
        <View>
          <Modal visible={visible} animationType="slide" transparent={true}>
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <ScrollView style={styles.oveallscrollView}>
                <View style={styles.scalebutton} >
                <TouchableOpacity onPress={increaseFontSize}>
                  <Text style={styles.buttonText}>A+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={decreaseFontSize}>
                  <Text style={styles.buttonText}>A-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeicon} style={styles.closeicon} >
                 <Icon
                  name="close-circle"
                  size={25}
                  color="#00C4CC"
                   />
                </TouchableOpacity>
                </View>
            <View style={{marginTop:10}}>
              <Text style={styles.productheading}>Product Details :</Text>
                <Text style={styles.headgrid}>Brand: </Text>
                {product === "" || product === null ? (
                  <Text style={styles.textgridfail}>No Brand Found</Text>
                ):(
                  <Text style={[styles.textgrid, { fontSize }]}>{product}</Text>
                )}
                <Text style={styles.headgrid}>Product Name: </Text>
                {productname === "" || productname === null ? (
                   <Text style={[styles.textgridfail,{ fontSize }]}>No Product Name Found</Text>
                ):(
                  <Text style={[styles.textgridpro,{ fontSize }]}>{productname}</Text>
                )}
                <Text style={styles.headgrid}>Category: </Text>
                {category === "" || category === null ? (
                   <Text style={[styles.textgridfail,{ fontSize }]}>No Category Found</Text>
                ):(
                  <Text style={[styles.textgridpro,{ fontSize }]}>{category}</Text>
                )}
                <Text style={styles.headgrid}>Description:</Text>
                {des === "" || des === null || des === "No description found." ? (
                  <Text style={styles.textgridfail}>No Description Found</Text>
                ) : (
                  <Text style={[styles.textgriddes,{ fontSize }]}>{des}</Text>
                )}
                <Text style={styles.headgridregion}>Region:</Text>
                {region === "" || region === null ? (
                    <Text  style={[styles.textgridfail,{ fontSize }]}>No Region Found</Text>
                ) : (
                  <Text  style={[styles.textgrid,{ fontSize }]}>{region}</Text>
                )}
                <Text style={styles.headgrid}>Image:</Text>
                {imageurl !==""? (
                <View style={{ marginTop: 5 }}>
                  
                    <TouchableOpacity onPress={openImage}>
                      <Image
                        source={{ uri: imageurl }}
                        style={{ width: 250, height: 250, }}
                      />
                    </TouchableOpacity>
                  
                {/* </View> */}
                </View>
                ):(
                  <Text  style={[styles.textgridfail,{ fontSize }]}>No Image Found</Text>
                )}
              </View>
            <TouchableOpacity style={styles.productclosebutton} onPress={close}>
              <Text style={styles.closetext}>CLOSE</Text>
            </TouchableOpacity> 
            </ScrollView>
            </View>
            </View>
          </Modal>
          <Modal visible={visibleimg} transparent={true}>
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View>
              <ScrollView
                    style={styles.ImagescrollView}
                    vertical={true}
                  >
                <Image
                  source={{ uri: imageurl }}

                  
                  style={{ width: 270, height: 270, }}
                />
                </ScrollView>
              </View>
            {/* <Dialog.Button label="close" onPress={closeImage} style={{backgroundColor:'rgb(42, 107, 211)',color:"white",width:100 }}/> */}
            <TouchableOpacity style={styles.closebutton} onPress={closeImage}>
              <Text style={styles.closetext}>CLOSE</Text>
            </TouchableOpacity>
            </View>
            </View>
          </Modal>
        </View>

    {/* NO PRODUCTS FOUND */}

        <View>
        <Dialog.Container visible={responsefail} overlayStyle={{backgroundColor:'#333333'}}>
            <Dialog.Description>
            <View style={styles.gridview}>
               <Text style={styles.fakeheader}>No Products Found</Text>
               <Text style={styles.faketext}>It must be a fake product
                 <Icon
                  name="robot-angry"
                  size={30}
                  color="#DC143C"
                />
               </Text>
               </View>
            </Dialog.Description>
            {/* <Dialog.Button label="close" onPress={closeImage} style={{backgroundColor:'rgb(42, 107, 211)',color:"white",width:100 }}/> */}
            <TouchableOpacity style={styles.errorbutton} onPress={closeError}>
              <Text style={styles.errortext}>CLOSE</Text>
            </TouchableOpacity>
          </Dialog.Container>
        </View>
      
       {/* NO PRODUCTS FOUND */}

         {/* Network error */}

         <Dialog.Container visible={networkerror} animationType="slide" >
        <Dialog.Description>
        <View style={styles.gridview}>
           <Text style={styles.fakeheader}>Network Error
           <Icon
              name="access-point-network-off"
              size={25}
              color="#DC143C"
            />
           </Text>
           <Text style={styles.faketext}>Please try again later to scan the products
           </Text>
           </View>
        </Dialog.Description>
        {/* <Dialog.Button label="close" onPress={closeImage} style={{backgroundColor:'rgb(42, 107, 211)',color:"white",width:100 }}/> */}
        <TouchableOpacity style={styles.errorbutton} onPress={networkError}>
          <Text style={styles.errortext}>CLOSE</Text>
        </TouchableOpacity>
      </Dialog.Container>

      {/* Network error */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.PopuploadingcenteredView}>
            <View style={styles.PopuploadingView}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                  {/* <Animated.Text style={[styles.text, { opacity }]}> */}
                  <Text style={{fontSize: 15, fontWeight: 'bold', color: "#32CD32"}}>Searching...<Icon size={25} color="#32CD32" name="barcode-scan"/></Text>
                  {/* </Animated.Text> */}
                {/* <ActivityIndicator size="large" color="#32CD32" textContent={'Loading...'} /> */}
                {/* <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: "#4c99f6" }}> Please wait.....</Text> */}
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={translatestate}
        >
          <View style={styles.translatePopuploadingcenteredView}>
          <View style={styles.translatePopuploadingView}>
          <View style={{ flex: 1, justifyContent: "center" }}>
                <FlatList
                  data={Object.values(Translatelanguages)}
                  renderItem={(itemData) => {
                    const languageKey = itemData.item;
                    // const languageString = Translatelanguages[languageKey];
                    return (
                      <TouchableOpacity onPress={()=>languageselect(languageKey)}>
                        <Text>{languageKey}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
           <TouchableOpacity onPress={closeicontranslate} style={styles.closetranslate} >
            <Image
            style={styles.tinyLogo}
            source={closeimg}
            />
          </TouchableOpacity>
          </View>
          </View>
          </View>
        </Modal>
        <View>
        </View>
      </SafeAreaView>
    </ScrollView>
      </ImageBackground>
     </MenuDrawer>
    </>
  );
};
const styles = StyleSheet.create({
  close:{
    position: 'absolute',
    top:5,
    left: 235
  },
  menuopen:{
    // marginLeft:15,
    position: 'absolute',
    marginLeft:10,
    marginTop:5,
  },

  // menuopenbottom:{
  //   marginLeft:10,
  //   bottom:40
  // },

  sidemenu: {
    flex: 1,
    backgroundColor: 'white', 
    width:280
  },
  // container: {
  //   position: 'relative',
  //   flex:1
  // },
  title: {
    color: "white",
    fontSize: 40,
  },
  datacodetext: {
    fontSize: 15,
    color: '#333333',
     flexWrap: 'wrap',
     fontWeight:'bold'
    //marginLeft:20,
    //marginTop:5
  },

  textgrid: {
    fontSize: 15,
    color:'#32CD32'
    // color: '#4c99f6',
  },
  textgridpro: {
    fontSize: 15,
    color: '#32CD32',
    width: 280
  },
  textgriddes: {
    fontSize: 15,
    color: '#32CD32',
    width: 250,
    flexDirection: 'column',
    flexWrap: 'wrap',
    // overflow: 'hidden',
  },
  // scrollView: {
  //   //marginBottom: 10,
  //   maxHeight: 155,
  // },
 
  textgridImage: {
    fontSize: 15,
    color: 'rgb(42, 107, 211)',
    textDecorationLine: 'underline',
    width: 280
  },

  headgrid: {
    fontSize: 17,
    color:'#333333'
    // color: '#f9b72b'
  },
  headgridregion: {
    fontSize: 17,
    color: '#333333',
    marginTop:2
  },
  urlbar: {
    width: 300,
    //backgroundColor:'white',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 3,
    color: "white",

  },
  // btncontainer: {
  //   flex: 1,
  //   flexDirection:'column-reverse',
  //   marginBottom:10,
  //   marginLeft:7

  // },
  btncontainer: {
    display: 'flex',
    justifyContent:'center',
    flex:1,
    alignSelf:'center',
    marginBottom: 90,
    width: 250,
    //marginLeft: 55,
    flexDirection: 'column',
    flex: 1,
    padding: 20,
    gap: 15
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end', 
    flexWrap: 'wrap',
    gap:45,
    //padding:10,
  },
 buttonrow:{
  padding: 10,
  height: 40,
  width:85,
  backgroundColor:'#4c99f6',
  borderRadius:5,
  borderColor:'rgb(253, 126, 20)',
 },
//  rowLandscape: {
//   flexDirection: 'row', 
//   justifyContent: 'flex-start', 
// },
  btncontainertrue: {
    display: 'flex',
    justifyContent:"flex-end",
    flexDirection: 'column',
    flex:1,
    alignSelf:'center',
    //marginBottom: 15,
    width: 250,
    //marginLeft: 55,
    padding: 20,
    gap: 15
  },
  absoluteFill: {
    height: 480,
    width: 330,
    display: 'flex',
    justifyContent:'center',
    alignSelf:'center',
    //marginLeft: 17,
    marginTop: 10,
    //flex:1,
  },
  // landscapecontainer : {
  //   marginTop: 10,
  // },
  // landscapeFill:{
  //   marginTop
  // },

  header: {
    padding: 20,
    borderRadius: 90,
    width: 300,
    backgroundColor: '#e7eaee',
    marginTop: 10
  },
  headertitle: {
    color: '#fd7e14',
    fontFamily: 'Times New Roman", Times, serif',
    fontSize: 17,
    fontWeight: '500',
  },
  gridview: {
    padding: 10,
    maxHeight: 400,
  },
  translatePopuploadingcenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    //marginTop: 100,
    height: 50,
    marginBottom: 50,
  },

  translatePopuploadingView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    height: 500,
  },

  PopuploadingcenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    height: 50,
    marginBottom: 100,
  },

  PopuploadingView: {
    margin: 5,
    //backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 10,
    //backgroundColor: 'rgb(219,215,210)',
    //width:width - theme.SIZES.BASE * 2,
    height: 100,
  },
  // gridcontainer:{
  //   backgroundColor:'rgb(219,215,210)'
  // }
  codecontainer: {
    //padding: 10,
    //marginLeft: 80,
    height: 40,
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    borderColor: 'rgb(253, 126, 20)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:10,
    marginTop:10
   // marginTop: 80,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    backgroundColor:'#4c99f6',
    borderRadius: 50,
  },
  gallery: {
    width: 100,
    height: 100,
    backgroundColor:'#4c99f6',
    borderRadius: 50,
  },
  singoff:{
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'flex-end',
    textAlign:'right',
    marginTop:130,
    marginLeft:230
  },
  singoffImage:{
    backgroundColor:'rgb(253, 126, 20)',
    borderRadius: 50,
  },
  textscale:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scalebutton:{
    flexDirection:'row',
    gap:10,
  },
  buttonText:{
    fontSize:15,
    padding:2,
    width:30,
    textAlign:'center',
    backgroundColor:'#00C4CC'
  },
  tinyLogo:{
    width:20,
    height:20,
  },
  transLogo: {
    width: 24,
    height: 24,
  },
  closeicon:{
  marginLeft:140
  },
  productheading:{
    fontSize:18,
    color:'#333333',
    fontWeight:'bold'
  },
   translate:{
    marginLeft:250,
    width:90,
    backgroundColor:'rgb(9, 167, 240)',
    marginTop:5,
    borderRadius:5,
   },
   closetranslate:{
      alignSelf:'flex-end'
   },
   scrollcontainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  oveallscrollView: {
    //marginBottom: 10,
    maxHeight: 500,
  },
  ImagescrollView: {
    //marginBottom: 10,
    maxHeight: 200,
  },
  dialogscrollView: {
    //marginBottom: 10,
    maxHeight: 500,
  },
  menncontainer: {
    display: 'flex',
    //justifyContent:'center',
    flex:1,
    //alignSelf:'center',
    marginBottom: 90,
    marginTop:10,
    width: 290,
    //marginLeft:7,
    //marginLeft: 55,
    flexDirection: 'column',
    //flex: 1,
    //padding: 20,
    gap:3,
    borderBottomColor:"white",
    borderTopColor:'#2596be',
    //borderRightColor:'white',
    borderWidth:1,
    borderLeftColor:"white",
  },
  menubar:{
    //backgroundColor:'#5e73e5',
    height: 30,
    borderRadius:10,
    width:270,
    marginLeft:7,
    height:35,
    marginTop:20
    //borderColor:'#2596be',
  },
  menubarHovered: {
    backgroundColor: '#dfdfdf',
    opacity:100,
    height:35,
    width:270
  },
  sideimgcontainer:{
    width: 170,
    height: 50,
    marginLeft:8,
    marginTop:17,
    flexDirection: 'row', 
    alignItems: 'center',
    //borderWidth:1,
    marginBottom: 10
  },
  sidetinyLogo:{
    width: 53,
    height: 53,
  },
  footerContainer:{
    display: 'flex',
    flex:1,
    width: 290,
    flexDirection: 'row',
    gap:7,
    //marginTop:200,
    //marginLeft:7,
    // borderBottomColor:"white",
    // borderTopColor:'#2596be',
    // borderWidth:1,
    // borderLeftColor:"white",
  },
  footerbar:{
    marginLeft:7,
    marginTop:10
  },
  footerTextcontainer :{
    // marginTop:70,
    borderBottomColor:"white",
    borderTopColor:'#2596be',
    borderWidth:1,
    borderLeftColor:"white",
    width: 290,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  primarybutton:{
    padding: 10,
    height: 40,
    width:220,
    backgroundColor:'white',
    borderRadius: 50,
    // / borderColor:'rgb(253, 126, 20)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
  },

  primaytext:{
     color:'#333333',
     fontSize:15,
     fontFamily:'Times New Roman", Times, serif',
     fontWeight:'bold'
  },
  
  errorbutton:{
    padding: 10,
    height: 35,
    width:100,
    backgroundColor:'#DC143C',
    borderRadius: 50,
    // / borderColor:'rgb(253, 126, 20)',
    flex:'1',
    alignSelf:'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
  },

  errortext:{
     color:'#333333',
     fontSize:13,
     fontFamily:'Times New Roman", Times, serif',
     fontWeight:'bold'
  },

  productclosebutton:{
    padding: 10,
    height: 40,
    width:200,
    backgroundColor:'#00C4CC',
    borderRadius: 50,
    // / borderColor:'rgb(253, 126, 20)',
    flex:'1',
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:15,
  },

  closebutton:{
    padding: 10,
    height: 40,
    width:200,
    backgroundColor:'#00C4CC',
    borderRadius: 50,
    // / borderColor:'rgb(253, 126, 20)',
    flex:'1',
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
  },

  closetext:{
     color:'#333333',
     fontSize:15,
     fontFamily:'Times New Roman", Times, serif',
     fontWeight:'bold'
  },
   fakeheader: {
    fontSize: 20,
    color:'#DC143C'
  },
  faketext:{
    fontSize:17,
    color:'#DC143C'
  },
  textgrid: {
    fontSize: 15,
    color:'#32CD32'
    // color: '#4c99f6',
  },
  textgridfail: {
    fontSize: 15,
    color:'red'
    // color: '#4c99f6',
  },
  trochConatiner: {
    display: 'flex',
    flex:1,
    gap:280,
    padding:5,
    marginLeft:15,
    width: 330,
    flexDirection: 'row',
    // backgroundColor:"#FFFFFF"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  },
  backgroundimage: {
    flex: 1,
    justifyContent: 'center',
    // width:360,
    // height:700
  },
  logomain:{
    width:150,
    height:150,
    display:'flex',
    alignSelf:'center',
    marginTop:30
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000',
  },
  imageWrapper: {
    width: 200,
    height: 200,
    overflow: 'hidden', // Keep scan effect within image bounds
    borderRadius: 10,
  },
  image: {
    width: 200 ,
    height:200,
    resizeMode: 'contain',
  },
  scannerLine: {
    position: 'absolute',
    width: 145,
    marginLeft:25,
    height: 4,
    backgroundColor: 'limegreen', 
    opacity: 0.8,
  },
});

