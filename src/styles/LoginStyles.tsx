import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logincontainer: {
    width: 800,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 1,
    borderWidth: 2.5,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 50,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold",
    alignContent: "center",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    flexDirection: "row", // Use flexbox for layout
    alignItems: "center", // Center items vertically
    justifyContent: "center", // Center items horizontally
    marginTop: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5, // Add padding for better spacing
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
export { styles };
