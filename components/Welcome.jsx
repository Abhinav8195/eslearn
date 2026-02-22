import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function Welcome({ onFinish }) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const router = useRouter();

  const progress = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const [progressValue, setProgressValue] = useState(0);
  const [loadingText, setLoadingText] = useState(0);

  const loadingMessages = [
    "Preparing your personalized dashboard...",
    "Loading mock tests...",
    "Analyzing exam patterns...",
    "Almost ready...",
  ];

  // Logo Animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Progress Animation
  useEffect(() => {
    let interval;

    Animated.timing(progress, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      onFinish && onFinish();
    });

    progress.addListener(({ value }) => {
      const percent = Math.floor(value * 100);
      setProgressValue(percent);

      // Change text every 25%
      if (percent >= 25 && percent < 50) setLoadingText(1);
      if (percent >= 50 && percent < 75) setLoadingText(2);
      if (percent >= 75) setLoadingText(3);
    });

    return () => {
      progress.removeAllListeners();
      clearInterval(interval);
    };
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111621" : "#ffffff" },
      ]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Center Content */}
      <View style={styles.centerContent}>
        <Animated.View
          style={{
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          }}
        >
          <View style={styles.logoWrapper}>
            <LinearGradient
              colors={["#2463EB", "#7C3AED"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoBox}
            >
              <Text style={styles.logoText}>E</Text>
            </LinearGradient>

            <View
              style={[
                styles.smallCircle,
                { backgroundColor: isDark ? "#111621" : "#ffffff" },
              ]}
            >
              <LinearGradient
                colors={["#2463EB", "#7C3AED"]}
                style={styles.innerCircle}
              />
            </View>
          </View>
        </Animated.View>

        <Text
          style={[
            styles.appName,
            { color: isDark ? "#F8FAFC" : "#111827" },
          ]}
        >
          EsLearn
        </Text>

        <Text
          style={[
            styles.tagline,
            { color: isDark ? "#94A3B8" : "#6B7280" },
          ]}
        >
          MASTER YOUR EXAMS
        </Text>
      </View>

      {/* Bottom Loading Section */}
      <View style={styles.bottomSection}>
        <View
          style={[
            styles.progressBackground,
            { backgroundColor: isDark ? "#1E293B" : "#E5E7EB" },
          ]}
        >
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>

        <Animated.Text
          style={[
            styles.loadingText,
            { color: isDark ? "#64748B" : "#9CA3AF", opacity: textOpacity },
          ]}
        >
          {loadingMessages[loadingText]}
        </Animated.Text>

        <Text style={{ marginTop: 4, fontSize: 12, color: "#2463EB" }}>
          {progressValue}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    alignItems: "center",
  },
  logoWrapper: {
    width: 100,
    height: 100,
    marginBottom: 24,
    position: "relative",
  },
  logoBox: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  logoText: {
    color: "#ffffff",
    fontSize: 60,
    fontWeight: "bold",
  },
  smallCircle: {
    position: "absolute",
    right: -8,
    bottom: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -1,
  },
  tagline: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2,
  },
  bottomSection: {
    position: "absolute",
    bottom: 100,
    alignItems: "center",
    width: "80%",
  },
  progressBackground: {
    width: "100%",
    height: 6,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2463EB",
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 12,
    fontWeight: "500",
  },
});