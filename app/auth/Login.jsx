import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const [secure, setSecure] = useState(true);

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

  const theme = {
    background: isDark ? "#111621" : "#ffffff",
    textPrimary: isDark ? "#F8FAFC" : "#111827",
    textSecondary: isDark ? "#94A3B8" : "#6B7280",
    inputBg: isDark ? "#1E293B" : "#F3F4F6",
    border: isDark ? "#1E293B" : "#E5E7EB",
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
      >
        <MaterialIcons
          name="arrow-back-ios-new"
          size={22}
          color={theme.textPrimary}
        />
      </TouchableOpacity>

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          width: "100%",
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Log in to continue your competitive exam preparation with{" "}
            <Text style={{ color: "#2463EB", fontWeight: "600" }}>
              EsLearn
            </Text>
          </Text>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Email Address
          </Text>
          <TextInput
            placeholder="name@example.com"
            placeholderTextColor="#9CA3AF"
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <View style={styles.passwordHeader}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Password
            </Text>
            <TouchableOpacity>
              <Text style={{ color: "#2463EB", fontWeight: "600" }}>
                Forgot?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={secure}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBg,
                  borderColor: theme.border,
                  color: theme.textPrimary,
                  paddingRight: 40,
                },
              ]}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSecure(!secure)}
            >
              <MaterialIcons
                name={secure ? "visibility" : "visibility-off"}
                size={22}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity activeOpacity={0.85} style={{ marginTop: 20 }}>
          <LinearGradient
            colors={["#2463EB", "#7C3AED"]}
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>Log In</Text>
            <MaterialIcons
              name="login"
              size={20}
              color="#ffffff"
            />
          </LinearGradient>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: theme.border }]} />
          <Text style={{ color: theme.textSecondary }}>
            Or continue with
          </Text>
          <View style={[styles.line, { backgroundColor: theme.border }]} />
        </View>

        {/* Google Button */}
        <TouchableOpacity
          style={[
            styles.socialBtn,
            {
              backgroundColor: theme.inputBg,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={{ color: theme.textPrimary }}>
            Sign in with Google
          </Text>
        </TouchableOpacity>

        {/* Apple Button */}
        <TouchableOpacity
          style={[
            styles.appleBtn,
            { backgroundColor: isDark ? "#ffffff" : "#111827" },
          ]}
        >
          <Text
            style={{
              color: isDark ? "#111827" : "#ffffff",
              fontWeight: "600",
            }}
          >
            Sign in with Apple
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Text style={{ color: theme.textSecondary }}>
            Don't have an account?{" "}
            <Text style={{ color: "#2463EB", fontWeight: "700" }}>
              Sign Up
            </Text>
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backBtn: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 14,
  },
  loginBtn: {
    height: 54,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  loginText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
  },
  socialBtn: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 12,
  },
  appleBtn: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});