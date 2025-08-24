import React, { useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import logo from '../assets/logo.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MenuDrawer from 'react-native-side-drawer'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'r2a.db' })
import DeviceCountry from 'react-native-device-country';
import LinearGradient from 'react-native-linear-gradient';

const { maxwidth, maxheight } = Dimensions.get('window');

export default function History({ navigation }) {

  const [Historydatas, setHistorydatas] = useState([]);
  const [india, setIndia] = useState('')


  const gethistydatas = async () => {

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM r2a_usertable', [], (tx, res) => {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i)
          temp.push(res.rows.item(i));
        console.log(temp)
        const uniqueArray = [...new Map(temp.map(item => [item.barcode, item])).values()]
        setHistorydatas(uniqueArray)
      });
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

  // const country = async (latitude,longitude) => {
  //   try { 
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'User-Agent': 'com.r2aqrapp/1.0 (neelkrishnan999@gmail.com)',
  //           'Accept': 'application/json',
  //         },
  //       }

  //     );

  //    if (response) {
  //      const data = await response.json();
  //     const rescoun = data.address
  //       setIndia(rescoun.country)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };


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

  useEffect(() => {
    gethistydatas()
    country()
    // handellocation()
  }, [])


  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  // const { historydatas } = route.params;
  //  const drawer = useRef(null);

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
       navigation.navigate('Privacy Policy')
      setIsOpen(false)
    }
    if (id === 6) {
      navigation.navigate('Logout')
      setIsOpen(false)
    }

  }


  const menuItems = [

  ];

  const menuItemsIndia = [
       { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: 'rgb(71, 162, 228)' },
    // { id: 2, label: 'Rewards', icon: 'ticket-percent-outline', iconColor: 'rgb(71, 162, 228)' },
    { id: 3, label: 'History', icon: 'history', iconColor: 'rgb(71, 162, 228)' },
    { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: 'rgb(71, 162, 228)' },
    { id: 5, label: 'Privacy Policy', icon: 'shield-account', iconColor: 'rgb(71, 162, 228)' },
    { id: 6, label: 'Close App', icon: 'logout', iconColor: 'rgb(71, 162, 228)' },
  ];

  const footermenuItems = [
   { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: 'rgb(71, 162, 228)' },
    { id: 3, label: 'History', icon: 'history', iconColor: 'rgb(71, 162, 228)' },
    { id: 4, label: 'App Guide', icon: 'book-open-variant', iconColor: 'rgb(71, 162, 228)' },
    { id: 5, label: 'Privacy Policy', icon: 'shield-account', iconColor: 'rgb(71, 162, 228)' },
    { id: 6, label: 'Close App', icon: 'logout', iconColor: 'rgb(71, 162, 228)' },
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
        {/* <SafeAreaView style={{ flex: 1, backgroundColor: ' #F5F5F5' }}>
      <ImageBackground source={glass} resizeMode="cover" style={styles.backgroundimage}> */}
        <LinearGradient colors={["#88def1", "#04467e"]} style={{ flex: 1, }} >
          <ScrollView>
            <View style={styles.menuopen}>
              <TouchableOpacity onPress={openDrawer}>
                <Icon
                  name="menu-open"
                  size={25}
                  color="#ffff"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.menucontainer}>
              {Historydatas && Historydatas.length > 0 ? (
                Historydatas.map((item, index) =>
                  item ? (
                    <View key={index} style={styles.menuList}>
                      <Text style={styles.item}>Barcode: {item.barcode || ""}</Text>
                      <Text style={styles.item}>Product: {item.prodname || ""}</Text>
                      <Text style={styles.item}>Category: {item.category || ""}</Text>
                    </View>
                  ) : null
                )
              ) : null}
            </View>
            {/* </View> */}
          </ScrollView>
          {/* </ImageBackground>
        </SafeAreaView> */}
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
    marginLeft: 10,
    marginTop: 5,
  },

  sidemenu: {
    flex: 1,
    backgroundColor: 'white',
    width: 280
  },
  menucontainer: {
    display: 'flex',
    flex: 1,
    marginBottom: 90,
    marginTop: 15,
    width: maxwidth,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'column',
    gap: 15,

    // backgroundColor:"red"
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
  item: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffff',
    // backgroundColor:'#FFFFFF',
    paddingLeft: 5,
  },
  backgroundimage: {
    flex: 1,
    justifyContent: 'center',
    // width:360,
    // height:700
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