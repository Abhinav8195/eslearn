import { StyleSheet, Text, useColorScheme, View, Image, Pressable } from "react-native";
import React from "react";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { router } from "expo-router";

const RankCard = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  return (
     <Pressable
      onPress={() => router.push("/pages/Leaderboard")}  

      style={({ pressed }) => [
        { transform: [{ scale: pressed ? 0.97 : 1 }] },
      ]}
    >
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 400 }}
    >
      <LinearGradient
        colors={[theme.primary, theme.secondary]}
        style={styles.rankCard}
      >
        {/* LEFT SIDE */}
        <View>
          <Text style={styles.rankSmall}>Global Leaderboard</Text>
          <Text style={styles.rankBig}>#42</Text>
          <Text style={styles.rankSmall}>Top 5% of students</Text>
        </View>

        {/* RIGHT SIDE */}
        <View style={styles.rightSection}>
          <View style={styles.avatarStack}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100?img=5" }}
              style={[styles.avatar, { marginLeft: 0 }]}
            />
            <Image
              source={{ uri: "https://i.pravatar.cc/100?img=12" }}
              style={[styles.avatar, { marginLeft: -14 }]}
            />
            <View style={styles.plusCircle}>
              <Text style={styles.plusText}>+4k</Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#fff"
            style={{ marginLeft: 10 }}
          />
        </View>
      </LinearGradient>
    </MotiView>
    </Pressable>
  );
};

export default RankCard;

const styles = StyleSheet.create({
  rankCard: {
    margin: 20,
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#2463EB",
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },

  rankSmall: {
    color: "#fff",
    opacity: 0.85,
    fontSize: 12,
  },

  rankBig: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    marginVertical: 4,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
  },

  plusCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: -14,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  plusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});