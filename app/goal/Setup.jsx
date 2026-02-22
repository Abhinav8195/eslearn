import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
  useColorScheme,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2;

const EXAMS = [
  { id: "upsc", title: "UPSC", subtitle: "Civil Services", icon: "account-balance" },
  { id: "ssc", title: "SSC", subtitle: "CGL / CHSL", icon: "badge" },
  { id: "banking", title: "Banking", subtitle: "IBPS / SBI", icon: "payments" },
  { id: "railway", title: "Railway", subtitle: "RRB NTPC", icon: "train" },
  { id: "defense", title: "Defense", subtitle: "NDA / CDS", icon: "military-tech" },
  { id: "statepsc", title: "State PSC", subtitle: "PCS Exams", icon: "map" },
  { id: "engineering", title: "Engineering", subtitle: "GATE / ESE", icon: "engineering" },
  { id: "teaching", title: "Teaching", subtitle: "CTET / KVS", icon: "school" },
  { id: "neet", title: "NEET", subtitle: "Medical Entrance", icon: "medical-services" },
  { id: "jee", title: "JEE", subtitle: "Engineering Entrance", icon: "science" },
  { id: "cat", title: "CAT", subtitle: "MBA Entrance", icon: "business" },
  { id: "clat", title: "CLAT", subtitle: "Law Entrance", icon: "gavel" },
  { id: "ugcnet", title: "UGC NET", subtitle: "Assistant Professor", icon: "menu-book" },
  { id: "ca", title: "CA", subtitle: "Chartered Accountant", icon: "calculate" },
  { id: "cs", title: "CS", subtitle: "Company Secretary", icon: "apartment" },
  { id: "insurance", title: "Insurance", subtitle: "LIC / NIACL", icon: "verified-user" },
  { id: "police", title: "Police", subtitle: "SI / Constable", icon: "local-police" },
];

const GoalCard = ({ item, selected, setSelected, theme, isDark, index }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const isSelected = selected === item.id;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 400,
      delay: index * 60,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    setSelected(item.id);
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        opacity: scale,
        width: CARD_WIDTH,
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: isSelected ? theme.primary : theme.border,
          },
        ]}
      >
        {isSelected && (
          <MaterialIcons
            name="check-circle"
            size={20}
            color={theme.primary}
            style={styles.checkIcon}
          />
        )}

        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: isSelected
                ? "rgba(36,99,235,0.15)"
                : isDark
                ? "#334155"
                : "#F3F4F6",
            },
          ]}
        >
          <MaterialIcons
            name={item.icon}
            size={26}
            color={isSelected ? theme.primary : theme.textSecondary}
          />
        </View>

        <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
          {item.title}
        </Text>

        <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
          {item.subtitle}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Setup = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const theme = {
    background: isDark ? "#111621" : "#f6f6f8",
    card: isDark ? "#1E293B" : "#ffffff",
    textPrimary: isDark ? "#F8FAFC" : "#111827",
    textSecondary: isDark ? "#94A3B8" : "#6B7280",
    border: isDark ? "#1E293B" : "#E5E7EB",
    primary: "#2463EB",
  };

  const filtered = EXAMS.filter((item) =>
    (item.title + item.subtitle)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
            Select Your Goal
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Choose an exam to personalize your journey.
          </Text>
        </View>

        <View style={[styles.searchBox, { backgroundColor: theme.card }]}>
          <MaterialIcons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            placeholder="Search exams..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            style={[styles.searchInput, { color: theme.textPrimary }]}
          />
        </View>

        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item, index }) => (
            <GoalCard
              item={item}
              selected={selected}
              setSelected={setSelected}
              theme={theme}
              isDark={isDark}
              index={index}
            />
          )}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: theme.textSecondary,
                textAlign: "center",
                marginTop: 30,
              }}
            >
              No exams found
            </Text>
          )}
        />

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ color: theme.textSecondary }}>
            Can't find your exam?
          </Text>
          <TouchableOpacity>
            <Text style={{ color: theme.primary, fontWeight: "600", marginTop: 4 }}>
              Request it here
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={()=>router.replace("/(tabs)/home")} disabled={!selected} activeOpacity={0.9}>
            <LinearGradient
              colors={
                selected
                  ? ["#2463EB", "#7C3AED"]
                  : ["#9CA3AF", "#9CA3AF"]
              }
              style={[
                styles.continueBtn,
                { opacity: selected ? 1 : 0.6 },
              ]}
            >
              <Text style={styles.continueText}>
                Continue to Preparation
              </Text>
              <MaterialIcons
                name="arrow-forward"
                size={20}
                color="#fff"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Setup;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },

  header: { marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: "700" },
  headerSubtitle: { fontSize: 14, marginTop: 6 },

  searchBox: {
    height: 52,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 25,
  },

  searchInput: { flex: 1, marginLeft: 10 },

  card: {
    borderWidth: 2,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardSubtitle: { fontSize: 11, marginTop: 4 },

  checkIcon: { position: "absolute", top: 10, right: 10 },

  bottomContainer: {
    marginTop: 20,
    paddingBottom: 30,
  },

  continueBtn: {
    height: 56,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  continueText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});