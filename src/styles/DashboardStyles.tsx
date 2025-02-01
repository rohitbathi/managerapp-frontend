/* styles/DashboardStyles.js or your styles file */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495e", // Match your login background color
  },
  header: {
    // Clock In/Out styling
    position: "absolute", // Position it absolutely
    top: 40, // Adjust from the top as needed
    right: 20, // Adjust from the right as needed
    zIndex: 1, // Ensure it's above other content
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 40,
    borderRadius: 15,
    width: "90%", // Make content responsive
    maxWidth: 400, // Set a max width
    alignSelf: "center", // Center the content horizontally
    marginTop: 40, //
  },
  navButton: {
    // Clock In/Out button
    borderRadius: 20, // More rounded
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db", // Blue color
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginRight: 20,
  },
  navButtonText: {
    color: "white",
    fontSize: 16, // Slightly smaller
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    // Other buttons (STYLED TO MATCH LOGIN BUTTON)
    borderRadius: 5, // Match Login Button
    marginVertical: 15,
    width: "80%",
    maxWidth: 300,
    height: 50, // Or adjust as needed
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db", // Match Login Button color
    padding: 12, // Match Login Button padding
  },
  buttonText: {
    // Other button text
    color: "white",
    fontSize: 18, // Match Login Button text size
    fontWeight: "bold", // Match Login Button text weight
    textAlign: "center",
  },
});
