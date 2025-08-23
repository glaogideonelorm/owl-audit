import React, { useState } from "react";
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
import { ToggleRow } from "@components/ToggleRow";
import { ListItem } from "@components/ListItem";
import { currencyService } from "../services/currencyService";
import { i18nService } from "../services/i18nService";

type Props = NativeStackScreenProps<any>;

export default function ProfileScreen({ navigation }: Props) {
  const {
    colors,
    darkMode,
    toggleTheme,
    currency,
    setCurrency,
    language,
    setLanguage,
    t,
  } = useTheme();
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          // Navigate back to login screen
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
          });
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Header
        title={t("profile")}
        showBack
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Card>
          <View style={styles.profileHeader}>
            <View style={styles.profileImage}>
              <Ionicons name="person" size={40} color={colors.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                John Doe
              </Text>
              <Text style={[styles.profileEmail, { color: colors.subtext }]}>
                john.doe@owlaudit.com
              </Text>
              <Text style={[styles.profileRole, { color: colors.subtext }]}>
                Business Owner
              </Text>
            </View>
          </View>
        </Card>

        {/* Preferences */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("preferences")}
          </Text>
          <ToggleRow
            label={t("dark_mode")}
            value={darkMode}
            onChange={toggleTheme}
          />
          <ListItem
            title={t("currency")}
            subtitle={`${currencyService.getCurrencyInfo(currency).symbol} ${
              currencyService.getCurrencyInfo(currency).name
            }`}
            onPress={() => setShowCurrencyPicker(true)}
            right={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            }
          />
          <ListItem
            title={t("language")}
            subtitle={i18nService.getLanguageInfo(language).name}
            onPress={() => setShowLanguagePicker(true)}
            right={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            }
          />
        </Card>

        {/* Subscription */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("subscription")}
          </Text>
          <ListItem
            title={t("business_pro")}
            subtitle={t("next_billing")}
            onPress={() =>
              Alert.alert("Info", "Subscription management coming soon!")
            }
            right={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            }
          />
          <ListItem
            title={t("manage_subscription")}
            onPress={() =>
              Alert.alert("Info", "Subscription management coming soon!")
            }
            right={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            }
          />
          <ListItem
            title={t("view_plans")}
            onPress={() => Alert.alert("Info", "View plans coming soon!")}
            right={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            }
          />
        </Card>

        {/* Support */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("support")}
          </Text>
          <ListItem
            title={t("help_center")}
            onPress={() => Alert.alert("Info", "Help center coming soon!")}
            right={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            }
          />
          <ListItem
            title={t("contact_support")}
            onPress={() => Alert.alert("Info", "Contact support coming soon!")}
            right={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            }
          />
        </Card>

        {/* Account Actions */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Account
          </Text>
          <ListItem
            title={t("edit_profile")}
            onPress={() => Alert.alert("Info", "Edit profile coming soon!")}
            right={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            }
          />
          <ListItem
            title={t("sign_out")}
            onPress={handleSignOut}
            right={
              <Ionicons
                name="log-out-outline"
                size={20}
                color={colors.danger}
              />
            }
          />
          <ListItem
            title={t("delete_account")}
            onPress={() => Alert.alert("Info", "Delete account coming soon!")}
            right={
              <Ionicons name="trash-outline" size={20} color={colors.danger} />
            }
          />
        </Card>

        {/* Developer Section */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Developer
          </Text>
          <ListItem
            title="AI Features Status"
            subtitle="Active"
            right={
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: colors.success + "20" },
                ]}
              >
                <Text style={[styles.statusText, { color: colors.success }]}>
                  ON
                </Text>
              </View>
            }
          />
          <ListItem
            title="App Version"
            subtitle="1.0.0"
            right={
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={colors.subtext}
              />
            }
          />
          <ListItem
            title="Build Number"
            subtitle="2025.1.0"
            right={
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={colors.subtext}
              />
            }
          />
        </Card>
      </ScrollView>

      {/* Currency Picker Modal */}
      {showCurrencyPicker && (
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("currency")}
            </Text>
            {currencyService.getAllCurrencies().map((curr) => (
              <TouchableOpacity
                key={curr.code}
                style={styles.modalItem}
                onPress={() => {
                  setCurrency(curr.code);
                  setShowCurrencyPicker(false);
                }}
              >
                <Text style={[styles.modalItemText, { color: colors.text }]}>
                  {curr.symbol} {curr.name}
                </Text>
                {currency === curr.code && (
                  <Ionicons name="checkmark" size={20} color="#16A34A" />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.border }]}
              onPress={() => setShowCurrencyPicker(false)}
            >
              <Text style={{ color: colors.text }}>{t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Language Picker Modal */}
      {showLanguagePicker && (
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("language")}
            </Text>
            {i18nService.getAllLanguages().map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.modalItem}
                onPress={() => {
                  setLanguage(lang.code);
                  setShowLanguagePicker(false);
                }}
              >
                <Text style={[styles.modalItemText, { color: colors.text }]}>
                  {lang.flag} {lang.name}
                </Text>
                {language === lang.code && (
                  <Ionicons name="checkmark" size={20} color="#16A34A" />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.border }]}
              onPress={() => setShowLanguagePicker(false)}
            >
              <Text style={{ color: colors.text }}>{t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(5, 150, 105, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalItemText: {
    fontSize: 16,
  },
  modalButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
});
