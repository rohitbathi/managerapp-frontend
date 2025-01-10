import axios from "axios";

const API_URL = "http://192.168.29.11:5000/api";

// Authenticate user
export const authenticateUser = async (credentials) => {
  // console.log("Making API request...");
  try {
    // console.log(credentials)
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    console.log("API request successful:");
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const Logout = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/logout`
    );
    console.log("API request successful:");
    return response;
  } catch (error) {
    console.error("API request failed:", error);
  }
};
// Fetch admin appointments
export const fetchAdminAppointments = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/admin/view-appointments`, {
      date,
    });
    console.log("API request successful:");
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

// Fetch staff appointments
export const fetchStaffAppointments = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/staff/view-appointments`, {
      date,
    });
    console.log("API request successful:");
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

// create User
export const createStaff = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/admin/set-staff`, { user });
    console.log("API request successful:");
    return response.status;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const createAdmin = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/admin/set-admin`, { user });
    console.log("API request successful:");
    return response.status;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

//create service
export const createService = async (service) => {
  try {
    const response = await axios.post(`${API_URL}/admin/add-service`, {
      service,
    });
    console.log("API request successful:");
    return response.status;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const fetchCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/get-customers`);
    console.log("API request successful:");
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const fetchStaff = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/get-staff`);
    console.log("API request successful:");
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/get-services`);
    console.log("API request successful:");
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const fetchStaffListByService = async (service_id) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/get-staff/${service_id}`
    );
    console.log("API request successful:");
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const updateAdminAppointment = async (appointment_id, updatedFields) => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/update-appointment/${appointment_id}`,
      {
        updatedFields,
      }
    );
    console.log("API request successful:");
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const updateStaffAppointment = async (appointment_id, updatedFields) => {
  try {
    const response = await axios.post(
      `${API_URL}/staff/update-appointment/${appointment_id}`,
      {
        updatedFields,
      }
    );
    console.log("API request successful:");
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const completeAppointment = async (appointment_id) => {
  try {
    const response = await axios.post(
      `${API_URL}/staff/complete-appointment/${appointment_id}`
    );
    console.log("API request successful:");
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};


