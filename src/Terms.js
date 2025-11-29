import React, { useEffect, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  SafeAreaView,
  Linking 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import one from '../assets/universum.png';
import ThemeContext from './themes/ThemeContext';

export default function Terms({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Auto-open link when component mounts (optional)
    // TermsLink();
  }, []);

  const TermsLink = () => {
    Linking.openURL("https://www.universumgs.com/privacy.html");
  };

  return (
    <LinearGradient colors={["#1A1A1A", "#0A0A0A"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Icon name="shield-account" size={40} color="#FF6200" />
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.subtitle}>
              Your privacy and data security matter to us
            </Text>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Icon name="information-outline" size={32} color="#FF6200" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>View Full Policy</Text>
              <Text style={styles.infoText}>
                Tap the button below to view our complete privacy policy on our website
              </Text>
            </View>
          </View>

          {/* Logo Image */}
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image source={one} style={styles.logoImage} />
            </View>
            <Text style={styles.logoText}>Universum Global Solutions</Text>
          </View>

          {/* Privacy Highlights */}
          <View style={styles.highlightsCard}>
            <Text style={styles.sectionTitle}>Privacy Highlights</Text>
            
            <View style={styles.highlightItem}>
              <View style={styles.highlightIcon}>
                <Icon name="lock" size={24} color="#4CAF50" />
              </View>
              <View style={styles.highlightText}>
                <Text style={styles.highlightTitle}>Data Security</Text>
                <Text style={styles.highlightDescription}>
                  Your data is encrypted and securely stored
                </Text>
              </View>
            </View>

            <View style={styles.highlightItem}>
              <View style={styles.highlightIcon}>
                <Icon name="shield-check" size={24} color="#2196F3" />
              </View>
              <View style={styles.highlightText}>
                <Text style={styles.highlightTitle}>No Data Selling</Text>
                <Text style={styles.highlightDescription}>
                  We never sell your personal information
                </Text>
              </View>
            </View>

            <View style={styles.highlightItem}>
              <View style={styles.highlightIcon}>
                <Icon name="eye-off" size={24} color="#9C27B0" />
              </View>
              <View style={styles.highlightText}>
                <Text style={styles.highlightTitle}>Minimal Collection</Text>
                <Text style={styles.highlightDescription}>
                  We only collect data necessary for app functionality
                </Text>
              </View>
            </View>

            <View style={styles.highlightItem}>
              <View style={styles.highlightIcon}>
                <Icon name="account-check" size={24} color="#FF9800" />
              </View>
              <View style={styles.highlightText}>
                <Text style={styles.highlightTitle}>Your Control</Text>
                <Text style={styles.highlightDescription}>
                  You can request data deletion at any time
                </Text>
              </View>
            </View>
          </View>

          {/* Main CTA Button */}
          <TouchableOpacity 
            style={styles.mainButton}
            onPress={TermsLink}
            activeOpacity={0.8}
          >
            <Icon name="web" size={24} color="#FFFFFF" />
            <Text style={styles.mainButtonText}>View Full Privacy Policy</Text>
            <Icon name="open-in-new" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Contact Info */}
          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Questions About Privacy?</Text>
            <Text style={styles.contactText}>
              If you have any questions about our privacy practices, please contact us through our website:
            </Text>
            <TouchableOpacity 
              style={styles.websiteLink}
              onPress={() => Linking.openURL('https://www.universumgs.com')}
            >
              <Icon name="domain" size={20} color="#FF6200" />
              <Text style={styles.websiteLinkText}>universumgs.com</Text>
            </TouchableOpacity>
          </View>

          {/* Last Updated */}
          <View style={styles.footer}>
            <Icon name="clock-outline" size={16} color="#8E8E93" />
            <Text style={styles.footerText}>Last Updated: January 2025</Text>
          </View>

          <View style={{ height: 20 }} />
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
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
  infoCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
    shadowColor: '#FF6200',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 22,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoWrapper: {
    width: 140,
    height: 140,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 15,
  },
  highlightsCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6200',
    marginBottom: 20,
  },
  highlightItem: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  highlightIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightText: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  highlightDescription: {
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 22,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6200',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 16,
    gap: 12,
    marginBottom: 25,
    shadowColor: '#FF6200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  contactCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 22,
    marginBottom: 15,
  },
  websiteLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 98, 0, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6200',
  },
  websiteLinkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6200',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});