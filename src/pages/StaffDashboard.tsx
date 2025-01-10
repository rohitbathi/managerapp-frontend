import { View, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/DashboardStyles";

const StaffDashboard = ({ route }) => {
  const navigation = useNavigation();
  const handleLogout = () => {
    try {
      const response = await Logout();
      if (response.status === 200) {
        navigation.navigate("Login");
      }
    } catch {
      Alert.alert("Logout Failed! Try Again.");
    }
  };
  const role = route.params.role;

  return (
    <View style={styles.container}>
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
  );
};

export default StaffDashboard;
