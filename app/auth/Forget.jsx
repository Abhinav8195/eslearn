import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Colors } from "../../constants/Colors";

const Forget = () => {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (mail) => {
    const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(mail);
  };

  const handleReset = () => {
    if (!email) {
      setError(true);
      Toast.show({
        type: "error",
        text1: "Email required",
        text2: "Please enter your registered email",
      });
      return;
    }

    if (!validateEmail(email)) {
      setError(true);
      Toast.show({
        type: "error",
        text1: "Invalid email",
        text2: "Enter a valid email address",
      });
      return;
    }

    setError(false);

    Toast.show({
      type: "success",
      text1: "Reset link sent",
      text2: "Check your inbox for further instructions",
    });

    setEmail("");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
      >
        {/* Hero Icon */}
        <View style={styles.heroIconWrapper}>
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.heroIcon}
          >
            <Ionicons name="lock-closed" size={32} color="#fff" />
          </LinearGradient>
        </View>

        {/* Heading */}
        <Text style={[styles.title, { color: theme.text }]}>
          Forgot Password?
        </Text>

        <Text style={[styles.subtitle, { color: theme.text }]}>
          Don’t worry! Enter your email and we’ll send you a reset link.
        </Text>

        {/* Input */}
        <View
          style={[
            styles.inputWrapper,
            {
              borderColor: error
                ? "#EF4444"
                : focused
                ? theme.primary
                : "#E5E7EB",
              backgroundColor: theme.card,
            },
          ]}
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color={focused ? theme.primary : "#9CA3AF"}
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="name@example.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(false);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={{ marginTop: 24 }}
          onPress={handleReset}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Bottom */}
        <View style={styles.bottomSection}>
          <Text style={{ color: theme.text }}>
            Remember your password?
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/Login")}>
            <Text
              style={{
                color: theme.primary,
                fontWeight: "600",
                marginTop: 4,
              }}
            >
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Toast />
    </KeyboardAvoidingView>
  );
};

export default Forget;

const styles = StyleSheet.create({
  container: { flex: 1 },

  heroIconWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },

  heroIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 52,
  },

  input: {
    flex: 1,
  },

  button: {
    height: 54,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  bottomSection: {
    marginTop: 30,
    alignItems: "center",
  },
});