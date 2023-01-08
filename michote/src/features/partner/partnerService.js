import axios from "axios";
import { URL } from "../../app/apiUrl";

// Register partner createPartner
const createPartner = async (partnerData) => {
  const response = await axios.post(`${URL}partners`, partnerData);
  return response.data;
};

// Login partner
const login = async (partnerData) => {
  const response = await axios.post(`${URL}partners/login`, partnerData);
  const id = response.data.user_id;
  const partner = await getPartnerById(id);
  return partner;
};

// Logout partner
const logout = () => {
  return true;
};

  // Get all partners 
const getPartners = async () => {
  const response = await axios.get(`${URL}partners`);
  return response.data;
};
  
  // Get partner by id 
  const getPartnerById = async (id) => {
    const response = await axios.get(`${URL}partners/${id}`);
    return response.data;
};
  
// Update partner 
const updatePartner = async (id, partner) => {
    const response = await axios.put(`${URL}partners/${id}`, partner);
    return response.data;
};
  
// Delete partner 
const deletePartner = async (id) => {
    const response = await axios.delete(`${URL}partners/${id}`);
    return response.data;
};
  
const partnerService = { 
    createPartner,
    logout,
    login, 
    getPartners, 
    getPartnerById,
    updatePartner,
    deletePartner,
  };
  
  export default partnerService;