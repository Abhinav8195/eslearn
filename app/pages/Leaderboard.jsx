import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { router } from "expo-router";

const TABS = ["Weekly", "This Month", "All Time"];

const USERS = [
  { id: 1, name: "Sarah Jenkins", tests: 158, accuracy: "98.2%", points: 18290 },
  { id: 2, name: "Marcus Chen", tests: 142, accuracy: "96.5%", points: 17440 },
  { id: 3, name: "Elena Rodriguez", tests: 135, accuracy: "95.1%", points: 16910 },
  { id: 4, name: "David Kim", tests: 120, accuracy: "94.8%", points: 15800 },
  { id: 5, name: "Priya Sharma", tests: 115, accuracy: "94.2%", points: 14320 },
  { id: 6, name: "Jordan Smith", tests: 108, accuracy: "93.9%", points: 13950 },
];

const Leaderboard = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const [activeTab, setActiveTab] = useState("This Month");

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "🚀 I'm ranked #42 on EsLearn Global Leaderboard!\n\n🔥 12,450 Points\nTop 5% of students!\n\nJoin me on EsLearn!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item, index }) => {
    const rank = index + 1;
    const isTop3 = rank <= 3;

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 100 }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.userCard,
            {
              backgroundColor: isDark ? "#1e293b" : "#fff",
              borderColor: isDark ? "#334155" : "#f1f5f9",
            },
          ]}
        >
          <View style={styles.rankBox}>
            {isTop3 ? (
              <MaterialIcons
                name="workspace-premium"
                size={22}
                color={
                  rank === 1
                    ? "#fbbf24"
                    : rank === 2
                    ? "#9ca3af"
                    : "#b45309"
                }
              />
            ) : (
              <Text style={styles.rankText}>{rank}</Text>
            )}
          </View>

          <View style={styles.avatar} />

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.userName,
                { color: isDark ? "#fff" : "#000" },
              ]}
            >
              {item.name}
            </Text>
            <Text style={styles.meta}>
              {item.tests} Tests • {item.accuracy} Accuracy
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.points}>{item.points}</Text>
            <Text style={styles.pts}>pts</Text>
          </View>
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
          Global Leaderboard
        </Text>

        <TouchableOpacity onPress={handleShare}>
          <MaterialIcons
            name="share"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>

      {/* TABS */}
      <View
        style={[
          styles.tabContainer,
          { backgroundColor: isDark ? "#1e293b" : "#e2e8f0" },
        ]}
      >
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tab}
          >
            {activeTab === tab && (
              <MotiView
                layoutId="tabIndicator"
                style={styles.activeTab}
                transition={{ type: "spring" }}
              />
            )}
            <Text
              style={[
                styles.tabText,
                activeTab === tab && { color: "#fff" },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* RANK CARD */}
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring" }}
      >
        <LinearGradient
          colors={["#2463eb", "#8b5cf6"]}
          style={styles.rankCard}
        >
          <Text style={styles.rankLabel}>Your Current Rank</Text>
          <Text style={styles.rankNumber}>#42</Text>
          <Text style={styles.rankSub}>
            Top 5% of all students
          </Text>
          <Text style={styles.rankPoints}>12,450 pts</Text>
        </LinearGradient>
      </MotiView>

      {/* LIST */}
      <FlatList
        data={USERS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  tabContainer: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 4,
    marginVertical: 12,
  },

  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  activeTab: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2463eb",
    borderRadius: 8,
  },

  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },

  rankCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  rankLabel: {
    color: "#ffffffcc",
    fontSize: 12,
    fontWeight: "600",
  },

  rankNumber: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    marginVertical: 6,
  },

  rankSub: {
    color: "#ffffffcc",
    fontSize: 11,
    marginBottom: 6,
  },

  rankPoints: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },

  rankBox: {
    width: 30,
    alignItems: "center",
  },

  rankText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#94a3b8",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#cbd5e1",
    marginHorizontal: 10,
  },

  userName: {
    fontWeight: "700",
    fontSize: 14,
  },

  meta: {
    fontSize: 11,
    color: "#94a3b8",
  },

  points: {
    fontWeight: "700",
    fontSize: 14,
    color: "#2463eb",
  },

  pts: {
    fontSize: 10,
    color: "#94a3b8",
  },
});