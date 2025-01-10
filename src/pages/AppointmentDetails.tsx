import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
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
    route.params.appointment.staffname || null
  );
  const role = route.params.role;
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    // if(appointment.status === 'Confirmed'){
    const loadStaffList = async () => {
      try {
        const data = await fetchStaffListByService(appointment.service_id);
        setStaffList(data);
        // const dummystaffList = [
        //   { id: 1, name: "John Doe" },
        //   { id: 2, name: "Jane Smith" },
        //   { id: 3, name: "Alice Johnson" },
        //   { id: 4, name: "Mark Lee" },
        // ];
        // setStaffList(dummystaffList);
      } catch (error) {
        alert("Error fetching StaffList!");
      }
    };
    loadStaffList();
  }, []);

  const changeAppointment = async (updatedFields) => {
    try {
      if (role === "admin") {
        const response = await updateAdminAppointment(
          appointment.id,
          updatedFields
        );
        setAppointment(response);
      } else {
        const response = await updateStaffAppointment(
          appointment.id,
          updatedFileds
        );
        setAppointment(response);
      }
      // setAppointment(updatedappointment);
    } catch (error) {
      alert("Error updating appointment");
    }
  };

  const handleStaffSelection = (staffId) => {
    setSelectedStaff(staffId);
    // Alert.alert('Staff Selected', `You have selected ${staffList.find(staff => staff.id === staffId).name}`);

    changeAppointment({
      staff_id: staffId,
    });
  };

  const handlePayment = () => {
    // payment calls
    changeAppointment({
      status: "Payment Done",
      PaymentStatus: "Paid",
    });
  };

  const handlecomplete = async () => {
    try {
      if (role === "Staff") {
        const response = await completeAppointment(appointment.id);
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
          <Text style={styles.value}> {appointment.customerName}</Text>
        </Text>
        <Text style={styles.label}>
          Service : <Text style={styles.value}>{appointment.serviceName}</Text>
        </Text>
        <Text style={styles.label}>
          Date : <Text style={styles.value}>{appointment.dat || "Today"}</Text>
        </Text>
        <Text style={styles.label}>
          Slot : <Text style={styles.value}>{appointment.slot}</Text>
        </Text>
        <Text style={styles.label}>
          Status : <Text style={styles.value}> {appointment.status}</Text>
        </Text>
        <Text style={styles.label}>
          Staff Name :{" "}
          <Text style={styles.value}>
            {/* {staffList.find((staff) => staff.id === appointment.staff_id)
              ?.name || "No Staff Assigned"} */}
            {appointment.staffName || "Staff Not Assigned"}
          </Text>
        </Text>
        {role === "admin" && (
          <>
            <Text style={styles.label}>
              Amount :{" "}
              <Text style={styles.value}>{appointment.amount || "$ 20"}</Text>
            </Text>
            <Text style={styles.label}>
              Payment Status :{" "}
              <Text style={styles.value}>
                {appointment.paymentStatus || "UnPaid"}
              </Text>
            </Text>
          </>
        )}

        {appointment.status === "Waitlist" && role === "admin" && (
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button
                title="Cancel"
                color="red"
                onPress={() => {
                  changeAppointment({ status: "Cancelled" });
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                color="green"
                onPress={() => {
                  changeAppointment({ status: "Confirmed" });
                }}
              />
            </View>
          </View>
        )}

        {(appointment.status === "Confirmed" ||
          appointment.status === "Payment Done") &&
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
                      key={staff.id}
                      label={staff.name}
                      value={staff.id}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}

        {appointment.status === "Confirmed" && role === "admin" && (
          <>
            <View style={styles.button}>
              <Button title="Payment" onPress={handlePayment} />
            </View>
          </>
        )}

        {appointment.status === "Payment Done" && role === "staff" && (
          <View style={styles.button}>
            <Button
              title="Start Service"
              onPress={() => {
                changeAppointment({ status: "In Progress" });
              }}
            />
          </View>
        )}

        {appointment.status === "In Progress" && role === "staff" && (
          <View style={styles.button}>
            <Button title="Complete" onPress={handlecomplete} />
          </View>
        )}
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "black",
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//     color: "#555",
//   },
//   value: {
//     fontWeight: "400",
//     color: "#000",
//   },
// });

export default AppointmentDetails;
