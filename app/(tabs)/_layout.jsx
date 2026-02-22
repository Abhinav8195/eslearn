import React from "react";
import { Tabs } from "expo-router";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useColorScheme,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import { Colors } from "../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" />
<Tabs.Screen name="courses" />
<Tabs.Screen name="analysis" />
<Tabs.Screen name="stats" />
<Tabs.Screen name="profile" />
    </Tabs>
  );
}

function CustomTabBar({ state, navigation }) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const activeColor = theme.primary || "#2463EB";
  const inactiveColor = "#A0A0A0";
  const backgroundColor =
    scheme === "dark"
      ? theme.card || "#1E293B"
      : "#FFFFFF";

 const icons = {
  home: "home-outline",
  courses: "book-outline",
  analysis: "bar-chart-outline",
  stats: "stats-chart-outline",
  profile: "person-outline",
};
  return (
    <View style={styles.tabWrapper}>
      <View
        style={[
          styles.tabContainer,
          { backgroundColor: backgroundColor },
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isCenter = route.name === "Analysis";

          return (
            <TouchableOpacity
              key={route.name}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.9}
              style={styles.tabButton}
            >
              <MotiView
                animate={{
                  translateY: isFocused
                    ? isCenter
                      ? -18
                      : -6
                    : 0,
                  scale: isFocused ? 1.15 : 1,
                }}
                transition={{
                  type: "spring",
                  damping: 14,
                  stiffness: 180,
                }}
                style={{ alignItems: "center" }}
              >
                {/* Center Glow */}
                <AnimatePresence>
                  {isCenter && isFocused && (
                    <MotiView
                      from={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "timing", duration: 250 }}
                      style={[
                        styles.glowCircle,
                        { backgroundColor: activeColor },
                      ]}
                    />
                  )}
                </AnimatePresence>

                {/* Center Background */}
                {isCenter ? (
                  <View
                    style={[
                      styles.centerIconWrapper,
                      {
                        backgroundColor: isFocused
                          ? activeColor
                          : "transparent",
                      },
                    ]}
                  >
                    <Ionicons
                      name={icons[route.name]}
                      size={24}
                      color={isFocused ? "#FFFFFF" : inactiveColor}
                    />
                  </View>
                ) : (
                  <Ionicons
                    name={icons[route.name]}
                    size={22}
                    color={isFocused ? activeColor : inactiveColor}
                  />
                )}

                {/* Label */}
                <Text
                  style={[
                    styles.label,
                    {
                      color: isFocused
                        ? isCenter
                          ? "#FFFFFF"
                          : activeColor
                        : inactiveColor,
                    },
                  ]}
                >
                  {route.name}
                </Text>
              </MotiView>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: Platform.OS === "ios" ? 30 : 20,
    borderRadius: 30,
    paddingVertical: 14,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 12,
  },

  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
  },

  label: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: "600",
  },

  glowCircle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  centerIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
});