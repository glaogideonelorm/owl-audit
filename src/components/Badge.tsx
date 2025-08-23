
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';

export const Badge: React.FC<{label: string; tone?: 'neutral'|'success'|'danger'|'warning'|'info'}> = ({ label, tone='neutral' }) => {
  const { colors } = useTheme();
  const bg = tone === 'success' ? colors.success + '33'
    : tone === 'danger' ? colors.danger + '33'
    : tone === 'warning' ? colors.warning + '33'
    : tone === 'info' ? colors.accent + '33'
    : colors.border;
  const tx = tone === 'success' ? colors.success
    : tone === 'danger' ? colors.danger
    : tone === 'warning' ? colors.warning
    : tone === 'info' ? colors.accent
    : colors.subtext;
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: tx }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, alignSelf: 'flex-start' },
  text: { fontSize: 12, fontWeight: '600' }
});
