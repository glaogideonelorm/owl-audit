
import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';

export const Card: React.FC<ViewProps> = ({ style, children, ...rest }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  }
});
