import React from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { styles } from "../styles/StyleAppointment";
import {
  updateAdminAppointment,
  updateStaffAppointment,
  fetchStaffListByService,
  completeAppointment,
} from "../services/api";

const AppointmentDetails = ({ route }) => {
  const [appointment, setAppointment] = useState(route.params.appointment);
  const [selectedStaff, setSelectedStaff] = useState(
    route.params.appointment.staff_id || null
  );
  const role = route.params.role;
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const loadStaffList = async () => {
      try {
        const data = await fetchStaffListByService(
          appointment.service_id,
          appointment.date,
          appointment.startTime
        );
        setStaffList(data);
      } catch (error) {
        alert("Error fetching StaffList!");
      }
    };
    loadStaffList();
  }, [appointment.service_id, appointment.date, appointment.startTime]); // Add dependencies

  const changeAppointment = async (updatedFields) => { // Removed app parameter
    try {
      if (role === "admin") {
        await updateAdminAppointment(appointment.appointment_id, updatedFields);
      } else {
        await updateStaffAppointment(appointment.appointment_id, updatedFields);
      }
      setAppointment((prev) => ({ ...prev, ...updatedFields }));
    } catch (error) {
      alert("Error updating appointment");
    }
  };

  const handleStaffSelection = (staff) => {
    setSelectedStaff(staff.staff_id);
    changeAppointment({ staff_id: staff.staff_id, staff_name: staff.name }); // Directly update staff_name
  };

  const handlePayment = () => {
    changeAppointment({ paymentStatus: "paid" });
  };

  const handlecomplete = async () => {
    try {
      if (role === "staff") {
        const response = await completeAppointment(appointment.appointment_id);
        setAppointment(response); // Update with the returned appointment data
      }
    } catch (error) {
      Alert.alert("Could not complete Appointment, try Again");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.box}>
          <Text style={styles.label}>
            Customer : <Text style={styles.value}>{appointment.customer_name}</Text>
          </Text>
          <Text style={styles.label}>
            Service : <Text style={styles.value}>{appointment.service_name}</Text>
          </Text>
          <Text style={styles.label}>
            Date :{" "}
            <Text style={styles.value}>
              {format(new Date(appointment.date), "yyyy-MM-dd")}
            </Text>
          </Text>
          <Text style={styles.label}>
            Start Time : <Text style={styles.value}>{appointment.startTime}</Text>
          </Text>
          <Text style={styles.label}>
            Status : <Text style={styles.value}>{appointment.status}</Text>
          </Text>
          <Text style={styles.label}>
            Staff Name :{" "}
            <Text style={styles.value}>
              {appointment.staff_name || "Staff Not Assigned"}
            </Text>
          </Text>

          {role === "admin" && (
            <Text style={styles.label}>
              Payment Status :{" "}
              <Text style={styles.value}>{appointment.paymentStatus}</Text>
            </Text>
          )}

          {appointment.status === "waitlist" && role === "admin" && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => changeAppointment({ status: "cancelled" })}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={() => changeAppointment({ status: "confirmed" })}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}

          {appointment.status === "confirmed" && role === "admin" && (
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Change Staff:</Text>
              <Picker 
                selectedValue={selectedStaff}
                onValueChange={(itemValue) => handleStaffSelection(itemValue)}
                style ={styles.picker}
              > 
                {staffList.map((staff) => (
                  <Picker.Item
                    key={staff.staff_id}
                    label={staff.name}
                    value={staff}
                    style={styles.pickerItem} 
                  />
                ))}
              </Picker>
            </View>
          )}

          {appointment.status === "confirmed" &&
            appointment.paymentStatus === "pending" &&
            role === "admin" && (
              <TouchableOpacity style={styles.button} onPress={handlePayment}>
                <Text style={styles.buttonText}>Payment</Text>
              </TouchableOpacity>
            )}

          {appointment.status === "confirmed" &&
            appointment.paymentStatus === "paid" &&
            role === "staff" && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => changeAppointment({ status: "inProgress" })}
              >
                <Text style={styles.buttonText}>Start Service</Text>
              </TouchableOpacity>
            )}

          {appointment.status === "inProgress" && role === "staff" && (
            <TouchableOpacity style={styles.button} onPress={handlecomplete}>
              <Text style={styles.buttonText}>Complete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default AppointmentDetails;
