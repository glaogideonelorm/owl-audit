import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  TextInput,
  FlatList,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/index";
import GeminiService from "../services/geminiService";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { SpeechToText } from "./SpeechToText";

interface AIChatbotProps {
  visible: boolean;
  onClose: () => void;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  attachments?: Attachment[];
}

interface Attachment {
  id: string;
  type: "image" | "document" | "audio";
  name: string;
  uri: string;
  size?: number;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  visible,
  onClose,
  isOnline,
}) => {
  const { colors, t } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (visible && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text: t("ai_welcome_message"),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [visible, messages.length, t]);

  // Request permissions
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || mediaStatus !== "granted") {
        Alert.alert(
          "Permissions Required",
          "Camera and media library permissions are needed for full functionality."
        );
      }
    })();
  }, []);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        setShowAttachmentMenu(false);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSpeechTranscription = (text: string) => {
    setInputText(text);
  };

  const handlePartialTranscription = (text: string) => {
    
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "text/*",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        const attachment: Attachment = {
          id: Date.now().toString(),
          type: "document",
          name: file.name,
          uri: file.uri,
          size: file.size,
        };

        setInputText((prev) => prev + `\n📎 Attached: ${file.name}`);
        setShowAttachmentMenu(false);
      }
    } catch (err) {
      console.error("Error picking document:", err);
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const image = result.assets[0];
        const attachment: Attachment = {
          id: Date.now().toString(),
          type: "image",
          name: "Image",
          uri: image.uri,
        };

        setInputText((prev) => prev + `\n📷 Image attached`);
        setShowAttachmentMenu(false);
      }
    } catch (err) {
      console.error("Error picking image:", err);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const image = result.assets[0];
        const attachment: Attachment = {
          id: Date.now().toString(),
          type: "image",
          name: "Photo",
          uri: image.uri,
        };

        setInputText((prev) => prev + `\n📸 Photo taken`);
        setShowAttachmentMenu(false);
      }
    } catch (err) {
      console.error("Error taking photo:", err);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    if (!isOnline) {
      Alert.alert(
        "AI Offline",
        "The AI assistant is currently offline. Please try again later."
      );
      return;
    }

    if (requestCount >= 10) {
      Alert.alert(
        "Rate Limit Reached",
        "You have reached the maximum number of requests for this session."
      );
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    setShowAttachmentMenu(false);

    // Focus input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    try {
      const geminiService = GeminiService.getInstance();
      const response = await geminiService.chatWithDataset(userMessage.text);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setRequestCount((prev) => prev + 1);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: t("ai_error_message"),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: item.isUser ? colors.primary : colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: item.isUser ? "white" : colors.text },
          ]}
        >
          {item.text}
        </Text>

        {/* Render attachments if any */}
        {item.attachments && item.attachments.length > 0 && (
          <View style={styles.attachmentsContainer}>
            {item.attachments.map((attachment) => (
              <View key={attachment.id} style={styles.attachmentItem}>
                <Ionicons
                  name={
                    attachment.type === "image"
                      ? "image"
                      : attachment.type === "document"
                      ? "document"
                      : "mic"
                  }
                  size={16}
                  color={
                    item.isUser ? "rgba(255, 255, 255, 0.8)" : colors.subtext
                  }
                />
                <Text
                  style={[
                    styles.attachmentText,
                    {
                      color: item.isUser
                        ? "rgba(255, 255, 255, 0.8)"
                        : colors.subtext,
                    },
                  ]}
                >
                  {attachment.name}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Text
          style={[
            styles.messageTime,
            {
              color: item.isUser ? "rgba(255, 255, 255, 0.7)" : colors.subtext,
            },
          ]}
        >
          {item.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.messagesHeader}>
      <Text style={[styles.headerText, { color: colors.subtext }]}>
        {messages.length === 1
          ? "Start a conversation"
          : `${messages.length - 1} messages`}
      </Text>
    </View>
  );

  const renderAttachmentMenu = () => (
    <View style={[styles.attachmentMenu, { backgroundColor: colors.cardBg }]}>
      <TouchableOpacity style={styles.attachmentOption} onPress={pickDocument}>
        <Ionicons name="document-outline" size={24} color={colors.primary} />
        <Text style={[styles.attachmentOptionText, { color: colors.text }]}>
          Document
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.attachmentOption} onPress={pickImage}>
        <Ionicons name="images-outline" size={24} color={colors.primary} />
        <Text style={[styles.attachmentOptionText, { color: colors.text }]}>
          Gallery
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.attachmentOption} onPress={takePhoto}>
        <Ionicons name="camera-outline" size={24} color={colors.primary} />
        <Text style={[styles.attachmentOptionText, { color: colors.text }]}>
          Camera
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.bg }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.cardBg,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <View style={styles.aiInfo}>
              <Text style={[styles.aiName, { color: colors.text }]}>
                AI Assistant
              </Text>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: isOnline
                        ? colors.success
                        : colors.danger,
                    },
                  ]}
                />
                <Text style={[styles.statusText, { color: colors.subtext }]}>
                  {isOnline ? "Online" : "Offline"}
                </Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <View
                style={[
                  styles.requestBadge,
                  { backgroundColor: colors.primary + "20" },
                ]}
              >
                <Text style={[styles.requestCount, { color: colors.primary }]}>
                  {requestCount}/10
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={[
            styles.messagesContent,
            { paddingBottom: keyboardVisible ? 20 : 40 },
          ]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={
            isLoading ? (
              <View style={styles.loadingContainer}>
                <View
                  style={[
                    styles.loadingBubble,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={[styles.loadingText, { color: colors.subtext }]}>
                    {t("ai_typing")}
                  </Text>
                </View>
              </View>
            ) : null
          }
          onContentSizeChange={() => {
            if (messages.length > 0) {
              flatListRef.current?.scrollToEnd({ animated: true });
            }
          }}
        />

        {/* Attachment Menu */}
        {showAttachmentMenu && renderAttachmentMenu()}

        {/* Input */}
        <View
          style={[
            styles.inputContainer,
            {
              borderTopColor: colors.border,
              backgroundColor: colors.cardBg,
            },
          ]}
        >
          <View style={styles.inputWrapper}>
            <TouchableOpacity
              style={styles.attachmentButton}
              onPress={() => setShowAttachmentMenu(!showAttachmentMenu)}
            >
              <Ionicons name="add" size={24} color={colors.primary} />
            </TouchableOpacity>

            <TextInput
              ref={inputRef}
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.bg,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder={t("ai_placeholder")}
              placeholderTextColor={colors.subtext}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              editable={!isLoading}
              onSubmitEditing={sendMessage}
              blurOnSubmit={false}
              returnKeyType="send"
              textAlignVertical="center"
            />

            <SpeechToText
              onTranscriptionComplete={handleSpeechTranscription}
              onPartialTranscription={handlePartialTranscription}
              disabled={isLoading}
            />

            <TouchableOpacity
              style={[
                styles.sendButton,
                {
                  backgroundColor:
                    inputText.trim() && !isLoading
                      ? colors.primary
                      : colors.border,
                },
              ]}
              onPress={sendMessage}
              disabled={!inputText.trim() || isLoading}
              activeOpacity={0.7}
            >
              <Ionicons
                name="send"
                size={20}
                color={
                  inputText.trim() && !isLoading ? "white" : colors.subtext
                }
              />
            </TouchableOpacity>
          </View>

          {/* Character count */}
          <Text style={[styles.charCount, { color: colors.subtext }]}>
            {inputText.length}/500
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  aiInfo: {
    flex: 1,
  },
  aiName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  requestBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  requestCount: {
    fontSize: 12,
    fontWeight: "600",
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
  },
  messagesHeader: {
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    marginBottom: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: "flex-end",
  },
  aiMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: width * 0.75,
    padding: 12,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  attachmentsContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  attachmentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  attachmentText: {
    fontSize: 12,
    marginLeft: 4,
  },
  messageTime: {
    fontSize: 11,
    alignSelf: "flex-end",
    opacity: 0.7,
  },
  loadingContainer: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  loadingBubble: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 18,
    maxWidth: width * 0.75,
  },
  loadingText: {
    fontSize: 14,
    marginLeft: 8,
  },
  attachmentMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  attachmentOption: {
    alignItems: "center",
    padding: 8,
  },
  attachmentOptionText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  attachmentButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 44,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  charCount: {
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
    marginRight: 4,
  },
});
