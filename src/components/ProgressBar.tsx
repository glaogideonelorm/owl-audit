
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';

export const ProgressBar: React.FC<{progress: number}> = ({ progress }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.track, { backgroundColor: colors.border }]}>
      <View style={[styles.fill, { width: `${Math.max(0, Math.min(100, progress))}%`, backgroundColor: colors.accent }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: { height: 10, borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%' }
});
