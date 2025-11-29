import React, { useEffect, useState, useRef,useContext} from 'react';
import { StyleSheet, View, Text, Platform, Linking, TouchableOpacity, Alert, PanResponder,Image, ScrollView, Modal, FlatList, Dimensions, useWindowDimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import GetLocation from 'react-native-get-location'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
// import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
// import LocationEnabler from 'react-native-location-enabler';
import Dialog from "react-native-dialog";
import { PermissionsAndroid } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import closeimg from '../assets/closeicon.png';
import Translatelanguages from './Translate';
import logo from '../assets/logo.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import RNExitApp from 'react-native-exit-app';
// import { Platform, BackHandler, Alert } from 'react-native';
//import MenuDrawer from 'react-native-side-drawer'
import DeviceInfo, { useIsEmulator } from 'react-native-device-info'
import { openDatabase } from 'react-native-sqlite-storage'
import ViewShot from 'react-native-view-shot';
// import DeviceCountry from 'react-native-device-country';
import LinearGradient from 'react-native-linear-gradient';
// import translate from 'translate-google-api';
import APISetting from './config/config'
// import { useAppTheme } from './theme'
import ThemeContext from './themes/ThemeContext';
import { BackHandler } from 'react-native'; 

var db = openDatabase({ name: 'r2a.db' })

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
  // const [imagelarge, setImagelarge] = useState('')
  // const [visible, setvisible] = useState(false)
  // const [visibleimg, setvisibleimg] = useState(false)
  const [modalVisible, setmodalvisible] = useState(false)
  const [cameralaoding, setcameralaoding] = useState(false)
  const [camerview, setcamerview] = React.useState(false);
  const [value, setvalue] = React.useState('back');
  // const [button, setbutton] = React.useState(false);
  const [devicebrand, setBrand] = React.useState('');
  const [OS, setOS] = React.useState('');
  const [latitude, setlatitude] = React.useState('');
  const [longitude, setlongitude] = React.useState('');
  const [code_type, setcodetype] = React.useState('');
  // const [fontSize, setFontSize] = useState(15);
  // const [translatestate, Settranslatestate] = useState(false)
  // const [translatetext, Settranslatetext] = useState('')
  // const [counter, setCounter] = useState(1);
  //   const[galleryimage,Setgalleryimage]=useState('')
  // const [hoveredIndex, setHoveredIndex] = useState(null)
  const [trochbutton, setTrochbutton] = useState("off")
  const [trochicon, setTrochicon] = useState(true)
  // const [isOpen, setIsOpen] = useState(false);
  const [responsefail, setresponsefail] = useState(false);
  const [networkerror, setnetworkerror] = useState(false);
  const [networkslow, setnetworkslow] = useState(false);
  // const [india, setIndia] = useState('')
  // const [loadingImage, setloading] = useState('')
  // const [popupdialog, setpopupdialog] = useState(false)
  const camera = useRef(null);
 // const devices = useCameraDevice(value)
 const device = useCameraDevice(value)
  //const screenShot = useRef();
  // const theme = useAppTheme();
  const { isDarkMode } = useContext(ThemeContext);

  // camera lifecycle & scanner guard
  const isFocused = useIsFocused();
  const [cameraActive, setCameraActive] = useState(true);
  useEffect(() => { setCameraActive(isFocused); }, [isFocused]);

  const scanningRef = useRef(false);
  const abortCtrl = useRef(null);
  useEffect(() => () => { if (abortCtrl.current) abortCtrl.current.abort?.(); }, []);

        // Reset camera when screen comes into focus (e.g., returning from ScanResultScreen)
        useFocusEffect(
          React.useCallback(() => {
            console.log('Camera screen focused - Resetting scan state');
            
            // Only reset if we have a scanned code (coming back from result screen)
            if (datacode !== '') {
              resetCamera();
            }
            
            return () => {
              // Cleanup when screen loses focus
              console.log('Camera screen losing focus');
            };
          }, [datacode])
        );
  // const handeltakeSCreenshot = () => {
 

  //   setdatacode('')
  //   setproduct("");
  //   setproductname("");
  //   setdes('')
  //   setregion('');
  //   setImage('');
  //   setvisible(false)
  //   setcamerview(true)
  //   setvalue('back')
  // }

  // const popupsucesss = () => {
  //   //setpopupdialog(true)
  //   // setTimeout(() => {
  //   //   setpopupdialog(false)
  //   // }, 3000)
  //   setdatacode('')
  //   setproduct("");
  //   setproductname("");
  //   setdes('')
  //   setregion('');
  //   setImage('');
  //   setvisible(false)
  //   setcamerview(true)
  //   setvalue('back')
  // }

  const { width, height } = useWindowDimensions();


  const trochon = () => {
    setTrochbutton("on")
    setTrochicon(false)
  }

  const trochoff = () => {
    setTrochbutton("off")
    setTrochicon(true)
  }

  const closeError = () => {
    setresponsefail(false)
    setcamerview(true)
    setvalue('back')
    setdatacode('')
    navigation.navigate('Home');
    // setbutton(false)
  }

  const networkError = async () => {
    setnetworkerror(false);
    await AsyncStorage.removeItem('access_token');
    if (Platform.OS === 'android') BackHandler.exitApp();
    else navigation.navigate('Home'); // iOS: don't programmatically quit
 }

  const closenetworkslow = async () => {
    setnetworkslow(false)
  }

  // const handellocation = async () => {

  //   if (Platform.OS === 'android') {
  //     try {
  //       const enableResult = await promptForEnableLocationIfNeeded();
  //       console.log('enableResult', enableResult)
  //       let brand = DeviceInfo.getBrand()
  //       // let country = DeviceInfo.getCountryCode()
  //       console.log(brand)
  //       //  console.log('country',country)
  //       setBrand(brand)
  //       setOS(Platform.OS)
  //     }
  //     catch (error) {
  //       if (error instanceof Error) {
  //         console.error(error.message);
  //       }
  //     }
  //   }

  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     // timeout: 60000,
  //   })
  //     .then(location => {
  //       setlatitude(location.latitude);
  //       setlongitude(location.longitude)
  //       country(location.latitude, location.longitude)
  //       console.log('loaction', location)
  //     })
  //     .catch(error => {
  //       const { code, message } = error;
  //       console.warn(code, message);
  //     })

  //   // DeviceCountry.getCountryCode()
  //   // .then((result) => {
  //   //   setIndia(result.code)
  //   //   console.log(result.code)
  //   // })
  //   // .catch((e) => {
  //   //   console.log(e);
  //   // });

  // }


  const handellocation = async () => {

  if (Platform.OS === 'android') {

    try {

      let brand = DeviceInfo.getBrand();
      setBrand(brand);
      setOS(Platform.OS);
      console.log('Device brand:', brand);
    } catch (error) {
      console.error('Device info error:', error);

    }

  }

  // Try to get location

   try {

    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000, // 30 second timeout
    });

    setlatitude(location.latitude);
    setlongitude(location.longitude);
    console.log('Location acquired:', location);

  } 
  catch (error) {

    const { code, message } = error;
    console.warn('Location error:', code, message);
    // Show user-friendly alert if location is disabled

    if (code === 'UNAVAILABLE' || code === 'TIMEOUT') {
      Alert.alert(
        'Location Required',

        'Please enable location services in your device settings to verify products.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Open Settings', 

            onPress: () => {
              if (Platform.OS === 'android') {
                Linking.openSettings();
              }
            }
          }
        ]

      );
    }
  }
};




  // const country = async (latitude, longitude) => {
  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'User-Agent': 'com.verify2buy/1.0 (neelkrishnan999@gmail.com)',
  //           'Accept': 'application/json',
  //         },
  //       }

  //     );

  //     if (response) {
  //       const data = await response.json();
  //       const rescoun = data.address
  //       setIndia(rescoun.country)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };


  const tokensubmit = async () => {
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
    // FIX THIS LINE - use full URL:
    const response = await fetch("https://api.universumgs.com/api/token", authenticatedata);
    const res = await response.json();
    if (res) {
      await AsyncStorage.setItem('access_token', res.token);
      return res.token;
    }
  } catch (error) {
    console.log('❌ Token error:', error);
    setnetworkerror(true);
    return null;
  }
}

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

  const codeScanner = useCodeScanner({
    codeTypes: ['qr','ean-13','ean-8','upc-e','code-128','code-39'], // see note #4
    onCodeScanned: (codes) => {
      const first = codes?.[0];
      if (!first?.value) return;
      if (scanningRef.current) return;

      const minLength = first.type === 'qr' ? 3 : 8; // QR can be shorter, barcodes need at least 8 digits
      if (first.value.length < minLength) {
        console.log('Ignoring partial scan:', first.value);
        return;
      }

      
      scanningRef.current = true;

      setproduct(''); setproductname(''); setdes(''); setregion('');
      setImage(''); setcategory('');
      setdatacode(first.value); 
      setcodetype(first.type);

    //   submit(first.value, first.type)
    //     .finally(() => setTimeout(() => { scanningRef.current = false; }, 800));
         submit(first.value, first.type)
      .finally(() => setTimeout(() => { scanningRef.current = false; }, 2000)); // Increased from 800ms to 2000ms
      }

  })

