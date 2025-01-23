import { View, Button, Alert } from "react-native";
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
    <View style={styles.container}>
      <View style={styles.navbar}>
        {pressCount % 2 === 0 && (
          <View style={styles.navButton}>
            <Button title="Clock IN" onPress={handleShift} />
          </View>
        )}

        {pressCount % 2 === 1 && (
          <View style={styles.navButton}>
            <Button title="Clock OUT" onPress={handleShift} />
          </View> 
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button
            title="view appointments"
            onPress={() => navigation.navigate("Appointments", { role })}
          />
        </View>

        <View style={styles.button}>
          <Button title="Log Out" onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
};

export default StaffDashboard;
