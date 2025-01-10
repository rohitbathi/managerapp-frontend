import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchAdminAppointments } from "../services/api";

const getstaffList = () => {
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      staffName: "John Doe",
      hourlyWage: "20 $",
      Specialisation: "Haircut",
    },
  ]);

  useEffect(() => {
    const loadStaffList = async () => {
      try {
        // const data = await fetchStaffList();
        const dummyStaffList = [
          {
            id: 1,
            staffName: "John Doe",
            hourlyWage: "20 $",
            Specialisation: "Haircut",
          },
          {
            id: 1,
            staffName: "John Doe",
            hourlyWage: "20 $",
            Specialisation: "Haircut",
          },
          {
            id: 1,
            staffName: "John Doe",
            hourlyWage: "20 $",
            Specialisation: "Haircut",
          },
          {
            id: 1,
            staffName: "John Doe",
            hourlyWage: "20 $",
            Specialisation: "Haircut",
          },
          {
            id: 1,
            staffName: "John Doe",
            hourlyWage: "20 $",
            Specialisation: "Haircut",
          },
        ];

        setStaffList(dummyStaffList);
      } catch (error) {
        alert("Error fetching Staff!");
      }
    };
    loadStaffList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <FlatList
        data={staffList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Staff: {item.StaffName}</Text>
            <Text>hourlywage: {item.hourlywage}</Text>
            <Text>Specilisation: {item.Specialisation}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
});

export default getstaffList;
