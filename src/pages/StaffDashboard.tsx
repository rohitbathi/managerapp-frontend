import {
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/DashboardStyles";
import { logoutUser } from "../services/api";
import { useState, useEffect } from "react";

const StaffDashboard = ({ route }) => {
  const navigation = useNavigation();
  const role = route.params.role;
  const [currentDay, setCurrentDay] = useState(new Date().getDate()); // Track the current day
  const [pressCount, setPressCount] = useState(0); // Track button presses

  useEffect(() => {
    const today = new Date().getDate(); // Get the current day (1-31)
    if (today !== currentDay) {
      // Reset the button state if the day changes
      setPressCount(0); // Reset press count at the start of a new day
      setCurrentDay(today);
    }
  }, [currentDay]);

  const handleShift = async () => {
    if (pressCount >= 2) {
      // Do nothing if the button has been pressed twice already
      return;
    }
    // Increase press count
    setPressCount((prevCount) => prevCount + 1); // Increment the press count
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response) {
        Alert.alert(response.message);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Logout Failed! Try Again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {pressCount % 2 === 0 ? (
          <TouchableOpacity style={styles.navButton} onPress={handleShift}>
            <Text style={styles.navButtonText}>Clock IN</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navButton} onPress={handleShift}>
            <Text style={styles.navButtonText}>Clock OUT</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Appointments", { role })}
          >
            <Text style={styles.buttonText}>View Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default StaffDashboard;
