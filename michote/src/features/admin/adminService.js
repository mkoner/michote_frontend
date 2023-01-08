import axios from "axios";
import { URL } from "../../app/apiUrl";

// Register user
const createUser = async (userData) => {
  const response = await axios.post(`${URL}admins`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${URL}admins/login`, userData);
  const id = response.data.user_id;
  const admin = await getUserById(id);
  return admin;
};

// Logout user
const logout = () => {
  return true;
};

  // Get all users
const getUsers = async () => {  
  const response = await axios.get(`${URL}admins`);
  return response.data;
};
  
  // Get user by id
  const getUserById = async (id) => {
    const response = await axios.get(`${URL}admins/${id}`);
    return response.data;
};
  
// Update user
const updateUser = async (id, user) => {
    const response = await axios.put(`${URL}admins/${id}`, user);
    return response.data;
};
  
// Delete User
const deleteUser = async (id) => {
    const response = await axios.delete(`${URL}admins/${id}`);
    return response.data;
};
  
const adminService = {
    createUser,
    logout,
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
  };
  
  export default adminService;