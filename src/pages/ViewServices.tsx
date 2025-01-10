import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/AppointmentsStyles";
import { fetchServices } from "../services/api";

const ViewServices = () => {
  const navigation = useNavigation();
  const [serviceList, setServiceList] = useState([]);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServiceList(data);
      } catch (error) {
        alert("Error fetching Services!");
      }
    };
    loadServices();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={serviceList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>
                Name:<Text style={styles.cardValue}>{item.Name || "N/A"}</Text>
              </Text>

              <Text style={styles.cardLabel}>
                Duration:
                <Text style={styles.cardValue}>{item.duration || "N/A"}</Text>
              </Text>

              <Text style={styles.cardLabel}>
                Price:
                <Text style={styles.cardValue}>{item.price || "N/A"}</Text>
              </Text>

              <Text style={styles.cardLabel}>
                Limit Per Day:
                <Text style={styles.cardValue}>
                  {item.limitPerDay || "N/A"}
                </Text>
              </Text>

              <Text style={styles.cardLabel}>
                Description:
                <Text style={styles.cardValue}>
                  {item.description || "N/A"}
                </Text>
              </Text>
            </View>
          </View>
        )}
        // Adjust numColumns based on screen width and card width
        numColumns={Math.floor(width / (styles.cardContainer.width + 10))}
      />
    </View>
  );
};

export default ViewServices;
