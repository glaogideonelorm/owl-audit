import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  Alert,
  PanGestureHandler,
  State,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/index";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { PanGestureHandler as RNGHPanGestureHandler } from "react-native-gesture-handler";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  attachments?: Array<{
    name: string;
    type: "image" | "document";
    uri: string;
  }>;
}

interface AIChatbotProps {
  isVisible: boolean;
  onClose: () => void;
  apiKey?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  isVisible,
  onClose,
  apiKey,
}) => {
  const { t, colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: t("ai_welcome_message"),
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ x: 20, y: 100 });
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!inputText.trim() && !showAttachments) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await generateAIResponse(newMessage.text, apiKey);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t("ai_error_message"),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (
    message: string,
    apiKey?: string
  ): Promise<string> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("audit") || lowerMessage.includes("report")) {
      return t("ai_audit_response");
    } else if (
      lowerMessage.includes("risk") ||
      lowerMessage.includes("security")
    ) {
      return t("ai_risk_response");
    } else if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("support")
    ) {
      return t("ai_help_response");
    } else {
      return t("ai_general_response");
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        const attachmentMessage: Message = {
          id: Date.now().toString(),
          text: `📎 ${file.name}`,
          isUser: true,
          timestamp: new Date(),
          attachments: [
            {
              name: file.name,
              type: "document",
              uri: file.uri,
            },
          ],
        };
        setMessages((prev) => [...prev, attachmentMessage]);
        setShowAttachments(false);
      }
    } catch (error) {
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
        const attachmentMessage: Message = {
          id: Date.now().toString(),
          text: `📷 Image uploaded`,
          isUser: true,
          timestamp: new Date(),
          attachments: [
            {
              name: "image.jpg",
              type: "image",
              uri: image.uri,
            },
          ],
        };
        setMessages((prev) => [...prev, attachmentMessage]);
        setShowAttachments(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const onGestureEvent = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    setBubblePosition((prev) => ({
      x: prev.x + translationX,
      y: prev.y + translationY,
    }));
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      // Snap to edges if needed
      const { x, y } = bubblePosition;
      const screenWidth = 400; // Approximate screen width
      const screenHeight = 800; // Approximate screen height

      let newX = x;
      let newY = y;

      // Keep within screen bounds
      if (x < 0) newX = 20;
      if (x > screenWidth - 80) newX = screenWidth - 100;
      if (y < 100) newY = 100;
      if (y > screenHeight - 200) newY = screenHeight - 200;

      setBubblePosition({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.chatContainer, { backgroundColor: colors.bg }]}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: colors.primary }]}>
            <View style={styles.headerContent}>
              <View style={styles.aiInfo}>
                <View style={styles.aiAvatar}>
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={20}
                    color="#FFFFFF"
                  />
                </View>
                <View>
                  <Text style={styles.aiName}>{t("ai_assistant")}</Text>
                  <Text style={styles.aiStatus}>
                    {apiKey ? t("ai_online") : t("ai_offline")}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  message.isUser ? styles.userMessage : styles.aiMessage,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    message.isUser
                      ? { backgroundColor: colors.primary }
                      : {
                          backgroundColor: colors.cardBg,
                          borderColor: colors.border,
                        },
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.isUser
                        ? { color: "#FFFFFF" }
                        : { color: colors.text },
                    ]}
                  >
                    {message.text}
                  </Text>
                  {message.attachments &&
                    message.attachments.map((attachment, index) => (
                      <View key={index} style={styles.attachment}>
                        <Ionicons
                          name={
                            attachment.type === "image" ? "image" : "document"
                          }
                          size={16}
                          color={message.isUser ? "#FFFFFF" : colors.subtext}
                        />
                        <Text
                          style={[
                            styles.attachmentText,
                            message.isUser
                              ? { color: "#FFFFFF" }
                              : { color: colors.subtext },
                          ]}
                        >
                          {attachment.name}
                        </Text>
                      </View>
                    ))}
                </View>
                <Text style={[styles.messageTime, { color: colors.subtext }]}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            ))}
            {isLoading && (
              <View style={styles.typingContainer}>
                <View
                  style={[
                    styles.typingBubble,
                    { backgroundColor: colors.cardBg },
                  ]}
                >
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={[styles.typingText, { color: colors.subtext }]}>
                    {t("ai_typing")}
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input Area */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.inputContainer, { backgroundColor: colors.cardBg }]}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          >
            {showAttachments && (
              <View style={styles.attachmentOptions}>
                <TouchableOpacity
                  style={[
                    styles.attachmentOption,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={pickImage}
                >
                  <Ionicons name="image" size={20} color="#FFFFFF" />
                  <Text style={styles.attachmentOptionText}>Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.attachmentOption,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={pickDocument}
                >
                  <Ionicons name="document" size={20} color="#FFFFFF" />
                  <Text style={styles.attachmentOptionText}>Document</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.inputRow}>
              <TouchableOpacity
                style={[
                  styles.attachButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() => setShowAttachments(!showAttachments)}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <TextInput
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                  },
                ]}
                placeholder={t("ai_placeholder")}
                placeholderTextColor={colors.subtext}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />

              <TouchableOpacity
                style={[
                  styles.sendButton,
                  {
                    backgroundColor: inputText.trim()
                      ? colors.primary
                      : colors.subtext,
                  },
                ]}
                onPress={sendMessage}
                disabled={!inputText.trim() && !showAttachments}
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  chatContainer: {
    flex: 1,
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  aiInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  aiName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  aiStatus: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
  closeButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
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
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  attachment: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  attachmentText: {
    fontSize: 12,
    marginLeft: 6,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    marginHorizontal: 8,
  },
  typingContainer: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  typingBubble: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  typingText: {
    fontSize: 14,
    marginLeft: 8,
  },
  inputContainer: {
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 16, // Extra padding for iOS
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  attachmentOptions: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },
  attachmentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  attachmentOptionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
