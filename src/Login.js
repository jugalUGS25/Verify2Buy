import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, View, Animated, Text, TouchableOpacity, Image, ScrollView, Dimensions, Modal, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import logo from '../assets/logo.png'
import logomain from '../assets/logoload.png'
import MenuDrawer from 'react-native-side-drawer'
import DeviceCountry from 'react-native-device-country';
import LinearGradient from 'react-native-linear-gradient';
import FirstLaunch from './FirstLaunch';
import ThemeContext from './themes/ThemeContext';
// import { useAppTheme } from './theme';
const { maxwidth, maxheight } = Dimensions.get('window');

export default function Loginload({ navigation }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [orientation, setOrientation] = useState('portrait');
  const [isOpen, setIsOpen] = useState(false);
  const [india, setIndia] = useState('')
  // const [disclaimerPopup, setdisclaimerPopup] = useState(false)
  const { isDarkMode } = useContext(ThemeContext);
  //    const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  //  const theme = useAppTheme();

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

  const benefitsone = [
    {
      icon: 'barcode-scan',
      //title: 'Quick Scanning',
      title: 'Scan',
      //description: 'Check product authenticity in seconds.',
      //image: require('../assets/1.png'),
    },
    {
      icon: 'history',
      //title: 'Genuine Products',
      title: 'History',
      //description: 'Confirm items are real, and buy with confidence.',
      //image: require('../assets/2.png'),
    },

  ];

  const benefitstwo = [

    {
      icon: 'ticket-percent-outline',
      //title: 'Genuine Products',
      title: 'Rewards',
      //description: 'Confirm items are real, and buy with confidence.',
      //image: require('../assets/2.png'),
    },
    {
      icon: 'cog',
      //title: 'Genuine Products',
      title: 'Settings',
      //description: 'Confirm items are real, and buy with confidence.',
      //image: require('../assets/2.png'),
    },
  ];

  

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

  //   const handelAccept =()=>{
  //     setdisclaimerPopup(false)
  //   }
  // const handelDecline =()=>{
  //     setdisclaimerPopup(false)

  //   }

  const naviagte = (id) => {
    if (id === 1) {
      //navigation.navigate('Scanner')
      navigation.navigate('Home')
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
      navigation.navigate('Privacy Policy')
      setIsOpen(false)
    }
    if (id === 6) {
      navigation.navigate('Settings')
      setIsOpen(false)
    }
    if (id === 7) {
      navigation.navigate('Logout')
      setIsOpen(false)
    }

  }
  const appicon = () => {
    navigation.navigate('Home')
  }

  const menuItems = [
    // { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 1, label: 'Home', icon: 'arch', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 3, label: 'History', icon: 'history', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 5, label: 'Privacy Policy', icon: 'shield-account', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 6, label: 'Settings', icon: 'cog', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 7, label: 'Close App', icon: 'logout', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
  ];

  const menuItemsIndia = [
    // { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 1, label: 'Home', icon: 'arch', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 3, label: 'History', icon: 'history', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 5, label: 'Privacy Policy', icon: 'shield-account', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 6, label: 'Settings', icon: 'cog', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 7, label: 'Close App', icon: 'logout', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
  ];

  const footermenuItems = [
    { id: 1, icon: 'google-play', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 2, icon: 'apple', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 3, icon: 'linkedin', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 4, icon: 'file-excel-box', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
    { id: 5, icon: 'instagram', iconColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D' },
  ];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.3,      // zoom in scale
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,        // zoom back to normal
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
  // useEffect(() => {
  //     Disclaimer()
  // }, [])


  const navigationView = () => (
    <>
      <ScrollView>
        <View style={styles.close}>
          <TouchableOpacity onPress={closeDrawer}>
            <Icon
              name="close-circle"
              size={25}
              color={!isDarkMode ? 'rgb(71, 162, 228)' : '#1D211D'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.sideimgcontainer}>
          <Image
            style={styles.sidetinyLogo}
            source={!isDarkMode ? logo : logo}
          />
          <TouchableOpacity onPress={appicon}>
            <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ? '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 1, paddingTop: 3 }}>Verify2Buy</Text>
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
                  <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ? '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 15, paddingTop: 3, }}>{item.label}</Text>
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
                  <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ? '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 15, paddingTop: 3, }}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.footerTextcontainer}>
          <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ? '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 15, paddingTop: 10 }}>Follow us on</Text>
        </View>
        <View style={styles.footerContainer}>
          {footermenuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.footerbar}
           
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
// Replace the return statement section (starting from "return (") with this:

// Replace the return statement section (starting from "return (") with this:

// Replace the return statement section (starting from "return (") with this:

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
    <LinearGradient colors={!isDarkMode ? ["#88def1", "#04467e"] : ["#1D211D", "#4F4E48"]} style={{ flex: 1 }}>
      {/* FirstLauch as overlay - doesn't take layout space */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <FirstLaunch />
      </View>
      
      {/* Menu icon - absolute positioned */}
      <TouchableOpacity 
        onPress={openDrawer}
        style={{ position: 'absolute', top: 10, left: 20, zIndex: 10 }}
      >
        <Icon name="menu-open" size={28} color="#FFFF" />
      </TouchableOpacity>

      {/* Main content container - using absolute positioning */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {/* Header at top */}
        <View style={{ position: 'absolute', top: 60, left: 0, right: 0, alignItems: 'center' }}>
          <Text style={[styles.title, { color: !isDarkMode ? "#3078a4" : "#ffffffff" }]}>
            Welcome to Verify2Buy
          </Text>
          <Text style={[styles.subtitle, { color: !isDarkMode ? "#ffffffff" : "#ffffffff" }]}>
            Scan. Trust. Buy with Confidence.
          </Text>
        </View>

        {/* CENTERED LOGO - Absolutely centered */}
        <View style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -100 }, { translateY: -100 }] }}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <View style={styles.imageWrapper}>
              <Image source={logomain} style={styles.image} />
            </View>
          </Animated.View>
        </View>

        {/* Scan button at bottom */}
        <View style={{ position: 'absolute', bottom: 60, left: 0, right: 0, alignItems: 'center' }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: !isDarkMode ? 'rgb(71, 162, 228)' : '#ffa500' }]}
            onPress={() => navigation.navigate('Scanner')}
          >
            <View style={{ flexDirection: 'row', gap: 7, alignItems: 'center' }}>
              <Icon name="barcode-scan" size={25} color={!isDarkMode ? "#ff6200" : "#ffffffff"} />
              <Text style={[styles.buttonText, { color: !isDarkMode ? "#ff6200" : "#ffffffff" }]}>Scan</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    borderLeftColor: "white",
    borderTopColor: 'rgb(71, 162, 228)',
    //borderTopColor: '#b3b3b3',
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

  footerTextcontainer: {
    // marginTop:70,
    borderBottomColor: "white",
    borderTopColor: 'rgb(71, 162, 228)',
    borderWidth: 1,
    borderLeftColor: "white",
    width: 290,
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

  menuopen: {
    marginLeft: 10,
    marginTop: 5,
  },


  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    // marginTop: 9,
    textAlign: 'center',
  },
  cardContainerimg: {
    display: 'flex',
    alignSelf: 'center',
    width: 200,
    height: 200
  },

  cardContainer: {
    marginVertical: 0,
    marginTop: 87,
    flexDirection: 'row',
    gap: 25,
    width: maxwidth,
    display: 'flex',
    alignSelf: 'center'
  },
  cardContainerTwo: {
    marginVertical: 0,
    marginTop: 7,
    flexDirection: 'row',
    gap: 25,
    width: maxwidth,
    display: 'flex',
    alignSelf: 'center'
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    width: 150,
    height: 55,
    flexDirection: 'row',
    gap: 10
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing:1
    // marginTop: 8,
  },
  cardDesc: {
    fontSize: 14,
    marginTop: 4,
  },

  button: {
    // marginTop: 10,
    paddingVertical: 14,
    borderRadius: 8,
    width: 250,
    alignItems: 'center',
    
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1
  },
  columnimage: {
    width: 45,
    height: 30,
    objectFit: 'cover'

  },
  sidemenu: {
    flex: 1,
    backgroundColor: 'white',
    width: 280
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
    //   borderBottomColor: "rgb(71, 162, 228)",
    //     borderTopColor: 'rgb(71, 162, 228)',
    //     borderWidth: 1,
    //     borderLeftColor: "white",
  },
  Animcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: '#000',
  },
  //   image: {
  //     width: 200,
  //     height: 200,
  //     borderRadius: 16,
  //   },

})
