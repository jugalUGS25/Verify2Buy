import { Image as RNImage } from 'react-native-compressor';

export async function compressPhoto(uri, {max=1280, quality=0.8} = {}) {
  return RNImage.compress(uri, { maxWidth: max, maxHeight: max, quality });
}
