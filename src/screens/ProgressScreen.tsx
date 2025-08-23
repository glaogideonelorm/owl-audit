import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { ProgressBar } from "@components/ProgressBar";
import { PrimaryButton, GhostButton } from "@components/Buttons";
import { useTheme } from "@theme/index";

export default function ProgressScreen({
  navigation,
}: NativeStackScreenProps<any>) {
  const { colors, t } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalMs = 7000;
    const step = 100;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + (100 * step) / totalMs);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => navigation.replace("Report"), 500);
        }
        return next;
      });
    }, step);
    return () => clearInterval(interval);
  }, [navigation]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      <Header
        title={t("business_enterprise")}
        showBack
        onBack={() => navigation.goBack()}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 22,
            fontWeight: "800",
            marginBottom: 12,
          }}
        >
          {t("assessing_risks")}
        </Text>
        <Card>
          <Text style={{ color: colors.subtext }}>
            {t("processing_progress")}
          </Text>
          <Text style={{ color: colors.text, fontWeight: "700", marginTop: 4 }}>
            {Math.round(progress)}% {t("complete")}
          </Text>
          <View style={{ height: 12 }} />
          <ProgressBar progress={progress} />

          <View style={{ marginTop: 16, gap: 12 }}>
            <Text style={{ color: colors.text }}>
              {t("analyzing_receipts_done")}
            </Text>
            <Text style={{ color: colors.text }}>
              {t("checking_inventory_done")}
            </Text>
            <Text style={{ color: colors.text }}>{t("step_3_assessing")}</Text>
            <Text style={{ color: colors.text }}>{t("step_4_generating")}</Text>
            <Text style={{ color: colors.text }}>{t("step_5_finalizing")}</Text>
          </View>

          <View style={{ height: 16 }} />
          <GhostButton
            leftIcon="close"
            label={t("cancel_process")}
            onPress={() => navigation.goBack()}
          />
        </Card>
      </View>
    </ScrollView>
  );
}
