import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@theme/index";
import { Ionicons } from "@expo/vector-icons";

interface GlassmorphicAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  buttons?: Array<{
    text: string;
    onPress: () => void;
    style?: "default" | "cancel" | "destructive";
  }>;
  onClose?: () => void;
}

const { width: screenWidth } = Dimensions.get("window");

export const GlassmorphicAlert: React.FC<GlassmorphicAlertProps> = ({
  visible,
  title,
  message,
  type = "info",
  buttons = [],
  onClose,
}) => {
  const { colors } = useTheme();

  const getTypeColor = () => {
    switch (type) {
      case "success":
        return colors.success;
      case "warning":
        return colors.warning;
      case "error":
        return colors.danger;
      default:
        return colors.info;
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "warning":
        return "warning";
      case "error":
        return "close-circle";
      default:
        return "information-circle";
    }
  };

  const defaultButtons =
    buttons.length > 0
      ? buttons
      : [
          {
            text: "OK",
            onPress: onClose || (() => {}),
            style: "default" as const,
          },
        ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <BlurView intensity={20} style={styles.blurContainer}>
          <View
            style={[
              styles.alertContainer,
              { backgroundColor: colors.cardBg + "CC" },
            ]}
          >
            {/* Icon */}
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: getTypeColor() + "20" },
              ]}
            >
              <Ionicons name={getTypeIcon()} size={32} color={getTypeColor()} />
            </View>

            {/* Title */}
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

            {/* Message */}
            <Text style={[styles.message, { color: colors.subtext }]}>
              {message}
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              {defaultButtons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    button.style === "destructive" && {
                      backgroundColor: colors.danger,
                    },
                    button.style === "cancel" && {
                      backgroundColor: colors.border,
                    },
                    button.style === "default" && {
                      backgroundColor: colors.primary,
                    },
                    defaultButtons.length === 1 && styles.singleButton,
                  ]}
                  onPress={button.onPress}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color:
                          button.style === "cancel" ? colors.text : "#FFFFFF",
                      },
                    ]}
                  >
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    width: screenWidth - 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  alertContainer: {
    padding: 24,
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  singleButton: {
    maxWidth: 120,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
