import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StaffDashboard = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Button
        title="view appointments"
        onPress={() => navigation.navigate("Appointments")}
      />
      <Button
        title="View Customers"
        onPress={() =>
          navigation.navigate("ViewUsers", { userRole: "Customer" })
        }
      />
      <Button
        title="Add Customer"
        onPress={() => navigation.navigate("AddUser", { userRole: "Customer" })}
      />
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
});

export default StaffDashboard;
