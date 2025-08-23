import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "@theme/index";

export const Section: React.FC<{
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ title, subtitle, right, children }) => {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: 14 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <View>
          <Text style={{ color: colors.text, fontWeight: "700", fontSize: 16 }}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={{ color: colors.subtext, marginTop: 2 }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {right}
      </View>
      {children}
    </View>
  );
};
