import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";



const initialState = {
  adminIsLoggedIn: false, 
  loggedInAdmin: {},
  admins: [],
  selectedAdmin: {},
  adminIsError: false,
  adminISuccess: false,
  adminIsLoading: false,
  adminMessage: "",
  adminCreated: false,
};

// Create user
export const createUser = createAsyncThunk(
  "admin/createUser",
  async (user, thunkAPI) => {
    try {
      return await adminService.createUser(user);
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
export const login = createAsyncThunk("admin/login", async (user, thunkAPI) => {
  try {
    return await adminService.login(user);

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Log out
export const logout = createAsyncThunk("admin/logout", async () => {
  await adminService.logout();
});


// Get all Users
export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (thunkAPI) => {
    try {
      return await adminService.getUsers();
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
  "admin/getUserById",
  async (id, thunkAPI) => {
    try {
      return await adminService.getUserById(id);
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
  "admin/updateUser",
  async (data, thunkAPI) => {
    try {
      return await adminService.updateUser(data.id, data.admin);
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
  "admin/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await adminService.deleteUser(id);
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

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdmins: (state) => {
      state.adminIsLoading = false;
      state.adminISuccess = false;
      state.adminIsError = false;
      state.adminMessage = "";
      state.adminCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.adminIsLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.adminIsLoading = false;
        state.adminISuccess = true;
        state.adminCreated = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.adminIsLoading = false;
        state.adminIsError = true;
        state.adminMessage = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.adminIsLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.adminIsLoading = false;
        state.adminISuccess = true;
        state.adminIsLoggedIn = true;
        state.loggedInAdmin = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.adminIsLoading = false;
        state.adminIsError = true;
        state.adminMessage = action.payload;
        state.adminIsLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.adminIsLoading = false;
        state.adminISuccess = true;
        state.adminIsLoggedIn = false;
        state.loggedInAdmin = null;       
      })
      .addCase(getUsers.pending, (state) => {
        state.adminIsLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.adminIsLoading = false;
        state.adminISuccess = true;
        state.admins = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.adminIsLoading = false;
        state.adminIsError = true;
        state.adminMessage = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.adminIsLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminISuccess = true;
        state.selectedAdmin = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.adminIsLoading = false;
        state.adminIsError = true;
        state.adminMessage = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.adminIsLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.adminIsLoading = false;
        state.adminISuccess = true;
        state.selectedAdmin = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.adminIsLoading = false;
        state.adminIsError = true;
        state.adminMessage = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.adminIsLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.adminIsLoading = false;
        state.adminISuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.adminIsLoading = false;
        state.adminIsError = true;
        state.adminMessage = action.payload;
      });
  },
});
export const { resetAdmins } = adminSlice.actions;
export default adminSlice.reducer;