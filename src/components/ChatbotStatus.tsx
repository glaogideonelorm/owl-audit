import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/index";

interface ChatbotStatusProps {
  isOnline: boolean;
  showText?: boolean;
}

export const ChatbotStatus: React.FC<ChatbotStatusProps> = ({
  isOnline,
  showText = false,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.indicator,
          { backgroundColor: isOnline ? colors.success : colors.danger },
        ]}
      />
      {showText && (
        <Text style={[styles.text, { color: colors.subtext }]}>
          AI Assistant {isOnline ? "Online" : "Offline"}
        </Text>
      )}
      <Ionicons
        name={isOnline ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
        size={16}
        color={isOnline ? colors.success : colors.subtext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    marginRight: 4,
  },
});
