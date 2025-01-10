import { StyleSheet } from "react-native";

const styles ={
    container: {
        flex: 1,
        padding: 20, 
        justifyContent: 'center',
        alignItems : "center",
        fontFamily :'Open Saus'
      },
    card: {
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        width : "50%",
        fontsize:16,
        fontWeight: 'bold',
    },
    button:{
        width: "50%",
        paddingTop: 10,
        justifyContent: "center",
        alignItems: "left",
    },
    label:{
        fontSize:16,
        fontWeight:'blur',
    }
}


export {styles};