import React, { useEffect, useState, useRef} from 'react';
import { StyleSheet, View, Text, Platform, Linking, TouchableOpacity, Alert, Image, ScrollView, Modal, FlatList, Dimensions, useWindowDimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'react-native';
/**import {
  Camera, useCameraDevice, useCodeScanner, useFrameProcessor,

} from 'react-native-vision-camera'; **/
 import {
  Camera, useCameraDevice, useCodeScanner
} from 'react-native-vision-camera';
import GetLocation from 'react-native-get-location'
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import Dialog from "react-native-dialog";
import { PermissionsAndroid } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import closeimg from '../assets/closeicon.png';
import Translatelanguages from './Translate';
import logo from '../assets/logo.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Platform, BackHandler, Alert } from 'react-native';
import MenuDrawer from 'react-native-side-drawer'
import DeviceInfo, { useIsEmulator } from 'react-native-device-info'
import { connect, disconnect } from './db'
import ViewShot from 'react-native-view-shot';
// import DeviceCountry from 'react-native-device-country';
import LinearGradient from 'react-native-linear-gradient';
// import translate from 'translate-google-api';
import { useIsFocused } from '@react-navigation/native';
// ... and ensure you import APISetting: 
import { APISetting } from './config/config'; 
import { useIsFocused } from '@react-navigation/native';
import { useAppTheme } from './theme';

const camera = useRef(null);
const devices = useCameraDevice(value)
const screenShot = useRef();
const theme = useAppTheme();

const isFocused = useIsFocused();
const [cameraActive, setCameraActive] = useState(true);
useEffect(() => { setCameraActive(isFocused); }, [isFocused]);

const scanningRef = useRef(false);
const abortCtrl = useRef(null);
useEffect(() => () => { if (abortCtrl.current) abortCtrl.current.abort?.(); }, []);

const db = connect()

const { maxwidth, maxheight } = Dimensions.get('window');

export default function CameraView({ navigation }) {
  // const translate = require("translate-google-api");
  const [datacode, setdatacode] = useState('')
  const [product, setproduct] = useState('')
  const [productname, setproductname] = useState('')
  const [des, setdes] = useState('')
  const [category, setcategory] = useState('')
  const [region, setregion] = useState('')
  const [imageurl, setImage] = useState('')
  const [imagelarge, setImagelarge] = useState('')
  const [visible, setvisible] = useState(false)
  // const [visibleimg, setvisibleimg] = useState(false)
  const [modalVisible, setmodalvisible] = useState(false)
  const [cameralaoding, setcameralaoding] = useState(false)
  const [camerview, setcamerview] = React.useState(false);
  const [value, setvalue] = React.useState('back');
  const [button, setbutton] = React.useState(false);
  const [devicebrand, setbarnd] = React.useState('');
  const [OS, setOS] = React.useState('');
  const [latitude, setlatitude] = React.useState('');
  const [longitude, setlongitude] = React.useState('');
  const [code_type, setcodetype] = React.useState('');
  const [fontSize, setFontSize] = useState(15);
  const [translatestate, Settranslatestate] = useState(false)
  // const [translatetext, Settranslatetext] = useState('')
  const [counter, setCounter] = useState(1);
  //   const[galleryimage,Setgalleryimage]=useState('')
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [trochbutton, setTrochbutton] = useState("off")
  const [trochicon, setTrochicon] = useState(true)
  const [isOpen, setIsOpen] = useState(false);
  const [responsefail, setresponsefail] = useState(false);
  const [networkerror, setnetworkerror] = useState(false);
  const [networkslow, setnetworkslow] = useState(false);
  const [india, setIndia] = useState('')
  // const [loadingImage, setloading] = useState('')
  // const [popupdialog, setpopupdialog] = useState(false)
  const camera = useRef(null);
  const devices = useCameraDevice(value)
  const screenShot = useRef();
  const tokenController = useRef(null);
  const submitController = useRef(null);



  // const nopopup=async()=>{
  //     // const photos= await camera.current.takePhoto();
  //     setimageview(`file://${photos.path}`)
  //     setvisibleimg(true)
  // }

  // const cameracapture = async()=>{
  //   const photo = await camera.current.takePhoto()
  // }

  const handeltakeSCreenshot = () => {
    screenShot.current.capture().then(uri => {
      console.log('URI:', uri);
    });
    // setpopupdialog(true)
    // setTimeout(() => {
    //   setpopupdialog(false)
    // }, 2000)

    setdatacode('')
    setproduct("");
    setproductname("");
    setdes('')
    setregion('');
    setImage('');
    setvisible(false)
    setcamerview(true)
    setvalue('back')
  }

  const popupsucesss = () => {
    //setpopupdialog(true)
    // setTimeout(() => {
    //   setpopupdialog(false)
    // }, 3000)
    setdatacode('')
    setproduct("");
    setproductname("");
    setdes('')
    setregion('');
    setImage('');
    setvisible(false)
    setcamerview(true)
    setvalue('back')
  }

  const { width, height } = useWindowDimensions();

  const trochon = () => {
    setTrochbutton("on")
    setTrochicon(false)
  }

  const trochoff = () => {
    setTrochbutton("off")
    setTrochicon(true)
  }

  // const opentranslateform =async()=>{
  //   Settranslatestate(true)
  //   try {
  //     const result = await translate(["Hi", "How are you?", `I'm fine`], {
  //       tld: "cn",
  //       to: "vi",
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.error("Translation error:", error);
  //   }
  // }

  const closeError = () => {
    setresponsefail(false)
    setcamerview(true)
    setdatacode('')
    setbutton(false)
  }

  const networkError = async () => {
    setnetworkerror(false)
    await AsyncStorage.removeItem('access_token',);
   /**  RNExitApp.exitApp(); **/
    if (Platform.OS === 'android') {
     // either lib or native BackHandler
     BackHandler.exitApp();
    } else {
     Alert.alert('Network error', 'Please close the app and reopen.');
    }
  }

  const closenetworkslow = async () => {
    setnetworkslow(false)
  }

  const handellocation = async () => {

    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('enableResult', enableResult)
        let brand = DeviceInfo.getBrand()
        // let country = DeviceInfo.getCountryCode()
        console.log(brand)
        //  console.log('country',country)
        setbarnd(brand)
        setOS(Platform.OS)
      }
      catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      // timeout: 60000,
    })
      .then(location => {
        setlatitude(location.latitude);
        setlongitude(location.longitude)
        country(location.latitude, location.longitude)
        console.log('loaction', location)
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })

    // DeviceCountry.getCountryCode()
    // .then((result) => {
    //   setIndia(result.code)
    //   console.log(result.code)
    // })
    // .catch((e) => {
    //   console.log(e);
    // });

  }


  const country = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'com.verify2buy/1.0 (neelkrishnan999@gmail.com)',
            'Accept': 'application/json',
          },
        }

      );

      if (response) {
        const data = await response.json();
        const rescoun = data.address
        setIndia(rescoun.country)
      }
    } catch (error) {
      console.log(error)
    }
  };


  const tokensubmit = async () => {
    if (tokenController.current) {
      tokenController.current.abort();
    }
    const controller = new AbortController();
    tokenController.current = controller;
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
      },
      signal: controller.signal
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
        console.log('res', res.token)
      }
    } catch (error) {
      console.log(error)
      setnetworkerror(true)
    }
  }

  //   const getIp = async()=>{
  //     try {
  //       const response = await fetch ('https://ipapi.co/json/');
  //       const res = await response.json();
  //       if(res)
  //       {
  //         console.log(res)
  //         setcountry_name(res.country_name)
  //         setcity(res.city)
  //       }
  //     }
  //     catch(error){
  //       console.log('error IP')
  //     }
  //    }




  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission granted");
    } else {
      console.log("Camera permission denied");
    }
  };

  /*** commented by Raghu
  const codeScanner = useCodeScanner({
  codeTypes: ['qr','ean-13','ean-8','upc-e','code-128','code-39','upc-a'],
  onCodeScanned: (codes) => {
    const first = codes?.[0];
    if (!first?.value) return;
    if (scanningRef.current) return;
    scanningRef.current = true;

    // reset data once
    setproduct(''); setproductname(''); setdes(''); setregion('');
    setImage(''); setcategory(''); setdatacode(first.value); setcodetype(first.type);

    submit().finally(() => setTimeout(() => { scanningRef.current = false; }, 800));
  }
}); ***/
const codeScanner = useCodeScanner({
    codeTypes: ['qr','ean-13','ean-8','upc-e','code-128','code-39','upc-a'],
    onCodeScanned: (codes) => {
      const first = codes?.[0];
      if (!first?.value) return;
      if (scanningRef.current) return;
      scanningRef.current = true;

      setproduct(''); setproductname(''); setdes(''); setregion('');
      setImage(''); setcategory(''); setdatacode(first.value); setcodetype(first.type);

      // optional: don’t auto-open links; confirm first if you want
      // if (/^https?:/i.test(first.value)) { Linking.openURL(first.value); }

      submit().finally(() => setTimeout(() => { scanningRef.current = false; }, 800));
    }
  });


