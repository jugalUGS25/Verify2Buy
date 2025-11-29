// ScanResultScreen.js - Fixed Navigation & Image Display
// Dark background + Orange accents

import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  SafeAreaView,
  Share,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../themes/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

export default function ScanResultScreen({ route, navigation }) {
  const { result } = route.params || {};
  const { isDarkMode } = useContext(ThemeContext);

  // Debug navigation
  console.log('ScanResultScreen - navigation object:', navigation);
  console.log('ScanResultScreen - navigation.goBack exists:', !!navigation?.goBack);

  // Determine if product is verified
  const isVerified = result && result.verified !== false;

  const handleScanAgain = () => {
    // Simply go back to the previous screen (should be the camera/scan screen)
    navigation.goBack();
  };

  const handleShare = async () => {
    try {
      const message = result?.product?.name 
        ? `Check out this product: ${result.product.name}\nBarcode: ${result.code}\nVerified by Verify2Buy`
        : `Product verified by Verify2Buy\nBarcode: ${result?.code}`;
      
      await Share.share({
        message: message,
        title: 'Share Product'
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  // Helper function to get the image URL
  const getImageUrl = () => {
    if (!result) return null;
    
    // The API returns image at result.product.imageUrl
    return result.product?.imageUrl || 
           result.imageUrl || 
           result.image || 
           null;
  };

  const imageUrl = getImageUrl();

  // If no result, show not found screen
  // If no result OR result has no meaningful data, show not found screen

  const hasValidData = result && (result.code || result.product?.name || result.product?.ean);
  if (!hasValidData) {
    return (
      <View style={styles.container}>
        <Header 
          variant="scan-result-counterfeit"
          navigation={navigation}
        />
        
        <LinearGradient colors={["#1A1A1A", "#0A0A0A"]} style={styles.content}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.centered}>
              <Icon name="alert-circle-outline" size={80} color="#FF6200" />
              <Text style={styles.notFoundText}>Product not found</Text>
              <Text style={styles.notFoundSubtext}>
                The scanned code was not found in our database
              </Text>
            </View>
            
            {/* Floating Scan Button */}
            <View style={styles.floatingButtonContainer}>
              <TouchableOpacity 
                style={styles.floatingScanButton} 
                onPress={handleScanAgain}
                activeOpacity={0.8}
              >
                <Icon name="barcode-scan" size={32} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.scanButtonLabel}>Scan Again</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }

  // Debug: Log the result object structure
  console.log('ScanResult - Full result object:', JSON.stringify(result, null, 2));
  console.log('ScanResult - Image URL:', imageUrl);

  // If result exists, show product details
  return (
    <View style={styles.container}>
      <Header 
        variant={isVerified ? 'scan-result-verified' : 'scan-result-counterfeit'}
        navigation={navigation}
      />
      
      <LinearGradient colors={["#1A1A1A", "#0A0A0A"]} style={styles.content}>
        {/* Floating Action Buttons - Outside SafeAreaView */}
        <View style={styles.floatingActionsContainer}>
          <TouchableOpacity 
            style={styles.floatingActionButton}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Icon name="share-variant" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.floatingActionButton}
            onPress={handleScanAgain}
            activeOpacity={0.8}
          >
            <Icon name="barcode-scan" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <SafeAreaView style={styles.safeArea}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Product Image */}
            {imageUrl ? (
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: imageUrl }} 
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={styles.noImageContainer}>
                <Icon name="image-off" size={60} color="#4A4A4A" />
                <Text style={styles.noImageText}>No image available</Text>
              </View>
            )}

            {/* Product Details Card */}
            <View style={styles.detailsCard}>
              <Text style={styles.sectionTitle}>Product Details</Text>

              {result.product?.name && (
                <View style={styles.detailRow}>
                  <View style={styles.detailLabelContainer}>
                    <Icon name="package-variant" size={20} color="#FF6200" />
                    <Text style={styles.detailLabel}>Product Name</Text>
                  </View>
                  <Text style={styles.detailValue}>{result.product.name}</Text>
                </View>
              )}

              {result.product?.brand && (
                <View style={styles.detailRow}>
                  <View style={styles.detailLabelContainer}>
                    <Icon name="tag" size={20} color="#FF6200" />
                    <Text style={styles.detailLabel}>Brand</Text>
                  </View>
                  <Text style={styles.detailValue}>{result.product.brand}</Text>
                </View>
              )}

              {result.code && (
                <View style={styles.detailRow}>
                  <View style={styles.detailLabelContainer}>
                    <Icon name="barcode" size={20} color="#FF6200" />
                    <Text style={styles.detailLabel}>Barcode</Text>
                  </View>
                  <Text style={styles.detailValue}>{result.code}</Text>
                </View>
              )}

              {result.product?.category && (
                <View style={styles.detailRow}>
                  <View style={styles.detailLabelContainer}>
                    <Icon name="shape" size={20} color="#FF6200" />
                    <Text style={styles.detailLabel}>Category</Text>
                  </View>
                  <Text style={styles.detailValue}>{result.product.category}</Text>
                </View>
              )}

              {result.product?.region && (
                <View style={styles.detailRow}>
                  <View style={styles.detailLabelContainer}>
                    <Icon name="earth" size={20} color="#FF6200" />
                    <Text style={styles.detailLabel}>Region</Text>
                  </View>
                  <Text style={styles.detailValue}>{result.product.region}</Text>
                </View>
              )}

              {result.product?.description && (
                <View style={styles.detailRow}>
                  <View style={styles.detailLabelContainer}>
                    <Icon name="information" size={20} color="#FF6200" />
                    <Text style={styles.detailLabel}>Description</Text>
                  </View>
                  <Text style={styles.detailValue}>{result.product.description}</Text>
                </View>
              )}
            </View>

            {/* Verification Status Card */}
            {isVerified ? (
              <View style={styles.verifiedCard}>
                <Icon name="check-circle" size={40} color="#29da32ff" />
                <Text style={styles.verifiedTitle}>Verified Authentic</Text>
                <Text style={styles.verifiedSubtext}>
                  {/* This product has been verified as authentic through our database. */}
                   You can shop with confidence — Verified Authentic Confirmed through UPC and GS1.
                </Text>
              </View>
            ) : (
              <View style={styles.warningCard}>
                <Icon name="alert" size={40} color="#EF4444" />
                <Text style={styles.warningTitle}>Warning</Text>
                <Text style={styles.warningSubtext}>
                  This product could not be verified. Please contact the manufacturer or retailer for verification.
                </Text>
                
                {/* Report Button for Counterfeit */}
                <TouchableOpacity style={styles.reportButton}>
                  <Icon name="flag" size={20} color="#FFFFFF" />
                  <Text style={styles.reportButtonText}>Report This Product</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Bottom spacing for floating button */}
            <View style={{ height: 120 }} />
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
    position: 'relative', // Position context for floating buttons
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 120,
  },
  notFoundText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: 'center',
  },
  notFoundSubtext: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 10,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  noImageText: {
    color: '#4A4A4A',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  detailsCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6200',
    marginBottom: 20,
  },
  detailRow: {
    marginBottom: 18,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6200',
  },
  detailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginLeft: 28,
  },
  verifiedCard: {
    backgroundColor: 'rgba(41, 218, 50, 0.15)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(41, 218, 50, 0.3)',
  },
  verifiedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#29da32ff',
    marginTop: 12,
    marginBottom: 8,
  },
  verifiedSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  warningCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EF4444',
    marginTop: 12,
    marginBottom: 8,
  },
  warningSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 16,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C2C2E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#4A4A4A',
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  
  // Floating Scan Button - Matches Bottom Tab Style

  scanButtonLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  floatingActionsContainer: {
  position: 'absolute',
  bottom: 30,
  right: 24,
  flexDirection: 'column', // or 'row' if you want them side by side
  alignItems: 'flex-end',
  zIndex: 10,
},
floatingActionButton: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '#FF6200',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16, // space between buttons if stacked vertically
  elevation: 8,
  shadowColor: '#FF6200',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.5,
  shadowRadius: 12,
},
});