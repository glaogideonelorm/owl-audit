import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/index";
import { SpeechToText } from "./SpeechToText";

export const SpeechTest: React.FC = () => {
  const { colors } = useTheme();
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [partialText, setPartialText] = useState("");

  const handleTranscriptionComplete = (text: string) => {
    setTranscriptions((prev) => [...prev, text]);
    setPartialText("");
    Alert.alert("Transcription Complete", `"${text}"`);
  };

  const handlePartialTranscription = (text: string) => {
    setPartialText(text);
  };

  const clearTranscriptions = () => {
    setTranscriptions([]);
    setPartialText("");
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Speech-to-Text Test
        </Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          Test the live speech recognition functionality
        </Text>
      </View>

      <View style={styles.speechSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Speech Recognition
        </Text>

        <View style={styles.speechContainer}>
          <SpeechToText
            onTranscriptionComplete={handleTranscriptionComplete}
            onPartialTranscription={handlePartialTranscription}
          />
        </View>

        {partialText && (
          <View
            style={[
              styles.partialContainer,
              { backgroundColor: colors.border },
            ]}
          >
            <Text style={[styles.partialLabel, { color: colors.subtext }]}>
              Live Transcription:
            </Text>
            <Text style={[styles.partialText, { color: colors.text }]}>
              "{partialText}"
            </Text>
          </View>
        )}
      </View>

      <View style={styles.transcriptionsSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Completed Transcriptions
          </Text>
          <TouchableOpacity
            style={[styles.clearButton, { backgroundColor: colors.danger }]}
            onPress={clearTranscriptions}
          >
            <Ionicons name="trash" size={16} color="white" />
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {transcriptions.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.border }]}>
            <Ionicons name="mic-outline" size={48} color={colors.subtext} />
            <Text style={[styles.emptyText, { color: colors.subtext }]}>
              No transcriptions yet
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.subtext }]}>
              Tap the microphone to start speaking
            </Text>
          </View>
        ) : (
          <View style={styles.transcriptionsList}>
            {transcriptions.map((text, index) => (
              <View
                key={index}
                style={[
                  styles.transcriptionItem,
                  { backgroundColor: colors.cardBg },
                ]}
              >
                <View style={styles.transcriptionHeader}>
                  <Text
                    style={[
                      styles.transcriptionNumber,
                      { color: colors.primary },
                    ]}
                  >
                    #{index + 1}
                  </Text>
                  <Text
                    style={[
                      styles.transcriptionTime,
                      { color: colors.subtext },
                    ]}
                  >
                    {new Date().toLocaleTimeString()}
                  </Text>
                </View>
                <Text
                  style={[styles.transcriptionText, { color: colors.text }]}
                >
                  {text}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>
          How to Test
        </Text>
        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Ionicons name="mic" size={16} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.subtext }]}>
              Tap the microphone button to start recording
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="chatbubble" size={16} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.subtext }]}>
              Speak clearly and watch for live transcription
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={colors.primary}
            />
            <Text style={[styles.infoText, { color: colors.subtext }]}>
              Tap again to stop and see the final result
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  speechSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  speechContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  partialContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  partialLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  partialText: {
    fontSize: 16,
    fontStyle: "italic",
  },
  transcriptionsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  clearButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    padding: 32,
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
  },
  transcriptionsList: {
    gap: 12,
  },
  transcriptionItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  transcriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  transcriptionNumber: {
    fontSize: 14,
    fontWeight: "600",
  },
  transcriptionTime: {
    fontSize: 12,
  },
  transcriptionText: {
    fontSize: 16,
    lineHeight: 22,
  },
  infoSection: {
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    flex: 1,
  },
});
