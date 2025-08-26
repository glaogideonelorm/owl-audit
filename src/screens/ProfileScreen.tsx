import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@theme/index";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "@components/Card";
import { ToggleRow } from "@components/ToggleRow";
import { currencyService } from "../services/currencyService";
import { i18nService } from "../services/i18nService";

type Props = NativeStackScreenProps<any>;

export default function ProfileScreen({ navigation }: Props) {
  const {
    colors,
    t,
    currency,
    setCurrency,
    language,
    setLanguage,
    darkMode,
    toggleTheme,
  } = useTheme();
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  // New state for additional settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailReports, setEmailReports] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          // Reset navigation to Welcome screen
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
          });
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert("Info", "Delete account functionality coming soon!");
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Profile Section */}
        <Card>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <View
                style={[
                  styles.profileImage,
                  { backgroundColor: colors.primary + "20" },
                ]}
              >
                <Ionicons name="person" size={40} color={colors.primary} />
              </View>
            </View>
            <Text style={[styles.profileName, { color: colors.text }]}>
              Enock Brown
            </Text>
            <Text style={[styles.profileEmail, { color: colors.subtext }]}>
              Enockbrown@audit.com
            </Text>
            <Text style={[styles.profileType, { color: colors.subtext }]}>
              Business Pro User
            </Text>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() =>
                Alert.alert("Info", "Edit profile functionality coming soon!")
              }
            >
              <Text style={[styles.editProfileText, { color: colors.primary }]}>
                Edit Profile
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </Card>

        <View style={{ height: 16 }} />

        {/* Notification Section */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Notification
          </Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Push Notification
              </Text>
            </View>
            <ToggleRow
              label=""
              value={pushNotifications}
              onChange={setPushNotifications}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="mail" size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Email Reports
              </Text>
            </View>
            <ToggleRow
              label=""
              value={emailReports}
              onChange={setEmailReports}
            />
          </View>
        </Card>

        <View style={{ height: 16 }} />

        {/* Data & Privacy Section */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Data & Privacy
          </Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="cloud-upload" size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Auto Backup
              </Text>
            </View>
            <ToggleRow label="" value={autoBackup} onChange={setAutoBackup} />
          </View>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="shield-checkmark"
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Privacy Policy
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
          </TouchableOpacity>
        </Card>

        <View style={{ height: 16 }} />

        {/* Preferences Section */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Preferences
          </Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon" size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <ToggleRow label="" value={darkMode} onChange={toggleTheme} />
          </View>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setShowCurrencyPicker(true)}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="cash" size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Currency
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: colors.subtext }]}>
                {currencyService.getCurrencyInfo(currency).name}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setShowLanguagePicker(true)}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="language" size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Language
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: colors.subtext }]}>
                {i18nService.getLanguageInfo(language).name}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            </View>
          </TouchableOpacity>
        </Card>

        <View style={{ height: 16 }} />

        {/* Subscription Section */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Subscription
          </Text>

          <View style={styles.subscriptionRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="card" size={20} color={colors.primary} />
              <View style={styles.subscriptionInfo}>
                <Text style={[styles.settingText, { color: colors.text }]}>
                  Business Pro
                </Text>
                <Text
                  style={[styles.subscriptionDate, { color: colors.subtext }]}
                >
                  Next billing : July 10, 2024
                </Text>
              </View>
            </View>
            <Text style={[styles.subscriptionPrice, { color: colors.primary }]}>
              GHC 300/mon
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={() =>
              Alert.alert(
                "Info",
                "Manage subscription functionality coming soon!"
              )
            }
          >
            <Text style={[styles.primaryButtonText, { color: "white" }]}>
              Manage Subscription
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.primary }]}
            onPress={() =>
              Alert.alert("Info", "View plans functionality coming soon!")
            }
          >
            <Text
              style={[styles.secondaryButtonText, { color: colors.primary }]}
            >
              View Plans
            </Text>
          </TouchableOpacity>
        </Card>

        <View style={{ height: 16 }} />

        {/* Support Section */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Support
          </Text>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle" size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Help Center
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="chatbubble" size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Contact Support
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="mail" size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Contact Support
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
          </TouchableOpacity>
        </Card>

        <View style={{ height: 16 }} />

        {/* Account Actions */}
        <TouchableOpacity
          style={[styles.signOutButton, { borderColor: colors.border }]}
          onPress={handleSignOut}
        >
          <Text style={[styles.signOutText, { color: colors.primary }]}>
            Sign Out
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={handleDeleteAccount}
        >
          <Text style={[styles.deleteAccountText, { color: colors.danger }]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Currency Picker Modal */}
      <Modal
        visible={showCurrencyPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCurrencyPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("select_currency")}
            </Text>
            {["USD", "EUR", "NGN", "GHS"].map((curr) => (
              <TouchableOpacity
                key={curr}
                style={[
                  styles.currencyOption,
                  currency === curr && {
                    backgroundColor: colors.primary + "20",
                  },
                ]}
                onPress={() => {
                  setCurrency(curr as any);
                  setShowCurrencyPicker(false);
                }}
              >
                <Text style={[styles.currencyText, { color: colors.text }]}>
                  {curr}
                </Text>
                {currency === curr && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowCurrencyPicker(false)}
            >
              <Text style={[styles.cancelText, { color: colors.subtext }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Language Picker Modal */}
      <Modal
        visible={showLanguagePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguagePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("select_language")}
            </Text>
            {["English", "Français"].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.currencyOption,
                  i18nService.getLanguageInfo(language).name === lang && {
                    backgroundColor: colors.primary + "20",
                  },
                ]}
                onPress={() => {
                  setLanguage(lang === "English" ? "en" : "fr");
                  setShowLanguagePicker(false);
                }}
              >
                <Text style={[styles.currencyText, { color: colors.text }]}>
                  {lang}
                </Text>
                {i18nService.getLanguageInfo(language).name === lang && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowLanguagePicker(false)}
            >
              <Text style={[styles.cancelText, { color: colors.subtext }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: "center",
  },
  profileType: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
  },
  subscriptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  subscriptionInfo: {
    gap: 2,
  },
  subscriptionDate: {
    fontSize: 12,
  },
  subscriptionPrice: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButton: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  signOutButton: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
  },
  deleteAccountButton: {
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  deleteAccountText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  currencyOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
