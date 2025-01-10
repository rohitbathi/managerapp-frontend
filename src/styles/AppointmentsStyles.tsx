import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: "100%",
    fontFamily: "Open Sans",
  },
  navbar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between", // Distribute space evenly between date and status containers
    alignItems: "center",
    padding: 10,
    maxHeight: 50,
  },
  dateContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fliterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    maxWidth: 150,
  },
  dateText: {
    flex: 1,
    maxWidth: 100,
    fontSize: 16,
  },
  pickerElement: {
    flex: 2,
    maxWidth: 250,
    fontSize: 16,
  },
  datePicker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
  },
  flatcontainer: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 100,
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
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1.5,
  },
  cardLabel: {
    fontWeight: "bold",
  },
  cardValue: {
    fontWeight: "light",
  },
  buttonscontainer: {
    width: "100%",
    flexDirection: "row",
  },
  button: {
    width: "100%", // Match card width
    justifyContent: "center",
    alignItems: "left",
    marginTop: 20,
  },
});

export { styles };