const resetCamera = () => {
  setdatacode('');
  setproduct('');
  setproductname('');
  setdes('');
  setcategory('');
  setregion('');
  setImage('');
  setcamerview(true);
  setCameraActive(true);
  setvalue('back');
  scanningRef.current = false;
};

const submit = async (code, scannedType) => {
  if (!code) { 
       // ensure the guard doesn't permanently block scanning
       scanningRef.current = false; 
       return; 
    }
  
  //setmodalvisible(true);
  setcamerview(false);
  setCameraActive(false);
  setcameralaoding(true); 

  const payload = {
    code,
    encryptResponse: false,
    codeType: scannedType,
    deviceType: OS,
    deviceModel: devicebrand,
    latitude, longitude,
    deviceId: '',
    location: '',
    country: ''
  };



  if (abortCtrl.current) abortCtrl.current.abort();
  abortCtrl.current = new AbortController();
  const signal = abortCtrl.current.signal;

  try {
    const token = await AsyncStorage.getItem('access_token');
    const url = 'https://api.universumgs.com/api/upc/product/search';
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
    //setmodalvisible(false);
      setcameralaoding(false);
  } catch (e) {
    console.log('verify error', e);
      setcameralaoding(false);
    setresponsefail(true);
  } 

};

function handleVerifyResult(res) {
  if (res?.success === false) {
    setresponsefail(true);
    return;
  }

  
  // Validate that we have valid product data before navigating
  // Check if product exists and has at least a code or name

  if (!res || (!res.code && !res.product?.name && !res.product?.ean)) {
    console.log('Invalid product data received:', res);
    setresponsefail(true);
    return;
  }
  
  saveHistoryData(res);
  //setcamerview(false)
  navigation.navigate('ScanResultScreen', { result: res });
}

   const saveHistoryData = (res) => {
    if (res.product !== null) {
      let barno = res.product.ean
      let name = res.product.name
      let catgname = res.product.category
      let img = res.product.imageUrl
      let brand = res.product.brand
      let description = res.product.description
      let region = res.product.region
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO verify2buy_usertable ( barcode, prodname,category,image,brandname,description,region) VALUES (?,?,?,?,?,?,?)',
            [barno, name, catgname,img,brand,description,region],
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

  

//   const menucontent = () => {
//     return (
//       <View style={styles.sidemenu}>
//         {navigationView()}
//       </View>
//     )
//   }

//   const naviagte = (id) => {
//     if (id === 1) {
//       //navigation.navigate('Scanner')
//       navigation.navigate('Home')
//       setIsOpen(false)
//     }
//     if (id === 2) {
//       navigation.navigate('RewardScreen')
//       setIsOpen(false)
//     }
//     if (id === 3) {
//       navigation.navigate('History')
//       setIsOpen(false)
//     }
//     if (id === 4) {
//       navigation.navigate('Guide')
//       setIsOpen(false)
//     }
//     if (id === 5) {
//       navigation.navigate('Privacy Policy')
//       setIsOpen(false)
//     }
//      if (id === 6) {
//       navigation.navigate('Settings')
//       setIsOpen(false)
//     }
//      if (id === 7) {
//       navigation.navigate('Logout')
//       setIsOpen(false)
//     }

//   }

//  const menuItems = [
//     //  { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D' },
//       { id: 1, label: 'Home', icon: 'arch', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
//      { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'},
//     { id: 3, label: 'History', icon: 'history', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//     { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D' },
//     { id: 5, label: 'Privacy Policy', icon: 'shield-account', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//      { id: 6, label: 'Settings', icon: 'cog', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//     { id: 7, label: 'Close App', icon: 'logout', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//   ];

//   const menuItemsIndia = [
//     // { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D' },
//       { id: 1, label: 'Home', icon: 'arch', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
//      { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D' },
//     { id: 3, label: 'History', icon: 'history', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//     { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D' },
//     { id: 5, label: 'Privacy Policy', icon: 'shield-account', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//      { id: 6, label: 'Settings', icon: 'cog', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//     { id: 7, label: 'Close App', icon: 'logout', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//   ];



//   const footermenuItems = [
//     { id: 1, icon: 'google-play', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//     { id: 2, icon: 'apple', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//     { id: 3, icon: 'linkedin', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//     { id: 4, icon: 'file-excel-box', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//     { id: 5, icon: 'instagram', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
//   ];


//   const appicon = () => {
//     navigation.navigate('Home')
//   }

//     const navigationView = () => (
//       <>


//         <ScrollView>
//           <View style={styles.close}>
//             <TouchableOpacity onPress={closeDrawer}>
//               <Icon
//                 name="close-circle"
//                 size={25}
//                 color= {!isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.sideimgcontainer}>
//             <Image
//               style={styles.sidetinyLogo}
//               source={!isDarkMode ?  logo : logo}
//             />
//             <TouchableOpacity onPress={appicon}>
//               <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ?  '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 1, paddingTop: 3 }}>Verify2Buy</Text>
//             </TouchableOpacity>
//           </View>
//           {india === "India" || india === "in" ? (  
//             <View style={styles.menncontainer}>
//               {menuItemsIndia.map((item, index) => (
//                 <TouchableOpacity
//                   key={item.id}
//                   style={[
//                     styles.menubar,
//                     hoveredIndex === index && styles.menubarHovered,
//                   ]}
//                   onPressIn={() => setHoveredIndex(index)}
//                   onPressOut={() => setHoveredIndex(null)}
//                   onPress={() => naviagte(item.id)}
//                 >
//                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Icon
//                       name={item.icon}
//                       size={25}
//                       color={item.iconColor}
//                       style={{ marginLeft: 10, marginTop: 5 }}
//                     />
//                     <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ?  '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 15, paddingTop: 3, }}>{item.label}</Text>
//                   </View>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           ) : (
//             <View style={styles.menncontainer}>
//               {menuItems.map((item, index) => (
//                 <TouchableOpacity
//                   key={item.id}
//                   style={[
//                     styles.menubar,
//                     hoveredIndex === index && styles.menubarHovered,
//                   ]}
//                   onPressIn={() => setHoveredIndex(index)}
//                   onPressOut={() => setHoveredIndex(null)}
//                   onPress={() => naviagte(item.id)}
//                 >
//                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Icon
//                       name={item.icon}
//                       size={25}
//                       color={item.iconColor}
//                       style={{ marginLeft: 10, marginTop: 5 }}
//                     />
//                     <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ?  '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 15, paddingTop: 3, }}>{item.label}</Text>
//                   </View>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//           <View style={styles.footerTextcontainer}>
//             <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ?  '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 15, paddingTop: 10 }}>Follow us on</Text>
//           </View>
//           <View style={styles.footerContainer}>
//             {footermenuItems.map((item, index) => (
//               <TouchableOpacity
//                 key={item.id}
//                 style={styles.footerbar}
//               // style={[
//               //   styles.menubar,
//               //   hoveredIndex === index && styles.menubarHovered, 
//               // ]}
//               // onPressIn={() => setHoveredIndex(index)}
//               // onPressOut={() => setHoveredIndex(null)}
//               //onPress={()=>naviagtion(index)}
//               >
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Icon
//                     name={item.icon}
//                     size={25}
//                     color={item.iconColor}
//                     style={{ marginLeft: 10, marginTop: 5 }}
//                   />
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>
//       </>
//     );

//   const openDrawer = () => {
//     setIsOpen(true)
//   }

//   const closeDrawer = () => {
//     setIsOpen(false)
//   }

  useEffect(() => {
    tokensubmit()
    handellocation()
    // country()
  }, [])


 useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='verify2buy_usertable'",
        [],
        function (tx, res) {
          console.log('item', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS verify2buy_usertable', []);
              txn.executeSql(
              'CREATE TABLE IF NOT EXISTS verify2buy_usertable(pro_id INTEGER PRIMARY KEY AUTOINCREMENT, barcode VARCHAR(30), prodname VARCHAR(200),category VARCHAR(100),image VARCHAR(500),brandname VARCHAR(200),description VARCHAR(500),region VARCHAR(50))',
              [],
            );
          }
        },
      );
    })
  }, [])
  



  // useEffect(() => {
  //   db.transaction(function (txn) {
  //     txn.executeSql(
  //       "SELECT name FROM sqlite_master WHERE type='table' AND name='r2a_rewardstable'",
  //       [],
  //       function (tx, res) {
  //         console.log('item', res.rows.length);
  //         if (res.rows.length === 0) {
  //           txn.executeSql('DROP TABLE IF EXISTS r2a_rewardstable', []);
  //           txn.executeSql(
  //             'CREATE TABLE IF NOT EXISTS r2a_rewardstable(rewards_id INTEGER PRIMARY KEY AUTOINCREMENT, rewards_points VARCHAR(100) )',
  //             [],
  //           );
  //         }
  //       },
  //     );
  //   })
  // }, [])


  useEffect(() => {
    setdatacode('')
    setcameralaoding(true)
  }, [])


  useEffect(() => {
    const timer = setTimeout(() => {
      setcamerview(true)
      setvalue('back')
      setcameralaoding(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

 useEffect(() => {
   (async () => {
     if (Platform.OS === 'ios') {
       const status = await Camera.requestCameraPermission();
       if (status !== 'granted') {
         Alert.alert('Camera permission required',
           'Please enable camera access in Settings to scan codes.');
       }
     } else {
       requestPermissions();
     }
   })();
 }, []);


  return (
    <>

      <LinearGradient colors={["#1A1A1A", "#0A0A0A"]} style={{ flex: 1, }} >
          <SafeAreaView style={{ flex: 1, }}>
            <SafeAreaProvider>
              <SafeAreaView >
                {camerview === true && device ? (
                  <>
                    <View style={styles.container}>
                      <Camera
                        ref={camera}
                        style={[styles.absoluteFill, { width, height }]}
                        device={device}
                        isActive={cameraActive}
                        codeScanner={codeScanner}
                        torch={trochbutton}
                      // photo={true}
                      // frameProcessor={frameProcessor}
                      />
                    </View>
                  <View style={styles.cameraControlsRow}>
                    {/* Torch Button */}
                    <View style={styles.trochConatiner}>
                      {trochicon === true ? (
                        <TouchableOpacity onPress={trochon}>
                          <Icon name='flashlight-off' size={25} color="#ffffffff" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={trochoff}>
                          <Icon name='flashlight' size={25} color="#ffffffff" />
                        </TouchableOpacity>
                      )}
                    </View>
                      {/* Reset Button - only shows when barcode is scanned */}
                        {datacode !== "" && (
                          <View style={styles.resetContainer}>
                            <TouchableOpacity onPress={resetCamera}>
                              <Icon name='refresh' size={25} color="#ffffffff" />
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
              {/* <View style={styles.menuopen}>
                      <TouchableOpacity onPress={openDrawer}>
                        <Icon
                          name="menu-open"
                          size={27}
                          color="#ffffffff"
                        />
                      </TouchableOpacity>
                    </View> */}
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
                      // color="#04467e"
                      color="#1D211D"
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
                    //color="#04467e"
                    color="#1D211D"
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
                   <Text style={{ fontSize: 15, fontWeight: 'bold', color: !isDarkMode ? "#04467e" : "#ffa500"}}>Searching...<Icon size={25} color={!isDarkMode ? "#04467e" : "#ffa500"} name="barcode-scan" /></Text>
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
                   <Text style={{ fontSize: 20, fontWeight: 'bold', color: !isDarkMode ? "#FF6200" : "#ffa500" }}><Icon size={30} color={!isDarkMode ? "#FF6200" : "#ffa500"} name="camera" /> Loading...</Text>
                  </View>
                </View>
              </View>
            </Modal>
          </SafeAreaView>
        </LinearGradient>

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
    //backgroundColor: '#d9e9fb',
    backgroundColor:'#ffa500',
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
     marginBottom: 50,
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
    //backgroundColor: '#04467e',
    backgroundColor:'#1D211D',
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
    //color: '#04467e',
    color:'#1D211D',
    // flex:1,
    flexWrap: "wrap"
  },
  faketext: {
    fontSize: 17,
   // color: '#04467e'
   color:'#1D211D'
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
  cameraControlsRow: {
  position: 'absolute',
  top: 15,
  right: 10,
  flexDirection: 'column',
  gap: 10,
},
trochConatiner: {
  // backgroundColor: '#ffa500',
  backgroundColor:'#FF6200',
  padding: 10,
  borderRadius: 25,
},
resetContainer: {
  backgroundColor: '#FF6200',
  padding: 10,
  borderRadius: 25,
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