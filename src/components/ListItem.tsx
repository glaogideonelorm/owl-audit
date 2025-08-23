
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';

type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
};

export const ListItem: React.FC<Props> = ({ title, subtitle, right, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.row, { borderColor: colors.border }]}>
        <View style={{ flex:1 }}>
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>{title}</Text>
          {subtitle ? <Text style={{ color: colors.subtext, marginTop: 4 }}>{subtitle}</Text> : null}
        </View>
        {right}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection:'row', alignItems:'center', paddingVertical:14, borderBottomWidth: 1 }
});
