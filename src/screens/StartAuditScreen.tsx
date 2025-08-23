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
import { useTheme } from "@theme/index";
import { Header } from "@components/Header";
import { Card } from "@components/Card";
import { Section } from "@components/Section";
import { PrimaryButton, GhostButton } from "@components/Buttons";
import { storageService } from "../services/storageService";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<any>;

export default function StartAuditScreen({ navigation }: Props) {
  const { colors, t } = useTheme();
  const [activeTab, setActiveTab] = useState("documents");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [auditTitle, setAuditTitle] = useState("");

  const handleSaveDraft = async () => {
    if (!auditTitle.trim()) {
      Alert.alert("Error", "Please enter an audit title");
      return;
    }

    try {
      await storageService.saveDraft({
        title: auditTitle.trim(),
        description: `Audit with ${uploadedFiles.length} files uploaded`,
        files: uploadedFiles,
        status: "in_progress",
      });

      Alert.alert(
        "Draft Saved",
        "Your audit has been saved as a draft. You can continue later.",
        [
          { text: "Continue Editing", style: "cancel" },
          {
            text: "View Drafts",
            onPress: () => navigation.navigate("Drafts"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save draft");
    }
  };

  const handleStartAudit = () => {
    if (!auditTitle.trim()) {
      Alert.alert("Error", "Please enter an audit title");
      return;
    }

    if (uploadedFiles.length === 0) {
      Alert.alert("Error", "Please upload at least one file");
      return;
    }

    // Add activity
    storageService.addActivity({
      type: "audit_started",
      title: "Audit Started",
      description: `Started audit: ${auditTitle}`,
      metadata: { auditTitle, fileCount: uploadedFiles.length },
    });

    navigation.navigate("Progress");
  };

  const handleFileUpload = (fileType: string) => {
    // Simulate file upload
    const newFile = `${fileType}_${Date.now()}.pdf`;
    setUploadedFiles((prev) => [...prev, newFile]);

    Alert.alert("Success", `${fileType} uploaded successfully`);
  };

  const handleRemoveFile = (fileName: string) => {
    Alert.alert("Remove File", `Remove "${fileName}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          setUploadedFiles((prev) => prev.filter((file) => file !== fileName));
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Header
        title={t("start_audit")}
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Audit Title */}
        <Card>
          <Section
            title="Audit Title"
            subtitle="Give your audit a descriptive name"
          >
            <Text style={[styles.auditTitle, { color: colors.text }]}>
              {auditTitle || "Untitled Audit"}
            </Text>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                Alert.prompt(
                  "Edit Audit Title",
                  "Enter a title for your audit:",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Save",
                      onPress: (title) => setAuditTitle(title || ""),
                    },
                  ],
                  "plain-text",
                  auditTitle
                );
              }}
            >
              <Ionicons name="create-outline" size={16} color="#FFFFFF" />
              <Text style={styles.editButtonText}>Edit Title</Text>
            </TouchableOpacity>
          </Section>
        </Card>

        <View style={{ height: 12 }} />

        {/* Upload Tabs */}
        <Card>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "documents" && {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => setActiveTab("documents")}
            >
              <Ionicons
                name="document-text"
                size={20}
                color={activeTab === "documents" ? "#FFFFFF" : colors.subtext}
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === "documents" ? "#FFFFFF" : colors.subtext,
                  },
                ]}
              >
                Documents
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "images" && { backgroundColor: colors.primary },
              ]}
              onPress={() => setActiveTab("images")}
            >
              <Ionicons
                name="image"
                size={20}
                color={activeTab === "images" ? "#FFFFFF" : colors.subtext}
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === "images" ? "#FFFFFF" : colors.subtext,
                  },
                ]}
              >
                Images
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "voice" && { backgroundColor: colors.primary },
              ]}
              onPress={() => setActiveTab("voice")}
            >
              <Ionicons
                name="mic"
                size={20}
                color={activeTab === "voice" ? "#FFFFFF" : colors.subtext}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === "voice" ? "#FFFFFF" : colors.subtext },
                ]}
              >
                Voice Notes
              </Text>
            </TouchableOpacity>
          </View>

          {/* Upload Area */}
          <View style={styles.uploadArea}>
            <TouchableOpacity
              style={[styles.uploadButton, { borderColor: colors.border }]}
              onPress={() => handleFileUpload(activeTab.slice(0, -1))}
            >
              <Ionicons name="cloud-upload" size={48} color={colors.subtext} />
              <Text style={[styles.uploadText, { color: colors.subtext }]}>
                Tap to upload {activeTab}
              </Text>
              <Text style={[styles.uploadSubtext, { color: colors.subtext }]}>
                PDF, DOC, JPG, PNG up to 10MB
              </Text>
            </TouchableOpacity>
          </View>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <View style={styles.filesSection}>
              <Text style={[styles.filesTitle, { color: colors.text }]}>
                Uploaded Files ({uploadedFiles.length})
              </Text>
              {uploadedFiles.map((fileName, index) => (
                <View
                  key={index}
                  style={[styles.fileItem, { borderColor: colors.border }]}
                >
                  <View style={styles.fileInfo}>
                    <Ionicons
                      name="document"
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={[styles.fileName, { color: colors.text }]}>
                      {fileName}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveFile(fileName)}
                  >
                    <Ionicons name="close-circle" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Card>

        <View style={{ height: 20 }} />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <PrimaryButton
            label="Start Audit"
            onPress={handleStartAudit}
            leftIcon="play"
          />
          <View style={{ height: 12 }} />
          <GhostButton
            label="Save as Draft"
            onPress={handleSaveDraft}
            leftIcon="save-outline"
          />
          <View style={{ height: 12 }} />
          <GhostButton
            label="Cancel"
            onPress={() => navigation.goBack()}
            leftIcon="close"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  auditTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    gap: 6,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 6,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "500",
  },
  uploadArea: {
    marginBottom: 20,
  },
  uploadButton: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 40,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 12,
  },
  filesSection: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    paddingTop: 16,
  },
  filesTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  fileName: {
    fontSize: 14,
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  actionButtons: {
    marginTop: 8,
  },
});
