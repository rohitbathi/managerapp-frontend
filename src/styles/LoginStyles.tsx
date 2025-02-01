import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 40, // Increased padding for larger container
    borderRadius: 15, // Increased border radius
    width: 400,    // Increased width
    // height: 300,  // You can set a specific height if needed
  },
  title: {
    fontSize: 36,   // Increased font size
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: '#bdc3c7',
    marginBottom: 8,
    fontSize: 20,   // Increased font size
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    padding: 12,
    borderRadius: 8,   // Increased border radius
    fontSize: 18,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,   // Increased border radius
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,   // Increased font size
  },
});
export { styles };
