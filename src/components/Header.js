import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform, StatusBar } from 'react-native';
import logomain from '../../assets/logo.png';


const Header = ({ variant = 'home', title = '', onBack = null, navigation }) => {
  const handleBack = () => {
    console.log('Header - Back button pressed!');
    console.log('Header - onBack:', onBack);
    console.log('Header - navigation:', navigation);
    
    if (onBack) {
      console.log('Header - Calling onBack function');
      onBack();
    } else if (navigation && navigation.goBack) {
      console.log('Header - Calling navigation.goBack()');
      navigation.goBack();
    } else if (navigation && navigation.navigate) {
      console.log('Header - Fallback: navigating to Home');
      navigation.navigate('Home');
    } else {
      console.log('Header - ERROR: No valid navigation method found!');
    }
  };

  const renderContent = () => {
    switch (variant) {
      case 'home':
        return (
          <View style={styles.homeContainer}>
            {/* <Icon name="shield-check" size={32} color="#3B82F6" /> */}
             <Image source={logomain} style={{width:40,height:40}} />
            <Text style={styles.homeTitle}>Verify2Buy</Text>
          </View>
        );

      case 'back':
        return (
          <View style={styles.backContainer}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backButton}
              activeOpacity={0.7}
              hitSlop={{ top: 15, bottom: 15, left: 10, right: 10 }}
            >
              <Icon name="chevron-left" size={28} color="#FFFFFF" />
              {/* <Text style={styles.backButtonText}>Home</Text> */}
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            {title && (
              <View style={styles.titleContainer}>
                <Text style={styles.backTitle}>{title}</Text>
              </View>
            )}
            <View style={styles.backButtonSpacer} />
          </View>
        );

      case 'scan-result-verified':
        return (
          <View style={styles.scanResultWrapper}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.scanBackButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="chevron-left" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.scanResultContainer}>
              <Icon name="check-circle" size={48} color="#10B981" />
              <Text style={styles.scanResultTitle}>Verified</Text>
            </View>
            <View style={styles.scanBackButtonSpacer} />
          </View>
        );

      case 'scan-result-counterfeit':
        return (
          <View style={styles.scanResultWrapper}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.scanBackButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="chevron-left" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.scanResultContainer}>
              <View style={styles.warningIconContainer}>
                <Icon name="alert" size={36} color="#EF4444" />
              </View>
              <Text style={[styles.scanResultTitle, { color: '#EF4444' }]}>Warning</Text>
            </View>
            <View style={styles.scanBackButtonSpacer} />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.content}>
        {renderContent()}
      </View>
      <View style={styles.orangeLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#111827',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  content: {
    paddingHorizontal: 16,
  },
  orangeLine: {
    height: 2,
    backgroundColor: '#F97316',
  },

  // Home Header
  homeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingTop: 15, // Extra space to avoid status bar overlap
    // gap: 1,
  },
  homeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },

  // Back Header
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    // paddingTop: 24, // More space to avoid status bar overlap
    paddingTop: 5,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  backButtonSpacer: {
    width: 90, // Same width as back button to center the title
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: -1, // Behind the back button
  },
  backTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Scan Result Header - Compact with Back Button
  scanResultWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    // paddingTop: 24, // Extra space to avoid status bar overlap
    paddingTop:5
  },
  scanBackButton: {
    padding: 8,
    marginLeft: -8,
    zIndex: 10,
  },
  scanBackButtonSpacer: {
    width: 44, // Same width as back button to center the content
  },
  scanResultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    flex: 1,
  },
  scanResultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },
  warningIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;