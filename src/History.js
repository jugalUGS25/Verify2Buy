import React, { useEffect, useState, useContext,useRef,useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  Modal,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { openDatabase } from 'react-native-sqlite-storage';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from './themes/ThemeContext';
import { useIsFocused } from "@react-navigation/native"; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

var db = openDatabase({ name: 'r2a.db' });

export default function History({ navigation }) {
  const [Historydatas, setHistorydatas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const [showPopup, setShowPopup] = useState(false);
  //  const [showImage, setShowImage] = useState('');
  //  const [barcode, setbarcode] = useState('');
  const [showProductdetails, setshowProductdetails] = useState([])
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

const FadeUpView = ({ children, duration = 500, delay = 0, isFocused = true }) => {
  const fadeAnims = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    let animation;
    if (isFocused) {
      fadeAnims.setValue(0);
      translateY.setValue(20);

      animation = Animated.parallel([
        Animated.timing(fadeAnims, {
          toValue: 1,
          duration,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          delay,
          useNativeDriver: true,
        }),
      ]);

      animation.start();
    }

    return () => {
      if (animation) animation.stop();
    };
  }, [isFocused]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnims,
        transform: [{ translateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};

  // const gethistydatas = async () => {
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM verify2buy_usertable', [], (tx, res) => {
  //       var temp = [];
  //       for (let i = 0; i < res.rows.length; ++i)
  //         temp.push(res.rows.item(i));
  //       console.log(temp);
  //       const uniqueArray = [...new Map(temp.map(item => [item.barcode, item])).values()];
  //       setHistorydatas(uniqueArray.reverse()); // Show newest first
  //     });
  //   });
  // };

  const viewDetails = (item) => {
    const data = [item]
    setShowPopup(true)
    setshowProductdetails(data)
  }

  const handelclose = () => {
    setShowPopup(false)
    //setShowImage('')
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //gethistydatas();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const clearHistory = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM r2a_usertable', [], (tx, res) => {
        console.log('History cleared');
        setHistorydatas([]);
      });
    });
  };


  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM verify2buy_usertable', [], (tx, res) => {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i)
          temp.push(res.rows.item(i));
        console.log(temp);
        const uniqueArray = [...new Map(temp.map(item => [item.barcode, item])).values()];
        setHistorydatas(uniqueArray.reverse()); // Show newest first
      });
    });
  }, [isFocused]);

  const getCategoryIcon = (category) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('medicine') || cat.includes('drug') || cat.includes('health')) return 'medical-bag';
    if (cat.includes('food') || cat.includes('grocery')) return 'food';
    if (cat.includes('electronics')) return 'devices';
    if (cat.includes('clothing') || cat.includes('fashion')) return 'tshirt-crew';
    if (cat.includes('beauty') || cat.includes('cosmetic')) return 'lipstick';
    return 'package-variant';
  };

  const getCategoryColor = (category) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('medicine') || cat.includes('drug') || cat.includes('health')) return '#FF6200';
    if (cat.includes('food') || cat.includes('grocery')) return '#4CAF50';
    if (cat.includes('electronics')) return '#2196F3';
    if (cat.includes('clothing') || cat.includes('fashion')) return '#E91E63';
    if (cat.includes('beauty') || cat.includes('cosmetic')) return '#9C27B0';
    return '#FF6200';
  };

  // const fadeAnim = useRef(new Animated.Value(0)).current;
  
  //   useEffect(() => {
  //     const fadeLoop = Animated.loop(
  //       Animated.sequence([
  //         Animated.timing(fadeAnim, {
  //           toValue: 1,         // fade in
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //         Animated.timing(fadeAnim, {
  //           toValue: 1,         // fade out
  //           duration: 200,
  //           useNativeDriver: true,
  //         }),
  //       ])
  //     );
  
  //     fadeLoop.start();
  //   }, [fadeAnim]);





  const HistoryItems = ({item,index}) => {
    return (
     <FadeUpView iisFocused={isFocused}  delay={index * 80}>
      <TouchableOpacity
        key={index}
        style={styles.historyCard}
        activeOpacity={0.7}
      >
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={[
            styles.categoryIcon,
            { backgroundColor: getCategoryColor(item.category) + '20' }
          ]}>
            {/* <Icon 
                          name={getCategoryIcon(item.category)} 
                          size={24} 
                          color={getCategoryColor(item.category)} 
                        /> */}
            <View style={styles.imageconatiner}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
          </View>
          <View style={styles.cardHeaderText}>
            <Text style={styles.cardNumber}> Scan #{Historydatas.length - index}</Text>
            <View style={styles.verifiedBadge}>
              <Icon name="check-circle" size={14} color="#4CAF50" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
        </View>

        {/* Card Content */}
        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Icon name="barcode" size={18} color="#8E8E93" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Barcode</Text>
              <Text style={styles.infoValue}>{item.barcode || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name="package-variant" size={18} color="#8E8E93" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Product</Text>
              <Text style={styles.infoValue} numberOfLines={2}>
                {item.prodname || "Unknown Product"}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name="shape-outline" size={18} color="#8E8E93" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={[
                styles.categoryBadge,
                { color: getCategoryColor(item.category) }
              ]}>
                {item.category || "Uncategorized"}
              </Text>
            </View>
          </View>
        </View>

        {/* Card Footer */}
        <View style={styles.cardFooter}>
          <TouchableOpacity style={styles.actionButton} onPress={() => viewDetails(item)} >
            {/* <Animated.View style={{ opacity: fadeAnim }}> */}
              <Icon name="information-outline" size={18} color="#FF6200" />
            {/* </Animated.View> */}
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      </FadeUpView>
    );
  };


  return (
    <LinearGradient colors={["#1A1A1A", "#0A0A0A"]} style={styles.container}>
      <View style={[styles.safeArea, {  paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon name="history" size={32} color="#FF6200" />
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Scan History</Text>
              <Text style={styles.subtitle}>
                {Historydatas.length} {Historydatas.length === 1 ? 'scan' : 'scans'} total
              </Text>
            </View>
          </View>
          {Historydatas.length > 0 && (
            <TouchableOpacity
              onPress={clearHistory}
              style={styles.clearButton}
            >
              <Icon name="delete-outline" size={24} color="#FF6200" />
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FF6200"
              colors={["#FF6200"]}
            />
          }
        >
          {Historydatas && Historydatas.length > 0 ? (
            <>
              {Historydatas.map((item, index) =>
                item ? (
                <View key={index}>
                  <HistoryItems item={item} index={index}/>
                  </View>
                 
                ) : null
              )}
            </>
          ) : (
            <View style={styles.emptyState}>
              <Icon name="history" size={80} color="#4A4A4A" />
              <Text style={styles.emptyTitle}>No Scan History</Text>
              <Text style={styles.emptySubtitle}>
                Start scanning products to see your history here
              </Text>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => navigation.navigate('Scan')}
              >
                <Icon name="barcode-scan" size={24} color="#FFFFFF" />
                <Text style={styles.scanButtonText}>Start Scanning</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.gridview}>
              <ScrollView style={styles.guidescrollView} showsVerticalScrollIndicator={false}>
                {/* <Text style={styles.fakeheader}>Product Image : </Text> */}
                <View style={{ alignSelf: 'flex-end' }}>
                  <TouchableOpacity onPress={handelclose}>
                    <Icon name="close-circle" size={24} color="#FF6200" />
                  </TouchableOpacity>
                </View>
                {showProductdetails.length > 0 ? (
                  showProductdetails.map((item, index) => (
                    <View style={{ flexDirection: 'column', gap: 4,marginTop:5}} key={index}>
                      <View>
                        <View style={styles.imagefullconatiner}>
                          <Image source={{ uri: item.image }} style={styles.imagefull} />
                        </View>
                      </View>
                      <View style={{marginTop:3}}>
                        <Text style={styles.detailLabel}>
                          <Icon name="barcode-scan" size={17} color="#FF6200" /> Barcode :
                          <Text style={styles.detailText}> {item.barcode}</Text>
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.detailLabel}>
                           <Icon name="tag" size={17} color="#FF6200" /> Brand :
                          <Text style={styles.detailText}> {item.brandname}</Text>
                        </Text>
                      </View>
                      <View >
                        <Text style={styles.detailLabel}>
                          <Icon name="package-variant" size={17} color="#FF6200" /> Product:
                          <Text style={styles.detailText}> {item.prodname}</Text>
                        </Text>
                      </View>
                      <View >
                        <Text style={styles.detailLabel}>
                          <Icon name="shape" size={17} color="#FF6200" /> Category :
                          <Text style={styles.detailText}> {item.category}</Text>
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.detailLabel}>
                           <Icon name="information" size={17} color="#FF6200" /> Description :
                          <Text style={styles.detailText}> {item.description}</Text>
                        </Text>
                      </View>
                      <View >
                        <Text style={styles.detailLabel}>
                           <Icon name="earth" size={17} color="#FF6200" /> Region :
                          <Text style={styles.detailText}> {item.region}</Text>
                        </Text>
                      </View>
                    </View>
                 
                  ))
                ) : (
                  <></>
                )}
              </ScrollView>
            </View>
            <View>
              <Text>
                {"\n"}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  clearButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 105
  },
  historyCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    gap: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderText: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
    gap: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  categoryBadge: {
    fontSize: 15,
    fontWeight: '600',
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6200',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6200',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
    gap: 10,
    shadowColor: '#FF6200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  imageconatiner: {
    width: 65,
    height: 65,
    borderRadius: 40,
    borderTopWidth: 2,
    borderTopColor: '#e7691b',
    borderRightWidth: 2,
    borderRightColor: '#e7691b',
    borderLeftWidth: 2,
    borderLeftColor: '#e7691b',
    borderBottomWidth: 2,
    borderBottomColor: '#e7691b',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,

  },

  imagefullconatiner: {

    width: '100%',
    height: 280,
    // borderTopWidth: 2,
    // borderTopColor: '#e7691b',
    // borderRightWidth: 2,
    // borderRightColor: '#e7691b',
    // borderLeftWidth: 2,
    // borderLeftColor: '#e7691b',
    // borderBottomWidth: 2,
    // borderBottomColor: '#e7691b',
  },
  imagefull: {
    width: '100%',
    height: 280,
    // width: 60,
    // height: 60,
    // borderRadius: 30,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
   // backgroundColor: 'white',
     backgroundColor:'#2C2C2E',
    // opacity: 0.8 ,
    borderRadius: 20,
    // padding: 35
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth:2,
    borderColor:'#e7691b'
  },
  gridview: {
    padding: 10,
    maxHeight: 500,
  },
  fakeheader: {
    fontSize: 19,
    // color: '#04467e',
    // color:'#fff',
    color: '#e7691b',
    // flex:1,
    flexWrap: "wrap"
  },
  faketext: {
    fontSize: 17,
    // color: '#04467e'
    // color:'#fff'
    color: '#e7691b',
  },


  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  detailLabel: {
    color: '#e7691b',
    fontSize: 15,
    fontFamily: 'Times New Roman", Times, serif',
    fontWeight: 'bold'
  },

  detailText: {
    color: '#8E8E93',
    fontSize: 15,
    fontFamily: 'Times New Roman", Times, serif',
    fontWeight: 700
  },



  errortext: {
    color: 'white',
    //color:'#e7691b',
    fontSize: 15,
    fontFamily: 'Times New Roman", Times, serif',
    fontWeight: 'bold'
  },
  // errorbutton: {
  //     padding: 10,
  //     height: 40,
  //     width: 100,
  //     // backgroundColor: '#04467e',
  //     backgroundColor:'#FF6200',
  //     borderRadius: 20,
  //     // / borderColor:'rgb(253, 126, 20)',
  //     flex: '1',
  //     alignSelf: 'flex-end',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginTop: 15,
  //   },
});