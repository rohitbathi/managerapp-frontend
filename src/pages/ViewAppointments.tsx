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
          const adminAppointments = await fetchAdminAppointments(date);
          setAppointments(adminAppointments.appointments);
        } else {
          const staffAppointments = await fetchStaffAppointments(date);
          setAppointments(staffAppointments.appointments);
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

  const handleDateChange = async (date) => {
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
        case "waitlist":
          return "Confirm/Cancel";
        case "confirmed":
          return "Payment";
        default:
          return "View Details";
      }
    } else {
      switch (status) {
        case "paymentDone":
          return "Start Service";
        case "inProgress":
          return "Complete";
        default:
          return "View Details";
      }
    }
  };

  const getButtonColor = (status) => {
    if (role === "admin") {
      switch (status) {
        case "waitlist":
          return "red";
        case "confirmed":
          return "green";
        default:
          return "black";
      }
    } else {
      switch (status) {
        case "paymentDone":
          return "blue";
        case "inProgress":
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
              <Picker.Item label="Waitlist" value="waitlist" />
              <Picker.Item label="Confirmed" value="confirmed" />
              <Picker.Item label="Payment completed" value="paymentDone" />
              <Picker.Item label="In Progress" value="inProgress" />
              <Picker.Item label="Completed" value="completed" />
              <Picker.Item label="Cancelled" value="cancelled" />
            </Picker>
          )}
          {role === "staff" && (
            <Picker
              style={styles.pickerElement}
              selectedValue={selectedStatus}
              onValueChange={(itemValue) => setSelectedStatus(itemValue)}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Start Service" value="paymentDone" />
              <Picker.Item label="In Progress" value="inProgress" />
              <Picker.Item label="Completed" value="completed" />
            </Picker>
          )}
        </View>
      </View>

      <View style={styles.flatcontainer}>
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.appointment_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardLabel}>
                  Customer :{" "}
                  <Text style={styles.cardValue}>{item.customer_name}</Text>
                </Text>
                <Text style={styles.cardLabel}>
                  Service :{" "}
                  <Text style={styles.cardValue}>{item.service_name}</Text>
                </Text>
                <Text style={styles.cardLabel}>
                  Date : <Text style={styles.cardValue}>{format(item.date, "yyyy-MM-dd")}</Text>
                </Text>
                <Text style={styles.cardLabel}>
                  Start Time : <Text style={styles.cardValue}>{item.startTime}</Text>
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
