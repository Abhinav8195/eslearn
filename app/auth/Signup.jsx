import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  useColorScheme,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";

const Signup = () => {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [checked, setChecked] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (!name.trim()) newErrors.name = true;

    if (!email.trim()) {
      newErrors.email = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
    }

    if (!password || password.length < 8) {
      newErrors.password = true;
    }

    if (!confirmPassword || confirmPassword !== password) {
      newErrors.confirmPassword = true;
    }

    if (!checked) {
      newErrors.terms = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Toast.show({
        type: "error",
        text1: "Please fix highlighted fields",
      });
      return false;
    }

    return true;
  };

  const handleSignup = () => {
    if (!validate()) return;

    Toast.show({
      type: "success",
      text1: "Account created successfully 🎉",
    });

    router.replace("/goal/Setup");
  };

  const theme = {
    background: isDark ? "#111121" : "#ffffff",
    textPrimary: isDark ? "#F8FAFC" : "#111827",
    textSecondary: isDark ? "#94A3B8" : "#6B7280",
    inputBg: isDark ? "#1E1E2D" : "#ffffff",
    border: isDark ? "#1E293B" : "#E5E7EB",
    primary: "#2424eb",
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
          flex: 1,
        }}
      >
        <View style={styles.topBar}>
          <Text style={[styles.topTitle, { color: theme.textPrimary }]}>
            Create Your Account
          </Text>
        </View>

        <View style={styles.hero}>
          <View
            style={[
              styles.heroIcon,
              { backgroundColor: "rgba(36,36,235,0.1)" },
            ]}
          >
            <MaterialIcons
              name="school"
              size={50}
              color={theme.primary}
            />
          </View>

          <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
            Join EsLearn Today
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>
            Join thousands of students on their journey to competitive exam success.
          </Text>
        </View>

        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Full Name
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.inputBg,
                  borderColor: getBorder("name"),
                },
              ]}
            >
              <MaterialIcons name="person" size={20} color="#9CA3AF" />
              <TextInput
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setErrors((prev) => ({ ...prev, name: false }));
                }}
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                style={[styles.input, { color: theme.textPrimary }]}
              />
            </View>
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
              <MaterialIcons name="mail" size={20} color="#9CA3AF" />
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors((prev) => ({ ...prev, email: false }));
                }}
                placeholder="example@email.com"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="email-address"
                style={[styles.input, { color: theme.textPrimary }]}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Password
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.inputBg,
                  borderColor: getBorder("password"),
                },
              ]}
            >
              <MaterialIcons name="lock" size={20} color="#9CA3AF" />
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: false }));
                }}
                secureTextEntry={secure}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                style={[styles.input, { color: theme.textPrimary }]}
              />
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <MaterialIcons
                  name={secure ? "visibility" : "visibility-off"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Confirm Password
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.inputBg,
                  borderColor: getBorder("confirmPassword"),
                },
              ]}
            >
              <MaterialIcons name="shield" size={20} color="#9CA3AF" />
              <TextInput
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: false,
                  }));
                }}
                secureTextEntry={secureConfirm}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                style={[styles.input, { color: theme.textPrimary }]}
              />
              <TouchableOpacity
                onPress={() => setSecureConfirm(!secureConfirm)}
              >
                <MaterialIcons
                  name={
                    secureConfirm ? "visibility" : "visibility-off"
                  }
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <Pressable
            style={styles.checkboxRow}
            onPress={() => {
              setChecked(!checked);
              setErrors((prev) => ({ ...prev, terms: false }));
            }}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: getBorder("terms"),
                  backgroundColor: checked ? theme.primary : "transparent",
                },
              ]}
            >
              {checked && (
                <MaterialIcons name="check" size={14} color="#fff" />
              )}
            </View>
            <Text style={[styles.termsText, { color: theme.textSecondary }]}>
              By signing up, you agree to our{" "}
              <Text style={{ color: theme.primary, fontWeight: "700" }}>
                Terms
              </Text>{" "}
              and{" "}
              <Text style={{ color: theme.primary, fontWeight: "700" }}>
                Privacy Policy
              </Text>
            </Text>
          </Pressable>

          {/* Button */}
         <TouchableOpacity
  activeOpacity={0.9}
  onPress={handleSignup}
  style={{ marginTop: 10 }}
>
  <LinearGradient
    colors={["#2463EB", "#7C3AED"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.signupBtn}
  >
    <Text style={styles.signupText}>Sign Up</Text>
  </LinearGradient>
</TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={{ color: theme.textSecondary }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/Login")}>
            <Text style={{ color: theme.primary, fontWeight: "700" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomIndicator} />
      </Animated.View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  topBar: { alignItems: "center", marginBottom: 20 ,marginTop: 20},
  topTitle: { fontSize: 18, fontWeight: "700" },
  hero: { alignItems: "center", marginBottom: 30 },
  heroIcon: { padding: 18, borderRadius: 16, marginBottom: 15 },
  heroTitle: { fontSize: 26, fontWeight: "800" },
  heroSubtitle: { fontSize: 14, textAlign: "center", marginTop: 6 },
  form: { gap: 18 },
  inputGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: "600" },
  inputWrapper: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 8,
  },
  input: { flex: 1 },
  checkboxRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
},
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    
  },
  termsText: { fontSize: 12, flex: 1 },
  signupBtn: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signupText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  footer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  bottomIndicator: {
    alignSelf: "center",
    width: 120,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    marginTop: 20,
  },
});