import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@theme/index";
import { Header } from "@components/Header";
import { Card } from "@components/Card";
import { mockAudits } from "@data/mock";
import { ListItem } from "@components/ListItem";
import { Badge } from "@components/Badge";
import { Ionicons } from "@expo/vector-icons";

export default function AuditsScreen({
  navigation,
}: NativeStackScreenProps<any>) {
  const { colors, t } = useTheme();
  const [selectedTab, setSelectedTab] = useState("This Week");

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      <Header title={t("audits")} showBack onBack={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: 16 }}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["This Week", "Last Month"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    selectedTab === tab ? colors.accent : "transparent",
                },
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: selectedTab === tab ? "white" : colors.subtext,
                    fontWeight: selectedTab === tab ? "600" : "400",
                  },
                ]}
              >
                {t(tab === "This Week" ? "this_week" : "last_month")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 24 }}>
          {mockAudits.map((a, i) => (
            <View key={a.id} style={{ marginBottom: 12 }}>
              <Card>
                <View style={styles.auditItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.auditTitle, { color: colors.text }]}>
                      {a.title}
                    </Text>
                    <Text style={[styles.auditDate, { color: colors.subtext }]}>
                      {new Date(a.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </Text>
                    <View style={{ marginTop: 8 }}>
                      <Badge
                        label={t(a.status.toLowerCase())}
                        tone={a.status === "Completed" ? "success" : "warning"}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Report")}
                    style={{ padding: 8 }}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.subtext}
                    />
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 4,
    marginTop: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
  },
  auditItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  auditTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  auditDate: {
    fontSize: 14,
  },
});
