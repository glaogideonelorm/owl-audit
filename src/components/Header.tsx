import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@theme/index";
import { Logo } from "./Logo";

type HeaderProps = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  showAIChat?: boolean;
  onAIChatPress?: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack,
  onBack,
  showLogo,
  showAIChat,
  onAIChatPress,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  return (
    <View
      style={[
        styles.wrapper,
        {
          borderBottomColor: colors.border,
          paddingTop: insets.top,
          height: 56 + insets.top,
          backgroundColor: colors.bg,
        },
      ]}
    >
      <View style={styles.side}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 22 }} />
        )}
      </View>
      <View style={styles.center}>
        {showLogo && <Logo variant="header" />}
        <Text
          style={[
            styles.title,
            { color: colors.text, marginLeft: showLogo ? 8 : 0 },
          ]}
        >
          {title}
        </Text>
      </View>
      <View style={[styles.side, { alignItems: "flex-end" }]}>
        {showAIChat && (
          <TouchableOpacity
            onPress={onAIChatPress}
            style={[styles.aiButton, { backgroundColor: colors.accent }]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chatbubble-ellipses" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ marginLeft: showAIChat ? 8 : 0 }}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=5" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  side: {
    width: 44,
  },
  center: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  aiButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
