import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  Animated,
  Dimensions,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../../assets/images/img1.png"),
    title: "Achieve Your Dreams",
    text:
      "Comprehensive study material for UPSC, SSC, and Banking. Your journey starts here.",
  },
  {
    id: "2",
    image: require("../../assets/images/img2.jpg"),
    title: "Choose Your Exam",
    text: "SSC, UPSC, Bank, Railway & more",
  },
  {
    id: "3",
    image: require("../../assets/images/img3.jpg"),
    title: "Practice with Mock Tests",
    text: "Real exam pattern tests",
  },
  {
    id: "4",
    image: require("../../assets/images/img4.jpg"),
    title: "Track Your Progress",
    text: "Detailed performance analytics",
  },
];

const OnBoarding = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const router = useRouter();

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onNext = () => {
    if (currentIndex < slides.length - 1) {
      flatRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/auth/Login");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111621" : "#f6f6f8" },
      ]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={{ width: 40 }} />
        <TouchableOpacity onPress={() => router.replace("/auth/Login")}>
          <Text
            style={[
              styles.skipText,
              { color: isDark ? "#94A3B8" : "#6B7280" },
            ]}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <Animated.FlatList
        ref={flatRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.heroCircle}>
              <Image source={item.image} style={styles.heroImage} />
            </View>

            <Text
              style={[
                styles.title,
                { color: isDark ? "#F8FAFC" : "#111827" },
              ]}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.description,
                { color: isDark ? "#94A3B8" : "#6B7280" },
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Progress Bar Animation */}
        <View
          style={[
            styles.progressBackground,
            { backgroundColor: isDark ? "#1E293B" : "#E5E7EB" },
          ]}
        >
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: scrollX.interpolate({
                  inputRange: [
                    0,
                    width * (slides.length - 1),
                  ],
                  outputRange: ["0%", "100%"],
                  extrapolate: "clamp",
                }),
              },
            ]}
          />
        </View>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  width: currentIndex === i ? 20 : 8,
                  backgroundColor:
                    currentIndex === i
                      ? "#2463EB"
                      : isDark
                      ? "#334155"
                      : "#E5E7EB",
                },
              ]}
            />
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity activeOpacity={0.8} onPress={onNext}>
          <LinearGradient
            colors={["#2463EB", "#7C3AED"]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {currentIndex === slides.length - 1
                ? "Get Started"
                : "Next"}
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color="#ffffff"
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: { flex: 1 },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 50,
  },

  skipText: { fontSize: 14, fontWeight: "600" },

  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  heroCircle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(36,99,235,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    overflow: "hidden",
  },

  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },

  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },

  progressBackground: {
    width: "100%",
    height: 6,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#2463EB",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 25,
  },

  dot: {
    height: 8,
    borderRadius: 4,
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});