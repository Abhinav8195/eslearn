import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { MotiView } from "moti";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Stats = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const data = [
    {
      value: "12.5h",
      label: "Study Hours",
      icon: "time-outline",
      iconColor: theme.primary,
      growth: "+12%",
      growthText: "vs last week",
    },
    {
      value: "08",
      label: "Tests Taken",
      icon: "document-text-outline",
      iconColor: "#f59e0b",
      growth: "+2",
      growthText: "new this week",
    },
  ];

  return (
    <View style={styles.statsGrid}>
      {data.map((item, index) => (
        <MotiView
          key={index}
          from={{ opacity: 0, translateY: 30, scale: 0.95 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{ delay: 200 + index * 150, type: "spring" }}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              shadowColor: theme.primary,
            },
          ]}
        >
          {/* Green Pill */}
          <View style={styles.pill}>
            <Ionicons name="arrow-up" size={12} color="#16a34a" />
            <Text style={styles.pillText}>{item.growth}</Text>
          </View>

          <Ionicons
            name={item.icon}
            size={22}
            color={item.iconColor}
          />

          <Text style={[styles.statNumber, { color: theme.text }]}>
            {item.value}
          </Text>

          <Text style={styles.statLabel}>{item.label}</Text>

          <Text style={styles.growthText}>{item.growthText}</Text>
        </MotiView>
      ))}
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 10,
  },

  card: {
    flex: 1,
    padding: 18,
    borderRadius: 20,
    elevation: 6,
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  pill: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(22,163,74,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 50,
  },

  pillText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#16a34a",
    marginLeft: 3,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },

  statLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },

  growthText: {
    fontSize: 10,
    opacity: 0.5,
    marginTop: 2,
  },
});