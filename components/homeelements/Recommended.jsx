import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const Recommended = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const courses = [
    {
      title: "Advanced Calculus II",
      lessons: "24 Lessons • 8h 15m",
      rating: "4.9",
      level: "Hard",
      image: "https://picsum.photos/300/200?1",
    },
    {
      title: "Organic Compounds",
      lessons: "18 Lessons • 6h 40m",
      rating: "4.7",
      level: "Med",
      image: "https://picsum.photos/300/200?2",
    },
    {
      title: "Modern Physics",
      lessons: "20 Lessons • 7h 10m",
      rating: "4.8",
      level: "Hard",
      image: "https://picsum.photos/300/200?3",
    },
    {
      title: "Data Structures",
      lessons: "30 Lessons • 10h 20m",
      rating: "4.6",
      level: "Med",
      image: "https://picsum.photos/300/200?4",
    },
    {
      title: "Linear Algebra",
      lessons: "22 Lessons • 9h 05m",
      rating: "4.9",
      level: "Hard",
      image: "https://picsum.photos/300/200?5",
    },
  ];

  return (
    <View style={{ marginTop: 20 }}>
      {/* Section Fade In */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 300 }}
      >
        <View style={styles.headerRow}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recommended for You
          </Text>
          <TouchableOpacity>
            <Text style={{ color: theme.primary, fontWeight: "600", fontSize: 12 }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {courses.map((item, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateX: 60 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                delay: 400 + index * 180,
                type: "timing",
                duration: 500,
              }}
              style={[
                styles.card,
                {
                  backgroundColor: theme.card,
                },
              ]}
            >
              {/* IMAGE */}
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item.image }} style={styles.image} />

                {/* Difficulty Badge */}
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.level}</Text>
                </View>
              </View>

              {/* Title */}
              <Text
                numberOfLines={1}
                style={[styles.title, { color: theme.text }]}
              >
                {item.title}
              </Text>

              {/* Lessons */}
              <Text style={styles.subtitle}>{item.lessons}</Text>

              {/* Bottom Row */}
              <View style={styles.bottomRow}>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#facc15" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.addBtn,
                    { backgroundColor: theme.primary + "15" },
                  ]}
                >
                  <Ionicons name="add" size={18} color={theme.primary} />
                </TouchableOpacity>
              </View>
            </MotiView>
          ))}
        </ScrollView>
      </MotiView>
    </View>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  card: {
    width: 210,
    marginLeft: 20,
    borderRadius: 22,
    padding: 14,
    elevation: 6,
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 130,
    borderRadius: 18,
  },

  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },

  title: {
    marginTop: 12,
    fontWeight: "700",
    fontSize: 15,
  },

  subtitle: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: "600",
  },

  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});