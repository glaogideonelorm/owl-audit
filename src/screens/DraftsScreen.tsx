import React, { useState, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@components/Header";
import { Card } from "@components/Card";
import { storageService, Draft } from "../services/storageService";

type Props = NativeStackScreenProps<any>;

export default function DraftsScreen({ navigation }: Props) {
  const { colors, t } = useTheme();
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = async () => {
    const savedDrafts = await storageService.getDrafts();
    setDrafts(savedDrafts);
  };

  const handleDeleteDraft = (draftId: string) => {
    Alert.alert("Delete Draft", "Are you sure you want to delete this draft?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await storageService.deleteDraft(draftId);
            await storageService.addActivity({
              type: "draft_deleted",
              title: "Draft Deleted",
              description: "Draft has been deleted",
              metadata: { draftId },
            });
            loadDrafts();
          } catch (error) {
            Alert.alert("Error", "Failed to delete draft");
          }
        },
      },
    ]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Header title={t("drafts")} showBack onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {drafts.length > 0 ? (
          drafts.map((draft) => (
            <Card key={draft.id}>
              <View style={styles.draftItem}>
                <View style={styles.draftInfo}>
                  <Text style={[styles.draftTitle, { color: colors.text }]}>
                    {draft.title}
                  </Text>
                  <Text
                    style={[styles.draftDescription, { color: colors.subtext }]}
                  >
                    {draft.description}
                  </Text>
                  <Text style={[styles.draftDate, { color: colors.subtext }]}>
                    {formatDate(draft.createdAt)}
                  </Text>
                </View>
                <View style={styles.draftActions}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={() =>
                      navigation.navigate("StartAudit", { draftId: draft.id })
                    }
                  >
                    <Ionicons name="play" size={16} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Continue</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: colors.danger },
                    ]}
                    onPress={() => handleDeleteDraft(draft.id)}
                  >
                    <Ionicons name="trash" size={16} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="document-text-outline"
                size={64}
                color={colors.subtext}
              />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Drafts Yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.subtext }]}>
              Start an audit and save it as a draft to see it here
            </Text>
          </View>
        )}
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
  },
  draftItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  draftInfo: {
    flex: 1,
  },
  draftTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  draftDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  draftDate: {
    fontSize: 12,
  },
  draftActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
