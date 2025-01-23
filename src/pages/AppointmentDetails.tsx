import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { styles } from "../styles/StyleAppointment";
import { format } from "date-fns";
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
    // if(appointment.status === 'Confirmed'){
    const loadStaffList = async () => {
      try {
        console.log("detail page : ", appointment)
        const data = await fetchStaffListByService(appointment.service_id,appointment.date,appointment.startTime);
        setStaffList(data);
      } catch (error) {
        alert("Error fetching StaffList!");
      }
    };
    loadStaffList();
  }, []);

  const changeAppointment = async (updatedFields, app) => {
    try {
      if (role === "admin") {
        const response = await updateAdminAppointment(
          appointment.appointment_id,
          updatedFields
        );
        setAppointment((prev) => ({ ...prev, ...updatedFields })); // Create a new object with updated fields
      } else {
        const response = await updateStaffAppointment(
          appointment.appointment_id,
          updatedFields
        );
        setAppointment((prev) => ({ ...prev, ...updatedFields })); // Create a new object with updated fields
      }
    } catch (error) {
      alert("Error updating appointment");
    }
  };
  

  const handleStaffSelection = (staff) => {
    setSelectedStaff(staff.staff_id);
  
    changeAppointment(
      {
        staff_id: staff.staff_id,
      },
      { ...appointment, staff_name: staff.name, staff_id: staff.staff_id }
    );
  };
  
  const handlePayment = () => {
    // payment calls

    changeAppointment({
      paymentStatus: "paid",
    }, { ...appointment, paymentStatus: "paid" });
  };

  const handlecomplete = async () => {
    try {
      if (role === "staff") {
        const response = await completeAppointment(appointment.appointment_id);
        setAppointment(response);
      }
    } catch (error) {
      Alert.alert("Could not complete Appiontment, try Again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label}>
          Customer :{" "}
          <Text style={styles.value}> {appointment.customer_name}</Text>
        </Text>
        <Text style={styles.label}>
          Service : <Text style={styles.value}>{appointment.service_name}</Text>
        </Text>
        <Text style={styles.label}>
          Date : <Text style={styles.value}>{format(appointment.date, "yyyy-MM-dd") || "Today"}</Text>
        </Text>
        <Text style={styles.label}>
          Start Time : <Text style={styles.value}>{appointment.startTime}</Text>
        </Text>
        <Text style={styles.label}>
          Status : <Text style={styles.value}> {appointment.status}</Text>
        </Text>
        <Text style={styles.label}>
          Staff Name :{" "}
          <Text style={styles.value}>
            {appointment.staff_name || "Staff Not Assigned"}
          </Text>
        </Text>
        {role === "admin" && (
          <>
            <Text style={styles.label}>
              Payment Status :{" "}
              <Text style={styles.value}>
                {appointment.paymentStatus}
              </Text>
            </Text>
          </>
        )}

        {appointment.status === "waitlist" && role === "admin" && (
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button
                title="Cancel"
                color="red"
                onPress={() => {
                  changeAppointment({ status: "cancelled" });
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                color="green"
                onPress={() => {
                  changeAppointment({ status: "confirmed" });
                }}
              />
            </View>
          </View>
        )}

        {(appointment.status === "confirmed") &&
          role === "admin" && (
            <>
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Change Staff:</Text>
                <Picker
                  selectedValue={selectedStaff}
                  onValueChange={(itemValue) => handleStaffSelection(itemValue)}
                >
                  {staffList.map((staff) => (
                    <Picker.Item
                      key={staff.staff_id}
                      label={staff.name}
                      value={staff}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}

        {appointment.status === "confirmed"&& appointment.paymentStatus === "pending" && role === "admin" && (
          <>
            <View style={styles.button}>
              <Button title="Payment" onPress={handlePayment} />
            </View>
          </>
        )}

        {appointment.status === "confirmed" && appointment.paymentStatus === "paid" && role === "staff" && (
          <View style={styles.button}>
            <Button
              title="Start Service"
              onPress={() => {
                changeAppointment({ status: "inProgress" });
              }}
            />
          </View>
        )}

        {appointment.status === "inProgress" && role === "staff" && (
          <View style={styles.button}>
            <Button title="Complete" onPress={handlecomplete} />
          </View>
        )}
      </View>
    </View>
  );
};

export default AppointmentDetails;
