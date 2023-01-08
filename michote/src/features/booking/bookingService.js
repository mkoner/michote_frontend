import axios from "axios";
import { URL } from "../../app/apiUrl";

// Register booking 
const createBooking = async (bookingData) => { 
  const response = await axios.post(`${URL}bookings`, bookingData);
  return response.data;
}; 


  // Get all bookings 
const getBookings = async (string) => { 
  const response = string ?  await axios.get(`${URL}bookings/${string}`):
  await axios.get(`${URL}bookings`);
  return response.data;
};
  
  // Get booking by id 
  const getBookingById = async (id) => {  
    const response = await axios.get(`${URL}bookings/${id}`);
    return response.data;
};
  
// Update booking 
const updateBooking = async (id, booking) => {  
    const response = await axios.put(`${URL}bookings/${id}`, booking);
    return response.data;
};
  
// Delete booking 
const deleteBooking = async (id) => { 
    const response = await axios.delete(`${URL}bookings/${id}`);
    return response.data;
};
  
const bookingService = { 
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
  };
  
  export default bookingService;