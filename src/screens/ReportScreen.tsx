import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card } from "@components/Card";
import { Section } from "@components/Section";
import { Badge } from "@components/Badge";
import { PrimaryButton, GhostButton } from "@components/Buttons";
import { Header } from "@components/Header";
import { useTheme } from "@theme/index";
import { mockRecommendations } from "@data/mock";
import { storageService } from "../services/storageService";
import { GlassmorphicAlert } from "@components/GlassmorphicAlert";

export default function ReportScreen({
  navigation,
}: NativeStackScreenProps<any>) {
  const { colors, t } = useTheme();
  const [showDismissAlert, setShowDismissAlert] = useState(false);

  const handleMarkAsDone = () => {
    Alert.alert("Mark as Done", "Mark this report as completed?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Mark Done",
        onPress: () => {
          // Add activity
          storageService.addActivity({
            type: "audit_completed",
            title: "Report Completed",
            description: "August 2025 report marked as completed",
            metadata: { reportId: "august-2025" },
          });
          Alert.alert("Success", "Report marked as completed!");
          navigation.navigate("Dashboard");
        },
      },
    ]);
  };

  const handleDismiss = () => {
    setShowDismissAlert(true);
  };

  const handleSaveAsDraft = async () => {
    try {
      await storageService.saveDraft({
        title: "August 2025 Audit Report",
        description: "Audit report for August 2025",
        files: [],
        status: "draft",
      });
      setShowDismissAlert(false);
      Alert.alert("Success", "Report saved as draft!");
      navigation.navigate("Dashboard");
    } catch (error) {
      Alert.alert("Error", "Failed to save draft");
    }
  };

  const handleDelete = () => {
    setShowDismissAlert(false);
    Alert.alert("Report Deleted", "The report has been deleted.");
    navigation.navigate("Dashboard");
  };

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.bg }]}
        contentContainerStyle={{ padding: 16 }}
      >
        <Header
          title={t("audits")}
          showBack
          onBack={() => navigation.goBack()}
        />

        <Text style={[styles.title, { color: colors.text }]}>
          Your August Report
        </Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          Everything looks good! Here's what we found.
        </Text>

        <Card>
          <Section
            title="Expenses well Made"
            subtitle="87% of expenses was properly made this month"
            right={<Badge label="" tone="success" />}
          />
        </Card>

        <View style={{ height: 8 }} />

        <Card>
          <Section
            title="Revenue Up 15%"
            subtitle="Strong growth compared to last month"
            right={<Badge label="" tone="info" />}
          />
        </Card>

        <View style={{ height: 8 }} />

        <Card>
          <Section
            title="Stock Alert"
            subtitle="Stock levels exceed optimal thresholds"
            right={<Badge label="" tone="warning" />}
          />
        </Card>

        <View style={{ height: 12 }} />

        <Card>
          <Section title="AI Recommendations" />
          {mockRecommendations.map((r) => (
            <View
              key={r.id}
              style={[
                styles.recommendationItem,
                {
                  borderColor: colors.border,
                  backgroundColor:
                    r.priority === "High"
                      ? "#EF444411"
                      : r.priority === "Medium"
                      ? "#F59E0B11"
                      : "#3B82F611",
                },
              ]}
            >
              <Text
                style={[styles.recommendationTitle, { color: colors.text }]}
              >
                {r.title}
              </Text>
              <Text
                style={[styles.recommendationNote, { color: colors.subtext }]}
              >
                {r.note}
              </Text>
              <View style={{ marginTop: 8 }}>
                <Badge
                  label={`${r.priority} Priority`}
                  tone={
                    r.priority === "High"
                      ? "danger"
                      : r.priority === "Medium"
                      ? "warning"
                      : "info"
                  }
                />
              </View>
            </View>
          ))}
        </Card>

        <View style={{ height: 16 }} />

        <PrimaryButton label="Mark as Done" onPress={handleMarkAsDone} />

        <View style={{ height: 8 }} />

        <GhostButton label="Dismiss" onPress={handleDismiss} />
      </ScrollView>

      {/* Glassmorphic Dismiss Alert */}
      <GlassmorphicAlert
        visible={showDismissAlert}
        title="Dismiss Report"
        message="What would you like to do with this audit?"
        type="info"
        buttons={[
          {
            text: "Cancel",
            onPress: () => setShowDismissAlert(false),
            style: "cancel",
          },
          {
            text: "Save as Draft",
            onPress: handleSaveAsDraft,
            style: "default",
          },
          {
            text: "Delete",
            onPress: handleDelete,
            style: "destructive",
          },
        ]}
        onClose={() => setShowDismissAlert(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  recommendationItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  recommendationNote: {
    fontSize: 14,
    lineHeight: 20,
  },
});
