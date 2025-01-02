import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: "100%",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  emptyspace: {
    width: 0,
    flex: 1,
  },
  fliterContainer: {
    width: "25%",
    display: "flex",
    flexDirection: "row",
    alignItems: "right",
  },
  label: {
    paddingTop: 15,
    flex: 1,
    marginright: 10,
    height: "100%",
    fontSize: 16,
  },
  pickerelement: {
    flex: 2,
    height: "100%",
    fontSize: 16,
  },
  flatcontainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom:100,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical:10,
    width: 300,
  },
  card: {
    padding: 10,
    width: 300, // Adjust width as needed for two cards side-by-side
    margin: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    fontSize: 16,
  },
  cardLabel: {
    fontWeight: "bold",
  },
  cardValue: {
    fontWeight: "light",
  },
  buttonscontainer:{
    width:"100%",
    flexDirection:'row',

  },
  button: {
    width: "100%", // Match card width
    justifyContent: "center",
    alignItems: "left",
    margin:20,
  },
});

export { styles };
