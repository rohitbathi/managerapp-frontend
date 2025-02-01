import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Agenda } from "react-native-calendars";
import {
  fetchAdminAllAppointments,
  fetchStaffAppointments,
} from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";

const ViewAppointments = ({ route }) => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = route.params.role;

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const fetchAppointments =
          role === "admin" ? fetchAdminAllAppointments : fetchStaffAppointments;

        setLoading(true); // Start loading

        const response = await fetchAppointments("all");

        const formattedAppointments = {};

        response.appointments.forEach((appointment) => {
          const rawDate = appointment.date;
          const rawTime = appointment.startTime;

          if (!rawDate || !rawTime) {
            console.warn("Skipping invalid appointment:", appointment);
            return; // Skip invalid entries
          }

          const datePart = new Date(rawDate);
          if (isNaN(datePart.getTime())) {
            console.warn("Invalid date:", rawDate);
            return; // Skip invalid date
          }

          const sanitizedTime =
            rawTime.length === 5 ? `${rawTime}:00` : rawTime;
          const fullDateTime = `${
            datePart.toISOString().split("T")[0]
          }T${sanitizedTime}`;
          const validStartTime = new Date(fullDateTime);

          if (isNaN(validStartTime.getTime())) {
            console.warn("Invalid startTime:", sanitizedTime);
            return;
          }

          const dateKey = format(datePart, "yyyy-MM-dd");

          if (!formattedAppointments[dateKey]) {
            formattedAppointments[dateKey] = [];
          }

          formattedAppointments[dateKey].push({
            appointment_id: appointment.appointment_id,
            customer_name: appointment.customer_name,
            service_name: appointment.service_name,
            service_id: appointment.service_id,
            startTime: appointment.startTime,
            status: appointment.status || "N/A",
            staff_name: appointment.staff_name || "Not Assigned",
            paymentStatus: appointment.paymentStatus || "Not Paid",
            date: format(appointment.date, "yyyy-MM-dd"),
          });
        });
        setAppointments(formattedAppointments);
        setLoading(false); // Done loading
      } catch (error) {
        setLoading(false);
        setError("Error loading appointments. Please try again later.");
        console.error("Error loading appointments:", error);
      }
    };

    loadAppointments();
  }, [role]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.lable}>Loading appointments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.lable}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Agenda
        items={appointments}
        renderItem={(item) => (
          <View style={styles.agenda}>
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate("AppointmentDetails", {
                  appointment: item,
                  role,
                })
              }
            >
              <Text style={styles.lable}>{item.customer_name}</Text>
              <Text style={styles.lable}>{item.service_name}</Text>
              <Text style={styles.lable}>{item.startTime}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  item: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    margin: 10,
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  centered: {
    flex: 1,
    backgroundColor: "#34495e",
    justifyContent: "center",
    alignItems: "center",
  },
  lable : {
    color :'white',
  }
});

export default ViewAppointments;
