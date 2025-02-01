import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { authenticateUser } from "../services/api";
import { styles } from "../styles/LoginStyles";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await authenticateUser({ email, password });
      console.log(email, password);
      const role = response.role;

      if (role === "admin") {
        navigation.navigate("AdminDashboard", { role });
      } else if (role === "staff") {
        navigation.navigate("StaffDashboard", { role });
      } else {
        alert("Invalid role!");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#bdc3c7" // Light gray placeholder
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#bdc3c7" // Light gray placeholder
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
