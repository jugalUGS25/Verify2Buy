import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Animated, Text,TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import logo from '../assets/logo.png'
import MenuDrawer from 'react-native-side-drawer'
import DeviceCountry from 'react-native-device-country';
import LinearGradient from 'react-native-linear-gradient';
import one from '../assets/1.png'
import two from '../assets/2.png'
import three from '../assets/3.png'
import four from '../assets/4.png'
const { maxwidth, maxheight } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [orientation, setOrientation] = useState('portrait');
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const [india, setIndia] = useState('')

  const country = () => {
    DeviceCountry.getCountryCode()
      .then((result) => {
        setIndia(result.code)
        console.log(result.code)
      })
      .catch((e) => {
        console.log(e);
      });

  }

  // const handellocation = async () => {

  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     // timeout: 60000,
  //   })
  //     .then(location => {
  //       country(location.latitude,location.longitude)
  //       console.log('loaction',location)
  //     })
  //     .catch(error => {
  //       const { code, message } = error;
  //       console.warn(code, message);
  //     })

  // }

  //   const country = async (latitude,longitude) => {
  //     try { 
  //       const response = await fetch(
  //         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'User-Agent': 'com.r2aqrapp/1.0',
  //             'Accept': 'application/json',
  //           },
  //         }

  //       );

  //      if (response) {
  //        const data = await response.json();
  //         console.log('res',data.address.country)
  //         setIndia(data.address.country)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   };

  const menucontent = () => {
    return (
      <View style={styles.sidemenu}>
        {navigationView()}
      </View>
    )
  }

  const openDrawer = () => {
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
  }


  const naviagte = (id) => {
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
  const appicon = () => {
    navigation.navigate('Home')
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
    // { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: 'rgb(71, 162, 228)' },
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

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 170, // Moves the scanning line down
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
  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();

    return () => subscription?.remove();
  }, []);


  useEffect(() => {
    // handellocation()
    country()
  }, [])

  const navigationView = () => (
    <>
      <ScrollView>
        <View style={styles.close}>
          <TouchableOpacity onPress={closeDrawer}>
            <Icon
              name="close-circle"
              size={25}
              color="rgb(71, 162, 228)"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.sideimgcontainer}>
          <Image
            style={styles.sidetinyLogo}
            source={logo}
          />
          <TouchableOpacity onPress={appicon}>
            <Text style={{ fontFamily: 'Roboto', color: '#3078a4', fontSize: 20, paddingLeft: 5, paddingTop: 3 }}>Verify2Buy</Text>
          </TouchableOpacity>
        </View>
        {india === "India" || "in" ? (
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
                onPress={() => naviagte(item.id)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    name={item.icon}
                    size={25}
                    color={item.iconColor}
                    style={{ marginLeft: 10, marginTop: 5 }}
                  />
                  <Text style={{ fontFamily: 'Roboto', color: '#3078a4', fontSize: 20, paddingLeft: 15, paddingTop: 3, }}>{item.label}</Text>
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
                onPress={() => naviagte(item.id)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    name={item.icon}
                    size={25}
                    color={item.iconColor}
                    style={{ marginLeft: 10, marginTop: 5 }}
                  />
                  <Text style={{ fontFamily: 'Roboto', color: '#3078a4', fontSize: 20, paddingLeft: 15, paddingTop: 3, }}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.footerTextcontainer}>
          <Text style={{ fontFamily: 'Roboto', color: '#3078a4', fontSize: 20, paddingLeft: 15, paddingTop: 10 }}>Follow us on</Text>
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
  return (
    <MenuDrawer
      open={isOpen}
      position={'left'}
      drawerContent={menucontent()}
      drawerPercentage={300}
      animationTime={250}
      overlay={true}
      opacity={0.4}
    >
      <LinearGradient colors={["#88def1", "#04467e"]} style={{ flex: 1, }} >
        {/* <SafeAreaView style={{ flex: 1, backgroundColor: ' #F5F5F5' }}>
        <ImageBackground source={glass} resizeMode="cover" style={styles.backgroundimage}> */}
        <View>
          <ScrollView style={styles.guidescrollView}>
            <View style={styles.menuopen}>
              <TouchableOpacity onPress={openDrawer}>
                <Icon
                  name="menu-open"
                  size={25}
                  color="#FFFF"
                />
              </TouchableOpacity>
            </View>
            {orientation !== 'landscape' ? (
              <>
                <View style={styles.guidecontainer}>
                  <View style={styles.textConatiner}>
                    <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>Why We Need Verify2Buy App</Text>
                    <View style={styles.colorbackground}>

                      <View style={styles.rowitems}>
                        <Image
                          source={one}
                          style={styles.columnimage}
                        />
                        <Text style={styles.textrow}>Quick and easy scanning to check product authenticity in real-time</Text>
                      </View>
                    </View>
                    <View style={styles.colorbackground}>
                      <View style={styles.rowitems4}>
                        <Text style={styles.textrowodd}>Confirms that the scanned product is genuine and not a fake</Text>
                        <Image
                          source={two}
                          style={styles.columnimage4}
                        />
                      </View>
                    </View>
                    <View style={styles.colorbackground}>
                      <View style={styles.rowitems3}>
                        <Image
                          source={three}
                          style={styles.columnimage}
                        />
                        <Text style={styles.textrow}>Helps prevent the purchase of counterfeit food items that may be harmful</Text>
                      </View>
                    </View>
                    <View style={styles.colorbackground}>
                      <View style={styles.rowitems4}>
                        <Text style={styles.textrowodd}>Builds trust when buying from new or unfamiliar brands</Text>
                        <Image
                          source={four}
                          style={styles.columnimage4}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>Why We Need Verify2Buy App</Text>
                <View style={styles.portraitContainer}>
                  <View style={styles.portraittextContainer}>
                    <View style={styles.rowitemss}>
                      <Image
                        source={one}
                        style={styles.columnimage}
                      />
                      <Text style={styles.textrowpotrate}>Quick and easy scanning to check product authenticity in real-time</Text>
                    </View>
                    <View style={styles.rowitemss}>
                      <Image
                        source={two}
                        style={styles.columnimage}
                      />
                      <Text style={styles.textrowpotrate}>Confirms that the scanned product is genuine and not a fake</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.portraitContainer}>
                  <View style={styles.portraittextContainer}>
                    <View style={styles.rowitemss}>
                      <Image
                        source={three}
                        style={styles.columnimage}
                      />
                      <Text style={styles.textrowpotrate}>Helps prevent the purchase of counterfeit food items that may be harmful</Text>
                    </View>
                    <View style={styles.rowitemss}>
                      <Image
                        source={four}
                        style={styles.columnimage}
                      />
                      <Text style={styles.textrowodd}>Provides users with trust when buying from unknown or new brands</Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </ScrollView>
          {/* </ImageBackground>
      </SafeAreaView> */}
        </View>
      </LinearGradient>
    </MenuDrawer>
  );
};

const styles = StyleSheet.create({

  close: {
    position: 'absolute',
    top: 5,
    left: 235
  },
  menuopen: {
    marginLeft: 10,
    marginTop: 5,
  },

  sidemenu: {
    flex: 1,
    backgroundColor: 'white',
    width: 280
  },

  guidecontainer: {
    flex: 1,
    marginTop: 7,
    // width:maxwidth,
    // height:maxheight
  },
  textConatiner: {
    flexDirection: 'column',
    gap: 15,
  },
  portraitContainer: {
    flex: 1,

  },
  portraittextContainer: {
    flexDirection: 'row',
    gap: 5,
    // backgroundColor:'black',
    width: maxwidth,
    marginLeft: 10,
    marginRight: 10,
    // width:500
    // gap:170
    // rowGap:10,
    //display:'flex',
    // alignItems:'center'
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
    borderLeftColor: "white",
    borderTopColor: 'rgb(71, 162, 228)',
    //borderRightColor:'white',
    borderWidth: 1,
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
  videostyle: {
    width: 320,
    height: 270
  },
  videostylelandscape: {
    width: 620,
    height: 250
  },
  guidescrollView: {
    //marginBottom: 10,
    // maxHeight: 630,
  },
  backgroundimage: {
    flex: 1,
    // justifyContent: 'center',
    // width:360,
    // height:700
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000',
    marginLeft: 5,
    marginTop: 70
  },
  imageWrapper: {
    width: 200,
    height: 200,
    overflow: 'hidden', 
    borderRadius: 10,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  scannerLine: {
    position: 'absolute',
    width: 145,
    marginLeft: 25,
    height: 4,
    backgroundColor: 'rgb(61, 202, 179)',
    opacity: 0.8,
  },
  colorbackground: {
    //backgroundColor:'#FFFFFF50',
    width: maxwidth,
    // height:620,
    // borderRadius:40,
    // marginLeft:10,
    // marginRight:10
  },
  rowitems: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: maxwidth,
    marginLeft: 10,
    marginRight: 10,
    gap: 5,
    backgroundColor: '#FFFFFF50',
    borderRadius: 40,
  },

  rowitems4: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    // width:250,
    width: maxwidth,
    marginLeft: 10,
    marginRight: 10,
    //  gap:5,
    backgroundColor: '#FFFFFF50',
    borderRadius: 40,
    //  width:maxwidth,
    //  marginLeft:5,
    // marginRight:10,
    // gap:1,
    // backgroundColor:'#FFFFFF50',
  },
  columnimage: {
    width: 90,
    height: 120,
    resizeMode: 'contain',

  },
  columnimage4: {
    width: 90,
    height: 120,
    resizeMode: 'contain',
  },

  textrow: {
    fontSize: 17,
    color: 'white',
    flexWrap: 'wrap',
    display: 'flex',
    alignSelf: 'center',
    flexShrink: 1,

    //  width:maxwidth,
    //  marginLeft:10,
    //  marginRight:10
    //  marginLeft:10
  },
  rowitems3: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: maxwidth,
    marginLeft: 10,
    marginRight: 10,
    gap: 5,
    backgroundColor: '#FFFFFF50',
    borderRadius: 40,
  },
  textrowodd: {
    fontSize: 17,
    color: 'white',
    flexWrap: 'wrap',
    display: 'flex',
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    flexShrink: 1,
    width: 300
  },
  textrowpotrate: {
    fontSize: 17,
    color: 'white',
    flexWrap: 'wrap',
    display: 'flex',
    alignSelf: 'center',
    //  width:250,
    flexShrink: 1,
    //  marginLeft:10
  },
  rowitemss: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    gap: 7,

  },
})
