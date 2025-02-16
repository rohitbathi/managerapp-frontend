import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#34495e',
  },
  title: {
    fontSize: 24,
    color : "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  staffItem: {
    flexDirection: "row",
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  staffName: {
    color : 'white',
    fontSize: 18,
  },
  cardModalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: "60%",
    height: "60%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "10%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  modalText: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  inputField: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "60%",
    alignItems: "center",
    fontWeight:"600"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    marginTop: 20,
  },
  button:{
    width: 150,
  },
});

export { styles };
