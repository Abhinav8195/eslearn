import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Colors } from "../../constants/Colors"; 
import Toast from "react-native-toast-message";

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

const ExamInterest = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const renderItem = ({ item, index }) => {
    const isSelected = selected.includes(item.id);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => toggleSelect(item.id)}
        style={{ flex: 1, margin: 8 }}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{
            opacity: 1,
            translateY: 0,
            scale: isSelected ? 1.05 : 1,
          }}
          transition={{
            type: "timing",
            duration: 400,
            delay: index * 50,
          }}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: isSelected ? theme.primary : "transparent",
              shadowColor: isSelected ? theme.primary : "#000",
            },
          ]}
        >
          {isSelected && (
            <MotiView
              from={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              style={[
                styles.checkIcon,
                { backgroundColor: theme.primary },
              ]}
            >
              <MaterialIcons name="check" size={14} color="#fff" />
            </MotiView>
          )}

          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: theme.primary + "20" },
            ]}
          >
            <MaterialIcons
              name={item.icon}
              size={26}
              color={theme.primary}
            />
          </View>

          <Text style={[styles.title, { color: theme.text }]}>
            {item.title}
          </Text>
          <Text style={styles.subtitle}>
            {item.subtitle}
          </Text>
        </MotiView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* HEADER */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        style={styles.header}
      >
        <Text style={[styles.heading, { color: theme.text }]}>
          Choose Your Goal 🎯
        </Text>
        <Text style={styles.subHeading}>
          Select one or more exams to personalize your journey.
        </Text>
      </MotiView>

      {/* GRID */}
      <FlatList
        data={EXAMS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* STICKY BUTTON */}
      <MotiView
        from={{ translateY: 80 }}
        animate={{ translateY: 0 }}
        transition={{ type: "spring" }}
        style={[
          styles.bottomContainer,
          { backgroundColor: theme.background + "EE" },
        ]}
      >
        <TouchableOpacity
          disabled={selected.length === 0}
          activeOpacity={0.8}
          onPress={() => {
    Toast.show({
      type: "success",
      text1: "Success 🎉",
      text2: `${selected.length} exam(s) selected successfully`,
      position: "top",
      visibilityTime: 2000,
    });
  }}
          style={[
            styles.saveButton,
            {
              backgroundColor:
                selected.length === 0
                  ? theme.primary + "70"
                  : theme.primary,
            },
          ]}
        >
          <Text style={styles.saveText}>
            Continue ({selected.length})
          </Text>
        </TouchableOpacity>
      </MotiView>
    </SafeAreaView>
  );
};

export default ExamInterest;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
  },

  subHeading: {
    marginTop: 6,
    fontSize: 14,
    color: "#94a3b8",
  },

  card: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 2,
    elevation: 6,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },

  checkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },

  saveButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});