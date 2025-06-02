import React, { useEffect, useState,useRef } from 'react';
import { RefreshControl, StyleSheet, Pressable, View, Text,Linking,ImageBackground, TouchableOpacity, Button, Alert, Image, ScrollView, ActivityIndicator, Modal,FlatList,Dimensions,DrawerLayoutAndroid,SafeAreaView  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../assets/logo.png';
import MenuDrawer from 'react-native-side-drawer';
 import LinearGradient from 'react-native-linear-gradient';
import DeviceCountry from 'react-native-device-country';
import glass from '../assets/glass.jpg'
import {openDatabase} from 'react-native-sqlite-storage'
var db = openDatabase({name:'r2a.db'})
// import coupon from '../assets/coupon.jpg';

export default function RewardScreen ({navigation}) {
    // const drawer = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [rewardscode, setrewardscode]=useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [india, setIndia] = useState('')

  const country =()=>{
    DeviceCountry.getCountryCode()
    .then((result) => {
      setIndia(result.code)
      console.log(result.code)
    })
    .catch((e) => {
      console.log(e);
    });
  
  }
  // const token = AsyncStorage.getItem('counter')


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
  //   let options = {
  //     method: 'GET',
  //     mode: 'cors',
  //     credentials: 'omit', 
  //     headers: {
  //       'x-rapidapi-key': 'b99e8c9ce7msh74fce1a14705d0fp14b5fbjsn0af83bf85655',
  //       'x-rapidapi-host': 'get-promo-codes.p.rapidapi.com'
  //     }
  //   };
  
  //   try {
  //     const response = await fetch("https://get-promo-codes.p.rapidapi.com/data/get-stores/?page=1", options);
      
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

   const menucontent =()=>{
      return(
    <View style={styles.sidemenu}>
      {navigationView()}
    </View>
      )
    }

   const openDrawer=()=>{
      setIsOpen(true)
    }
  
    const closeDrawer=()=>{
      setIsOpen(false)
    }

    const naviagte =(id)=>{
      if(id===1){
        navigation.navigate('Scanner')
        setIsOpen(false)
      }
      if(id === 2){
       navigation.navigate('RewardScreen')
       setIsOpen(false)
      }
      if(id === 3){
       navigation.navigate('History')
       setIsOpen(false)
      }
      if(id === 4){
       navigation.navigate('Guide')
       setIsOpen(false)
      }
      if(id === 5){
       navigation.navigate('Logout')
       setIsOpen(false)
      }
     
     }

     const appicon =()=>{
      navigation.navigate('Home')
    }
   
  
    const menuItems = [
    { id: 1, label: 'Scanner', icon: 'barcode-scan', iconColor: 'rgb(71, 162, 228)'},
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
    { id: 3, icon: 'linkedin', iconColor: 'rgb(71, 162, 228)'},
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
               <Text style={{  fontFamily: 'Roboto', color: '#3078a4', fontSize: 20, paddingLeft: 5, paddingTop: 3}}>Verify2Buy</Text>
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
                     <Text style={{ fontFamily: 'Roboto', color: '#3078a4',fontSize: 20, paddingLeft: 15, paddingTop: 3, }}>{item.label}</Text>
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
                     <Text style={{  fontFamily: 'Roboto', color: '#3078a4', fontSize: 20, paddingLeft: 15, paddingTop: 3, }}>{item.label}</Text>
                   </View>
                 </TouchableOpacity>
               ))}
             </View>
           )}
           <View style={styles.footerTextcontainer}>
             <Text style={{  fontFamily: 'Roboto', color: '#3078a4', fontSize: 20, paddingLeft: 15, paddingTop: 10 }}>Follow us on</Text>
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
      // <DrawerLayoutAndroid
      //   ref={drawer}
      //   drawerWidth={280}
      //   //drawerPosition={drawerPosition}
      //   renderNavigationView={navigationView}
      // >
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
         <LinearGradient colors ={["#88def1","#04467e"]} style={{ flex: 1,}} >
      <View style={styles.menuopen}>
        <TouchableOpacity onPress={openDrawer}>
        <Icon
        name="menu-open"
        size={25}
        color="#ffff"
        />
      </TouchableOpacity>
      </View>
        {/* <View style={styles.text}>
            {rewardscode && rewardscode.length > 0 ? (
              rewardscode.map((item, index) =>
                item ? (
          <Text style={{ fontSize: 18, fontWeight: '800', color: 'white' }}>
           Your Reward Points : <Text style={{ fontWeight: 'bold' }}>{item.rewards_points}</Text>
           </Text>
                ) : null
              )
            ) : null}
  
        </View> */}
        <View style={styles.text}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: 'white' }}>
           Your Reward Points : 5</Text>
        </View>
        <View style={styles.coupncontainer}>
          <TouchableOpacity
            style={styles.button}
          >
            <Text style={{ color: 'white' }}>Coupon 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
          >
           <Text style={{ color: 'white' }}>Coupon 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
          >
            <Text style={{ color: 'white' }}>Coupon 3</Text>
          </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
          >
            <Text style={{ color: 'white' }}>Coupon 4</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.coupncontainer}>
        {couponcode.map((item)=>{
          <>
            <View style={styles.row}>
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
              <Text>{item.url}</Text>
              <Text>{item.percent}</Text>
            </View>
          
          </>

        })}
        </View>  */}
        {/* </ImageBackground>
        </SafeAreaView> */}
        </LinearGradient>
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
      marginLeft:10,
    },
  
    sidemenu: {
      flex: 1,
      backgroundColor: 'white', 
      width:280
    },
    coupncontainer: {
      flex:1,
      width: 260,
      flexDirection: 'column',
      padding: 15,
      gap: 15,
      marginBottom:10,
      marginLeft:30
    },
    // coupon:{
    //   width: 350,
    //   height:150,
    //   borderRadius: 45,

    // },
    button:{
      padding: 10,
      height: 150,
      width:320,
      // backgroundColor:'#4c99f6',
       backgroundColor:'#FFFFFF50',
      borderRadius: 50,
      borderColor:'rgb(253, 126, 20)',
      alignItems: 'center',
      justifyContent: 'center',
       clipPath: `polygon(0 0, 83% 0, 100% 20%, 100% 100%, 19% 100%, 0 79%)`
      // marginTop:10,
    },
    text:{
      marginTop:5,
      alignItems:'center',
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
    backgroundimage: {
      flex: 1,
      justifyContent: 'center',
      // width:360,
      // height:700
    },
  
  })