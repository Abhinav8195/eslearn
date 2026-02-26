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
import Stats from "../../components/homeelements/Stats";
import RankCard from "../../components/homeelements/RankCard";
import Recommended from "../../components/homeelements/Recommended";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Home = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
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
        <Stats />

        {/* RANK CARD */}
        <RankCard />

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
            <TouchableOpacity activeOpacity={0.9} onPress={()=>router.push('/pages/Resume')}>
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
       <Recommended/>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingHorizontal: 20,
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
    backgroundColor: "#e9effd",
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

  
});