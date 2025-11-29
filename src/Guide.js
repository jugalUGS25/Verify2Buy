import React, { useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  SafeAreaView ,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import logomain from '../assets/logomain.png';
import ThemeContext from './themes/ThemeContext';
import Header from './components/Header';

const { maxwidth, maxheight } = Dimensions.get('window');

export default function Guide({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);

  const guideSteps = [
    {
      id: 1,
      icon: 'cellphone-check',
      title: 'Open the App',
      description: 'Launch Verify2Buy on your mobile device',
      color: '#4CAF50',
    },
    {
      id: 2,
      icon: 'barcode-scan',
      title: 'Tap Scan Button',
      description: 'Tap the orange scan button at the bottom center of your screen',
      color: '#FF6200',
    },
    {
      id: 3,
      icon: 'camera',
      title: 'Camera Opens',
      description: 'The camera will activate in a few seconds, ready to scan',
      color: '#2196F3',
    },
    {
      id: 4,
      // icon: 'qrcode-scan',
      icon: 'barcode-scan',
      title: 'Scan the Barcode / QR code',
      description: 'Point your camera at the product barcode or QR code',
      color: '#9C27B0',
    },
    {
      id: 5,
      icon: 'magnify',
      title: 'Processing',
      description: 'Wait a moment while we search our database for product details',
      color: '#FF9800',
    },
    {
      id: 6,
      icon: 'check-circle',
      title: 'View Results',
      description: 'Product information appears with verification status',
      color: '#4CAF50',
    },
    {
      id: 7,
      icon: 'history',
      title: 'Check History',
      description: 'View all your past scans in the History tab',
      color: '#00BCD4',
    },
  ];

  return (
    <View style={styles.container}>
      <Header 
        variant="back" 
        title="App Guide" 
        navigation={navigation}
      />

    <LinearGradient colors={["#1A1A1A", "#0A0A0A"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
       <ScrollView style={styles.content}>
          showsVerticalScrollIndicator={false}
        
          {/* Header */}
          <View style={styles.header}>
            <Icon name="book-open-variant" size={40} color="#FF6200" />
            <Text style={styles.title}>App Guide</Text>
            <Text style={styles.subtitle}>
              Learn how to use Verify2Buy in 7 easy steps
            </Text>
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image source={logomain} style={styles.logoImage} />
            </View>
          </View>

          {/* Guide Steps */}
          <View style={styles.stepsContainer}>
            {guideSteps.map((step, index) => (
              <View key={step.id} style={styles.stepCard}>
                {/* Step Number Badge */}
                <View style={[styles.stepBadge, { backgroundColor: step.color }]}>
                  <Text style={styles.stepNumber}>{step.id}</Text>
                </View>

                {/* Step Content */}
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <View style={[
                      styles.stepIcon,
                      { backgroundColor: step.color + '20' }
                    ]}>
                      <Icon name={step.icon} size={28} color={step.color} />
                    </View>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                  </View>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>

                {/* Connector Line (except for last item) */}
                {index < guideSteps.length - 1 && (
                  <View style={styles.connectorLine} />
                )}
              </View>
            ))}
          </View>

          {/* Tips Card */}
          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Icon name="lightbulb-on" size={28} color="#FFD700" />
              <Text style={styles.tipsTitle}>Pro Tips</Text>
            </View>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Icon name="check" size={20} color="#4CAF50" />
                <Text style={styles.tipText}>
                  Make sure you have good lighting when scanning
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Icon name="check" size={20} color="#4CAF50" />
                <Text style={styles.tipText}>
                  Hold your phone steady and center the barcode
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Icon name="check" size={20} color="#4CAF50" />
                <Text style={styles.tipText}>
                  Use the flashlight button in dark environments
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Icon name="check" size={20} color="#4CAF50" />
                <Text style={styles.tipText}>
                  Earn rewards with every verified scan
                </Text>
              </View>
            </View>
          </View>

          {/* Navigation Help */}
          <View style={styles.navHelpCard}>
            <Text style={styles.navHelpTitle}>Navigation</Text>
            <Text style={styles.navHelpText}>
              Use the bottom navigation bar to quickly access:
            </Text>
            <View style={styles.navItemsList}>
              <View style={styles.navItem}>
                <Icon name="home" size={20} color="#8E8E93" />
                <Text style={styles.navItemText}>Home - Welcome screen</Text>
              </View>
              <View style={styles.navItem}>
                <Icon name="history" size={20} color="#8E8E93" />
                <Text style={styles.navItemText}>History - Past scans</Text>
              </View>
              <View style={styles.navItem}>
                <Icon name="barcode-scan" size={20} color="#FF6200" />
                <Text style={styles.navItemText}>Scan - Camera (center)</Text>
              </View>
              <View style={styles.navItem}>
                <Icon name="gift" size={20} color="#8E8E93" />
                <Text style={styles.navItemText}>Rewards - Points & offers</Text>
              </View>
              <View style={styles.navItem}>
                <Icon name="dots-horizontal" size={20} color="#8E8E93" />
                <Text style={styles.navItemText}>More - Settings & info</Text>
              </View>
            </View>
          </View>

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
     marginTop:3
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
    marginTop: 15,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoWrapper: {
    width: 160,
    height: 160,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#FF6200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  stepsContainer: {
    marginBottom: 25,
  },
  stepCard: {
    position: 'relative',
    marginBottom: 5,
  },
  stepBadge: {
    position: 'absolute',
    left: 0,
    top: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepContent: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    paddingLeft: 60,
    marginLeft: 18,
    width:maxwidth,
    marginRight:10
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepDescription: {
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 22,
    marginLeft: 60,
  },
  connectorLine: {
    position: 'absolute',
    left: 18,
    top: 51,
    bottom: -5,
    width: 2,
    backgroundColor: '#3A3A3C',
    zIndex: 1,
  },
  tipsCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width:maxwidth,
    marginRight:10,
    marginLeft:10
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tipsList: {
    gap: 14,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 22,
  },
  navHelpCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    width:maxwidth,
    marginRight:10,
    marginLeft:10
  },
  navHelpTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6200',
    marginBottom: 12,
  },
  navHelpText: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 15,
    lineHeight: 22,
  },
  navItemsList: {
    gap: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  navItemText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
});