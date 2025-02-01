// styles/StyleAppointment.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495e",
    padding: 20,
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 40,
    borderRadius: 15,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
    marginTop: 20,
  },
  box: {
    width: "100%",
  },
  label: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  value: {
    color: "#bdc3c7",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  pickerContainer: {
    marginTop: 20,
    // Add these lines for iOS:
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Or a slightly darker transparent color
    borderRadius: 5, // Optional: Add some rounded corners
    padding: 5, // Optional: Add some padding around the Picker
  },
  picker :{
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  modal :{
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },

  // Add this style for Picker items (Android and iOS)
  pickerItem: {
    color: 'white', // Set the text color to white
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#3498db",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  pickerContainer: {
    marginTop: 20,
  },
});
