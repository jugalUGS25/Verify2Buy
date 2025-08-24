import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { useAppTheme } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'accent' | 'outline';
  style?: ViewStyle;
};

export default function Button({ title, onPress, loading, variant='primary', style }: Props) {
  const t = useAppTheme();
  const bg = variant === 'primary' ? t.colors.primary :
             variant === 'accent'  ? t.colors.accent  :
             t.colors.card;
  const color = variant === 'outline' ? t.colors.text : '#fff';
  const borderColor = variant === 'outline' ? t.colors.border : 'transparent';

  return (
    <TouchableOpacity onPress={onPress}
      style={[styles.btn, { backgroundColor: variant==='outline'?'transparent':bg, borderColor }, style]}
      disabled={loading}>
      {loading ? <ActivityIndicator/> : <Text style={[styles.txt, { color }]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { height: 48, borderRadius: 12, alignItems:'center', justifyContent:'center', borderWidth:1, paddingHorizontal:16 },
  txt: { fontSize: 16, fontWeight:'700' }
});
