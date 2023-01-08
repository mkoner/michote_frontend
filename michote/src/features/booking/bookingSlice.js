import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";  



const initialState = {
  bookings: [],
  selectedBooking: {},  
  bookingIsError: false, 
  bookingIsSuccess: false, 
  bookingIsLoading: false, 
  bookingMessage: "", 
  bookingCreated: false, 
};

// Create booking
export const createBooking = createAsyncThunk( 
  "booking/createBooking",
  async (booking, thunkAPI) => {
    try {
      return await bookingService.createBooking(booking);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get  bookings
export const getBookings = createAsyncThunk( 
  "booking/getBookings",
  async (thunkAPI) => {
    try {
      return await bookingService.getBookings();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get booking by id
export const getBookingById = createAsyncThunk(
  "booking/getBookingById",
  async (id, thunkAPI) => {
    try {
      return await bookingService.getBookingById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update booking
export const updateBooking = createAsyncThunk( 
  "booking/updateBooking",
  async (data, thunkAPI) => {
    try {
      return await bookingService.updateBooking(data.id, data.booking);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete booking
export const deleteBooking = createAsyncThunk( 
  "booking/deleteBooking",
  async (id, thunkAPI) => {
    try {
      return await bookingService.deleteBooking(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookings: (state) => { 
      state.bookingIsLoading = false;   
      state.bookingIsSuccess = false;  
      state.bookingIsError = false; 
      state.bookingMessage = ""; 
      state.bookingCreated = false; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => { 
        state.bookingIsLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => { 
        state.bookingIsLoading = false;
        state.bookingIsSuccess = true;
        state.bookingCreated = true; 
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.bookingIsLoading = false;
        state.bookingIsError = true;
        state.bookingMessage = action.payload;
      })
      .addCase(getBookings.pending, (state) => { 
        state.bookingIsLoading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.bookingIsLoading = false;
        state.bookingIsSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => { 
        state.bookingIsLoading = false;
        state.bookingIsError = true;
        state.bookingMessage = action.payload;
      })
      .addCase(getBookingById.pending, (state) => { 
        state.bookingIsLoading = true;
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingIsSuccess = true;
        state.selectedBooking = action.payload;  
      })
      .addCase(getBookingById.rejected, (state, action) => { 
        state.bookingIsLoading = false;
        state.bookingIsError = true;
        state.bookingMessage = action.payload;
      })
      .addCase(updateBooking.pending, (state) => { 
        state.bookingIsLoading = true;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.bookingIsLoading = false;
        state.bookingIsSuccess = true;
        state.selectedBooking = action.payload;
      })
      .addCase(updateBooking.rejected, (state, action) => { 
        state.bookingIsLoading = false;
        state.bookingIsError = true;
        state.bookingMessage = action.payload;
      })
      .addCase(deleteBooking.pending, (state) => { 
        state.bookingIsLoading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookingIsLoading = false;
        state.bookingIsSuccess = true; 
      })
      .addCase(deleteBooking.rejected, (state, action) => { 
        state.bookingIsLoading = false; 
        state.bookingIsError = true; 
        state.bookingMessage = action.payload; 
      });
  },
});
export const { resetBookings } = bookingSlice.actions;   
export default bookingSlice.reducer; 