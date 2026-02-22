import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";
import { MotiView } from "moti";

const Home = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={styles.header}
        >
          <View>
            <Text style={[styles.greeting, { color: theme.text }]}>
              Good Morning,
            </Text>
            <Text style={[styles.name, { color: theme.text }]}>
              Hi, Abhinav 👋
            </Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.notification}>
              <Ionicons name="notifications-outline" size={20} color={theme.text} />
              <View style={styles.redDot} />
            </View>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
          </View>
        </MotiView>

        {/* STATS */}
        <View style={styles.statsGrid}>
          {["12.5h", "08"].map((item, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 200 + index * 150 }}
              style={[styles.card, { backgroundColor: theme.card }]}
            >
              <Ionicons
                name={index === 0 ? "time-outline" : "document-text-outline"}
                size={22}
                color={index === 0 ? theme.primary : "#f59e0b"}
              />
              <Text style={[styles.statNumber, { color: theme.text }]}>
                {item}
              </Text>
              <Text style={styles.statLabel}>
                {index === 0 ? "Study Hours" : "Tests Taken"}
              </Text>
            </MotiView>
          ))}
        </View>

        {/* RANK CARD */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 500 }}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.rankCard}
          >
            <Text style={styles.rankSmall}>Global Leaderboard</Text>
            <Text style={styles.rankBig}>#42</Text>
            <Text style={styles.rankSmall}>Top 5% of students</Text>
          </LinearGradient>
        </MotiView>

        {/* CONTINUE */}
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 650 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Continue Learning
          </Text>

          <View style={[styles.continueCard, { backgroundColor: theme.card }]}>
            <View style={styles.continueTop}>
              <View>
                <Text style={[styles.chapter, { color: theme.primary }]}>
                  Chapter 4
                </Text>
                <Text style={[styles.courseTitle, { color: theme.text }]}>
                  Competitive Physics for JEE
                </Text>
              </View>

              <View style={styles.iconBox}>
                <Ionicons name="book-outline" size={22} color={theme.primary} />
              </View>
            </View>

            {/* Animated Progress */}
            <View style={styles.progressBar}>
              <MotiView
                from={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ delay: 900, type: "timing", duration: 800 }}
                style={[
                  styles.progressFill,
                  { backgroundColor: theme.primary },
                ]}
              />
            </View>

            {/* Button Animation */}
            <TouchableOpacity activeOpacity={0.9}>
              <MotiView
                whileTap={{ scale: 0.95 }}
                style={{ borderRadius: 14 }}
              >
                <LinearGradient
                  colors={[theme.primary, theme.secondary]}
                  style={styles.resumeBtn}
                >
                  <Ionicons name="play" size={18} color="#fff" />
                  <Text style={styles.resumeText}>Resume Now</Text>
                </LinearGradient>
              </MotiView>
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* RECOMMENDED */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 900 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recommended
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2].map((item, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 1000 + index * 200 }}
                style={[styles.recommendCard, { backgroundColor: theme.card }]}
              >
                <Image
                  source={{ uri: `https://picsum.photos/20${index}/150` }}
                  style={styles.recommendImage}
                />
                <Text
                  style={[styles.recommendTitle, { color: theme.text }]}
                >
                  {index === 0
                    ? "Advanced Calculus II"
                    : "Organic Compounds"}
                </Text>
              </MotiView>
            ))}
          </ScrollView>
        </MotiView>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 14,
    opacity: 0.7,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  notification: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    position: "absolute",
    top: 8,
    right: 8,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
  },

  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },

  statLabel: {
    fontSize: 12,
    opacity: 0.6,
  },

  rankCard: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  rankSmall: {
    color: "#fff",
    opacity: 0.8,
  },

  rankBig: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginVertical: 6,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  continueCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 20,
  },

  continueTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  chapter: {
    fontSize: 12,
    fontWeight: "600",
  },

  courseTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },

  progressBar: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
    marginVertical: 12,
    overflow: "hidden",
  },

  progressFill: {
    height: 6,
    borderRadius: 6,
  },

  resumeBtn: {
    height: 44,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  resumeText: {
    color: "#fff",
    fontWeight: "600",
  },

  recommendCard: {
    width: 180,
    marginLeft: 20,
    borderRadius: 16,
    padding: 10,
  },

  recommendImage: {
    width: "100%",
    height: 110,
    borderRadius: 12,
  },

  recommendTitle: {
    marginTop: 8,
    fontWeight: "600",
  },
});