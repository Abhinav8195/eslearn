import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const EditProfile = () => {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const [image, setImage] = useState("https://i.pravatar.cc/200");

  const [form, setForm] = useState({
    name: "Alex Johnson",
    email: "alex.j@eslearn.com",
    phone: "9876543210",
    dob: "",
  });

  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(() => new Date(2000, 0, 1));
  const [showIOSPicker, setShowIOSPicker] = useState(false);

  /* ================= IMAGE PICKER ================= */

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /* ================= DATE FUNCTIONS ================= */

  const formatDate = (selectedDate) => {
    if (!(selectedDate instanceof Date)) return "";

    const day = String(selectedDate.getDate()).padStart(2, "0");
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const year = selectedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const openAndroidPicker = () => {
    DateTimePickerAndroid.open({
      value: date instanceof Date ? date : new Date(),
      mode: "date",
      maximumDate: new Date(),
      onChange: (event, selectedDate) => {
        if (selectedDate && selectedDate instanceof Date) {
          setDate(selectedDate);
          handleChange("dob", formatDate(selectedDate));
        }
      },
    });
  };

  const openDatePicker = () => {
    if (Platform.OS === "android") {
      openAndroidPicker();
    } else {
      setShowIOSPicker(true);
    }
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    let newErrors = {};

    const nameRegex = /^[A-Za-z ]{3,}$/;
    if (!nameRegex.test(form.name.trim())) {
      newErrors.name =
        "Name must be at least 3 characters and contain only letters";
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(form.email.toLowerCase())) {
      newErrors.email = "Enter valid email address";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      newErrors.phone =
        "Enter valid 10-digit mobile number starting 6-9";
    }

    if (!form.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      if (!(date instanceof Date)) {
        newErrors.dob = "Invalid date selected";
      } else {
        if (date > new Date()) {
          newErrors.dob = "DOB cannot be future date";
        }

        const age = calculateAge(date);
        if (age < 13) {
          newErrors.dob = "You must be at least 13 years old";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
  if (validate()) {
    Toast.show({
      type: "success",
      text1: "Profile Updated",
      text2: "Your profile has been updated successfully 👌",
      position: "top",
      visibilityTime: 3000,
    });
  } else {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Please fix the errors in the form",
      position: "top",
    });
  }
};

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  /* ================= INPUT COMPONENT ================= */

  const InputField = ({
    label,
    icon,
    value,
    onChangeText,
    error,
    keyboardType,
    maxLength,
    autoCapitalize,
  }) => (
    <View style={{ marginBottom: 18 }}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.card,
            borderColor: error ? "#ef4444" : "transparent",
            borderWidth: error ? 1 : 0,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={18}
          color="#9CA3AF"
          style={{ marginRight: 10 }}
        />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={label}
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="#9CA3AF"
          style={[styles.input, { color: theme.text }]}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color={theme.text} />
            </TouchableOpacity>

            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Edit Profile
            </Text>

            <View style={{ width: 22 }} />
          </View>

          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: image }} style={styles.avatar} />
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={pickImage}
              >
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <InputField
              label="Full Name"
              icon="person-outline"
              value={form.name}
              onChangeText={(text) =>
                handleChange("name", text.replace(/[^A-Za-z ]/g, ""))
              }
              error={errors.name}
            />

            <InputField
              label="Email Address"
              icon="mail-outline"
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              label="Phone Number"
              icon="call-outline"
              value={form.phone}
              onChangeText={(text) =>
                handleChange("phone", text.replace(/[^0-9]/g, ""))
              }
              error={errors.phone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <View style={{ marginBottom: 18 }}>
              <Text style={[styles.label, { color: theme.text }]}>
                Date of Birth
              </Text>

              <TouchableOpacity
                onPress={openDatePicker}
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: theme.card,
                    borderColor: errors.dob ? "#ef4444" : "transparent",
                    borderWidth: errors.dob ? 1 : 0,
                  },
                ]}
              >
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color="#9CA3AF"
                  style={{ marginRight: 10 }}
                />

                <Text style={{ color: theme.text, fontSize: 15 }}>
                  {form.dob || "Select Date"}
                </Text>
              </TouchableOpacity>

              {errors.dob && (
                <Text style={styles.errorText}>{errors.dob}</Text>
              )}
            </View>
          </View>
        </ScrollView>

        {Platform.OS === "ios" && showIOSPicker && (
          <DateTimePicker
            value={date instanceof Date ? date : new Date()}
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (selectedDate && selectedDate instanceof Date) {
                setDate(selectedDate);
                handleChange("dob", formatDate(selectedDate));
              }
            }}
          />
        )}

        <View
          style={[styles.bottomBar, { backgroundColor: theme.background }]}
        >
          <TouchableOpacity activeOpacity={0.9} onPress={handleSave}>
            <LinearGradient
              colors={[theme.primary, theme.secondary]}
              style={styles.saveBtn}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  avatarSection: { alignItems: "center", marginTop: 10 },
  avatarWrapper: { position: "relative" },
  avatar: { width: 130, height: 130, borderRadius: 65 },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2463EB",
    padding: 8,
    borderRadius: 20,
  },
  label: { fontSize: 13, fontWeight: "600", marginBottom: 6 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 56,
  },
  input: { flex: 1, fontSize: 15, fontWeight: "500" },
  errorText: { color: "#ef4444", fontSize: 12, marginTop: 4 },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },
  saveBtn: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});