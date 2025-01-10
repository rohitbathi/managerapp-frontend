import React, { useState } from "react";
import { View, Button, TextInput, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createService } from "../services/api";
import { styles } from "../styles/FormStyles";

const AddService = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescripton] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  // const [CommissionRate, setComssionRate] = useState("");
  const [limitPerDay, setLimitPerDay] = useState("");

  const handleSubmit = async () => {
    // Handle form submission logic here
    try {
      const Data = {
        name: name,
        description: description,
        duration: duration,
        price: price,
        // CommissionRate: CommissionRate,
        limitPerDay: limitPerDay,
      };

      const response = await createService(Data);

      if (response.status === 200) {
        Alert.alert("service created");
        navigation.navigate("AdminDashboard");
      }
    } catch (error) {
      alert("Error Creating Service. please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.card}
          value={name}
          onChangeText={setName}
          placeholder="Service Name"
        />
        <TextInput
          style={styles.card}
          value={description}
          onChangeText={setDescripton}
          placeholder="Descripton"
        />
        <TextInput
          style={styles.card}
          value={duration}
          onChangeText={setDuration}
          placeholder="Duration"
        />
        <TextInput
          style={styles.card}
          value={price}
          onChangeText={setPrice}
          placeholder="Price"
        />
        {/* <TextInput
          style={styles.card}
          value={CommissionRate}
          onChangeText={setComssionRate}
          placeholder="Comssion Rate"
        /> */}
        <TextInput
          style={styles.card}
          value={limitPerDay}
          onChangeText={setLimitPerDay}
          placeholder="Limit Per Day"
        />
        <View style={styles.button}>
          <Button title="Add" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddService;
