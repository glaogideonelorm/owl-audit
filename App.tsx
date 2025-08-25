import "react-native-gesture-handler";
import "react-native-reanimated";
import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider, useTheme } from "@theme/index";
import DashboardScreen from "@screens/DashboardScreen";
import StartAuditScreen from "@screens/StartAuditScreen";
import ProgressScreen from "@screens/ProgressScreen";
import ReportScreen from "@screens/ReportScreen";
import AuditsScreen from "@screens/AuditsScreen";
import DraftsScreen from "@screens/DraftsScreen";
import ProfileScreen from "@screens/ProfileScreen";
import WelcomeScreen from "@screens/WelcomeScreen";
import LoginScreen from "@screens/LoginScreen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

function Navigator() {
  const { darkMode } = useTheme();
  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        {/* Authentication Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Main App Screens */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="StartAudit" component={StartAuditScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Audits" component={AuditsScreen} />
        <Stack.Screen name="Drafts" component={DraftsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigator />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
