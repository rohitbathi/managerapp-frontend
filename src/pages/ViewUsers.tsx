import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/AppointmentsStyles";

const ViewUsers = ({ route }) => {
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  const userRole = route.params.userRole;
  const { width } = Dimensions.get("window");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // const data = await fetchUsers({role : UserRole});
        const dummyUsers = [
          {
            id: 1,
            Name: "John Doe",
            Phone: "1234567890",
            email: "123@gmail.com",
            status: "Active",
            specilisation: "Hair cut",
            HourlyWage: "$20",
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

        setUserList(dummyUsers);
        // setUserList(data)
      } catch (error) {
        alert("Error fetching appointments!");
      }
    };
    loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>
                Name:<Text style={styles.cardValue}>{item.Name || "N/A"}</Text>
              </Text>

              <Text style={styles.cardLabel}>
                Phone:
                <Text style={styles.cardValue}>{item.Phone || "N/A"}</Text>
              </Text>

              <Text style={styles.cardLabel}>
                Email:
                <Text style={styles.cardValue}>{item.email || "N/A"}</Text>
              </Text>

              {userRole === "Customer" && (
                <Text style={styles.cardLabel}>
                  Status:<Text style={styles.cardValue}>{item.status}</Text>
                </Text>
              )}

              {userRole === "Staff" && (
                <>
                  <Text style={styles.cardLabel}>
                    Specialisation:
                    <Text style={styles.cardValue}>
                      {item.specilisation || "N/A"}
                    </Text>
                  </Text>

                  <Text style={styles.cardLabel}>
                    Avaliablity:
                    <Text style={styles.cardValue}>
                      {item.avaliablity|| "Not Available"}
                    </Text>
                  </Text>

                  <Text style={styles.cardLabel}>
                    Hourly Wage:
                    <Text style={styles.cardValue}>
                      {item.hourlyWage || "N/A"}
                    </Text>
                  </Text>
                </>
              )}
            </View>
          </View>
        )}
        // Adjust numColumns based on screen width and card width
        numColumns={Math.floor(width / (styles.cardContainer.width + 10))}
      />
    </View>
  );
};

export default ViewUsers;
