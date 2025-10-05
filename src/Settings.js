import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Animated, Text, TouchableOpacity, Image, ScrollView, Dimensions, Modal, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import logo from '../assets/logo.png'
import logodark from '../assets/logoblack.png'
import MenuDrawer from 'react-native-side-drawer'
import LinearGradient from 'react-native-linear-gradient';
const { maxwidth, maxheight } = Dimensions.get('window');
import dark from '../assets/dark.png'
import light from '../assets/light.png'
// import { useColorScheme , Switch } from 'react-native'
import ThemeContext from './themes/ThemeContext';
import DeviceCountry from 'react-native-device-country';





export default function Settings({ navigation }) {
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
            <LinearGradient colors={!isDarkMode ? ["#88def1", "#04467e"] : ["#1D211D", "#4F4E48"]} style={{ flex: 1, }} >
                
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

                        <View style={styles.guidecontainer}>
                            <View style={styles.textConatiner}>
                                <Text style={styles.datacodetext}>Display</Text>
                            </View>
                            <View style={styles.ImgConatiner}>
                                <View style={styles.ButtonConatiner}>
                                    <View>
                                        <Image
                                            source={light}
                                            style={styles.columnimage}
                                        />
                                    </View>
                                    <View style={styles.Btncontainer}>
                                        <TouchableOpacity style={styles.codecontainer} onPress={toggleDarkMode}>
                                            <Text style={styles.datacodetext}>Light
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                 <View style={styles.ButtonConatiner}>
                                    <View>
                                        <Image
                                            source={dark}
                                            style={styles.columnimage}
                                        />
                                    </View>
                                    <View style={styles.Btncontainer}>
                                        <TouchableOpacity style={styles.codecontainer} onPress={toggleDarkMode}>
                                            <Text style={styles.datacodetext} >Dark
                                            </Text>
                                             
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                            <View style={styles.textConatiner2}>
                                <Text style={styles.datacodetext}>Dark Mode Settings</Text>
                            </View>
                        </View>
                    </ScrollView>
                
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

    guidecontainer: {
        flex: 1,
        marginTop: 7,
        // width:maxwidth,
        // height:maxheight
    },
    textConatiner: {
        // flexDirection: 'column',
        //  gap:15,
        marginLeft: 15
    },
     textConatiner2: {
        // flexDirection: 'column',
        //  gap:15,
        marginLeft: 15,
        marginTop:10
    },
    ButtonConatiner: {
        flexDirection: "column",
        gap: 10
    },

    ImgConatiner: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 15,
        display: "flex",
        alignSelf: "center"
    },

    columnimage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',

    },

    codecontainer: {
        padding: 10,
        //marginLeft: 80,
        height: 40,
        width: 70,
        backgroundColor: '#FFFFFF50',
        borderRadius: 50,
        borderColor: 'rgb(253, 126, 20)',
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: 10,
        // marginTop: 10
        // marginTop: 80,
    },
    datacodetext: {
        fontSize: 15,
        color: 'white',
        flexWrap: 'wrap',
        fontWeight: 'bold'
        //marginLeft:20,
        //marginTop:5
    },
    Btncontainer: {
        display: 'flex',
        alignSelf: 'center'
    },
 sidemenu: {
    flex: 1,
    backgroundColor: 'white',
    width: 280
  },
})
