import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/AppointmentsStyles";
import { fetchCustomers, fetchStaff } from "../services/api";

const ViewUsers = ({ route }) => {
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  const userRole = route.params.userRole;
  const { width } = Dimensions.get("window");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (userRole === "customer") {
          const data = await fetchCustomers();
          setUserList(data);
        } else {
          const data = await fetchStaff();
          setUserList(data);
        }
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
                Name:<Text style={styles.cardValue}>{item.name || "N/A"}</Text>
              </Text>

              <Text style={styles.cardLabel}>
                Phone:
                <Text style={styles.cardValue}>
                  {item.phone_number || "N/A"}
                </Text>
              </Text>

              <Text style={styles.cardLabel}>
                Email:
                <Text style={styles.cardValue}>{item.email || "N/A"}</Text>
              </Text>

              {userRole === "customer" && (
                <Text style={styles.cardLabel}>
                  Status:<Text style={styles.cardValue}>{item.status}</Text>
                </Text>
              )}

              {userRole === "staff" && (
                <>
                  <Text style={styles.cardLabel}>
                    Service:
                    <Text style={styles.cardValue}>
                      {item.service_name || "N/A"}
                    </Text>
                  </Text>

                  <Text style={styles.cardLabel}>
                    Availability:
                    <Text style={styles.cardValue}>
                      {item.available===1?"Available":"Not Available"}
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
