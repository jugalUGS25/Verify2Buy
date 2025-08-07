import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../assets/logo.png';

const menuItems = [
  { id: 1, label: 'Scanner', icon: 'barcode-scan', route: 'Scanner' },
  { id: 3, label: 'History', icon: 'history', route: 'History' },
  { id: 4, label: 'App Guide', icon: 'book-open-variant', route: 'Guide' },
  { id: 5, label: 'Close App', icon: 'logout', route: 'Logout' },
];

export default function DrawerMenu({ isOpen, onClose, navigation, children }) {
  const navigate = (route) => {
    navigation.navigate(route);
    onClose();
  };

  const navigationView = () => (
    <ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <Image source={logo} style={{ width: 40, height: 40, marginRight: 8 }} />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Verify2Buy</Text>
      </View>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => navigate(item.route)}
          style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
        >
          <Icon
            name={item.icon}
            size={25}
            color="rgb(71, 162, 228)"
          />
          <Text style={{ marginLeft: 16, fontSize: 16 }}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <MenuDrawer
      open={isOpen}
      position="left"
      drawerContent={navigationView()}
      drawerPercentage={300}
      animationTime={250}
      overlay={true}
      opacity={0.4}
    >
      {children}
    </MenuDrawer>
  );
}
