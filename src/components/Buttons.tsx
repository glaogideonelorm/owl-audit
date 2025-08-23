import React from "react";
import { Text, TouchableOpacity, ViewStyle, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/index";

export const PrimaryButton: React.FC<{
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  leftIcon?: keyof typeof Ionicons.glyphMap;
}> = ({ label, onPress, style, leftIcon }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: colors.accent,
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
        },
        style,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {leftIcon ? (
          <Ionicons name={leftIcon} size={18} color={"white"} />
        ) : null}
        <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const GhostButton: React.FC<{
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  leftIcon?: keyof typeof Ionicons.glyphMap;
}> = ({ label, onPress, style, leftIcon }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: "transparent",
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {leftIcon ? (
          <Ionicons name={leftIcon} size={18} color={colors.text} />
        ) : null}
        <Text style={{ color: colors.text, fontWeight: "600", fontSize: 16 }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
