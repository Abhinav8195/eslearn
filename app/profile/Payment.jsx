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
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Colors } from "../../constants/Colors";

const Payment = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const { plan } = useLocalSearchParams();

  const [selectedMethod, setSelectedMethod] = useState("upi");

  const amount = plan === "monthly" ? "₹499" : "₹4,999";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={theme.text} />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Payment Methods
          </Text>

          <View style={{ width: 22 }} />
        </View>

        {/* ORDER SUMMARY */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={[styles.sectionLabel, { color: theme.text + "80" }]}>
            ORDER SUMMARY
          </Text>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={[
              styles.summaryCard,
              { backgroundColor: theme.card },
            ]}
          >
            <View style={styles.summaryRow}>
              <View>
                <Text style={[styles.summaryTitle, { color: theme.text }]}>
                  Total Amount
                </Text>
                <Text style={{ color: theme.text + "80" }}>
                  EsLearn Premium Plan
                </Text>
              </View>

              <Text style={{ color: theme.primary, fontSize: 22, fontWeight: "800" }}>
                {amount}
              </Text>
            </View>
          </MotiView>
        </View>

        {/* PAYMENT METHODS */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <Text style={[styles.sectionLabel, { color: theme.text + "80" }]}>
            SELECT PAYMENT METHOD
          </Text>

          <PaymentOption
            title="UPI (GPay, PhonePe)"
            subtitle="Fast & secure via UPI"
            icon="qr-code"
            selected={selectedMethod === "upi"}
            onPress={() => setSelectedMethod("upi")}
            theme={theme}
          />

          <PaymentOption
            title="Credit / Debit Card"
            subtitle="Visa, Mastercard, RuPay"
            icon="card"
            selected={selectedMethod === "card"}
            onPress={() => setSelectedMethod("card")}
            theme={theme}
          />

          <PaymentOption
            title="Net Banking"
            subtitle="All Indian banks supported"
            icon="business"
            selected={selectedMethod === "netbanking"}
            onPress={() => setSelectedMethod("netbanking")}
            theme={theme}
          />

          <PaymentOption
            title="Wallets"
            subtitle="Paytm, Amazon Pay"
            icon="wallet"
            selected={selectedMethod === "wallet"}
            onPress={() => setSelectedMethod("wallet")}
            theme={theme}
          />
        </View>

        {/* SECURITY TEXT */}
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Ionicons name="shield-checkmark" size={16} color={theme.text + "70"} />
          <Text style={{ fontSize: 12, color: theme.text + "70", marginTop: 4 }}>
            PCI-DSS Compliant • 128-bit Encryption
          </Text>
        </View>
      </ScrollView>

      {/* PAY BUTTON */}
      <View style={[styles.bottomBar, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
  router.push({
    pathname: "/payment/checkout",
    params: { amount, plan },
  })
}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.payButton}
          >
            <Ionicons name="lock-closed" size={18} color="#fff" />
            <Text style={styles.payText}>Pay {amount} Securely</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={{ fontSize: 10, textAlign: "center", marginTop: 8, color: theme.text + "70" }}>
          By clicking pay, you agree to Terms & Conditions
        </Text>
      </View>
    </SafeAreaView>
  );
};

/* ================= PAYMENT OPTION ================= */

const PaymentOption = ({ title, subtitle, icon, selected, onPress, theme }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    style={[
      styles.optionCard,
      {
        backgroundColor: theme.card,
        borderColor: selected ? theme.primary : theme.card,
      },
    ]}
  >
    <Ionicons name={icon} size={24} color={selected ? theme.primary : theme.text} />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={{ fontWeight: "700", color: theme.text }}>
        {title}
      </Text>
      <Text style={{ fontSize: 12, color: theme.text + "70" }}>
        {subtitle}
      </Text>
    </View>

    <Ionicons
      name={selected ? "radio-button-on" : "radio-button-off"}
      size={20}
      color={theme.primary}
    />
  </TouchableOpacity>
);

export default Payment;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  headerTitle: { fontSize: 18, fontWeight: "700" },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 10,
  },

  summaryCard: {
    padding: 18,
    borderRadius: 16,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 12,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },

  payButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 18,
    gap: 8,
  },

  payText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});