import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@theme/index";
import { mockSnapshot } from "@data/mock";
import { Ionicons } from "@expo/vector-icons";
import { AIChatbot } from "@components/AIChatbot";
import { Header } from "@components/Header";
import { Card } from "@components/Card";
import { Section } from "@components/Section";
import { PrimaryButton, GhostButton } from "@components/Buttons";
import { QuickAction } from "@components/QuickAction";
import { ProgressIndicator } from "@components/ProgressIndicator";
import { storageService, RecentActivity } from "../services/storageService";

type Props = NativeStackScreenProps<any>;

export default function DashboardScreen({ navigation }: Props) {
  const { colors, t, formatCurrency } = useTheme();
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  
  // Animation values
  const [revenueAnim] = useState(new Animated.Value(0));
  const [expensesAnim] = useState(new Animated.Value(0));
  const [riskAnim] = useState(new Animated.Value(0));
  const [animatedRevenue, setAnimatedRevenue] = useState(0);
  const [animatedExpenses, setAnimatedExpenses] = useState(0);
  const [animatedRisk, setAnimatedRisk] = useState(0);

  useEffect(() => {
    loadRecentActivities();
    startAnimations();
  }, []);

  const startAnimations = () => {
    // Animate revenue
    Animated.timing(revenueAnim, {
      toValue: mockSnapshot.revenue,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => setAnimatedRevenue(mockSnapshot.revenue));

    // Animate expenses
    Animated.timing(expensesAnim, {
      toValue: mockSnapshot.expenses,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => setAnimatedExpenses(mockSnapshot.expenses));

    // Animate risk score
    Animated.timing(riskAnim, {
      toValue: 70,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => setAnimatedRisk(70));
  };

  const loadRecentActivities = async () => {
    const activities = await storageService.getRecentActivities();
    setRecentActivities(activities.slice(0, 3)); // Show last 3 activities
  };

  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "audit_started":
        return "document-text-outline";
      case "audit_completed":
        return "checkmark-circle-outline";
      case "draft_saved":
        return "save-outline";
      case "draft_deleted":
        return "trash-outline";
      case "report_viewed":
        return "analytics-outline";
      default:
        return "ellipse-outline";
    }
  };

  const getActivityColor = (type: RecentActivity["type"]) => {
    switch (type) {
      case "audit_started":
        return "#3B82F6";
      case "audit_completed":
        return "#10B981";
      case "draft_saved":
        return "#F59E0B";
      case "draft_deleted":
        return "#EF4444";
      case "report_viewed":
        return "#8B5CF6";
      default:
        return colors.text;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}hrs ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  // Quick actions data
  const quickActions = [
    {
      id: "1",
      title: "Start New Audit",
      subtitle: "Begin a comprehensive business audit",
      icon: "document-text-outline",
      color: "#059669",
      onPress: () => navigation.navigate("StartAudit"),
    },
    {
      id: "2",
      title: "View Reports",
      subtitle: "Access your audit reports and insights",
      icon: "analytics-outline",
      color: "#3B82F6",
      onPress: () => navigation.navigate("Report"),
      badge: "New",
    },
    {
      id: "3",
      title: "Manage Drafts",
      subtitle: "Continue or edit saved audit drafts",
      icon: "folder-open-outline",
      color: "#F59E0B",
      onPress: () => navigation.navigate("Drafts"),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Custom Header */}
      <View style={[styles.customHeader, { backgroundColor: colors.bg }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={[styles.companyName, { color: colors.text }]}>
              Owl Audit
            </Text>
            <Text style={[styles.dashboardTitle, { color: colors.text }]}>
              Dashboard
            </Text>
            <Text style={[styles.dashboardSubtitle, { color: colors.subtext }]}>
              Monitor your business performance and audit status
            </Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <View style={styles.profileImage}>
              <Ionicons name="person" size={24} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Business Snapshot */}
        <Card>
          <Section
            title={t("this_months_snapshot")}
            right={
              <View style={styles.sectionIcon}>
                <Ionicons name="trending-up" size={20} color="#10B981" />
              </View>
            }
          >
            <View style={styles.snapshotGrid}>
              <View style={styles.snapshotItem}>
                <View style={styles.snapshotIcon}>
                  <Ionicons name="cash-outline" size={24} color="#10B981" />
                </View>
                <View style={styles.snapshotContent}>
                  <Text
                    style={[styles.snapshotLabel, { color: colors.subtext }]}
                  >
                    {t("revenue")}
                  </Text>
                  <Animated.Text
                    style={[styles.revenueText, { color: "#10B981" }]}
                  >
                    {formatCurrency(animatedRevenue)}
                  </Animated.Text>
                </View>
              </View>

              <View style={styles.snapshotItem}>
                <View style={styles.snapshotIcon}>
                  <Ionicons name="card-outline" size={24} color="#EF4444" />
                </View>
                <View style={styles.snapshotContent}>
                  <Text
                    style={[styles.snapshotLabel, { color: colors.subtext }]}
                  >
                    {t("expenses")}
                  </Text>
                  <Animated.Text
                    style={[styles.expensesText, { color: "#EF4444" }]}
                  >
                    {formatCurrency(animatedExpenses)}
                  </Animated.Text>
                </View>
              </View>
            </View>
          </Section>
        </Card>

        <View style={{ height: 12 }} />

        {/* Risk Score */}
        <Card>
          <Section
            title={t("risk_score")}
            right={
              <View style={styles.sectionIcon}>
                <Ionicons name="shield-checkmark" size={20} color="#10B981" />
              </View>
            }
          >
            <View style={styles.riskContainer}>
              <Animated.View
                style={[styles.riskCircle, { backgroundColor: "#10B981" }]}
              >
                <Animated.Text style={styles.riskScore}>
                  {Math.round(animatedRisk)}
                </Animated.Text>
              </Animated.View>
              <View style={styles.riskInfo}>
                <Text style={[styles.riskStatus, { color: "#10B981" }]}>
                  {t("good_standing")}
                </Text>
                <Text style={[styles.riskSubtext, { color: colors.subtext }]}>
                  {t("low_risk")}
                </Text>
              </View>
            </View>
          </Section>
        </Card>

        <View style={{ height: 12 }} />

        {/* Quick Actions - Enhanced for better UX */}
        <Card>
          <Section
            title="Quick Actions"
            subtitle="Get started with your audit tasks"
            right={
              <View style={styles.sectionIcon}>
                <Ionicons name="flash" size={20} color="#F59E0B" />
              </View>
            }
          >
            {quickActions.map((action) => (
              <QuickAction
                key={action.id}
                title={action.title}
                subtitle={action.subtitle}
                icon={action.icon}
                color={action.color}
                onPress={action.onPress}
                badge={action.badge}
              />
            ))}
          </Section>
        </Card>

        <View style={{ height: 12 }} />

        {/* Recent Activity */}
        <Card>
          <Section
            title={t("recent_activity")}
            subtitle="Your latest audit activities"
            right={
              <View style={styles.sectionIcon}>
                <Ionicons name="time" size={20} color="#8B5CF6" />
              </View>
            }
          >
            {recentActivities.length > 0 ? (
              <View style={styles.activitiesList}>
                {recentActivities.map((activity) => (
                  <View key={activity.id} style={styles.activityItem}>
                    <View
                      style={[
                        styles.activityIcon,
                        {
                          backgroundColor:
                            getActivityColor(activity.type) + "20",
                        },
                      ]}
                    >
                      <Ionicons
                        name={getActivityIcon(activity.type) as any}
                        size={16}
                        color={getActivityColor(activity.type)}
                      />
                    </View>
                    <View style={styles.activityContent}>
                      <Text
                        style={[styles.activityText, { color: colors.subtext }]}
                      >
                        {activity.description}
                      </Text>
                      <Text
                        style={[styles.activityTime, { color: colors.subtext }]}
                      >
                        {formatTimeAgo(activity.timestamp)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <Ionicons
                    name="time-outline"
                    size={32}
                    color={colors.subtext}
                  />
                </View>
                <Text style={[styles.emptyText, { color: colors.subtext }]}>
                  {t("audited_august")} — 12{t("hrs_ago")}
                </Text>
                <Text style={[styles.emptyText, { color: colors.subtext }]}>
                  {t("viewed_audit_report")} — 2{t("hrs_ago")}
                </Text>
                <Text style={[styles.emptyText, { color: colors.subtext }]}>
                  {t("saved_draft")} — 2{t("hrs_ago")}
                </Text>
              </View>
            )}
          </Section>
        </Card>
      </ScrollView>

      {/* AI Chatbot - Floating Bubble */}
      <AIChatbot
        isVisible={showAIChatbot}
        onClose={() => setShowAIChatbot(false)}
        apiKey={undefined}
      />

      {/* Floating AI Button */}
      <TouchableOpacity
        style={[styles.floatingAIButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowAIChatbot(true)}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeader: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
    color: "#059669",
    letterSpacing: 0.5,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  dashboardSubtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  profileButton: {
    padding: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(5, 150, 105, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  snapshotGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  snapshotItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  snapshotIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  snapshotContent: {
    flex: 1,
  },
  snapshotLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  revenueText: {
    fontSize: 18,
    fontWeight: "700",
  },
  expensesText: {
    fontSize: 18,
    fontWeight: "700",
  },
  riskContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  riskCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  riskScore: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 16,
  },
  riskInfo: {
    flex: 1,
  },
  riskStatus: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  riskSubtext: {
    fontSize: 14,
  },
  activitiesList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyIcon: {
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    marginBottom: 4,
  },
  floatingAIButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
