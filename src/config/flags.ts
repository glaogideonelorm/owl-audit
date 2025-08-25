// Feature flags for controlling native functionality
// Set to false when using Expo Go, true when using Dev Build

export const USE_NATIVE_STT = false; // Speech-to-text via @react-native-voice/voice
export const USE_DEV_CLIENT = false; // expo-dev-client features

// Helper function to check if native features are available
export const isNativeFeatureAvailable = (
  feature: "stt" | "dev-client"
): boolean => {
  switch (feature) {
    case "stt":
      return USE_NATIVE_STT;
    case "dev-client":
      return USE_DEV_CLIENT;
    default:
      return false;
  }
};
