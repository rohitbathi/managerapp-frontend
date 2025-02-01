import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/DashboardStyles";
import { logoutUser } from "../services/api";

const AdminDashboard = ({ route }) => {
  const navigation = useNavigation();
  const role = route.params.role;

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response) {
        Alert.alert(response.message);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Appointments", { role })}
          >
            <Text style={styles.buttonText}>View Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("AddUser", { userRole: "admin" })
            }
          >
            <Text style={styles.buttonText}>Add Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("AddUser", { userRole: "staff" })
            }
          >
            <Text style={styles.buttonText}>Add Staff</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddService")}
          >
            <Text style={styles.buttonText}>Add Service</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddShiftTimings")}
          >
            <Text style={styles.buttonText}>Add Shift Timings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("ViewUsers", { userRole: "staff" })
            }
          >
            <Text style={styles.buttonText}>View Staff</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("ViewUsers", { userRole: "customer" })
            }
          >
            <Text style={styles.buttonText}>View Customers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ViewServices")}
          >
            <Text style={styles.buttonText}>View Services</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminDashboard;
