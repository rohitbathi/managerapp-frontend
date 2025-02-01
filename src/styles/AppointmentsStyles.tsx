import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: "100%",
    fontFamily: "Open Sans",
    backgroundColor: "#34495e", // Match your login background color
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    width: 300,
  },
  card: {
    padding: 10,
    width: 300, // Adjust width as needed for two cards side-by-side
    margin: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1.5,
  },
  cardLabel: {
    color : 'white',
    fontWeight: "bold",
  },
  cardValue: {
    color : 'white',
    fontWeight: "light",
  },
});

export { styles };
