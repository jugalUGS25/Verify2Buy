import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Animated, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import { useAppTheme } from './theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import logo from '../assets/logo.png'
// import Icon from 'react-native-vector-icons/Feather'; // Or use Lottie for animated icons
import LinearGradient from 'react-native-linear-gradient';
import MenuDrawer from 'react-native-side-drawer'
import ThemeContext from './themes/ThemeContext';
import DeviceCountry from 'react-native-device-country';
// const { maxwidth, maxheight } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const theme = useAppTheme();

  const benefits = [
    {
      icon: 'search',
      title: 'Quick Scanning',
      description: 'Check product authenticity in seconds.',
      image: require('../assets/1.png'),
    },
    {
      icon: 'check-circle',
      title: 'Genuine Products',
      description: 'Confirm items are real, and buy with confidence.',
       image: require('../assets/2.png'),
    },
    {
      icon: 'alert-triangle',
      title: 'Counterfeit Protection',
      description: 'Avoid harmful food items.',
       image: require('../assets/3.png'),
    },
    {
      icon: 'shield',
      title: 'Build Trust',
      description: 'Shop confidently with new brands.',
       image: require('../assets/4.png'),
    },
  ];

   const [hoveredIndex, setHoveredIndex] = useState(null)
    //const [orientation, setOrientation] = useState('portrait');
    const [isOpen, setIsOpen] = useState(false);
     const [india, setIndia] = useState('')
    // const [IsDarkmode,setIsDarkMode]=useContext(ThemeContext)
    const { isDarkMode,toggleDarkMode } = useContext(ThemeContext);
    
    // const handelchangemode =()=>{
    //      setIsDarkMode('dark')
    //      navigation.navigate('')

    // }


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
     { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D' },
     { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'},
    { id: 3, label: 'History', icon: 'history', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
    { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D' },
    { id: 5, label: 'Privacy Policy', icon: 'shield-account', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
     { id: 6, label: 'Settings', icon: 'cog', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
    { id: 7, label: 'Close App', icon: 'logout', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
  ];

  const menuItemsIndia = [
    { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D' },
     { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D' },
    { id: 3, label: 'History', icon: 'history', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
    { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D' },
    { id: 5, label: 'Privacy Policy', icon: 'shield-account', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
     { id: 6, label: 'Settings', icon: 'cog', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
    { id: 7, label: 'Close App', icon: 'logout', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
  ];



   const footermenuItems = [
    { id: 1, icon: 'google-play', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
    { id: 2, icon: 'apple', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
    { id: 3, icon: 'linkedin', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
    { id: 4, icon: 'file-excel-box', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
    { id: 5, icon: 'instagram', iconColor: !isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'  },
  ];



      const navigationView = () => (
        <>
          <ScrollView>
            <View style={styles.close}>
              <TouchableOpacity onPress={closeDrawer}>
                <Icon
                  name="close-circle"
                  size={25}
                  color= {!isDarkMode ?  'rgb(71, 162, 228)' : '#1D211D'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sideimgcontainer}>
              <Image
                style={styles.sidetinyLogo}
                source={!isDarkMode ?  logo : logo}
              />
              <TouchableOpacity onPress={appicon}>
                <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ?  '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 1, paddingTop: 3 }}>Verify2Buy</Text>
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
                      <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ?  '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 15, paddingTop: 3, }}>{item.label}</Text>
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
                      <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ?  '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 15, paddingTop: 3, }}>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View style={styles.footerTextcontainer}>
              <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ?  '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 15,paddingTop:10}}>Follow us on</Text>
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

     useEffect(() => {
       // handellocation()
       country()
     }, [])


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
  {/* <LinearGradient  colors={!isDarkMode ? ["#88def1", "#04467e"] : ["#1D211D", "#4F4E48"]} style={{ flex: 1, }} > */}
    {/* <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>  */}
     <View style={styles.menuopen}>
          <TouchableOpacity onPress={openDrawer}>
            <Icon
              name="menu-open"
              size={25}
              color="#FFFF"
            />
          </TouchableOpacity>
      </View>
     <ScrollView style={styles.container}> 
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Welcome to Verify2Buy</Text>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Scan. Trust. Buy with Confidence.
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {benefits.map((item, index) => (
          <View key={index} style={[styles.card, { backgroundColor: theme.colors.card }]}>
            {/* <Icon name={item.icon} size={28} color={theme.colors.accent} /> */}
            <Image
              source={item.image}
              style={styles.columnimage}
            />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.cardDesc, { color: theme.colors.textSecondary,fontWeight:500 }]}>{item.description}</Text>
          </View>
        ))}
         </View>
    

          {/* <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.navigate('Scanner')}
          >
            <Text style={[styles.buttonText, { color: theme.colors.surface }]}>Get Started</Text>
          </TouchableOpacity> */}
    </ScrollView>
    {/* </LinearGradient> */}
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
  cardContainer: {
    marginVertical: 0,
    marginTop:-10
  //backgroundColor:"red"
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  cardDesc: {
    fontSize: 14,
    marginTop: 4,
  },

  button: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  columnimage: {
    width: 45,
    height: 30,
    objectFit:'cover'

  },
   sidemenu: {
    flex: 1,
    backgroundColor: 'white',
    width: 280
  },
 
});

export default Login;