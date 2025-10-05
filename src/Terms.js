import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Animated, Text,TouchableOpacity, Image, ScrollView, Dimensions,Modal, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import logo from '../assets/logo.png'
import logodark from '../assets/logoblack.png'
import MenuDrawer from 'react-native-side-drawer'
import LinearGradient from 'react-native-linear-gradient';
const { maxwidth, maxheight } = Dimensions.get('window');
import one from '../assets/universum.png'
import DeviceCountry from 'react-native-device-country';
import ThemeContext from './themes/ThemeContext';

export default function Terms({ navigation }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [orientation, setOrientation] = useState('portrait');
  const [isOpen, setIsOpen] = useState(false);
const { isDarkMode } = useContext(ThemeContext);
const [india, setIndia] = useState('')


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
               <Text style={{ fontFamily: 'Roboto', color: !isDarkMode ?  '#3078a4' : '#1D211D', fontSize: 20, paddingLeft: 15, paddingTop: 10 }}>Follow us on</Text>
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
      TermsLink()
      country()
    }, [])

const TermsLink = () => {
      Linking.openURL("https://www.universumgs.com/privacy.html")
  }


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
           
                <View style={styles.guidecontainer}>
                  <View style={styles.textConatiner}>
                    <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}><Text>Will have a hyperlink that will take to our website</Text> <Text style={{color:'#04467e'}} onPress={TermsLink} >universumgs.com</Text> <Text>& display the full privacy policy</Text></Text>
                      <View style={{display:"flex",alignSelf:"center"}}>
                        <Image
                          source={one}
                          style={styles.columnimage}
                        />
                      </View>
                    </View>
                  </View>
          </ScrollView>
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
    gap:2,
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
   
    //flex: 1,
    // flexDirection: 'row',
    // width: maxwidth,
    // marginLeft: 10,
    // marginRight: 10,
    // gap: 5,
    // backgroundColor: '#FFFFFF50',
    // borderRadius: 40,
    alignSelf:'center'
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
    width: 120,
    height: 120,
    resizeMode: 'contain',
    // backgroundColor:"black"

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
    gridview: {
    padding: 10,
    maxHeight: 400,
  },
    fakeheader: {
    fontSize: 19,
    // color: '#04467e',
    color:'red',
    // flex:1,
    flexWrap: "wrap"
  },
    faketext: {
    fontSize: 17,
    color: '#04467e',
 flexShrink: 1,
    width:300
  },
  errorbutton: {
    padding: 10,
    height: 40,
    width: 100,
    backgroundColor: '#7cb1e0ff',
    borderRadius: 50,
    // / borderColor:'rgb(253, 126, 20)',
    flex: '1',
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
