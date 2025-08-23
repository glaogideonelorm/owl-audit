import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/index";

interface TrustIndicatorProps {
  type: "security" | "encryption" | "compliance" | "verification";
  title: string;
  description: string;
}

export const TrustIndicator: React.FC<TrustIndicatorProps> = ({
  type,
  title,
  description,
}) => {
  const { colors } = useTheme();

  const getIcon = () => {
    switch (type) {
      case "security":
        return "shield-checkmark";
      case "encryption":
        return "lock-closed";
      case "compliance":
        return "checkmark-circle";
      case "verification":
        return "finger-print";
      default:
        return "shield-checkmark";
    }
  };

  const getColor = () => {
    switch (type) {
      case "security":
        return "#10B981";
      case "encryption":
        return "#3B82F6";
      case "compliance":
        return "#8B5CF6";
      case "verification":
        return "#F59E0B";
      default:
        return "#10B981";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBg }]}>
      <View style={[styles.iconContainer, { backgroundColor: getColor() + "20" }]}>
        <Ionicons name={getIcon()} size={24} color={getColor()} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.subtext }]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
