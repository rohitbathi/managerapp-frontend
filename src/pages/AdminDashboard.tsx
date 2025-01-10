import { View, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/DashboardStyles";
import { Logout } from "../services/api";

const AdminDashboard = ({ route }) => {
  const navigation = useNavigation();
  const role = route.params.role;

  const handleLogout = async () => {
    try {
      const response = await Logout();
      if (response.status === 200) {
        navigation.navigate("Login");
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
        <Button
          title="Add Admin"
          onPress={() => navigation.navigate("AddUser", { userRole: "admin" })}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Add Staff"
          onPress={() => navigation.navigate("AddUser", { userRole: "staff" })}
        />
      </View>

      {/* <View style={styles.button}>
        
        <Button
          title="Add Customer"
          onPress={() =>
            navigation.navigate("AddUser", { userRole: "customer" })
          }
        />
      </View> */}

      <View style={styles.button}>
        <Button
          title="Add Service"
          onPress={() => navigation.navigate("AddService")}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="View Staff"
          onPress={() =>
            navigation.navigate("ViewUsers", { userRole: "staff" })
          }
        />
      </View>

      <View style={styles.button}>
        <Button
          title="View Customers"
          onPress={() =>
            navigation.navigate("ViewUsers", { userRole: "customer" })
          }
        />
      </View>

      <View style={styles.button}>
        <Button
          title="View Services"
          onPress={() => navigation.navigate("ViewServices")}
        />
      </View>

      <View style={styles.button}>
        <Button title="Log Out" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default AdminDashboard;
