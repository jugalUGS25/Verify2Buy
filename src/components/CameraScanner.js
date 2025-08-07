import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CameraScanner({
  cameraRef,
  device,
  codeScanner,
  torch,
  onToggleTorch,
  onOpenDrawer,
  width,
  height,
}) {
  if (!device) {
    return null;
  }

  return (
    <>
      <Camera
        ref={cameraRef}
        style={{ flex: 1, width, height }}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
        torch={torch}
      />
      <View style={{ position: 'absolute', top: 15, right: 20 }}>
        <TouchableOpacity onPress={onToggleTorch}>
          <Icon
            name={torch === 'off' ? 'flashlight-off' : 'flashlight'}
            size={25}
            color="rgb(71, 162, 228)"
          />
        </TouchableOpacity>
      </View>
      <View style={{ position: 'absolute', top: 15, left: 10 }}>
        <TouchableOpacity onPress={onOpenDrawer}>
          <Icon name="menu-open" size={27} color="rgb(71, 162, 228)" />
        </TouchableOpacity>
      </View>
    </>
  );
}
