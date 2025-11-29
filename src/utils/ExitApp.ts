import { Platform, BackHandler, Alert } from 'react-native';

export function exitApp() {
  if (Platform.OS === 'android') {
    BackHandler.exitApp();
    return;
  }
  // iOS: don’t actually exit — do something graceful instead
  Alert.alert('Close App', 'iOS does not allow apps to exit themselves.');
}
