import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomerDetails = ({ route }) => {
  const { Customer } = route.params;

  return (
    <View style={styles.container}>
      <Text>Customer: {Customer.firstName}</Text>
      <Text>Service: {Customer.lastName}</Text>
      <Text>Slot: {Customer.email}</Text>
      <Text>Status: {Customer.phoneNumber}</Text>
      <Text>Status: {Customer.dob}</Text>
      <Text>Status: {Customer.Address}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default CustomerDetails;