/** Raghu commented out for potential memory leak
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'ean-8', 'upc-e', 'code-128', 'code-39', 'upc-a'],
    onCodeScanned: (codes) => {
      setdatacode('')
      setproduct('');
      setproductname('');
      setdes('')
      setregion('');
      setImage('');
      setcategory('');
      for (const code of codes) {
        console.log(`Code Value: ${code.value}`);
        console.log('code', code)
        setdatacode(code.value)
        setcodetype(code.type)

        console.log(code)
        // if(code.type === "code-128")
        // {
        //   alert('code-128')
        // }
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
******/

const submit = async () => {
  if (!datacode) return;
  setmodalvisible(true);
  setcamerview(false);
  setCameraActive(false);

  const payload = {
    code: datacode,
    encryptResponse: false,
    codeType: code_type,
    deviceType: OS,
    deviceModel: devicebrand,
    latitude, longitude,
    deviceId: '', location: '', country: ''
  };

  if (abortCtrl.current) abortCtrl.current.abort();
  abortCtrl.current = new AbortController();
  const signal = abortCtrl.current.signal;

  try {
    const token = await AsyncStorage.getItem('access_token');
    const url = `${APISetting.apiurl}/verify`;
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal
    });

    if (res.status === 401) {
      const newToken = await tokensubmit();
      if (!newToken) throw new Error('Token refresh failed');
      res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${newToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal
      });
    }

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    handleVerifyResult(json);
  } catch (e) {
    console.log('verify error', e);
    setresponsefail(true);
  } finally {
    setmodalvisible(false);
    setcamerview(true);
    setCameraActive(isFocused);
  }
};

