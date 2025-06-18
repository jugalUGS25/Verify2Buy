import React, { useEffect, useState, useRef } from 'react';
import { RefreshControl, StyleSheet, Pressable, View, Text, Linking, ImageBackground, TouchableOpacity, Button, Alert, Image, ScrollView, ActivityIndicator, Modal, FlatList, Dimensions, DrawerLayoutAndroid, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../assets/logo.png';
import MenuDrawer from 'react-native-side-drawer';
import LinearGradient from 'react-native-linear-gradient';
import DeviceCountry from 'react-native-device-country';
import uber from '../assets/uber.png'
import ola from '../assets/ola.png'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'r2a.db' })
const { maxwidth, maxheight } = Dimensions.get('window');

export default function RewardScreen({ navigation }) {
  // const drawer = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [rewardscode, setrewardscode] = useState([])
  const [isOpen, setIsOpen] = useState(false);
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
  const handelcoupon = () => {
    Linking.openURL('https://www.uber.com/in/en/')
  }

  const getrewards = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM r2a_rewardstable', [], (tx, res) => {
        if (res.rows.length > 0) {
          let lastItem = res.rows.item(res.rows.length - 1);
          setrewardscode([lastItem]);
        } else {
          setrewardscode([]);
        }
      });
    });
  };


  useEffect(() => {
    getrewards()
    country()
  }, [])


  // const coupontoken = async () => {
   
  //   try {
  //     const response = await fetch("https://localhost:7024/api/Coupon/GetCoupons");

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const res = await response.json();
  //     // const coupondata = res.data
  //     console.log('couponcode:',res)
  //     // setCouponcode(coupondata)

  //   } catch (error) {
  //     console.error("Error fetching promo codes:", error);
  //   }
  // };

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
    { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: 'rgb(71, 162, 228)' },
    { id: 3, label: 'History', icon: 'history', iconColor: 'rgb(71, 162, 228)' },
    { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: 'rgb(71, 162, 228)' },
    { id: 5, label: 'Close App', icon: 'logout', iconColor: 'rgb(71, 162, 228)' },
  ];

  const menuItemsIndia = [
    { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: 'rgb(71, 162, 228)' },
    { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: 'rgb(71, 162, 228)' },
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
            <Text style={styles.Apptitle}>Verify2Buy</Text>
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
                onPress={() => naviagte(item.id)}
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

  // useEffect(() => {
  //    coupontoken()
  //     }, []) 


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
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: ' #F5F5F5' }}>
         <ImageBackground source={glass} resizeMode="cover" style={styles.backgroundimage}> */}
      <LinearGradient colors={["#88def1", "#04467e"]} style={{ flex: 1, }} >
        {/* <SafeAreaView style={{ flex: 1, backgroundColor: '#6cbdd8' }}> */}
        <ScrollView style={styles.guidescrollView}>
          <View style={styles.menuopen}>
            <TouchableOpacity onPress={openDrawer}>
              <Icon
                name="menu-open"
                size={25}
                color="#ffff"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.guidecontainer}>
            <View style={styles.mainconatiner}>
              <View style={styles.text}>
                <Text style={{ fontSize: 18, fontWeight: '800', color: 'white' }}>
                  Your Reward Points : 50</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.oval}>
                  <View style={styles.cutShape1} />
                  <View style={styles.pointstext}>
                    <Text style={{ color: 'white', fontSize: 19 }}>50</Text>
                  </View>
                </View>
                <View style={styles.coupncontainer}>
                  <View style={styles.couponTextoconatiner}>
                    <View>
                      <View style={styles.coupontext1}>
                        <Image
                          style={styles.uberLogo}
                          source={uber}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={styles.coupontext}>
                        30% flat off all on rides with in the city Using HDFC Credit Card
                      </Text>
                    </View>
                    <View style={{
                      backgroundColor: '#FFFFFF50', width: 200, alignSelf: 'center', marginRight: 20,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}>
                      <TouchableOpacity onPress={handelcoupon}>
                        <Text style={styles.code}>USECODE : STEALDEAL</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.cutShape} />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.oval}>
                  <View style={styles.cutShape1} />
                  <View style={styles.pointstext}>
                    <Text style={{ color: 'white', fontSize: 19 }}>100</Text>
                  </View>
                </View>
                <View style={styles.coupncontainer}>
                  <View style={styles.couponTextoconatiner}>
                    <View>
                      <View style={styles.coupontext1}>
                        <Image
                          style={styles.uberLogo}
                          source={ola}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={styles.coupontext}>
                        20% flat off all on rides with in the city Using HDFC Credit Card
                      </Text>
                    </View>
                    <View style={{
                      backgroundColor: '#FFFFFF50', width: 200, alignSelf: 'center', marginRight: 20,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}>
                      <TouchableOpacity>
                        <Text style={styles.code}>USECODE : STEALDEAL</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.cutShape} />
                </View>

              </View>
              <View style={styles.row}>
                <View style={styles.oval}>
                  <View style={styles.cutShape1} />
                  <View style={styles.pointstext}>
                    <Text style={{ color: 'white', fontSize: 19 }}>150</Text>
                  </View>
                </View>
                <View style={styles.coupncontainer}>
                  <View style={styles.couponTextoconatiner}>
                    <View>
                      <View style={styles.coupontext1}>
                        <Image
                          style={styles.uberLogo}
                          source={uber}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={styles.coupontext}>
                        30% flat off all on rides with in the city Using HDFC Credit Card
                      </Text>
                    </View>
                    <View style={{
                      backgroundColor: '#FFFFFF50', width: 200, alignSelf: 'center', marginRight: 20,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}>
                      <TouchableOpacity>
                        <Text style={styles.code}>USECODE : STEALDEAL</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.cutShape} />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.oval}>
                  <View style={styles.cutShape1} />
                  <View style={styles.pointstext}>
                    <Text style={{ color: 'white', fontSize: 17, flexShrink: 1, }}>200</Text>
                  </View>
                </View>
                <View style={styles.coupncontainer}>
                  <View style={styles.couponTextoconatiner}>
                    <View>
                      <View style={styles.coupontext1}>
                        <Image
                          style={styles.uberLogo}
                          source={ola}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={styles.coupontext}>
                        20% flat off all on rides with in the city Using HDFC Credit Card
                      </Text>
                    </View>
                    <View style={{
                      backgroundColor: '#FFFFFF50', width: 200, alignSelf: 'center', marginRight: 20,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}>
                      <TouchableOpacity>
                        <Text style={styles.code}>USECODE : STEALDEAL</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.cutShape} />
                </View>
              </View>
              <View></View>
            </View>
          </View>
        </ScrollView>
        {/* </SafeAreaView> */}
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
  row: {
    //  flex:1,
    flexDirection: 'row',
    // marginTop:15,
    // justifyContent: 'flex-start',
    // gap:10,
    // alignSelf:"center",
    width: maxwidth,
    marginRight: 25,
    marginLeft: 15,
    // borderWidth:1,
    // borderBottomColor:'red',
    // borderTopColor:'red',
    // borderRightColor:'red',
    // borderLeftColor:'red'
  },

  coupncontainer: {
    width: maxwidth,
    marginRight: 36,
    height: 140,
    backgroundColor: "#FFFFFF50",
    //  backgroundColor: "#85c1e9",
    borderRadius: 10,
    marginLeft: 3,
    position: 'relative',
    // borderWidth:1,
    // borderBottomColor:'red',
    // borderTopColor:'red',
    // borderRightColor:'red',
    // borderLeftColor:'red',
    // width: maxwidth - 500
    // width:maxwidth-10
  },
  cutShape: {
    position: 'absolute',
    right: 0,
    top: '50%',
    width: 20,
    height: 40,
    // backgroundColor: '#6cbdd8', 
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderRightWidth: 0,
    borderRightColor: 'none',
    transform: [{ translateY: -20 }],
  },
  cutShape1: {
    position: 'absolute',
    left: 20,
    top: '35%',
    // width: 10,
    height: 40,
    backgroundColor: '#6cbdd8',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderRightWidth: 0,
    borderRightColor: 'none',
    transform: [{ translateX: -20 }],
  },

  text: {
    // marginTop:5,
    alignItems: 'center',
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
    borderTopColor: '#2596be',
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
    backgroundColor: '#dfdfdf',
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
    borderTopColor: '#2596be',
    borderWidth: 1,
    borderLeftColor: "white",
    width: 290,
  },
  backgroundimage: {
    flex: 1,
    justifyContent: 'center',
  },

  oval: {
    width: 50,
    height: 140,
    backgroundColor: "#FFFFFF50",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  mainconatiner: {
    flexDirection: 'column',
    gap: 15,
  },
  guidecontainer: {
    flex: 1,
    // marginTop:7,
  },

  coupontext: {
    color: 'white',
    textAlign: 'center',
    // fontSize:15,
    width: maxwidth,
    marginRight: 25,
    // paddingTop:50,
    // paddingRight:17,
    flexShrink: 1,
    //  borderWidth:1,
    //   borderBottomColor:'red',
    //   borderTopColor:'red',
    //   borderRightColor:'red',
    //   borderLeftColor:'red',
  },
  coupontext1: {
    color: 'white',
    textAlign: 'center',
    // paddingTop:50,
    // paddingRight:15
  },
  couponTextoconatiner: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 7
  },
  uberLogo: {
    width: 35,
    height: 35,
    alignSelf: 'center',
  },
  code: {
    fontFamily: 'Roboto',
    color: '#3078a4',
    fontSize: 15,
    textAlign: 'center'
  },
  pointstext: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    // marginLeft:15
  },
  guidescrollView: {
    //  maxHeight: maxheight,
    // maxWidth: maxwidth,
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
})