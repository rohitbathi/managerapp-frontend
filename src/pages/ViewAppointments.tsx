import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, Dimensions } from "react-native";
import { fetchAdminAppointments } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles/AppointmentsStyles";

const ViewAppointments = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customerName: "John Doe",
      serviceName: "Haircut",
      slot: "10:00 AM - 10:30 AM",
      status: "Confirmed",
    },
  ]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        // const data = await fetchAdminAppointments();
        const dummyAppointments = [
          {
            id: 1,
            customerName: "John Doe",
            serviceName: "Haircut",
            slot: "10:00 AM - 10:30 AM",
            status: "Confirmed",
          },
          {
            id: 2,
            customerName: "Jane Smith",
            serviceName: "Massage",
            slot: "11:00 AM - 12:00 PM",
            status: "Waitlist",
          },
          {
            id: 3,
            customerName: "Robert Brown",
            serviceName: "Manicure",
            slot: "12:30 PM - 1:00 PM",
            status: "Staff Appointed",
          },
          {
            id: 4,
            customerName: "Emily White",
            serviceName: "Facial",
            slot: "2:00 PM - 3:00 PM",
            status: "In Progress",
          },
          {
            id: 5,
            customerName: "Chris Black",
            serviceName: "Pedicure",
            slot: "3:30 PM - 4:00 PM",
            status: "Completed",
          },
        ];

        setAppointments(dummyAppointments);
      } catch (error) {
        alert("Error fetching appointments!");
      }
    };
    loadAppointments();
  }, []);

  const clickhandler = (appointment) => {
    try {
      // Alert.alert('Button Pressed')
      navigation.navigate("AppointmentDetails", { appointment });
    } catch (error) {
      Alert.alert("Error in viewing Appointment Details");
    }
  };

  const getButtonTitle = (status) => {
    switch (status) {
      case "Waitlist":
        return "Confirm/Cancel";
      case "Confirmed":
        return "Appoint Staff";
      case "Staff Appointed":
        return "Start Service";
      case "In Progress":
        return "Payment";
      case "Completed":
        return "Completed";
      default:
        return "Cancelled";
    }
  };

  const getButtonColor = (status) => {
    switch (status) {
      case "Waitlist":
        return "red";
      case "Confirmed":
        return "orange";
      case "Staff Appointed":
        return "blue";
      case "In Progress":
        return "green";
      case "Completed":
        return "black";
      default:
        return "grey";
    }
  };

  const filteredAppointments =
    selectedStatus === "All"
      ? appointments
      : appointments.filter((item) => item.status === selectedStatus);

  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Apppiontments</Text> */}
      <View style={styles.navbar}>
        <View style={styles.emptyspace}></View>
        <View style={styles.fliterContainer}>
          <Text style={styles.label}>Select Status:</Text>
          <Picker
            style={styles.pickerelement}
            selectedValue={selectedStatus}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Waitlist" value="Waitlist" />
            <Picker.Item label="Confirmed" value="Confirmed" />
            <Picker.Item label="Staff Appointed" value="Staff Appointed" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Completed" value="Completed" />
            <Picker.Item label="Cancelled" value="Cancelled" />
          </Picker>
        </View>
      </View>

      <View style={styles.flatcontainer}>
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardLabel}>
                  Customer:{" "}
                  <Text style={styles.cardValue}>{item.customerName}</Text>
                </Text>
                <Text style={styles.cardLabel}>
                  Service:{" "}
                  <Text style={styles.cardValue}>{item.serviceName}</Text>
                </Text>
                <Text style={styles.cardLabel}>
                  Slot: <Text style={styles.cardValue}>{item.slot}</Text>
                </Text>
                <Text style={styles.cardLabel}>
                  Status: <Text style={styles.cardValue}>{item.status}</Text>
                </Text>
                <View style={styles.button}>
                  <Button
                    title={getButtonTitle(item.status)}
                    color={getButtonColor(item.status)}
                    onPress={() => clickhandler(item)}
                  />
                </View>
              </View>
            </View>
          )}
          // Calculate numColumns based on screen width and card width
          numColumns={Math.floor(width / (styles.cardContainer.width + 10))}
        />
      </View>
    </View>
  );
};

export default ViewAppointments;
