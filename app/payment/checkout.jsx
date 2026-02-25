import React from "react";
import {
  View,
  ActivityIndicator,
  Alert,
  BackHandler,
  useColorScheme,
} from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

const Checkout = () => {
  const { amount } = useLocalSearchParams();
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  // ✅ Safe amount handling
  const numericAmount = amount
    ? parseInt(amount.replace(/[^0-9]/g, "")) * 100
    : 49900;

  const razorpayHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </head>
    <body>
      <script>
        var options = {
          key: "rzp_test_SKGhH3T2F8TkLu",
          amount: "${numericAmount}",
          currency: "INR",
          name: "EsLearn",
          description: "Premium Plan",
          handler: function (response) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              status: "success",
              data: response
            }));
          },
          modal: {
            ondismiss: function(){
              window.ReactNativeWebView.postMessage(JSON.stringify({
                status: "cancel"
              }));
            }
          },
          theme: {
            color: "#2463EB"
          }
        };
        var rzp = new Razorpay(options);
        rzp.open();
      </script>
    </body>
  </html>
  `;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: razorpayHTML }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" color={theme.primary} />
        )}
        onMessage={(event) => {
          const response = JSON.parse(event.nativeEvent.data);

          if (response.status === "success") {
            console.log("Payment Success:", response.data);
            router.replace("/profile/PaymentSuccess");
          }

          if (response.status === "cancel") {
            Alert.alert("Payment Cancelled", "You cancelled the payment.");
            router.back();
          }
        }}
      />
    </View>
  );
};

export default Checkout;