import axios from "axios";
import { URL } from "../../app/apiUrl";

// Register user
const createUser = async (userData) => {
  const response = await axios.post(`${URL}users`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${URL}users/login`, userData);
  const id = response.data.user_id;
  const customer = await getUserById(id);
  return customer;
};

// Logout user
const logout = () => {
  return true;
};

  // Get all users
const getUsers = async () => { 
  const response = await axios.get(`${URL}users`);
  return response.data;
};
  
  // Get user by id
  const getUserById = async (id) => {
    const response = await axios.get(`${URL}users/${id}`);
    return response.data;
};
  
// Update user
const updateUser = async (id, user) => {
    const response = await axios.put(`${URL}users/${id}`, user);
    return response.data;
};
  
// Delete User
const deleteUser = async (id) => {
    const response = await axios.delete(`${URL}users/${id}`);
    return response.data;
};
  
const customerService = {
    createUser,
    logout,
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
  };
  
  export default customerService;  