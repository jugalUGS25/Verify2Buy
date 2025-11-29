import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path } from 'react-native-svg';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MoreScreen from './screens/MoreScreen';

const Tab = createBottomTabNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const centerX = SCREEN_WIDTH / 2;
  const curveWidth = 70;
  const curveDepth = 35;
  
  const leftStart = centerX - curveWidth;
  const rightEnd = centerX + curveWidth;
  
  // SVG Path for the curved border
  const pathData = `
    M 0 0
    L ${leftStart} 0
    Q ${leftStart + 15} 0, ${leftStart + 20} ${curveDepth * 0.4}
    Q ${centerX} ${curveDepth}, ${rightEnd - 20} ${curveDepth * 0.4}
    Q ${rightEnd - 15} 0, ${rightEnd} 0
    L ${SCREEN_WIDTH} 0
  `;

  const tabs = [
    { name: 'Home', icon: 'home', label: 'Home' },
    { name: 'Search', icon: 'clock-outline', label: 'History' },
    { name: 'Scan', icon: 'barcode-scan', label: '' },
    { name: 'Favorites', icon: 'gift-outline', label: 'Rewards' },
    { name: 'More', icon: 'dots-horizontal', label: 'More' },
  ];

  return (
    <View style={styles.tabBarContainer}>
      {/* Curved Orange Border */}
      <Svg
        height="40"
        width={SCREEN_WIDTH}
        style={styles.curvedBorder}
      >
        <Path
          d={pathData}
         stroke="#00FF00"  // Bright green
          strokeWidth="10" 
          fill="none"
        />
      </Svg>

      {/* Tab Bar Background */}
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          const isFocused = state.index === index;
          const isCenterButton = index === 2;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: state.routes[index].key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(state.routes[index].name);
            }
          };

          if (isCenterButton) {
            return (
              <TouchableOpacity
                key={tab.name}
                onPress={onPress}
                style={styles.centerButtonContainer}
              >
                <View style={styles.scanButton}>
                  <Icon name={tab.icon} size={32} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={onPress}
              style={styles.tabButton}
            >
              <Icon
                name={tab.icon}
                size={24}
                color={isFocused ? '#F97316' : '#9CA3AF'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isFocused ? '#F97316' : '#9CA3AF' },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Scan" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  curvedBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  centerButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    shadowColor: '#F97316',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default BottomTabNavigator;