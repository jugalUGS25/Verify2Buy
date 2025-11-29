// HomeScreen.js - Fixed version
import React, { useEffect, useState, useRef, useContext,useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Animated, 
  Text, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import logomain from '../assets/logoload.png';
import ThemeContext from './themes/ThemeContext';
import Header from './components/Header';
 import Homepagevideo from './Homepagevideo'
import FirstLaunch from './FirstLaunch';
import { useFocusEffect } from "@react-navigation/native";


export default function HomeScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);
  const scale = useRef(new Animated.Value(1)).current;


    const quickActions = [
    {
      id: 1,
      title: 'Quick Scan',
      subtitle: 'Verify products instantly',
      icon: 'barcode-scan',
      color: '#FF6200',
      route: 'Scan'
    },
    {
      id: 2,
      title: 'View History',
      subtitle: 'See past scans',
      icon: 'history',
      color: '#47A2E4',
      route: 'History'
    },
    {
      id: 3,
      title: 'My Rewards',
      subtitle: 'Check your points',
      icon: 'gift',
      color: '#4CAF50',
      route: 'Rewards'
    },
  ];

 const fadeAnims = useRef(quickActions.map(() => new Animated.Value(0))).current;
  const translateAnims = useRef(quickActions.map(() => new Animated.Value(20))).current;

   useFocusEffect(
    useCallback(() => {
      // Reset animation values every time screen comes into focus
      fadeAnims.forEach(anim => anim.setValue(0));
      translateAnims.forEach(anim => anim.setValue(20));

      const animations = quickActions.map((_, i) =>
        Animated.parallel([
          Animated.timing(fadeAnims[i], {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(translateAnims[i], {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );

      // Play staggered animation each time HomeScreen is focused
      Animated.stagger(200, animations).start();

    }, [])
  );

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



  return (
    <View style={styles.container}>
      <Header variant="home" />
      
      <LinearGradient 
        colors={["#1A1A1A", "#0A0A0A"]}
        style={styles.content}
      >
         {/* FirstLauch as overlay - doesn't take layout space */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <FirstLaunch />
      </View>
        <SafeAreaView style={styles.safeArea}>
         <ScrollView contentContainerStyle={{ paddingBottom: 105 }} showsVerticalScrollIndicator={false}>
          {/* Header Text */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Welcome to Verify2Buy
            </Text>
            <Text style={styles.subtitle}>
              Scan. Verify. Buy with Confidence.
            </Text>
          </View>

          {/* Animated Logo */}
          {/* <View style={styles.logoContainer}>
            <Animated.View style={{ transform: [{ scale }] }}>
              <View style={styles.imageWrapper}>
                <Image source={logomain} style={styles.image} />
              </View>
            </Animated.View>
          </View> */}
        <View style={{ flexDirection: 'column', gap: 10,marginTop:11 }}>
         {/* <Animated.View style={{ transform: [{ scale }] }}>
          <View style={styles.cardContainerimg}>
              <View style={styles.imageWrapper}>
                <Image source={logomain} style={styles.image} />
              </View>
            </View>
            </Animated.View> */}
            <View>
                <Homepagevideo />
              </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <Text style={styles.actionsTitle}>
              Quick Actions
            </Text>
            
            {quickActions.map((action,index) => (
               <Animated.View
                  key={index}
                  style={[
                    {
                      opacity: fadeAnims[index],
                      transform: [{ translateY: translateAnims[index] }],
                    },
                    
                  ]}
                >
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => navigation.navigate(action.route)}
                activeOpacity={0.8}
              >
                <View style={[styles.actionIconContainer, { 
                  backgroundColor: action.color + '20' 
                }]}>
                  <Icon name={action.icon} size={28} color={action.color} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>
                    {action.title}
                  </Text>
                  <Text style={styles.actionSubtitle}>
                    {action.subtitle}
                  </Text>
                </View>
                <Icon 
                  name="chevron-right" 
                  size={24} 
                  color="#4A4A4A"
                />
              </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Bottom spacing for tab bar */}
          <View style={{ height: 20 }} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    color: '#8E8E93',
    marginTop:-10
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  // imageWrapper: {
  //   width: 180,
  //   height: 180,
  //   borderRadius: 20,
  //   overflow: 'hidden',
  // },
  // image: {
  //   width: 180,
  //   height: 180,
  //   resizeMode: 'contain',
  // },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop:15
  },
  actionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#FF6200',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#2C2C2E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
    color: '#FFFFFF',
  },
  actionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8E8E93',
  },
    cardContainerimg: {
    display: 'flex',
    alignSelf: 'center',
    width: 130,
    height: 130,
    marginTop: 10
    
  },
    imageWrapper: {
    width: 130,
    height: 130,
    overflow: 'hidden', // Keep scan effect within image bounds
    borderRadius: 10,
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    opacity:0.5
  },
});