function handleVerifyResult(res) {
  if (res?.success === false) {
    setresponsefail(true);
    return;
  }
  setvisible(true);
  saveHistoryData(res);
  setCounter(prev => { const v = prev + 1; saveRewards(v); return v; });
}
/*** Commented by Raghu 
  const submit = async () => {
    if (submitController.current) {
      submitController.current.abort();
    }
    const controller = new AbortController();
    submitController.current = controller;
    const token = await AsyncStorage.getItem('access_token');
    setmodalvisible(true)
    if (datacode !== "") {
      setcamerview(false);
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
          "deviceId": "",
          "location": "",
          "country": ""
        }),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
      };
      //console.log('datastored',data)

      try {
        const response = await fetch("http://demo.solfordoc.com:8080/anticounterfeit/api/upc/product/search", data);

        if (response.status === 401) {
          const newToken = await tokensubmit();
          if (newToken) {
            return submit(true);
          }
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const res = await response.json();
        if (response.status === 200) {
          console.log('res', res)
          if (res.success === false) {
            setresponsefail(true)
            setmodalvisible(false)
          }
          else {
            setTimeout(() => {
              setvisible(true)
              setmodalvisible(false)
              saveHistoryData(res)
              //rewardsData()
              setCounter(prevCounter => {
                const updatedCounter = prevCounter + 1;
                saveRewards(updatedCounter)
                return updatedCounter;
              });
              // setCounter(prevCounter => {
              // const updatedCounter = prevCounter + 1;
              // rewardsData(updatedCounter);
              // return updatedCounter;
              //});
            }, 4000)

          }

          setproduct(res.product.brand);
          setproductname(res.product.name);
          setcategory(res.product.category);
          if (res.product.description !== "") {
            setdes(res.product.description);
          }
          else {
            setdes('')
          }
          if (res.product.imageUrl !== "" && res.product.imageUrl !== null) {
            setImage(res.product.imageUrl);
          }
          else {
            setImage('');
          }
          setregion(res.product.region);
          // setImage(res.product.imageUrl);
          setImagelarge(res.product.imageUrl)

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
        console.log('error api', error)
        setmodalvisible(false)
        setdatacode('')
        setcamerview(true)
      }
    }

    // else {
    //   tokensubmit()
    //   submit()
    // }

  }
    ***/

  const submit = async () => {
    if (!datacode) return;
    setmodalvisible(true);
    setcamerview(false);
    setCameraActive(false);

    const payload = {
      code: datacode,
      encryptResponse: false,
      codeType: code_type,
      deviceType: OS,
      deviceModel: devicebrand,
      latitude, longitude,
      deviceId: "", location: "", country: ""
    };

    if (abortCtrl.current) abortCtrl.current.abort();
    abortCtrl.current = new AbortController();
    const signal = abortCtrl.current.signal;

    try {
      const token = await AsyncStorage.getItem('access_token');
      const url = `${APISetting.apiurl}/upc/product/search`;
      let res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal
      });

      if (res.status === 401) {
        const newToken = await tokensubmit();
        if (!newToken) throw new Error('Token refresh failed');
        res = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${newToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          signal
        });
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      handleVerifyResult(json);
    } catch (e) {
      console.log('verify error', e);
      setresponsefail(true);
    } finally {
      setmodalvisible(false);
      setcamerview(true);
      setCameraActive(isFocused);
    }
 };

  const saveRewards = async (updatedCounter) => {
    try {
      await AsyncStorage.setItem('rewards', updatedCounter.toString());
      rewardsData()
    } catch (error) {
      console.error('Failed to save rewards:', error);
    }
  };

  const rewardsData = async () => {
    const rewards = await AsyncStorage.getItem('rewards');
    console.log('points', rewards);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO r2a_rewardstable (rewards_points) VALUES (?)',
        [rewards],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success', 'rewards inserted successfully');
          } else {
            console.log('Error', 'Insertion failed');
          }
        },
        (tx, error) => {
          console.error('Insert Error:', error);
        }
      );
    });
  }

  const saveHistoryData = (res) => {
    if (res.product !== null) {
      let barno = res.product.ean
      let name = res.product.name
      let catgname = res.product.category
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO r2a_usertable ( barcode, prodname,category) VALUES (?,?,?)',
          [barno, name, catgname],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('Success', 'Data inserted successfully');
            } else {
              console.log('Error', 'Insertion failed');
            }
          },
          (tx, error) => {
            console.error('Insert Error:', error);
          }
        );
      });
    }
  };


  // const openImage = () => {
  //   setvisibleimg(true)
  // }

  // const addCart = () => {
  //   Alert.alert('', 'Product added to your cart', [
  //     { text: 'OK', onPress: () => console.log('OK Pressed') },
  //   ]);
  // }

  const increaseFontSize = () => {
    setFontSize(prevSize => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => prevSize - 2);
  };
  //  const colsepopup=()=>{
  //   setpopupdialog(false)
  //  }
  const closeicon = () => {
    setdatacode('')
    setproduct('');
    setproductname('');
    setdes('')
    setregion('');
    setImage('');
    setcategory('');
    setvisible(false)
    setFontSize(15)
    setcamerview(true)
    setbutton(false)
    setvalue('back')
  }

  const closeicontranslate = () => {
    Settranslatestate(false)
  }

  // const languageselect =(item)=>{
  //   console.log(item)
  //   if(item === "Tamil")
  //   {
  //   Settranslatetext("ta")
  //   }
  //   translateapi()
  // }

  // const translateapi=async()=>{
  //   alert('yes')
  //   const result = await translate(['Hi', 'How are you?', `I'm fine`], {
  //     tld: "cn",
  //     to: "vi",
  //   });
  //   console.log(result)
  // }
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


  const menucontent = () => {
    return (
      <View style={styles.sidemenu}>
        {navigationView()}
      </View>
    )
  }

  const naviagtion = (id) => {
    if (id === 1) {
      navigation.navigate('Scanner')
      setIsOpen(false)
    }
    if (id === 2) {
      navigation.navigate('RewardScreen')
      setIsOpen(false)
    }
    if (id === 3) {
      navigation.navigate('History')
      setIsOpen(false)
    }
    if (id === 4) {
      navigation.navigate('Guide')
      setIsOpen(false)
    }
    if (id === 5) {
      navigation.navigate('Logout')
      setIsOpen(false)
    }

  }



  const menuItems = [
    { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: 'rgb(71, 162, 228)' },
    // { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: 'rgb(71, 162, 228)' },
    { id: 3, label: 'History', icon: 'history', iconColor: 'rgb(71, 162, 228)' },
    { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: 'rgb(71, 162, 228)' },
    { id: 5, label: 'Close App', icon: 'logout', iconColor: 'rgb(71, 162, 228)' },
  ];

  const menuItemsIndia = [
    { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: 'rgb(71, 162, 228)' },
    { id: 3, label: 'History', icon: 'history', iconColor: 'rgb(71, 162, 228)' },
    { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: 'rgb(71, 162, 228)' },
    { id: 5, label: 'Close App', icon: 'logout', iconColor: 'rgb(71, 162, 228)' },
  ];

  const footermenuItems = [
    { id: 1, icon: 'google-play', iconColor: 'rgb(71, 162, 228)' },
    { id: 2, icon: 'apple', iconColor: 'rgb(71, 162, 228)' },
    { id: 3, icon: 'linkedin', iconColor: 'rgb(71, 162, 228)' },
    { id: 4, icon: 'file-excel-box', iconColor: 'rgb(71, 162, 228)' },
    { id: 5, icon: 'instagram', iconColor: 'rgb(71, 162, 228)' },
  ];

  const appicon = () => {
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
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.sideimgcontainer}>
          <Image
            style={styles.sidetinyLogo}
            source={logo}
          />
          <TouchableOpacity onPress={appicon}>
            <Text style={styles.Apptitle}>Verify2Buy</Text>
          </TouchableOpacity>
        </View>
        {india === "India" ? (
          <View style={styles.menncontainer}>
            {menuItemsIndia.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menubar,
                  hoveredIndex === index && styles.menubarHovered,
                ]}
                onPressIn={() => setHoveredIndex(index)}
                onPressOut={() => setHoveredIndex(null)}
                onPress={() => naviagtion(item.id)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    name={item.icon}
                    size={25}
                    color={item.iconColor}
                    style={{ marginLeft: 10, marginTop: 5 }}
                  />
                  <Text style={styles.screentitle}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
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
                onPress={() => naviagtion(item.id)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    name={item.icon}
                    size={25}
                    color={item.iconColor}
                    style={{ marginLeft: 10, marginTop: 5 }}
                  />
                  <Text style={styles.screentitle}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.footerTextcontainer}>
          <Text style={styles.Followus}>Follow us on</Text>
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
                  style={{ marginLeft: 10, marginTop: 5 }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );

  const openDrawer = () => {
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [])

  useEffect(() => {
    tokensubmit()
    handellocation()
    // country()
    return () => {
      tokenController.current?.abort();
      submitController.current?.abort();
    };
  }, [])



  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='r2a_usertable'",
        [],
        function (tx, res) {
          console.log('item', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS r2a_usertable', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS r2a_usertable(pro_id INTEGER PRIMARY KEY AUTOINCREMENT, barcode VARCHAR(30), prodname VARCHAR(100),category VARCHAR(100))',
              [],
            );
          }
        },
      );
    })
  }, [])


  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='r2a_rewardstable'",
        [],
        function (tx, res) {
          console.log('item', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS r2a_rewardstable', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS r2a_rewardstable(rewards_id INTEGER PRIMARY KEY AUTOINCREMENT, rewards_points VARCHAR(100) )',
              [],
            );
          }
        },
      );
    })
  }, [])


  useEffect(() => {
    setcameralaoding(true)
  }, [])


  useEffect(() => {
    const timer = setTimeout(() => {
      setcamerview(true)
      setvalue('back')
      setcameralaoding(false)
    }, 5000);
    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    requestPermissions()
  }, [])



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
        animationTime={250}
        overlay={true}
        opacity={0.4}
      >
        {/* <ImageBackground source={glass} resizeMode="cover" style={styles.backgroundimage}> */}
       <LinearGradient colors={[theme.colors.primary, theme.colors.primaryPressed]} style={{ flex: 1 }}>
          {/* <ScrollView> */}
          <SafeAreaView style={{ flex: 1, }}>
            <SafeAreaProvider>
              <SafeAreaView >
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
                {/* <View style={styles.menuopen}>
        <TouchableOpacity onPress={openDrawer}>
          <Icon
            name="menu-open"
            size={27}
            color="#FFFF"
          />
        </TouchableOpacity>
      </View> */}
                {camerview === true ? (
                  <>
                    <View style={StyleSheet.container}>
                     <Camera
                        ref={camera}
                        style={[styles.absoluteFill, { width, height }]}
                        device={devices}
                        isActive={cameraActive}
                        codeScanner={codeScanner}
                        torch={trochbutton}
                      />
                    </View>
                    <View style={styles.trochConatiner}>
                      {trochicon === true ? (
                        <TouchableOpacity onPress={trochon}>
                          <Icon name='flashlight-off' size={25} color={theme.colors.primary} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={trochoff}>
                          <Icon name='flashlight' size={25} color={theme.colors.primary} />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={styles.menuopen}>
                      <TouchableOpacity onPress={openDrawer}>
                        <Icon
                          name="menu-open"
                          size={27}
                          color={theme.colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <></>
                )}

                <View style={styles.btncontainertrue}>
                  {datacode !== "" ? (
                    <View style={styles.codecontainer}>
                      <Text style={styles.datacodetext}>{datacode}</Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              </SafeAreaView>
            </SafeAreaProvider>
            <Modal visible={visible} animationType="slide" transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
                    <ScrollView style={styles.oveallscrollView} showsVerticalScrollIndicator={false}>
                      <View style={styles.scalebutton} >
                        <TouchableOpacity onPress={increaseFontSize}>
                          <Text style={styles.buttonText}>A+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={decreaseFontSize}>
                          <Text style={styles.buttonText}>A-</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={opentranslateform} style={styles.translateicon} >
                        <Icon
                          name="google-translate"
                          size={25}
                          color={theme.colors.primary}
                        />
                      </TouchableOpacity> */}
                        <TouchableOpacity onPress={closeicon} style={styles.closeicon} >
                          <Icon
                            name="close-circle"
                            size={25}
                            color={theme.colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                      <ViewShot
                        ref={screenShot}
                        options={{
                          fileName: "img",
                          format: 'jpg',
                          quality: 1,
                          result: 'tmpfile'
                        }}>
                        <View style={{ marginTop: 10 }}>
                          <Text style={styles.productheading}>Product Details :</Text>
                          <Text style={styles.headgrid}>Brand: </Text>
                          {product === "" || product === null ? (
                            <Text style={styles.textgridfail}>No Brand Found</Text>
                          ) : (
                            <Text style={[styles.textgridbrand, { fontSize }]}>{product}</Text>
                          )}
                          <Text style={styles.headgrid}>Product Name: </Text>
                          {productname === "" || productname === null ? (
                            <Text style={[styles.textgridfail, { fontSize }]}>No Product Name Found</Text>
                          ) : (
                            <Text style={[styles.textgridpro, { fontSize }]}>{productname}</Text>
                          )}
                          <Text style={styles.headgrid}>Category: </Text>
                          {category === "" || category === null ? (
                            <Text style={[styles.textgridfail, { fontSize }]}>No Category Found</Text>
                          ) : (
                            <Text style={[styles.textgridpro, { fontSize }]}>{category}</Text>
                          )}
                          <Text style={styles.headgrid}>Description:</Text>
                          {des === "" || des === null || des === "No description found." ? (
                            <Text style={styles.textgridfail}>No Description Found</Text>
                          ) : (
                            <Text style={[styles.textgriddes, { fontSize }]}>{des}</Text>
                          )}
                          <Text style={styles.headgridregion}>Region:</Text>
                          {region === "" || region === null ? (
                            <Text style={[styles.textgridfail, { fontSize }]}>No Region Found</Text>
                          ) : (
                            <Text style={[styles.textgridbrand, { fontSize }]}>{region}</Text>
                          )}
                          <View style={styles.imagerow}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }} >Image:</Text>
                            {/* <TouchableOpacity onPress={addCart}>
                            <Icon
                              name="cart-plus"
                              size={25}
                              color="#00C4CC"
                            />
                          </TouchableOpacity> */}
                          </View>
                          {/* {imageurl?(
                        <></>
                        ):(
                          <Text>Loading...</Text>
                        )} */}
                          {imageurl !== "" ? (
                            <>
                              <View style={{ marginTop: 5 }}>
                                {/* <TouchableOpacity onPress={openImage}> */}
                                <Image
                                  source={{ uri: imageurl }}
                                  style={{ width: 250, height: 250, }}
                                />
                                {/* </TouchableOpacity> */}
                              </View>
                            </>
                          ) : (
                            <Text style={[styles.textgridfail, { fontSize }]}>No Image Found</Text>
                          )}
                        </View>
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', width: 250, flexWrap: 'wrap', marginTop: 5, }}>Does the scanned image match the item you’re going to purchase?</Text>
                        <View style={styles.row}>
                          <TouchableOpacity onPress={handeltakeSCreenshot}>
                            <Text style={styles.buttoniamgeNoText}>
                              NO
                              <Icon
                                name="close-circle"
                                size={15}
                                color="white"
                              />
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={popupsucesss}>
                            <Text style={styles.buttoniamgeYesText}>
                              YES
                              <Icon
                                name="check-circle"
                                size={15}
                                color="white"
                              />
                            </Text>
                          </TouchableOpacity>
                          {/* <Button title='No' color="#faa19b" onPress={handeltakeSCreenshot}/>
                      <Button title='Yes' color="#caeec2" onPress={popupsucesss} /> */}
                        </View>
                      </ViewShot>
                      {/* <TouchableOpacity style={styles.productclosebutton} onPress={close}>
              <Text style={styles.closetext}>CLOSE</Text>
            </TouchableOpacity>  */}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </Modal>
            {/* <Modal visible={visibleimg} transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View >
                    <ScrollView
                      style={styles.ImagescrollView}
                      vertical={true}
                    >
                      <Image
                        source={{ uri: imagelarge }}
                        style={{ width: 250, height: 250, }}
                      />
                    </ScrollView>
                  </View>
                  <TouchableOpacity style={styles.closebutton} onPress={closeImage}>
                    <Text style={styles.closetext}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal> */}


            {/* <Modal visible={popupdialog} transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Thanks For Your Feedback</Text>
                  <View style={styles.popupicon}>
                    <Icon
                      name="heart"
                      size={30}
                      color="#DC143C"
                    />
                  </View>
                </View>
              </View>
            </Modal> */}



            {/* NO PRODUCTS FOUND */}

            <Modal visible={responsefail} transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.fakeheader}>Sorry, No Products Found !</Text>
                  <TouchableOpacity style={styles.errorbutton} onPress={closeError}>
                    <Text style={styles.errortext}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>



            {/* Network error */}


            <Modal visible={networkerror} transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.gridview}>
                    <Text style={styles.fakeheader}>Network Error
                      <Icon
                        name="access-point-network-off"
                        size={25}
                        color="#04467e"
                      />
                    </Text>
                    <Text style={styles.faketext}>Please try again later to scan the products
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.errorbutton} onPress={networkError}>
                    <Text style={styles.errortext}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Dialog.Container visible={networkslow} animationType="slide" >
              <Dialog.Description>
                <View style={styles.gridview}>
                  <Text style={styles.fakeheader}>Network Error
                    <Icon
                      name="access-point-network-off"
                      size={25}
                      color="#04467e"
                    />
                  </Text>
                  <Text style={styles.faketext}>Please check your connection and try again.
                  </Text>
                </View>
              </Dialog.Description>
              {/* <Dialog.Button label="close" onPress={closeImage} style={{backgroundColor:'rgb(42, 107, 211)',color:"white",width:100 }}/> */}
              <TouchableOpacity style={styles.errorbutton} onPress={closenetworkslow}>
                <Text style={styles.errortext}>Close</Text>
              </TouchableOpacity>
            </Dialog.Container>



            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.PopuploadingcenteredView}>
                <View style={styles.PopuploadingView}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.colors.primary }}>Searching...<Icon size={25} color="#04467e" name="barcode-scan" /></Text>
                  </View>
                </View>
              </View>
            </Modal>


            <Modal
              animationType="slide"
              transparent={true}
              visible={cameralaoding}
            >
              <View style={styles.PopuploadingcenteredView}>
                <View style={styles.PopuploadingView}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.primary }}><Icon size={30} color="#04467e" name="camera" /> Loading...</Text>
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
                          <TouchableOpacity onPress={() => languageselect(languageKey)}>
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
          {/* </ScrollView> */}
          {/* </ImageBackground> */}
        </LinearGradient>
      </MenuDrawer>
    </>
  );
};
const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 5,
    left: 235
  },
  menuopen: {
    position: 'absolute',
    top: 15,
    left: 10,
    backgroundColor: '#d9e9fb',
    padding: 10,
    borderRadius: 25,
  },

  sidemenu: {
    flex: 1,
    backgroundColor: 'white',
    width: 280
  },

  container: {
    flex: 1, // Ensures full-screen view
  },
  title: {
    color: "white",
    fontSize: 40,
  },
  datacodetext: {
    fontSize: 15,
    color: '#333333',
    flexWrap: 'wrap',
    fontWeight: 'bold'
    //marginLeft:20,
    //marginTop:5
  },

  textgridpro: {
    fontSize: 15,
    color: '#32CD32',
    width: 250,
    flexWrap: 'wrap',
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
    color: '#333333',
    // color: '#f9b72b'
  },
  headgridregion: {
    fontSize: 17,
    color: '#333333',
    marginTop: 2
  },

  btncontainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'center',
    marginBottom: 90,
    width: 250,
    //marginLeft: 55,
    flexDirection: 'column',
    flex: 1,
    padding: 20,
    gap: 15
  },
  imagerow: {
    flexDirection: 'row',
    gap: 150,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
    gap: 15,
    padding: 10,
  },
  buttonrow: {
    padding: 10,
    height: 40,
    width: 85,
    backgroundColor: '#4c99f6',
    borderRadius: 5,
    borderColor: 'rgb(253, 126, 20)',
  },

  btncontainertrue: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 40,
  },
  absoluteFill: {
    flex: 1,
    // width: width, 
    // height: height, 
    position: 'absolute',
  },

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

  imagedialogView: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: "center",
    alignSelf: 'flex-start',
    // marginTop: 100,
    // height: 50,
    // marginBottom: 100,

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
    padding: 10,
    //marginLeft: 80,
    height: 40,
    width: 200,
    backgroundColor: '#FFFFFF50',
    borderRadius: 50,
    borderColor: 'rgb(253, 126, 20)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10
    // marginTop: 80,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    backgroundColor: '#4c99f6',
    borderRadius: 50,
  },

  textscale: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scalebutton: {
    flexDirection: 'row',
    gap: 10,
  },
  buttoniamgeNoText: {
    fontSize: 15,
    padding: 2,
    width: 70,
    textAlign: 'center',
    backgroundColor: '#F57C00',
    color: 'white',
    borderRadius: 30,

  },
  buttoniamgeYesText: {
    fontSize: 15,
    padding: 2,
    width: 70,
    textAlign: 'center',
    backgroundColor: '#388E3C',
    color: 'white',
    borderRadius: 30,
    paddingLeft: 5,
  },
  buttonText: {
    fontSize: 15,
    padding: 2,
    width: 30,
    textAlign: 'center',
    backgroundColor: 'rgb(71, 162, 228)'
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
  transLogo: {
    width: 24,
    height: 24,
  },

  // translateicon: {
  //   marginLeft: 105
  // },

  closeicon: {
    marginLeft: 140
  },

  productheading: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold'
  },
  translate: {
    marginLeft: 250,
    width: 90,
    backgroundColor: 'rgb(9, 167, 240)',
    marginTop: 5,
    borderRadius: 5,
  },
  closetranslate: {
    alignSelf: 'flex-end'
  },
  scrollcontainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  oveallscrollView: {
    //marginBottom: 10,
    maxHeight: maxheight,
    maxWidth: maxwidth,
  },
  ImagescrollView: {
    //marginBottom: 10,
    maxHeight: 200,
  },

  menncontainer: {
    display: 'flex',
    //justifyContent:'center',
    flex: 1,
    //alignSelf:'center',
    marginBottom: 90,
    marginTop: 10,
    width: 290,
    //marginLeft:7,
    //marginLeft: 55,
    flexDirection: 'column',
    //flex: 1,
    //padding: 20,
    gap: 3,
    borderBottomColor: "white",
    borderTopColor: 'rgb(71, 162, 228)',
    //borderRightColor:'white',
    borderWidth: 1,
    borderLeftColor: "white",
  },
  menubar: {
    //backgroundColor:'#5e73e5',
    height: 30,
    borderRadius: 10,
    width: 270,
    marginLeft: 7,
    height: 35,
    marginTop: 20
    //borderColor:'#2596be',
  },
  menubarHovered: {
    backgroundColor: '#d9e9fb',
    opacity: 100,
    height: 35,
    width: 270
  },
  sideimgcontainer: {
    width: 170,
    height: 50,
    marginLeft: 8,
    marginTop: 17,
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth:1,
    marginBottom: 10
  },
  sidetinyLogo: {
    width: 53,
    height: 53,
  },
  footerContainer: {
    display: 'flex',
    flex: 1,
    width: 290,
    flexDirection: 'row',
    gap: 7,
    //marginTop:200,
    //marginLeft:7,
    // borderBottomColor:"white",
    // borderTopColor:'#2596be',
    // borderWidth:1,
    // borderLeftColor:"white",
  },
  footerbar: {
    marginLeft: 7,
    marginTop: 10
  },
  footerTextcontainer: {
    // marginTop:70,
    borderBottomColor: "white",
    borderTopColor: 'rgb(71, 162, 228)',
    borderWidth: 1,
    borderLeftColor: "white",
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
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  primarybutton: {
    padding: 10,
    height: 40,
    width: 220,
    backgroundColor: 'white',
    borderRadius: 50,
    // / borderColor:'rgb(253, 126, 20)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  primaytext: {
    color: '#333333',
    fontSize: 15,
    fontFamily: 'Times New Roman", Times, serif',
    fontWeight: 'bold'
  },

  errorbutton: {
    padding: 10,
    height: 40,
    width: 100,
    backgroundColor: '#04467e',
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

  productclosebutton: {
    padding: 10,
    height: 40,
    width: 200,
    backgroundColor: '#00C4CC',
    borderRadius: 50,
    // / borderColor:'rgb(253, 126, 20)',
    flex: '1',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  closebutton: {
    padding: 10,
    height: 40,
    width: 200,
    backgroundColor: '#00C4CC',
    borderRadius: 50,
    // / borderColor:'rgb(253, 126, 20)',
    flex: '1',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  closetext: {
    color: '#333333',
    fontSize: 15,
    fontFamily: 'Times New Roman", Times, serif',
    fontWeight: 'bold'
  },
  fakeheader: {
    fontSize: 19,
    color: '#04467e',
    // flex:1,
    flexWrap: "wrap"
  },
  faketext: {
    fontSize: 17,
    color: '#04467e'
  },
  textgridbrand: {
    fontSize: 15,
    color: '#32CD32',
    width: maxwidth
  },
  textgridfail: {
    fontSize: 15,
    color: 'red'
    // color: '#4c99f6',
  },
  trochConatiner: {
    position: 'absolute',
    top: 15,
    right: 10,
    backgroundColor: '#d9e9fb',
    padding: 10,
    borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  backgroundimage: {
    flex: 1,
    justifyContent: 'center',
    // width:360,
    // height:700
  },
  logomain: {
    width: 150,
    height: 150,
    display: 'flex',
    alignSelf: 'center',
    marginTop: 30
  },

  imageWrapper: {
    width: 200,
    height: 200,
    overflow: 'hidden', // Keep scan effect within image bounds
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  popupicon: {
    display: 'flex',
    justifyContent: 'center'
  },
  screentitle: {
    fontFamily: 'Roboto',
    color: '#3078a4',
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 3,
  },
  Apptitle: {
    fontFamily: 'Roboto',
    color: '#3078a4',
    fontSize: 20,
    paddingLeft: 5,
    paddingTop: 3
  },
  Followus: {
    fontFamily: 'Roboto',
    color: '#3078a4',
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 10
  }
});

