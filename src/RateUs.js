import Rate, { AndroidMarket } from 'react-native-rate';
import { Alert } from 'react-native';

export default function RateUs() {
  const options = {
    AppleAppID: '', // Add this when your app is published to App Store
    GooglePackageName: 'com.verify2buy',
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: true,
    openAppStoreIfInAppFails: true,
  };

  Rate.rate(options, (success, errorMessage) => {
    if (success) {
      console.log('Thanks for rating!');
    } else if (errorMessage) {
      console.log('Error rating:', errorMessage);
    }
  });
}