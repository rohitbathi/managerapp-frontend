import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { styles } from "../styles/StyleAppointment";

import {
  updateAppointment,
  fetchStaffListByService,
  fetchStaffByAppointment,
} from "../services/api";

const AppointmentDetails = ({ route }) => {
  const [appointment, setAppointment] = useState(route.params.appointment);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    // if(appointment.status === 'Confirmed'){
    const loadStaffList = async () => {
      try {
        // const data = await fetchStaffListByService(appointment.service_id);
        const dummystaffList = [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
          { id: 3, name: "Alice Johnson" },
          { id: 4, name: "Mark Lee" },
        ];
        setStaffList(dummystaffList);
        // setStaffList(data);
      } catch (error) {
        alert("Error fetching StaffList!");
      }
    };
    loadStaffList();
    // }
    // else if(appointment.status!== 'Waitlist'){
    //   const loadStaff = async () => {
    //     try{
    //       const data = await fetchStaffByAppointment(appointment.staff_id)
    //       setStaffList([data]);
    //     }catch(error){
    //       alert('Error fetching Staff!');
    //     }
    //   }
    //   loadStaff();
    // }
  }, []);

  const changeAppointment = async (updatedappointment) => {
    try {
      // const response = await UpdateAppointment(updatedappointment);
      // if(response.status === 200){
      //   setAppointment(updatedappointment);
      // }
      setAppointment(updatedappointment);
    } catch (error) {
      alert("Error updating appointment");
    }
  };

  const handleStaffSelection = (staffId) => {
    setSelectedStaff(staffId);
    // Alert.alert('Staff Selected', `You have selected ${staffList.find(staff => staff.id === staffId).name}`);

    changeAppointment({
      ...appointment,
      staff_id: staffId,
      status: "Staff Appointed",
    });
  };

  const handlePayment = () => {
    // payment calls
    changeAppointment({
      ...appointment,
      status: "Completed",
      paymentstauts: "Paid",
    });
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
            {staffList.find((staff) => staff.id === appointment.staff_id)
              ?.name || "No Staff Assigned"}
          </Text>
        </Text>
        <Text style={styles.label}>
          Payment :{" "}
          <Text style={styles.value}>
            {appointment.payment || "N/A"}
          </Text>
        </Text>
        <Text style={styles.label}>
          Payment Status :{" "}
          <Text style={styles.value}>
            {appointment.paymentstauts || "UnPaid"}
          </Text>
        </Text>

        {appointment.status === "Confirmed" && (
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Select Staff:</Text>
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
        )}

        {appointment.status === "Waitlist" && (
          <View style={styles.buttonsContainer}>
             <View style={styles.button}>
              <Button
                title="Cancel"
                color = 'red'
                onPress={() => {
                  changeAppointment({ ...appointment, status: "Cancelled" });
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                color="green"
                onPress={() => {
                  changeAppointment({ ...appointment, status: "Confirmed" });
                }}
              />
            </View>
           
          </View>
        )}

        {appointment.status === "Staff Appointed" && (
          <View style={styles.button}>
            <Button
              title="Start Service"
              onPress={() => {
                changeAppointment({ ...appointment, status: "In Progress" });
              }}
            />
          </View>
        )}

        {appointment.status === "In Progress" && (
          <View style={styles.button}>
            <Button title="Payment" onPress={handlePayment} />
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
