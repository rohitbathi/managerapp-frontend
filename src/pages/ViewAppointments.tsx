import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, Dimensions } from "react-native";
import {
  fetchAdminAppointments,
  fetchStaffAppointments,
} from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles/AppointmentsStyles";

const ViewAppointments = ({ route }) => {
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
  const user = route.params.user;

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        if (user.role === "Admin") {
          // const adminAppointments = await fetchAdminAppointments();
          // setAppointments(adminAppointments)
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
              staffName : "Dane Smith"
            },
            {
              id: 5,
              customerName: "Chris Black",
              serviceName: "Pedicure",
              slot: "3:30 PM - 4:00 PM",
              status: "Completed",
              staffName : "Lilly Adams"
            },
          ];
          setAppointments(dummyAppointments);
        } else {
          // const staffAppointments = await fetchStaffAppointments({id = user.id, payment_status : "paid"});
          // setAppointments(staffAppointments)
          const dummyStaffAppointments = [
            {
              id: 1,
              customerName: "John Doe",
              serviceName: "Haircut",
              slot: "10:00 AM - 10:30 AM",
              staffName : "John Cena",
              status: "Payment Done",
            },
            {
              id: 2,
              customerName: "Jane Smith",
              serviceName: "Haircut",
              slot: "11:00 AM - 12:00 PM",
              staffName : "John Cena",
              status: "In Progress",
            },
            {
              id: 3,
              customerName: "Robert Brown",
              serviceName: "Haircut",
              slot: "12:30 PM - 1:00 PM",
              staffName : "John Cena",
              status: "Completed",
            },
          ];
          setAppointments(dummyStaffAppointments)
        }
      } catch (error) {
        alert("Error fetching appointments!");
      }
    };
    loadAppointments();
  }, []);

  const clickhandler = (appointment) => {
    try {
      // Alert.alert('Button Pressed')
      navigation.navigate("AppointmentDetails", { appointment, user });
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
        return "Payment";
      case "Payment Done":
        return "Start Service";
      case "In Progress":
        return "Complete";
      default:
        return "View Details";
    }
  };

  const getButtonColor = (status) => {
    switch (status) {
      case "Waitlist":
        return "red";
      case "Confirmed":
        return "orange";
      case "Staff Appointed":
        return "green";
      case "Payment Done":
        return "blue";
      case "In Progress":
        return "green";
      default:
        return "black";
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
          {user.role ==='Admin' &&
          <Picker
            style={styles.pickerelement}
            selectedValue={selectedStatus}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Waitlist" value="Waitlist" />
            <Picker.Item label="Confirmed" value="Confirmed" />
            <Picker.Item label="Staff Appointed" value="Staff Appointed" />
            <Picker.Item label="Payment completed" value="Payment Done" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Completed" value="Completed" />
            <Picker.Item label="Cancelled" value="Cancelled" />
          </Picker>
          }
          {user.role ==='Staff' &&      
          <Picker
            style={styles.pickerelement}
            selectedValue={selectedStatus}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Start Service" value="Payment Done" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Completed" value="Completed" />
          </Picker>
          }
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
