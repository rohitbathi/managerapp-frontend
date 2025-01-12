import { View, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/DashboardStyles";
import { logoutUser } from "../services/api";

const StaffDashboard = ({ route }) => {
  const navigation = useNavigation();
  const role = route.params.role;

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response) {
        Alert.alert(response.message)
        navigation.goBack();
      }
    } catch(error) {
      Alert.alert("Logout Failed! Try Again.");
    }
  };

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
