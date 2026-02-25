import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

const PaymentSuccess = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>

        {/* Soft Glow */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 800 }}
          style={styles.glowWrapper}
        >
          <LinearGradient
            colors={[theme.primary + "30", theme.secondary + "20"]}
            style={styles.glow}
          />
        </MotiView>

        {/* Smooth Icon Reveal */}
        <MotiView
          from={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 600 }}
          style={styles.iconWrapper}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.iconCircle}
          >
            <Ionicons name="checkmark" size={42} color="#fff" />
          </LinearGradient>
        </MotiView>

        {/* Text Reveal */}
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300, duration: 600 }}
        >
          <Text style={[styles.title, { color: theme.text }]}>
            Payment Successful
          </Text>

          <Text style={[styles.subtitle, { color: theme.text + "80" }]}>
            Your subscription has been activated successfully.
          </Text>
        </MotiView>

        {/* Info Card */}
        <MotiView
          from={{ opacity: 0, translateY: 25 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 500, duration: 600 }}
          style={[styles.card, { backgroundColor: theme.card }]}
        >
          <Text style={{ color: theme.text, fontWeight: "600" }}>
            Premium Membership Activated
          </Text>

          <Text
            style={{
              color: theme.primary,
              fontSize: 18,
              fontWeight: "800",
              marginTop: 6,
            }}
          >
            Welcome to Pro 🚀
          </Text>

          <Text
            style={{
              color: theme.text + "70",
              fontSize: 12,
              marginTop: 8,
              textAlign: "center",
            }}
          >
            Enjoy unlimited access to all premium content.
          </Text>
        </MotiView>

      </View>

      {/* Continue Button */}
      <View style={styles.bottom}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.replace("/profile")}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Continue
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  content: {
    alignItems: "center",
    marginTop: 120,
    paddingHorizontal: 30,
  },

  glowWrapper: {
    position: "absolute",
    top: -80,
  },

  glow: {
    width: 280,
    height: 280,
    borderRadius: 200,
  },

  iconWrapper: {
    marginBottom: 28,
  },

  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },

  card: {
    marginTop: 40,
    padding: 22,
    borderRadius: 22,
    width: "100%",
    alignItems: "center",
  },

  bottom: {
    padding: 20,
  },

  button: {
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});