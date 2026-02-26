import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { MotiView } from "moti";
import { router } from "expo-router";

const Profile = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const MenuItem = ({ icon, title, rightText, index,onPress  }) => (
  <MotiView
    from={{ opacity: 0, translateX: -30 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ delay: 200 + index * 120 }}
  >
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: theme.primary + "15" },
          ]}
        >
          <Ionicons name={icon} size={18} color={theme.primary} />
        </View>

        <Text style={[styles.menuText, { color: theme.text }]}>
          {title}
        </Text>
      </View>

      {/* RIGHT SIDE */}
      <View style={styles.menuRight}>
        {rightText && (
          <Text style={{ fontSize: 12, color: theme.primary }}>
            {rightText}
          </Text>
        )}

        {/* Small Arrow */}
        <Ionicons
          name="chevron-forward"
          size={16}
          color={scheme === "dark" ? "#6B7280" : "#9CA3AF"}
        />
      </View>
    </TouchableOpacity>
  </MotiView>
);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* HEADER */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 400 }}
          style={[styles.header, { borderBottomColor: theme.card }]}
        >
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Profile
          </Text>
        </MotiView>

        {/* PROFILE SECTION */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 200 }}
          style={styles.profileSection}
        >
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150" }}
              style={styles.avatar}
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={14} color="#fff" />
            </View>
          </View>

          <Text style={[styles.name, { color: theme.text }]}>
            Alex Johnson
          </Text>
          <Text style={styles.subtitle}>
            UPSC Aspirant • Premium Member
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={()=>router.push("/profile/EditProfile")}
            style={[
              styles.editBtn,
              { backgroundColor: theme.primary },
            ]}
          >
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </MotiView>

        {/* ACCOUNT */}
        <Text style={styles.groupTitle}>ACCOUNT</Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <MenuItem
            icon="card-outline"
            title="My Subscription"
            rightText="Active"
            index={0}
            onPress={() => router.push("/profile/Subscription")}
          />
          <MenuItem
            icon="download-outline"
            title="Downloaded Content"
            rightText="1.2 GB"
            index={1}
            onPress={() => router.push("/profile/DownloadContent")}
          />
          <MenuItem
            icon="school-outline"
            title="Exam Interests"
            index={2}
            onPress={() => router.push("/profile/ExamInterest")}
          />
        </View>

        {/* PREFERENCES */}
        <Text style={styles.groupTitle}>PREFERENCES</Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <MenuItem
            icon="notifications-outline"
            title="Notifications"
            index={3}
          />
        </View>

        {/* SUPPORT */}
        <Text style={styles.groupTitle}>SUPPORT</Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            index={4}
          />
          <MenuItem
            icon="information-circle-outline"
            title="About EsLearn"
            index={5}
          />
        </View>

        {/* LOGOUT */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 800 }}
        >
          <TouchableOpacity style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={18} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </MotiView>

        <Text style={styles.version}>
          Version 0.0.1 (Build 001)
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2463EB",
    padding: 6,
    borderRadius: 20,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 12,
  },

  editBtn: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 12,
  },

  editText: {
    color: "#fff",
    fontWeight: "600",
  },

  groupTitle: {
    fontSize: 12,
    fontWeight: "700",
    opacity: 0.4,
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },

  card: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  menuText: {
    fontSize: 15,
    fontWeight: "500",
  },

  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#fee2e2",
  },

  logoutText: {
    color: "#ef4444",
    fontWeight: "700",
  },

  version: {
    textAlign: "center",
    fontSize: 11,
    opacity: 0.4,
    marginTop: 20,
  },
  menuRight: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
},
});