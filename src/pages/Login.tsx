import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
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
      // if(password === ""){
      //   Alert.alert("No Password");
      // }
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logincontainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {/* <Button title="Login" onPress={handleLogin} /> */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8} // Adjusts the opacity when pressed
          onPress={handleLogin}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Log in</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
