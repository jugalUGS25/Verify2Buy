// HomeScreen.js
// Simplified version of your Login.js for the Home tab

import React, { useEffect, useRef, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Animated, 
  Text, 
  TouchableOpacity, 
  Image,
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import logomain from '../assets/logoload.png';
import ThemeContext from './themes/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
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

  return (
    <LinearGradient 
      colors={!isDarkMode ? ["#88def1", "#04467e"] : ["#1D211D", "#4F4E48"]} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDarkMode ? "#FFFFFF" : "#FFFFFF" }]}>
            Welcome to Verify2Buy
          </Text>
          <Text style={[styles.subtitle, { color: isDarkMode ? "#E0E0E0" : "#E8F4F8" }]}>
            Scan. Verify. Buy with Confidence.
          </Text>
        </View>

        {/* Animated Logo */}
        <View style={styles.logoContainer}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <View style={styles.imageWrapper}>
              <Image source={logomain} style={styles.image} />
            </View>
          </Animated.View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={[styles.actionsTitle, { 
            color: isDarkMode ? "#FFFFFF" : "#FFFFFF" 
          }]}>
            Quick Actions
          </Text>
          
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { 
                backgroundColor: isDarkMode ? '#2C2C2E' : '#FFFFFF' 
              }]}
              onPress={() => navigation.navigate(action.route)}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconContainer, { 
                backgroundColor: action.color + '20' 
              }]}>
                <Icon name={action.icon} size={28} color={action.color} />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={[styles.actionTitle, { 
                  color: isDarkMode ? '#FFFFFF' : '#333333' 
                }]}>
                  {action.title}
                </Text>
                <Text style={[styles.actionSubtitle, { 
                  color: isDarkMode ? '#8E8E93' : '#666666' 
                }]}>
                  {action.subtitle}
                </Text>
              </View>
              <Icon 
                name="chevron-right" 
                size={24} 
                color={isDarkMode ? '#8E8E93' : '#C7C7CC'} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Main CTA */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: '#FF6200' }]}
            onPress={() => navigation.navigate('Scan')}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <Icon name="barcode-scan" size={28} color="#FFFFFF" />
              <Text style={styles.buttonText}>Start Scanning</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageWrapper: {
    width: 180,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
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
  },
  actionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  ctaContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  mainButton: {
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: '#FF6200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});