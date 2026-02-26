import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { router } from "expo-router";
import { Colors } from "../../constants/Colors";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "Mock Test Result",
    message:
      "Your Mock Test result is out! Check your rank now and see detailed analysis.",
    time: "2h ago",
    icon: "emoji-events",
    iconColor: "#F59E0B",
    bgColor: "#F59E0B20",
  },
  {
    id: "2",
    title: "New Content Available",
    message:
      "A new study module on Quantum Mechanics is live. Start learning today!",
    time: "5h ago",
    icon: "menu-book",
    iconColor: "#3B82F6",
    bgColor: "#3B82F620",
  },
  {
    id: "3",
    title: "Upcoming Deadline",
    message:
      "Registration for the National Level Olympiad ends in 24 hours.",
    time: "Yesterday",
    icon: "notifications-active",
    iconColor: "#EF4444",
    bgColor: "#EF444420",
  },
  {
    id: "4",
    title: "Doubt Solved",
    message:
      "An expert has replied to your query in the Physics forum.",
    time: "2 days ago",
    icon: "groups",
    iconColor: "#10B981",
    bgColor: "#10B98120",
  },
  {
    id: "5",
    title: "Daily Streak!",
    message:
      "You've studied for 7 days in a row! Keep up the great work.",
    time: "3 days ago",
    icon: "military-tech",
    iconColor: "#7C3AED",
    bgColor: "#7C3AED20",
  },
];

const Notification = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const renderItem = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, translateY: 30, scale: 0.96 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{
        type: "spring",
        damping: 18,
        stiffness: 120,
        delay: index * 90,
      }}
      style={{ marginBottom: 14 }}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: scheme === "dark" ? "#334155" : "#f1f5f9",
          },
        ]}
      >
        <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
          <MaterialIcons
            name={item.icon}
            size={22}
            color={item.iconColor}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: theme.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.time, { color: theme.text + "80" }]}>
              {item.time}
            </Text>
          </View>

          <Text style={[styles.message, { color: theme.text + "B3" }]}>
            {item.message}
          </Text>
        </View>
      </View>
    </MotiView>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: theme.primary + "15" },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={22}
            color={theme.text}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Notifications
        </Text>

        <TouchableOpacity>
          <Text style={[styles.markAll, { color: theme.primary }]}>
            Mark all
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  markAll: {
    fontWeight: "600",
    fontSize: 13,
  },

  card: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  title: {
    fontWeight: "700",
    fontSize: 14,
    flex: 1,
  },

  time: {
    fontSize: 11,
    marginLeft: 8,
  },

  message: {
    fontSize: 13,
    lineHeight: 18,
  },
});