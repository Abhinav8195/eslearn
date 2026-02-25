import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

const Subscription = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState("annual");

  const plans = {
    monthly: { price: "₹499", duration: "/month" },
    annual: { price: "₹4,999", duration: "/year" },
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={22}
              color={theme.text}
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Manage Subscription
          </Text>

          <View style={{ width: 22 }} />
        </View>

        {/* CURRENT PLAN */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 }}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.currentPlanCard}
          >
            <Text style={styles.currentPlanLabel}>
              Current Plan
            </Text>

            <View style={styles.currentPlanRow}>
              <Text style={styles.currentPlanTitle}>
                Free Member
              </Text>
              <Ionicons
                name="diamond"
                size={24}
                color="#fff"
              />
            </View>

            <Text style={styles.billingLabel}>
              Upgrade to unlock premium features
            </Text>
          </LinearGradient>
        </MotiView>

        <Text style={[styles.chooseTitle, { color: theme.text }]}>
          Choose a Plan
        </Text>

        {/* MONTHLY */}
        <PlanCard
          title="Monthly"
          selected={selectedPlan === "monthly"}
          onPress={() => setSelectedPlan("monthly")}
          theme={theme}
          price={plans.monthly.price}
          duration={plans.monthly.duration}
          features={[
            "Access to 500+ premium courses",
            "Unlimited practice tests",
            "AI Performance analytics",
          ]}
        />

        {/* ANNUAL */}
        <PlanCard
          title="Annual"
          selected={selectedPlan === "annual"}
          onPress={() => setSelectedPlan("annual")}
          theme={theme}
          price={plans.annual.price}
          duration={plans.annual.duration}
          badge="Save 40%"
          features={[
            "Everything in Monthly",
            "Offline mode",
            "Priority mentor support",
            "Personalized roadmap",
          ]}
        />
      </ScrollView>

      {/* UPGRADE BUTTON */}
      <View
        style={[
          styles.bottomBar,
          { backgroundColor: theme.background },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
         onPress={() => {
  const amount =
    selectedPlan === "monthly" ? "₹499" : "₹4,999";

  router.push({
    pathname: "/payment/checkout",
    params: {
      plan: selectedPlan,
      amount: amount,
    },
  });
}}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.upgradeBtn}
          >
            <Text style={styles.upgradeText}>
              Upgrade Now
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/* ================= PLAN CARD ================= */

const PlanCard = ({
  title,
  selected,
  onPress,
  theme,
  price,
  duration,
  features,
  badge,
}) => (
  <MotiView
    from={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "timing", duration: 400 }}
  >
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.planCard,
        {
          backgroundColor: theme.card,
          borderColor: selected ? theme.primary : theme.card,
          transform: [{ scale: selected ? 1.03 : 1 }],
        },
      ]}
    >
      {badge && (
        <View
          style={[
            styles.badge,
            { backgroundColor: theme.primary },
          ]}
        >
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}

      <View style={styles.planHeader}>
        <Text
          style={[
            styles.planName,
            { color: theme.text },
          ]}
        >
          {title}
        </Text>

        <Ionicons
          name={
            selected
              ? "radio-button-on"
              : "radio-button-off"
          }
          size={20}
          color={theme.primary}
        />
      </View>

      <View style={styles.priceRow}>
        <Text
          style={[
            styles.price,
            { color: theme.text },
          ]}
        >
          {price}
        </Text>
        <Text style={[styles.priceLabel, { color: theme.text + "80" }]}>
          {duration}
        </Text>
      </View>

      <View style={{ marginTop: 12 }}>
        {features.map((item, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={theme.primary}
            />
            <Text
              style={[
                styles.featureText,
                { color: theme.text + "90" },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  </MotiView>
);

export default Subscription;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  currentPlanCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
  },

  currentPlanLabel: {
    color: "#fff",
    opacity: 0.8,
    fontSize: 13,
  },

  currentPlanRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  currentPlanTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  billingLabel: {
    color: "#fff",
    opacity: 0.8,
    marginTop: 8,
  },

  chooseTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },

  planCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: 18,
    borderWidth: 2,
  },

  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  planName: {
    fontSize: 16,
    fontWeight: "700",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 8,
  },

  price: {
    fontSize: 26,
    fontWeight: "900",
  },

  priceLabel: {
    fontSize: 14,
    marginLeft: 6,
  },

  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  featureText: {
    marginLeft: 8,
    fontSize: 13,
  },

  badge: {
    position: "absolute",
    top: -10,
    right: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },

  upgradeBtn: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  upgradeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});