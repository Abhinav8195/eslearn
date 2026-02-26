import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  useColorScheme,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { router } from "expo-router";

const DownloadContent = ({ navigation }) => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [activeTab, setActiveTab] = useState("videos");

  // 🔥 Toggle these to test
  const [isDownloading] = useState(true);
  const [hasDownloads, setHasDownloads] = useState(true);

  const [downloads, setDownloads] = useState([
    {
      id: 1,
      title: "Indian Polity - L1",
      size: "125 MB • 45 mins",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      type: "videos",
    },
    {
      id: 2,
      title: "Economy Basics - PDF",
      size: "12 MB • PDF",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      type: "pdfs",
    },
  ]);

  const filteredData = downloads.filter(
    (item) => item.type === activeTab
  );

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Download",
      "Are you sure you want to delete?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updated = downloads.filter(
              (item) => item.id !== id
            );
            setDownloads(updated);
            if (updated.length === 0) setHasDownloads(false);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f8fafc" },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? "#fff" : "#000" },
          ]}
        >
          Downloads
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>

          {/* 🔥 Downloading Section */}
          {isDownloading && (
            <MotiView
              from={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 500 }}
              style={[
                styles.progressCard,
                { backgroundColor: isDark ? "#1e293b" : "#fff" },
              ]}
            >
              <View style={styles.progressHeader}>
                <Text
                  style={[
                    styles.progressTitle,
                    { color: isDark ? "#fff" : "#000" },
                  ]}
                >
                  Downloading: Modern History
                </Text>
                <Text style={styles.percent}>65%</Text>
              </View>

              <View style={styles.progressBarBg}>
                <MotiView
                  from={{ width: "0%" }}
                  animate={{ width: "65%" }}
                  transition={{ type: "timing", duration: 1500 }}
                  style={styles.progressBarFill}
                />
              </View>

              <View style={styles.progressFooter}>
                <Text style={styles.subText}>
                  24MB of 40MB
                </Text>
                <Text style={styles.subText}>
                  2 mins remaining
                </Text>
              </View>
            </MotiView>
          )}

          {/* TABS */}
          <View
            style={[
              styles.tabContainer,
              { backgroundColor: isDark ? "#1e293b" : "#e2e8f0" },
            ]}
          >
            {["videos", "pdfs"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.tab}
                onPress={() => setActiveTab(tab)}
              >
                {activeTab === tab && (
                  <MotiView
                    layoutId="tabIndicator"
                    style={styles.activeTabIndicator}
                    transition={{ type: "spring" }}
                  />
                )}
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === tab
                          ? "#fff"
                          : isDark
                          ? "#cbd5e1"
                          : "#475569",
                    },
                  ]}
                >
                  {tab.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* EMPTY STATE */}
          {!hasDownloads && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.emptyState}
            >
              <Ionicons
                name="cloud-download-outline"
                size={60}
                color="#94a3b8"
              />
              <Text style={styles.emptyTitle}>
                No Downloads Yet
              </Text>
              <Text style={styles.emptySubtitle}>
                Your downloaded content will appear here.
              </Text>
            </MotiView>
          )}

          {/* LIST */}
          {hasDownloads &&
            filteredData.map((item) => (
              <MotiView
                key={item.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 200 }}
                style={[
                  styles.downloadItem,
                  {
                    backgroundColor: isDark
                      ? "#1e293b"
                      : "#fff",
                  },
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.thumbnail}
                />

                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.itemTitle,
                      {
                        color: isDark ? "#fff" : "#000",
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.subText}>
                    {item.size}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={22}
                    color="#ef4444"
                  />
                </TouchableOpacity>
              </MotiView>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DownloadContent;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  progressCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  progressTitle: { fontWeight: "600" },

  percent: {
    color: "#3b82f6",
    fontWeight: "bold",
  },

  progressBarBg: {
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressBarFill: {
    height: 8,
    backgroundColor: "#3b82f6",
  },

  progressFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  subText: {
    fontSize: 12,
    color: "#94a3b8",
  },

  tabContainer: {
    flexDirection: "row",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  activeTabIndicator: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
  },

  tabText: {
    fontWeight: "600",
    zIndex: 1,
  },

  downloadItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
  },

  thumbnail: {
    width: 90,
    height: 60,
    borderRadius: 10,
  },

  itemTitle: {
    fontWeight: "600",
  },

  emptyState: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },
});