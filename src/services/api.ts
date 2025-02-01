import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Set the base URL for the API
const API_URL = "http://192.168.29.11:5000/api";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Allow credentials (cookies) to be sent
  headers: { "Content-Type": "application/json" },
});

// Utility function to save cookies to AsyncStorage (only after login)
const saveCookiesToStorage = async (setCookieHeader) => {
  try {
    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader]; // Normalize to array if it's a single cookie
      await AsyncStorage.setItem("cookies", JSON.stringify(cookiesArray)); // Save cookies as an array
      console.log("Cookies saved to AsyncStorage:", cookiesArray);
    }
  } catch (error) {
    console.error("Failed to save cookies to AsyncStorage:", error);
  }
};

// Utility function to load cookies from AsyncStorage
const loadCookiesFromStorage = async () => {
  try {
    const cookies = await AsyncStorage.getItem("cookies");
    const parsedCookies = cookies ? JSON.parse(cookies) : []; // Parse the stored cookies or return an empty array
    console.log("Cookies loaded from AsyncStorage:", parsedCookies);
    return parsedCookies;
  } catch (error) {
    console.error("Failed to load cookies from AsyncStorage:", error);
    return [];
  }
};

// Flag to track if the response is from login
let isLoginRequest = false;

// Add cookies to request headers
apiClient.interceptors.request.use(
  async (config) => {
    const cookiesArray = await loadCookiesFromStorage();
    if (cookiesArray.length > 0) {
      config.headers["Cookie"] = cookiesArray.join("; "); // Attach cookies as a single string
    }

    // Set flag to true when making login request
    if (config.url.includes("/auth/login")) {
      isLoginRequest = true;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Save cookies from the response headers after login
apiClient.interceptors.response.use(
  async (response) => {
    // Only save cookies if the response is from the login request
    if (isLoginRequest && response.headers["set-cookie"]) {
      const setCookieHeader = response.headers["set-cookie"];
      await saveCookiesToStorage(setCookieHeader); // Save cookies to AsyncStorage
      isLoginRequest = false; // Reset the flag after saving cookies
    }
    return response;
  },
  (error) => {
    // console.error("Error in API response:", error);
    return Promise.reject(error);
  }
);

// Function to make API calls
const apiCall = async (method, endpoint, data = null) => {
  try {
    const response = await apiClient({ method, url: endpoint, data });
    console.log("API request successful:", response.data);
    return response.data;
  } catch (error) {
    // console.error("API request failed:", error.response.data);
    throw error.response
      ? error.response.data
      : new Error("API error occurred");
  }
};

// Authentication APIs
export const authenticateUser = async (credentials) => {
  try {
    const response = await apiCall("post", "/auth/login", credentials);
    // console.log("User authenticated successfully:", response);

    // Cookies will be saved automatically by the response interceptor
    return response;
  } catch (error) {
    // console.error("Authentication failed:", error);
    throw error;
  }
};

// Logout function: Clear cookies from AsyncStorage
export const logoutUser = async () => {
  try {
    const response = await apiCall("get", "/auth/logout");
    console.log("User logged out successfully:", response);
    await AsyncStorage.removeItem("cookies"); 
    return response;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

// Admin APIs
export const fetchAdminAppointments = (date) =>
  apiCall("get", `/admin/view-appointments?date=${date}`);

export const fetchAdminAllAppointments = (date) =>
  apiCall("get", `/admin/view-all-appointments`);

export const createStaff = (user) => apiCall("post", "/admin/add-staff", user);

export const createAdmin = (user) => apiCall("post", "/admin/add-user", user);

export const createService = (service) =>
  apiCall("post", "/admin/add-service", service);

export const fetchCustomers = () => apiCall("get", "/admin/get-customers");

export const fetchStaff = () => apiCall("get", "/admin/get-staff");

export const fetchServices = () => apiCall("get", "/admin/get-services");

export const fetchStaffListByService = (service_id, date, startTime) =>
  apiCall(
    "get",
    `/admin/get-available-staff?service_id=${service_id}&date=${date}&startTime=${startTime}`
  );

export const updateAdminAppointment = (appointment_id, updatedFields) =>
  apiCall(
    "post",
    `/admin/update-appointment?appointment_id=${appointment_id}`,
    updatedFields
  );

// Staff APIs
export const fetchStaffAppointments = (date) =>
  apiCall("get", `/staff/view-appointments?date=${date}`);

export const updateStaffAppointment = (appointment_id, updatedFields) =>
  apiCall("post", `/staff/update-appointment/${appointment_id}`, updatedFields);

export const completeAppointment = (appointment_id) =>
  apiCall("post", `/staff/complete-appointment/${appointment_id}`);
