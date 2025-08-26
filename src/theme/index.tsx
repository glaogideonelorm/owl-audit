import React, { createContext, useContext, useEffect, useState } from "react";
import { ColorValue } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { currencyService } from "../services/currencyService";
import { i18nService } from "../services/i18nService";

const THEME_STORAGE_KEY = "audit_demo:theme";
const CURRENCY_STORAGE_KEY = "audit_demo:currency";
const LANGUAGE_STORAGE_KEY = "audit_demo:language";

type Theme = "light" | "dark";
type Currency = "USD" | "EUR" | "GHS" | "NGN";
type Language = "en" | "fr";

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  formatCurrency: (amount: number) => string;
  t: (key: string) => string;
  colors: {
    bg: string;
    cardBg: string;
    text: string;
    subtext: string;
    primary: string;
    accent: string;
    border: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors = {
  bg: "#FFFFFF",
  cardBg: "#F8FAFC",
  text: "#1F2937",
  subtext: "#6B7280",
  primary: "#059669",
  accent: "#059669",
  border: "#E5E7EB",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
};

const darkColors = {
  bg: "#111827",
  cardBg: "#1F2937",
  text: "#F9FAFB",
  subtext: "#9CA3AF",
  primary: "#10B981",
  accent: "#10B981",
  border: "#374151",
  success: "#34D399",
  warning: "#FBBF24",
  danger: "#F87171",
  info: "#60A5FA",
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    loadTheme();
    loadCurrency();
    loadLanguage();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setDarkMode(savedTheme === "dark");
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const loadCurrency = async () => {
    try {
      const savedCurrency = await AsyncStorage.getItem(CURRENCY_STORAGE_KEY);
      if (
        savedCurrency &&
        ["USD", "EUR", "GHS", "NGN"].includes(savedCurrency)
      ) {
        setCurrencyState(savedCurrency as Currency);
      }
    } catch (error) {
      console.error("Error loading currency:", error);
    }
  };

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && ["en", "fr"].includes(savedLanguage)) {
        setLanguageState(savedLanguage as Language);
        i18nService.setLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.error("Error loading language:", error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    try {
      await AsyncStorage.setItem(
        THEME_STORAGE_KEY,
        newTheme ? "dark" : "light"
      );
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const setCurrency = async (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      await AsyncStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
    } catch (error) {
      console.error("Error saving currency:", error);
    }
  };

  const setLanguage = async (newLanguage: Language) => {
    setLanguageState(newLanguage);
    i18nService.setLanguage(newLanguage);
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  const formatCurrency = (amount: number): string => {
    return currencyService.formatAmount(amount, currency);
  };

  const t = (key: string): string => {
    return i18nService.t(key);
  };

  const colors = darkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
        currency,
        setCurrency,
        language,
        setLanguage,
        formatCurrency,
        t,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
