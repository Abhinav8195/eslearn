import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";
import { Colors } from "../../constants/Colors";

const { width } = Dimensions.get("window");

const PaymentSuccess = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  // Delayed confetti for premium feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {showConfetti && (
        <ConfettiCannon
          count={70}
          origin={{ x: width / 2, y: -10 }}
          fadeOut
          explosionSpeed={280}
          fallSpeed={2600}
        />
      )}

      <View style={styles.content}>

        {/* Breathing Glow */}
        <MotiView
          from={{ opacity: 0.3, scale: 0.9 }}
          animate={{ opacity: 0.6, scale: 1.05 }}
          transition={{
            loop: true,
            type: "timing",
            duration: 3000,
          }}
          style={styles.glowWrapper}
        >
          <LinearGradient
            colors={[theme.primary + "30", theme.secondary + "20"]}
            style={styles.glow}
          />
        </MotiView>

        {/* Icon Cinematic Entry */}
        <MotiView
          from={{ opacity: 0, scale: 0.8, rotate: "-10deg" }}
          animate={{ opacity: 1, scale: 1, rotate: "0deg" }}
          transition={{ type: "timing", duration: 700 }}
          style={styles.iconWrapper}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.iconCircle}
          >
            <Ionicons name="checkmark" size={46} color="#fff" />
          </LinearGradient>
        </MotiView>

        {/* Text Stagger */}
        <MotiView
          from={{ opacity: 0, translateY: 25 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300, duration: 600 }}
          style={{ marginTop: 40 }}
        >
          <Text style={[styles.title, { color: theme.text }]}>
            Payment Successful 🎉
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 500, duration: 800 }}
        >
          <Text style={[styles.subtitle, { color: theme.text + "80" }]}>
            Welcome to Premium Membership
          </Text>
        </MotiView>

        {/* Floating Card */}
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 700, duration: 700 }}
          style={[
            styles.card,
            { backgroundColor: theme.card },
          ]}
        >
          <Text style={{ color: theme.text, fontWeight: "600" }}>
            Your access has been unlocked
          </Text>

          <Text
            style={{
              color: theme.primary,
              fontSize: 18,
              fontWeight: "800",
              marginTop: 8,
            }}
          >
            Enjoy All Premium Features 🚀
          </Text>

          <Text
            style={{
              color: theme.text + "70",
              fontSize: 12,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            Explore unlimited courses, tests and analytics.
          </Text>
        </MotiView>

      </View>

      {/* Button Fade In */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 900, duration: 800 }}
        style={styles.bottom}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.replace("/profile")}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Continue to Dashboard
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>
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
    top: -90,
  },

  glow: {
    width: 280,
    height: 280,
    borderRadius: 200,
  },

  iconWrapper: {
    marginBottom: 30,
  },

  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 70,
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
    padding: 26,
    borderRadius: 24,
    width: "100%",
    alignItems: "center",
    elevation: 6,
  },

  bottom: {
    padding: 20,
  },

  button: {
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});