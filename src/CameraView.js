import React, { useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import DrawerMenu from './components/DrawerMenu';
import CameraScanner from './components/CameraScanner';
import NetworkModals from './components/NetworkModals';
import { useRewardHistory } from './components/RewardHistory';

export default function CameraView({ navigation }) {
  const camera = useRef(null);
  const device = useCameraDevice('back');
  const { width, height } = useWindowDimensions();
  const [torch, setTorch] = useState('off');
  const [isOpen, setIsOpen] = useState(false);
  const [responsefail, setResponseFail] = useState(false);
  const [networkerror, setNetworkError] = useState(false);
  const [networkslow, setNetworkSlow] = useState(false);

  const { saveRewards, saveHistoryData } = useRewardHistory();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'ean-8', 'upc-e', 'code-128', 'code-39', 'upc-a'],
    onCodeScanned: (codes) => {
      for (const code of codes) {
        saveHistoryData({ product: { ean: code.value, name: '', category: '' } });
        saveRewards(1);
      }
    },
  });

  return (
    <DrawerMenu
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      navigation={navigation}
    >
      <View style={{ flex: 1 }}>
        <CameraScanner
          cameraRef={camera}
          device={device}
          codeScanner={codeScanner}
          torch={torch}
          onToggleTorch={() => setTorch((prev) => (prev === 'off' ? 'on' : 'off'))}
          onOpenDrawer={() => setIsOpen(true)}
          width={width}
          height={height}
        />
        <NetworkModals
          responsefail={responsefail}
          closeError={() => setResponseFail(false)}
          networkerror={networkerror}
          networkError={() => setNetworkError(false)}
          networkslow={networkslow}
          closenetworkslow={() => setNetworkSlow(false)}
        />
      </View>
    </DrawerMenu>
  );
}
