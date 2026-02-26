import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { router } from "expo-router";

const QUESTIONS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  status:
    i < 10 ? "attempted" : i < 15 ? "unattempted" : "locked",
}));

const Resume = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const renderQuestion = ({ item, index }) => {
    const statusColor =
      item.status === "attempted"
        ? "#22c55e"
        : item.status === "unattempted"
        ? "#f59e0b"
        : "#94a3b8";

    return (
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 40 }}
        style={{ flex: 1, margin: 6 }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.questionCard,
            {
              backgroundColor: isDark ? "#1e293b" : "#fff",
              borderColor: statusColor,
            },
          ]}
        >
          <Text style={[styles.qNumber, { color: statusColor }]}>
            Q{item.id}
          </Text>

          {item.status === "locked" && (
            <MaterialIcons
              name="lock"
              size={16}
              color="#94a3b8"
              style={{ position: "absolute", right: 10, top: 10 }}
            />
          )}
        </TouchableOpacity>
      </MotiView>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f6f6f8" },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons
            name="chevron-left"
            size={26}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? "#fff" : "#000" },
          ]}
        >
          Resume Test
        </Text>

        <View style={{ width: 26 }} />
      </View>

      {/* TOP GRADIENT CARD */}
      <LinearGradient
        colors={["#2463eb", "#8b5cf6"]}
        style={styles.topCard}
      >
        <Text style={styles.examTitle}>
          UPSC Prelims Mock 2026
        </Text>

        <Text style={styles.subTitle}>
          General Studies • 100 Questions
        </Text>

        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            50% Completed
          </Text>
          <Text style={styles.progressText}>
            1h 15m Left
          </Text>
        </View>

        <View style={styles.progressBarBg}>
          <View
            style={[styles.progressBarFill, { width: "50%" }]}
          />
        </View>

        <TouchableOpacity style={styles.resumeBtn}>
          <Text style={styles.resumeText}>
            Continue Attempt
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* QUESTIONS GRID */}
      <View style={{ paddingHorizontal: 12, marginTop: 10 }}>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? "#fff" : "#000" },
          ]}
        >
          Questions Overview
        </Text>

        <FlatList
          data={QUESTIONS}
          renderItem={renderQuestion}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* FLOATING BUTTONS */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity
          style={[
            styles.floatingIcon,
            {
              backgroundColor: isDark
                ? "#1e293b"
                : "#fff",
            },
          ]}
        >
          <MaterialIcons
            name="download"
            size={22}
            color="#2463eb"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingMain}>
          <MaterialIcons
            name="edit-note"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Resume;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  topCard: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  examTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },

  subTitle: {
    fontSize: 12,
    color: "#ffffffcc",
    marginTop: 4,
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  progressText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },

  progressBarBg: {
    height: 6,
    backgroundColor: "#ffffff40",
    borderRadius: 20,
    marginTop: 6,
    overflow: "hidden",
  },

  progressBarFill: {
    height: 6,
    backgroundColor: "#fff",
  },

  resumeBtn: {
    marginTop: 18,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
  },

  resumeText: {
    color: "#2463eb",
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    marginLeft: 4,
  },

  questionCard: {
    height: 60,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },

  qNumber: {
    fontSize: 14,
    fontWeight: "700",
  },

  floatingButtons: {
    position: "absolute",
    right: 20,
    bottom: 30,
    alignItems: "center",
    gap: 14,
  },

  floatingIcon: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },

  floatingMain: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: "#2463eb",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});