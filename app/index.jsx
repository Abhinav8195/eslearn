import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Welcome from "../components/Welcome";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(false);

  const checkUser = async () => {
    setCheckingAuth(true);

    // 🔥 Replace with AsyncStorage or Firebase check
    // Example fake delay
    setTimeout(() => {
      const fakeUser = "Abhinav"; // change to {} to simulate logged in
      setUser(fakeUser);
      setCheckingAuth(false);
      setShowSplash(false);
    }, 1000);
  };

  if (showSplash) {
    return <Welcome onFinish={checkUser} />;
  }

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/start/OnBoarding" />;
}