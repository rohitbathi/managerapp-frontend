import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login";
import AdminDashboard from "./src/pages/AdminDashboard";
import StaffDashboard from "./src/pages/StaffDashboard";
import AddUser from "./src/pages/AddUser";
import AddService from "./src/pages/AddService";
import AppointmentDetails from "./src/pages/AppointmentDetails";
import ViewAppointments from "./src/pages/ViewAppointments";
import ViewUsers from "./src/pages/ViewUsers";
import ViewServices from "./src/pages/ViewServices";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="StaffDashboard" component={StaffDashboard} />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={({ route }) => ({
            title: "Add " + route.params.userRole || "Add User",
          })}
        />
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="Appointments" component={ViewAppointments} />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetails}
        />
        <Stack.Screen
          name="ViewUsers"
          component={ViewUsers}
          options={({ route }) => ({
            title: "View " + route.params.userRole || "Add User",
          })}
        />
        <Stack.Screen name="ViewServices" component={ViewServices} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
