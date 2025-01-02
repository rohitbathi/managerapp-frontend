import axios from 'axios';

const API_URL = 'http://your-backend-url/api';

// Authenticate user
export const authenticateUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// Fetch admin appointments
export const fetchAdminAppointments = async () => {
  const response = await axios.get(`${API_URL}/admin/appointments`);
  return response.data;
};

// Fetch staff appointments
export const fetchStaffAppointments = async () => {
  const response = await axios.get(`${API_URL}/staff/appointments`);
  return response.data;
};

// Confirm an appointment
export const confirmAppointment = async (id) => {
  await axios.post(`${API_URL}/staff/confirm-appointment`, { id });
};

// create User
export const createUser = async (user) => {
  const response = await axios.post(`${API_URL}/admin/adduser`, { user });
  return response;
};

//create service
export const createService = async (service) => {
  const response = await axios.post(`${API_URL}/admin/addservice`, { service });
  return response;
};

export const updateAppointment = async (appointment) => {
  const response = await axios.post(`${API_URL}/admin/update-appointment`, { appointement});
  return response;
};

export const fetchStaffListByService = async(id) =>{
  const response = await axios.get(`${API_URL}/staff/stafflist`,{id});
  return response.data;
}

export const fetchStaffByAppointment = async(id) =>{
  const response = await axios.get(`${API_URL}/staff/staffbyappointment`,{id});
  return response.data;
}


