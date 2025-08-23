import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/index";

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  icon: string;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  const { colors } = useTheme();

  const getStepColor = (status: ProgressStep["status"]) => {
    switch (status) {
      case "completed":
        return colors.success;
      case "current":
        return colors.primary;
      case "pending":
        return colors.subtext;
      default:
        return colors.subtext;
    }
  };

  const getStepBackground = (status: ProgressStep["status"]) => {
    switch (status) {
      case "completed":
        return colors.success + "20";
      case "current":
        return colors.primary + "20";
      case "pending":
        return colors.border;
      default:
        return colors.border;
    }
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepContainer}>
          <View style={styles.stepContent}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: getStepBackground(step.status) },
              ]}
            >
              <Ionicons
                name={step.icon as any}
                size={20}
                color={getStepColor(step.status)}
              />
            </View>
            <View style={styles.stepInfo}>
              <Text
                style={[
                  styles.stepTitle,
                  { color: step.status === "pending" ? colors.subtext : colors.text },
                ]}
              >
                {step.title}
              </Text>
              <Text
                style={[
                  styles.stepDescription,
                  { color: colors.subtext },
                ]}
              >
                {step.description}
              </Text>
            </View>
            {step.status === "completed" && (
              <View style={[styles.checkmark, { backgroundColor: colors.success }]}>
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            )}
          </View>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.connector,
                {
                  backgroundColor:
                    step.status === "completed" ? colors.success : colors.border,
                },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  stepContainer: {
    marginBottom: 8,
  },
  stepContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  connector: {
    width: 2,
    height: 20,
    marginLeft: 28,
    marginTop: 4,
  },
});
