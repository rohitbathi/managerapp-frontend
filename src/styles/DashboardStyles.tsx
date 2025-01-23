import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "centr",
    maxHeight: 35,
    marginHorizontal :'50',
    marginTop: "20",
    justifyContent: "flex-end",
  },
  navbutton:{
    width: 100,
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonsContainer: {
    padding: 10,
    margin: 50,
    alignItems: "center",
    
  },
  button: {
    margin: 5,
    width: 200,
    borderWidth: 1.5,
    borderRadius: 5,
    overflow: "hidden",
  },
});

export { styles };
