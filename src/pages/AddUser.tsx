import { useEffect, useState } from "react";
import { View, Button, TextInput, Alert, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createAdmin, createStaff } from "../services/api";
import { styles } from "../styles/FormStyles";
import { Picker } from "@react-native-picker/picker";

const AddUser = ({ route }) => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [hourlyWage, setHourlywage] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [password, setPassword] = useState("");
  const [serviceList, setServiceList] = useState([]);

  const role = route.params.userRole;
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadServices = async () => {
      try {
        // const data = await fetchServices();
        // setServiceList(data);
        const dummyServices = [
          {
            id: 1,
            name: "Haircut",
          },
          {
            id: 2,
            name: "Maniecure",
          },
          {
            id: 3,
            name: "Massage",
          },
        ];
        setServiceList(dummyServices);
      } catch (error) {
        alert("Error fetching Services!");
      }
    };
    if (role === "staff") loadServices();
  }, []);

  const handleSubmit = async () => {
    // Handle form submission logic here
    try {
      if ((role = "staff")) {
        const staff = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          dob: dob,
          role: role,
          hourlyWage: hourlyWage,
          service_id: ServiceId,
          password: password,
        };
        setUser(staff);
        const response = await createStaff(user);

        if (response.status === 200) {
          Alert.alert("User created");

          navigation.navigate("AdminDashboard");
        }
      } else {
        const customerorAdmin = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          dob: dob,
          role: role,
          password: password,
        };
        setUser(customerorAdmin);
        const response = await createAdmin(user);

        if (response.status === 200) {
          Alert.alert("User created");

          navigation.navigate("AdminDashboard");
        }
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
        {role === "staff" && (
          <>
            <TextInput
              style={styles.card}
              value={hourlyWage}
              onChangeText={setHourlywage}
              placeholder="Hourly Wage"
            />
            <View style={styles.card}>
              <Text style={styles.label}>Select Staff:</Text>
              <Picker
                selectedValue={serviceId}
                onValueChange={(itemValue) => setServiceId(itemValue)}
              >
                {serviceList.map((service) => (
                  <Picker.Item
                    key={service.id}
                    label={service.name}
                    value={service.id}
                  />
                ))}
              </Picker>
            </View>
          </>
        )}

        <TextInput
          style={styles.card}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />

        <View style={styles.button}>
          <Button title={"Add " + role} onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddUser;
