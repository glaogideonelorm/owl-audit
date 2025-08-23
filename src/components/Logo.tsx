import React from "react";
import { View, Image } from "react-native";

interface LogoProps {
  size?: number;
  variant?: "default" | "icon" | "header";
  background?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 100,
  variant = "default",
  background = false,
}) => {
  const getSize = () => {
    switch (variant) {
      case "icon":
        return 40;
      case "header":
        return 50;
      default:
        return size;
    }
  };

  const logoSize = getSize();

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../../PHOTO-2025-08-21-21-18-55-removebg-preview.png")}
        style={{
          width: logoSize,
          height: logoSize,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};
