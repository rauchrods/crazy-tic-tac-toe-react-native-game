import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import React from "react";

interface ButtonProps {
  onPress: () => void;
  children: string;
  customStyles?: StyleProp<ViewStyle>;
}

const Button = ({ onPress, children, customStyles, ...props }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        customStyles,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(156, 39, 176, 0.9)",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
