import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Set the base URL for the API
const API_URL = "http://192.168.29.11:5000/api";

// Create an Axios instance with default configurations
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Allow credentials (cookies) to be sent
  headers: { "Content-Type": "application/json" },
});

// Utility function to get the token from AsyncStorage
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken"); // Fetch the token from AsyncStorage
    return token;
  } catch (error) {
    console.error("Error retrieving token from AsyncStorage", error);
    return null;
  }
};

// Add the token to the headers before sending the request
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken(); // Retrieve the stored token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Utility function for API calls
const apiCall = async (method, endpoint, data = null) => {
  try {
    const response = await apiClient({ method, url: endpoint, data });
    console.log("API request successful:", response);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error.response
      ? error.response.data
      : new Error("API error occurred");
  }
};

// Example API functions
export const authenticateUser = async (credentials) => {
  try {
    const response = await apiCall("post", "/auth/login", credentials);
    console.log(response)
    const token = response.pos_token; // Assume token is returned in response
    console.log(token)
    await AsyncStorage.setItem("authToken", token); // Store token in AsyncStorage
    return response;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // Remove token from AsyncStorage upon logout
    await AsyncStorage.removeItem("authToken");
    return apiCall("post", "/auth/logout");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const fetchAdminAppointments = (date) =>
  apiCall("get", `/admin/view-appointments?date=${date}`);

export const fetchStaffAppointments = (date) =>
  apiCall("get", "/staff/view-appointments", date);

export const createStaff = (user) => apiCall("post", "/admin/set-staff", user);

export const createAdmin = (user) => apiCall("post", "/admin/set-admin", user);

export const createService = (service) =>
  apiCall("post", "/admin/add-service", service);

export const fetchCustomers = () => apiCall("get", "/admin/get-customers");

export const fetchStaff = () => apiCall("get", "/admin/get-staff");

export const fetchServices = () => apiCall("get", "/admin/get-services");

export const fetchStaffListByService = (service_id) =>
  apiCall("get", `/admin/get-staff?service_id=${service_id}`);

export const updateAdminAppointment = (appointment_id, updatedFields) =>
  apiCall("put", `/admin/update-appointment/${appointment_id}`, updatedFields);

export const updateStaffAppointment = (appointment_id, updatedFields) =>
  apiCall("put", `/staff/update-appointment/${appointment_id}`, updatedFields);

export const completeAppointment = (appointment_id) =>
  apiCall("post", `/staff/complete-appointment/${appointment_id}`);
