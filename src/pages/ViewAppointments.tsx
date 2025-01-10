import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, Dimensions } from "react-native";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  fetchAdminAppointments,
  fetchStaffAppointments,
} from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles/AppointmentsStyles";

const ViewAppointments = ({ route }) => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const role = route.params.role;

  useEffect(() => {
    const loadAppointments = async (date) => {
      try {
        if (role === "admin") {
          // const adminAppointments = await fetchAdminAppointments(date);
          // setAppointments(adminAppointments,selectedDate);
          console.log(date);
          const dummyAppointments = [
            {
              id: 1,
              customerName: "John Doe",
              serviceName: "Haircut",
              slot: "10:00 AM - 10:30 AM",
              status: "Confirmed",
              date: "2025-01-10",
            },
            {
              id: 2,
              customerName: "Jane Smith",
              serviceName: "Massage",
              slot: "11:00 AM - 12:00 PM",
              status: "Waitlist",
              date: "2025-01-11",
            },
            {
              id: 3,
              customerName: "Robert Brown",
              serviceName: "Manicure",
              slot: "12:30 PM - 1:00 PM",
              status: "Payment Done",
              staffName: "Dane Smith",
              date: "2025-01-10",
            },
            {
              id: 5,
              customerName: "Chris Black",
              serviceName: "Pedicure",
              slot: "3:30 PM - 4:00 PM",
              status: "Completed",
              staffName: "Lilly Adams",
              date: "2025-01-11",
            },
          ];
          setAppointments(dummyAppointments);
        } else {
          const staffAppointments = await fetchStaffAppointments(date);
          setAppointments(staffAppointments);
          // const dummyStaffAppointments = [
          //   {
          //     id: 1,
          //     customerName: "John Doe",
          //     serviceName: "Haircut",
          //     slot: "10:00 AM - 10:30 AM",
          //     staffName: "John Cena",
          //     status: "Payment Done",
          //   },
          //   {
          //     id: 2,
          //     customerName: "Jane Smith",
          //     serviceName: "Haircut",
          //     slot: "11:00 AM - 12:00 PM",
          //     staffName: "John Cena",
          //     status: "In Progress",
          //   },
          //   {
          //     id: 3,
          //     customerName: "Robert Brown",
          //     serviceName: "Haircut",
          //     slot: "12:30 PM - 1:00 PM",
          //     staffName: "John Cena",
          //     status: "Completed",
          //   },
          // ];
          // setAppointments(dummyStaffAppointments);
        }
      } catch (error) {
        alert("Error fetching appointments!");
      }
    };
    loadAppointments(selectedDate);
  }, []);

  const clickhandler = (appointment) => {
    try {
      // Alert.alert('Button Pressed')
      navigation.navigate("AppointmentDetails", { appointment, role });
    } catch (error) {
      Alert.alert("Error in viewing Appointment Details");
    }
  };

  const handleDateChange = async (event, date) => {
    console.log(date);
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const newDate = selectedDate.toISOString().slice(0, 10); // Format date for API call
      await fetchAppointments(newDate); // Fetch appointments for the new date
    }
  };
  const getButtonTitle = (status) => {
    if (role === "admin") {
      switch (status) {
        case "Waitlist":
          return "Confirm/Cancel";
        case "Confirmed":
          return "Payment";
        default:
          return "View Details";
      }
    } else {
      switch (status) {
        case "Payment Done":
          return "Start Service";
        case "In Progress":
          return "Complete";
        default:
          return "View Details";
      }
    }
  };

  const getButtonColor = (status) => {
    if (role === "admin") {
      switch (status) {
        case "Waitlist":
          return "red";
        case "Confirmed":
          return "green";
        default:
          return "black";
      }
    } else {
      switch (status) {
        case "Payment Done":
          return "blue";
        case "In Progress":
          return "green";
        default:
          return "black";
      }
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
        <View style={styles.dateContainer}>
          <Text style={styles.label}>Select Date :</Text>
          <Text style={styles.dateText} onPress={() => setShowDatePicker(true)}>
            {format(selectedDate, "yyyy-MM-dd")}
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="calnder"
              onChange={handleDateChange}
              // style={styles.datePicker}
            />
          )}
        </View>
        <View style={styles.fliterContainer}>
          <Text style={styles.label}>Select Status :</Text>
          {role === "admin" && (
            <Picker
              style={styles.pickerElement}
              selectedValue={selectedStatus}
              onValueChange={(itemValue) => setSelectedStatus(itemValue)}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Waitlist" value="Waitlist" />
              <Picker.Item label="Confirmed" value="Confirmed" />
              <Picker.Item label="Payment completed" value="Payment Done" />
              <Picker.Item label="In Progress" value="In Progress" />
              <Picker.Item label="Completed" value="Completed" />
              <Picker.Item label="Cancelled" value="Cancelled" />
            </Picker>
          )}
          {role === "staff" && (
            <Picker
              style={styles.pickerElement}
              selectedValue={selectedStatus}
              onValueChange={(itemValue) => setSelectedStatus(itemValue)}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Start Service" value="Payment Done" />
              <Picker.Item label="In Progress" value="In Progress" />
              <Picker.Item label="Completed" value="Completed" />
            </Picker>
          )}
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
                <>
                  <View style={styles.button}>
                    <Button
                      title={getButtonTitle(item.status)}
                      color={getButtonColor(item.status)}
                      onPress={() => clickhandler(item)}
                    />
                  </View>
                </>
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
