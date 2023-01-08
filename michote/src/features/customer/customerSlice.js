import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";  

const initialState = {
  customerIsLoggedIn: false, 
  loggedInCustomer: {},
  custumers: [],
  selectedCustomer: {}, 
  customerIsError: false,
  customerISuccess: false,
  customerIsLoading: false,
  customerMessage: "",
  customerCreated: false,
};

// Create user
export const createUser = createAsyncThunk(
  "custumer/createUser",
  async (user, thunkAPI) => {
    try {
      return await customerService.createUser(user);
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

// Login user
export const login = createAsyncThunk("custumer/login", async (user, thunkAPI) => {
  try {
    return await customerService.login(user);

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Log out
export const logout = createAsyncThunk("custumer/logout", async () => {
  await customerService.logout();
});


// Get all Users
export const getUsers = createAsyncThunk(
  "custumer/getUsers",
  async (thunkAPI) => {
    try {
      return await customerService.getUsers();
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

// Get user by id
export const getUserById = createAsyncThunk(
  "custumer/getUserById",
  async (id, thunkAPI) => {
    try {
      return await customerService.getUserById(id);
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

// Update user
export const updateUser = createAsyncThunk(
  "custumer/updateUser",
  async (data, thunkAPI) => {
    try {
      return await customerService.updateUser(data.id, data.customer);
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

// Delete user
export const deleteUser = createAsyncThunk(
  "custumer/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await customerService.deleteUser(id);
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

export const custumerSlice = createSlice({
  name: "custumer",
  initialState,
  reducers: {
    resetCustomers: (state) => {  
      state.customerIsLoading = false;
      state.customerISuccess = false;
      state.customerIsError = false;
      state.customerMessage = "";
      state.customerCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.customerIsLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.customerIsLoading = false;
        state.customerISuccess = true;
        state.customerCreated = true;
        state.customerIsLoggedIn = true;
        state.loggedInCustomer = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.customerIsLoading = false;
        state.customerIsError = true;
        state.customerMessage = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.customerIsLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.customerIsLoading = false;
        state.customerISuccess = true;
        state.customerIsLoggedIn = true;
        state.loggedInCustomer = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.customerIsLoading = false;
        state.customerIsError = true;
        state.customerMessage = action.payload;
        state.customerIsLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.customerIsLoggedIn = false;
        state.loggedInCustomer = null;
      })
      .addCase(getUsers.pending, (state) => {
        state.customerIsLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.customerIsLoading = false;
        state.customerISuccess = true;
        state.custumers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.customerIsLoading = false;
        state.customerIsError = true;
        state.customerMessage = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.customerIsLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customerISuccess = true;
        state.selectedCustomer = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.customerIsLoading = false;
        state.customerIsError = true;
        state.customerMessage = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.customerIsLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.customerIsLoading = false;
        state.customerISuccess = true;
        state.selectedCustomer = action.payload;
        state.loggedInCustomer = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.customerIsLoading = false;
        state.customerIsError = true;
        state.customerMessage = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.customerIsLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.customerIsLoading = false;
        state.customerISuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.customerIsLoading = false;
        state.customerIsError = true;
        state.customerMessage = action.payload;
      });
  },
});
export const { resetCustomers } = custumerSlice.actions;
export default custumerSlice.reducer;