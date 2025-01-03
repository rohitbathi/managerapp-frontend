import { useState } from "react";
import { View,  Button,  TextInput, Alert, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUser } from "../services/api";
import { styles } from "../styles/FormStyles";

const AddUser = ({ route }) => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [hourlyWage, setHourlywage] = useState("");
  const [specialisation, setSpecialisation] = useState("");

  const role = route.params.userRole;
  const [user, setUser] = useState({});
  const handleSubmit = async () => {
    // Handle form submission logic here
    try {
      if ((role = "Staff")) {
        const staff = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phoneNumber,
          DOB: dob,
          Role: role,
          hourlyWage: hourlyWage,
          specialisation: specialisation,
        };
        setUser(staff);
      } else {
        const customerorAdmin = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phoneNumber,
          DOB: dob,
          Role: role,
        };
        setUser(customerorAdmin);
      }

      const response = await createUser(user);

      if (response.status == 200) {
        Alert.alert("User created");

        navigation.navigate("AdminDashboard");
      }
    } catch (error) {
      alert("Error in User creation. please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.card}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />
        <TextInput
          style={styles.card}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.card}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <TextInput
          style={styles.card}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.card}
          value={dob}
          onChangeText={setDob}
          placeholder="Date of Birth"
        />
        {role === "Staff" && (
          <>
            <TextInput
              style={styles.card}
              value={hourlyWage}
              onChangeText={setHourlywage}
              placeholder="Hourly Wage"
            />
            <TextInput
              style={styles.card}
              value={specialisation}
              onChangeText={setSpecialisation}
              placeholder="Specilization"
            />
          </>
        )}
        <View style={styles.button}>
          <Button title={"Add "+ role} onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddUser;
