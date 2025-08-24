import { Appearance } from 'react-native';
import { lightTheme, darkTheme, type AppTheme } from './colors';

export function useAppTheme(): AppTheme {
  const scheme = Appearance.getColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
