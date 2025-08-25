import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/index";
import { isNativeFeatureAvailable } from "../config/flags";

// Only import Voice if native STT is available
let Voice: any = null;
let VoiceTypes: any = null;

if (isNativeFeatureAvailable("stt")) {
  try {
    const voiceModule = require("@react-native-voice/voice");
    Voice = voiceModule.default;
    VoiceTypes = voiceModule;
  } catch (error) {
    console.warn("Voice module not available:", error);
  }
}

interface SpeechToTextProps {
  onTranscriptionComplete: (text: string) => void;
  onPartialTranscription?: (text: string) => void;
  disabled?: boolean;
}

export const SpeechToText: React.FC<SpeechToTextProps> = ({
  onTranscriptionComplete,
  onPartialTranscription,
  disabled = false,
}) => {
  const { colors } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [partialText, setPartialText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const isNativeSTTAvailable = isNativeFeatureAvailable("stt") && Voice;

  useEffect(() => {
    if (!isNativeSTTAvailable) return;

    // Initialize voice recognition
    Voice.onSpeechStart = (_e: any) => {
      setIsListening(true);
      setError(null);
      setPartialText("");
    };

    Voice.onSpeechEnd = (_e: any) => {
      setIsListening(false);
    };

    Voice.onSpeechError = (e: any) => {
      setIsListening(false);
      setError(e.error?.message || "Speech recognition error");
      console.warn("Speech recognition error:", e.error);
    };

    Voice.onSpeechPartialResults = (e: any) => {
      if (e.value && e.value.length > 0) {
        const partial = e.value[0];
        setPartialText(partial);
        onPartialTranscription?.(partial);
      }
    };

    Voice.onSpeechResults = (e: any) => {
      if (e.value && e.value.length > 0) {
        const finalText = e.value[0];
        setPartialText("");
        onTranscriptionComplete(finalText);
      }
    };

    return () => {
      if (Voice) {
        Voice.destroy().then(Voice.removeAllListeners);
      }
    };
  }, [onTranscriptionComplete, onPartialTranscription, isNativeSTTAvailable]);

  const startListening = async () => {
    if (!isNativeSTTAvailable) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    try {
      setError(null);
      await Voice.start("en-US", {
        EXTRA_PARTIAL_RESULTS: true,
        EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 30000,
        EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 1000,
        EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 500,
      });
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setError("Failed to start speech recognition");
      Alert.alert(
        "Error",
        "Failed to start speech recognition. Please check microphone permissions."
      );
    }
  };

  const stopListening = async () => {
    if (!isNativeSTTAvailable) return;

    try {
      await Voice.stop();
    } catch (err) {
      console.error("Failed to stop speech recognition:", err);
    }
  };

  const handlePress = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isListening ? colors.danger : colors.primary,
            opacity: disabled || !isNativeSTTAvailable ? 0.5 : 1,
          },
        ]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {isListening ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Ionicons name="mic" size={24} color="white" />
        )}
      </TouchableOpacity>

      {showTooltip && !isNativeSTTAvailable && (
        <View
          style={[styles.tooltipContainer, { backgroundColor: colors.cardBg }]}
        >
          <Text style={[styles.tooltipText, { color: colors.subtext }]}>
            Voice dictation available in Dev Build
          </Text>
        </View>
      )}

      {isListening && isNativeSTTAvailable && (
        <View style={styles.statusContainer}>
          <View
            style={[styles.pulseDot, { backgroundColor: colors.success }]}
          />
          <Text style={[styles.statusText, { color: colors.subtext }]}>
            Listening...
          </Text>
        </View>
      )}

      {partialText && isNativeSTTAvailable && (
        <View style={styles.partialContainer}>
          <Text style={[styles.partialText, { color: colors.subtext }]}>
            "{partialText}"
          </Text>
        </View>
      )}

      {error && isNativeSTTAvailable && (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.danger }]}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 8,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tooltipContainer: {
    position: "absolute",
    top: -40,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  tooltipText: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "500",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  partialContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 12,
    maxWidth: 200,
  },
  partialText: {
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
  errorContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderRadius: 8,
  },
  errorText: {
    fontSize: 11,
    textAlign: "center",
  },
});
