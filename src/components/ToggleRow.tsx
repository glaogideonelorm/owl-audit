
import React from 'react';
import { Text, View, Switch } from 'react-native';
import { useTheme } from '@theme/index';

export const ToggleRow: React.FC<{label: string; value: boolean; onChange: (v:boolean)=>void; subtitle?: string}> = ({ label, value, onChange, subtitle }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical: 14, borderBottomWidth: 1, borderColor: colors.border }}>
      <View style={{ flex:1, paddingRight: 16 }}>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight:'600' }}>{label}</Text>
        {subtitle ? <Text style={{ color: colors.subtext, marginTop: 4 }}>{subtitle}</Text> : null}
      </View>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
};
