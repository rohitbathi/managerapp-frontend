import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  box: {
    borderWidth: 2.5,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 50,
    width: "60%",
    paddingHorizontal: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "Light",
  },
  pickerContainer: {
    marginTop: 10,
  },
  button: {
    width: "40%",
    paddingTop: 10,
    marginHorizontal : 10,
    justifyContent: "center",
    alignItems: "left",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
  },
});

export { styles };
