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
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const Login = () => {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
    }

    if (!password || password.length < 6) {
      newErrors.password = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Toast.show({
        type: "error",
        text1: "Invalid Credentials",
        text2: "Please check your email and password",
      });
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    if (!validate()) return;

    Toast.show({
      type: "success",
      text1: "Login Successful 🎉",
    });
  };

  const theme = {
    background: isDark ? "#111621" : "#ffffff",
    textPrimary: isDark ? "#F8FAFC" : "#111827",
    textSecondary: isDark ? "#94A3B8" : "#6B7280",
    inputBg: isDark ? "#1E293B" : "#F3F4F6",
    border: isDark ? "#1E293B" : "#E5E7EB",
    error: "#EF4444",
  };

  const getBorder = (field) =>
    errors[field] ? theme.error : theme.border;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          width: "100%",
        }}
      >
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>
            Login
          </Text>
        </View>

        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Welcome Back 👋
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
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: theme.inputBg,
                borderColor: getBorder("email"),
              },
            ]}
          >
            <MaterialIcons
              name="email"
              size={20}
              color={theme.textSecondary}
              style={{ marginRight: 10 }}
            />
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors((prev) => ({ ...prev, email: false }));
              }}
              placeholder="name@example.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, { color: theme.textPrimary }]}
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <View style={styles.passwordHeader}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Password
            </Text>
            <TouchableOpacity onPress={() => router.push("/auth/Forgot")}>
              <Text style={{ color: "#2463EB", fontWeight: "600" }}>
                Forgot?
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: theme.inputBg,
                borderColor: getBorder("password"),
              },
            ]}
          >
            <MaterialIcons
              name="lock"
              size={20}
              color={theme.textSecondary}
              style={{ marginRight: 10 }}
            />
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors((prev) => ({ ...prev, password: false }));
              }}
              secureTextEntry={secure}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              style={[styles.input, { color: theme.textPrimary }]}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <MaterialIcons
                name={secure ? "visibility" : "visibility-off"}
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={{ marginTop: 25 }}
          onPress={handleLogin}
        >
          <LinearGradient
            colors={["#2463EB", "#7C3AED"]}
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>Log In</Text>
            <MaterialIcons name="login" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

         <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: theme.border }]} />
          <Text style={{ color: theme.textSecondary, fontSize: 13 }}>
            Or continue with
          </Text>
          <View style={[styles.line, { backgroundColor: theme.border }]} />
        </View>

        <TouchableOpacity
          style={[
            styles.socialBtn,
            {
              backgroundColor: theme.inputBg,
              borderColor: theme.border,
            },
          ]}
        >
          <FontAwesome name="google" size={18} color="#DB4437" />
          <Text
            style={{
              color: theme.textPrimary,
              marginLeft: 10,
              fontWeight: "600",
            }}
          >
            Sign in with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.appleBtn,
            { backgroundColor: isDark ? "#ffffff" : "#111827" },
          ]}
        >
          <FontAwesome
            name="apple"
            size={20}
            color={isDark ? "#111827" : "#ffffff"}
          />
          <Text
            style={{
              color: isDark ? "#111827" : "#ffffff",
              marginLeft: 10,
              fontWeight: "600",
            }}
          >
            Sign in with Apple
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 35,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: theme.textSecondary }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/Signup")}>
            <Text style={{ color: "#2463EB", fontWeight: "700" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
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
  pageHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "600",
  },
  inputWrapper: {
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  loginBtn: {
    height: 54,
    borderRadius: 16,
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
    marginVertical: 25,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
  },
  socialBtn: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 12,
    flexDirection: "row",
  },
  appleBtn: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});