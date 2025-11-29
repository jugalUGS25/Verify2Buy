import { Platform, Share } from 'react-native';

export const shareApp = async () => {
  try {
    const result = await Share.share({
      url: Platform.OS === 'ios' 
        ? 'https://apps.apple.com/app/idYOUR_APPLE_ID'
        : 'https://play.google.com/store/apps/details?id=com.verify2buy',
      title: 'Download Our App',
      message:
        'Check out this awesome app! Download it here:\n\n' +
        'iOS: https://apps.apple.com/app/idYOUR_APPLE_ID\n' +
        'Android: https://play.google.com/store/apps/details?id=com.verify2buy',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Shared via:', result.activityType);
      } else {
        console.log('Shared successfully');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  } catch (error) {
    console.error('Error sharing:', error.message);
  }
};