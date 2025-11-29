// MoreScreen.js

import React, { useEffect, useState, useRef, useContext,useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Linking,
  Alert,
  Share,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from './themes/ThemeContext';
import RateUs from './RateUs';
import { shareApp } from './ShareApp';
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MoreScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

    const menuItems = [
    // { 
    //   id: 1, 
    //   label: 'Settings', 
    //   icon: 'cog-outline',
    //   //route: 'Settings',
    //   color: '#FF6200'
    // },
    { 
      id: 2, 
      label: 'App Guide', 
      icon: 'book-open-variant',
      route: 'Guide',
      color: '#4CAF50'
    },
    {
      id: 3,
      label: 'Privacy Policy',
      icon: 'shield-account-outline',
      action: () => {
        console.log('Opening Privacy Policy...');
        Linking.openURL("https://www.universumgs.com/privacy.html")
          .catch(err => {
            console.error('Failed to open URL:', err);
            Alert.alert('Error', 'Could not open Privacy Policy');
          });
      },
      color: '#2196F3'
    },
    { 
      id: 4, 
      label: 'Share App', 
      icon: 'share-variant-outline',
      action: 'share',
      color: '#FF9800'
    },
    { 
      id: 5, 
      label: 'Rate Us', 
      icon: 'star-outline',
      action: 'rate',
      color: '#FFC107'
    },
    { 
      id: 6, 
      label: 'Close App', 
      icon: 'logout',
     route: 'Logout',
      color: '#FF6200'
    },
  ];

   const fadeAnims = useRef(menuItems.map(() => new Animated.Value(0))).current;
    const translateAnims = useRef(menuItems.map(() => new Animated.Value(20))).current;
  
     useFocusEffect(
      useCallback(() => {
        // Reset animation values every time screen comes into focus
        fadeAnims.forEach(anim => anim.setValue(0));
        translateAnims.forEach(anim => anim.setValue(20));
  
        const animations = menuItems.map((_, i) =>
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
  



  const socialItems = [
    { 
      id: 1, 
      icon: 'google-play', 
      label: 'Play Store', 
      color: '#34A853',
      url: 'https://play.google.com/store/apps/details?id=com.verify2buy'
    },
    { 
      id: 2, 
      icon: 'apple', 
      label: 'App Store', 
      color: '#000000',
      url: 'https://apps.apple.com/'
    },
    { 
      id: 3, 
      icon: 'linkedin', 
      label: 'LinkedIn', 
      color: '#0077B5',
      url: 'https://www.linkedin.com/company/universum-global-solutions'
    },
    { 
      id: 4, 
      icon: 'instagram', 
      label: 'Instagram', 
      color: '#E4405F',
      url: 'https://www.instagram.com/'
    },
    { 
      id: 5, 
      icon: 'twitter', 
      label: 'Twitter', 
      color: '#1DA1F2',
      url: 'https://twitter.com/'
    },
  ];


     const fadeAnimsocial = useRef(menuItems.map(() => new Animated.Value(0))).current;
    const translateAnimsocial = useRef(menuItems.map(() => new Animated.Value(20))).current;
  
     useFocusEffect(
      useCallback(() => {
        // Reset animation values every time screen comes into focus
        fadeAnimsocial.forEach(anim => anim.setValue(0));
        translateAnimsocial.forEach(anim => anim.setValue(20));
  
        const animations = socialItems.map((_, i) =>
          Animated.parallel([
            Animated.timing(fadeAnimsocial[i], {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(translateAnimsocial[i], {
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
  

  const handleMenuPress = (item) => {
    console.log('Menu item pressed:', item.label);
    
    if (item.route) {
      navigation.navigate(item.route);
    } else if (typeof item.action === 'function') {
      // If action is a function, call it
      item.action();
    } else if (item.action === 'share') {
      // Implement share functionality
      console.log('Share app');
      //Alert.alert('Share', 'Share functionality coming soon!');
      shareApp();
    } else if (item.action === 'rate') {
      // Implement rate functionality
      console.log('Rate app');
     // Alert.alert('Rate Us', 'Rate functionality coming soon!');
      RateUs(); 
    }
  };

  const handleSocialPress = (item) => {
    console.log('Social item pressed:', item.label);
    if (item.url) {
      Linking.openURL(item.url)
        .catch(err => {
          console.error('Failed to open URL:', err);
          Alert.alert('Error', `Could not open ${item.label}`);
        });
    }
  };

  return (
    <LinearGradient 
      colors={["#1A1A1A", "#0A0A0A"]} 
      style={styles.container}
    >
      <SafeAreaView style={[styles.safeArea, {  paddingTop: insets.top }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              More Options
            </Text>
            <Text style={styles.headerSubtitle}>
              Settings, help, and more
            </Text>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item,index) => (
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
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                  <Icon name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>
                  {item.label}
                </Text>
                <Icon 
                  name="chevron-right" 
                  size={24} 
                  color="#8E8E93" 
                />
              </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Social Media Section */}
          <View style={styles.socialSection}>
            <Text style={styles.sectionTitle}>
              Connect With Us
            </Text>
            <View style={styles.socialContainer}>
              {socialItems.map((item,index) => (
                 <Animated.View
                key={index}
                style={[
                  {
                    opacity: fadeAnimsocial[index],
                    transform: [{ translateY: translateAnimsocial[index] }],
                  },

                ]}
              >
                <TouchableOpacity
                  key={item.id}
                  style={styles.socialButton}
                  onPress={() => handleSocialPress(item)}
                  activeOpacity={0.7}
                >
                  <Icon name={item.icon} size={28} color={item.color} />
                </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>
              Verify2Buy v1.0.0
            </Text>
            <Text style={styles.versionSubtext}>
              Scan. Verify. Buy with Confidence.
            </Text>
          </View>
        </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#8E8E93',
  },
  menuContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#2C2C2E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuLabel: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  socialSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#FF6200',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  versionContainer: {
    alignItems: 'center',
    // marginTop: 40,
    marginTop: 15,
    marginBottom: 30,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  versionSubtext: {
    fontSize: 12,
    marginTop: 5,
    color: '#636366',
  },
});