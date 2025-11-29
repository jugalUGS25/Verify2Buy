import React, { useEffect, useState, useContext,useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Dimensions, 
  SafeAreaView,
  Linking,
  Alert,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import coupon from '../assets/couponimage.png';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from './themes/ThemeContext';
import { openDatabase } from 'react-native-sqlite-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

var db = openDatabase({ name: 'r2a.db' });
const { width: maxwidth } = Dimensions.get('window');

export default function RewardScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [Rewardsdatas, setRewardsdatas] = useState([]);
  const scale = useRef(new Animated.Value(1)).current;
  const insets = useSafeAreaInsets();

  // const getrewards = async () => {
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM verify2buy_usertable', [], (tx, res) => {
  //       var temp = [];
  //       for (let i = 0; i < res.rows.length; ++i)
  //         temp.push(res.rows.item(i));
  //       console.log(temp);
  //       const uniqueArray = [...new Map(temp.map(item => [item.barcode, item])).values()];
  //       setRewardsdatas(uniqueArray);
  //     });
  //   });
  // };

  const handleRedeem = async () => {
    const points = Rewardsdatas.length;
    const email = 'redeem@universumgs.com';
    const subject = `Redeem points - ${points}`;
    const body = 'Please enter your email or phone number for the digital gift card:\n\n';
    
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open email client. Please make sure you have an email app installed.');
      }
    } catch (error) {
      console.error('Email error:', error);
      Alert.alert('Error', 'Failed to open email client');
    }
  };


    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);


  useEffect(() => {
    // getrewards();
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM verify2buy_usertable', [], (tx, res) => {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i)
          temp.push(res.rows.item(i));
        console.log(temp);
        const uniqueArray = [...new Map(temp.map(item => [item.barcode, item])).values()];
        setRewardsdatas(uniqueArray);
      });
    });
  }, [Rewardsdatas]);

  const isRedeemEnabled = Rewardsdatas.length >= 500;

  return (
    <LinearGradient colors={["#1A1A1A", "#0A0A0A"]} style={styles.container}>
      <SafeAreaView style={[styles.safeArea, {  paddingTop: insets.top }]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
         
        >
          {/* Header */}
          <View style={styles.header}>
            <Icon name="gift" size={40} color="#FF6200" />
            <Text style={styles.title}>My Rewards</Text>
            <Text style={styles.subtitle}>
              Track your points and redeem rewards
            </Text>
          </View>

          {/* Points Card */}
          <View style={styles.pointsCard}>
            <View style={styles.pointsHeader}>
              <Animated.View style={{ transform: [{ scale }] }}>
              <Icon name="star-circle" size={32} color="#FFD700" />
              </Animated.View>
              <Text style={styles.pointsLabel}>Your Reward Points</Text>
            </View>
            <View style={styles.pointsValueContainer}>
              <Animated.View style={{ transform: [{ scale }] }}>
              <Text style={styles.pointsValue}>
                {Rewardsdatas.length}
              </Text>
              </Animated.View>
              <Text style={styles.pointsSubtext}>Total Scans</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min((Rewardsdatas.length / 500) * 100, 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Rewardsdatas.length < 500
                ? `Scan ${500 - Rewardsdatas.length} more to unlock rewards!` 
                : '🎉 Congratulations! You can redeem rewards!'}
            </Text>
             <Text style={styles.progressInfoText}>
              <Icon name="information" size={14} color="#FF6200" /> Scan new products, earn points! Duplicates won’t count.
            </Text>
          </View>

          {/* Coupon Image */}
          <View style={styles.couponContainer}>
            <Text style={styles.sectionTitle}>Available Coupons</Text>
            {/* <View style={styles.imageWrapper}> */}
             <View style={styles.rowWrapper}>
              {/* <Image source={coupon} style={styles.image} /> */}
           <View style={styles.cutShapeleft} />
           {Rewardsdatas.length >= 500 ?(
                <>
                  <View style={{ display: 'flex', alignSelf: 'center' }}>
                    <Text style={styles.pointsLabel}>You’ve reached 500 points!</Text>
                  </View>
                  <View style={{ display: 'flex', alignSelf: 'center' }}>
                      <Text style={styles.rewardSubtext}>Click “Redeem Rewards” & collect your coupon!</Text>
                    </View>
                  <TouchableOpacity
                    style={[
                      styles.floatingButton,
                      !isRedeemEnabled && styles.floatingButtonDisabled
                    ]}
                    onPress={handleRedeem}
                    //disabled={!isRedeemEnabled}
                    activeOpacity={0.8}
                  >
                    {/* <View style={[
                      styles.floatingButtonContainer,
                      // { backgroundColor: isRedeemEnabled ? '#FF6200' : '#4A4A4A' }
                    ]}> */}
                      <Text style={styles.floatingButtonText}>
                        Redeem Rewards <Icon name="star-check" size={23} color="#FF6200" /> 
                      </Text>
                    {/* </View> */}
                     <View style={{ display: 'flex', alignSelf: 'center',marginTop:10}}>
                      <Text style={styles.rewardSubtext}>Collect points. Get More coupons. Only on Verify2Buy</Text>
                    </View>
                  </TouchableOpacity>
              </>
           ):(
            <>
            <View style={{display:'flex',alignSelf:'center'}}>
              <Text style={styles.pointsLabel}> Stay Tuned !</Text>
              </View>
               <View style={{display:'flex',alignSelf:'center'}}>
              <Text style={styles.pointsLabel}>Digital Coupon are Coming Soon...</Text>
              </View>
             <View style={{display:'flex',alignSelf:'center',flexDirection:'row',gap:5}}>
               <Icon name="ticket-percent-outline" size={40} color="#FF6200" />
               <Icon name="ticket-percent-outline" size={40} color="#FF6200" />
                <Icon name="ticket-percent-outline" size={40} color="#FF6200" />
              </View>
               <View style={{display:'flex',alignSelf:'center'}}>
              <Text style={styles.rewardSubtext}>Collect points. Get coupons. Only on Verify2Buy</Text>
              </View>
            </>
           )}
            </View>
             <View style={styles.cutShaperight} />
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Icon name="information-outline" size={24} color="#FF6200" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>How Rewards Work</Text>
              <Text style={styles.infoText}>
                • Scan products to earn points{'\n'}
                • Collect 500 points to unlock rewards{'\n'}
                • Redeem for exclusive discounts{'\n'}
                • Check back for new offers
              </Text>
            </View>
          </View>

          {/* Recent Scans */}
          {Rewardsdatas.length > 0 && (
            <View style={styles.recentScansCard}>
              <View style={styles.recentScansHeader}>
                <Icon name="history" size={24} color="#FF6200" />
                <Text style={styles.recentScansTitle}>Recent Scans</Text>
              </View>
              {Rewardsdatas.slice(-5).reverse().map((item, index) => (
                <View key={index} style={styles.scanItem}>
                  <Icon name="barcode-scan" size={20} color="#8E8E93" />
                  <View style={styles.scanItemText}>
                    <Text style={styles.scanItemName} numberOfLines={1}>
                      {item.prodname || 'Unknown Product'}
                    </Text>
                    <Text style={styles.scanItemCategory}>
                      {item.category || 'No category'}
                    </Text>
                  </View>
                  <Icon name="check-circle" size={20} color="#4CAF50" />
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 80 }} />
        </ScrollView>

      {/* Floating Redeem Button */}
      {/* <TouchableOpacity
        style={[
          styles.floatingButton,
          !isRedeemEnabled && styles.floatingButtonDisabled
        ]}
        onPress={handleRedeem}
        disabled={!isRedeemEnabled}
        activeOpacity={0.8}
      >
        <View style={[
          styles.floatingButtonContainer,
          { backgroundColor: isRedeemEnabled ? '#FF6200' : '#4A4A4A' }
        ]}>
          <Text style={styles.floatingButtonText}>
            Redeem Rewards
          </Text>
        </View>
      </TouchableOpacity> */}
            </SafeAreaView>
          </LinearGradient>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 5,
    textAlign: 'center',
  },
  pointsCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#FF6200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  pointsLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pointsValueContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsValue: {
    fontSize: 56,
    fontWeight: '800',
    color: '#FF6200',
  },
  pointsSubtext: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 5,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6200',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
   progressInfoText: {
    fontSize: 12,
    color: '#8E8E93',
    display:'flex',
    alignSelf:'center',
    textAlign: 'center',
    marginTop:2
  },
  couponContainer: {
    marginBottom: 20,
    
  },
   cutShaperight: {
    position: 'absolute',
    right: 0,
    top: '63%',
    width: 20,
    height: 40,
    // backgroundColor: '#6cbdd8', 
    backgroundColor: '#0A0A0A',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderRightWidth: 0,
    borderRightColor: 'none',
    transform: [{ translateY: -20 }],
  },
  cutShapeleft: {
  position: 'absolute',
  left: 0,
  top: '60%',
  width: 20,
  height: 40,
  backgroundColor: '#0A0A0A',
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  borderLeftWidth: 0,
  borderLeftColor: 'none',
  transform: [{ translateY: -20 }],
},
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6200',
    marginBottom: 15,
  },
  // imageWrapper: {
  //   width: '100%',
  //   height: 150,
  //   borderRadius: 15,
  //   overflow: 'hidden',
  //   backgroundColor: '#2C2C2E',
  //   padding: 10,
  // },
  rowWrapper: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#2C2C2E',
    padding: 10,
    flexDirection:'column',
    gap:4
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  infoCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 24,
  },
  recentScansCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
  },
  recentScansHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  recentScansTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  scanItemText: {
    flex: 1,
  },
  scanItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  scanItemCategory: {
    fontSize: 14,
    color: '#8E8E93',
  },
floatingButton: {
  position: 'absolute',
  bottom: 30,
  right: 20,
  left: 20,
  borderRadius: 35,
  //backgroundColor:'#FF6200',
  // shadowColor: '#FF6200',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.4,
  shadowRadius: 12,
  // elevation: 8,
},
floatingButtonDisabled: {
  // shadowColor: '#000',
  shadowOpacity: 0.2,
},
floatingButtonContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 20,
  paddingHorizontal: 40,
  borderRadius: 55,
},
floatingButtonText: {
  fontSize: 20,
  fontWeight: '700',
  // color: '#FFFFFF',
  color: "#FF6200",
   textDecorationLine: 'underline',
   textDecorationStyle: 'dotted', 
  textAlign: 'center',
},
rewardSubtext:{
  fontSize:13,
  fontWeight: '600',
  color: '#8E8E93',
  textAlign:'center'
    
}
});