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
            email: "john123@gmail.com",
            availability: "Available",
            role: "Staff",
            specilisation: "Hair cut",
            hourlyWage: "$20",
          },
          {
            id: 2,
            Name: "Jane Smith",
            Phone: "893245617",
            email: "jane123@gmail.com",
            role: "Customer",
          },
          {
            id: 3,
            Name: "John cena",
            Phone: "9087654321",
            email: "john1234@gmail.com",
            availability: "Not Available",
            role: "Staff",
            specilisation: "Hair cut",
            hourlyWage: "$20",
          },
          {
            id: 4,
            Name: "Danies Lilly",
            Phone: "9999999999",
            email: "danies123@gmail.com",
            role: "Customer",
          },
          {
            id: 4,
            Name: "Andrew Strauss",
            Phone: "8234567109",
            email: "andrew123@gmail.com",
            availability: "Available",
            role: "Staff",
            specilisation: "Maincure",
            hourlyWage: "$15",
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

  const filteredUsers = userList.filter((item) => item.role === userRole);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUsers}
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

              {/* {userRole === "Customer" && (
                <Text style={styles.cardLabel}>
                  Status:<Text style={styles.cardValue}>{item.status}</Text>
                </Text>
              )} */}

              {userRole === "Staff" && (
                <>
                  <Text style={styles.cardLabel}>
                    Specialisation:
                    <Text style={styles.cardValue}>
                      {item.specilisation || "N/A"}
                    </Text>
                  </Text>

                  <Text style={styles.cardLabel}>
                    Availability:
                    <Text style={styles.cardValue}>
                      {item.availability || "Not Available"}
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
