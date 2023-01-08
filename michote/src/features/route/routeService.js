import axios from "axios";
import { URL } from "../../app/apiUrl";

// Register route 
const createRoute = async (routeData) => { 
  const response = await axios.post(`${URL}routes`, routeData);
  return response.data;
};


  // Get all routes 
const getRoutes = async (string) => { 
  const response = string ?  await axios.get(`${URL}routes/${string}`):
  await axios.get(`${URL}routes`);
  return response.data;
};
  
  // Get route by id 
  const getRouteById = async (id) => { 
    const response = await axios.get(`${URL}routes/${id}`);
    return response.data;
};
  
// Update route 
const updateRoute = async (id, route) => { 
    const response = await axios.put(`${URL}routes/${id}`, route);
    return response.data;
};
  
// Delete route 
const deleteRoute = async (id) => {
    const response = await axios.delete(`${URL}routes/${id}`);
    return response.data;
};
  
const routeService = { 
    createRoute,
    getRoutes,
    getRouteById,
    updateRoute,
    deleteRoute,
  };
  
  export default routeService;