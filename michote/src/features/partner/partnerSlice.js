import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import partnerService from "./partnerService";



const initialState = {
  partnerIsLoggedIn: false, 
  loggedInPartner: {},
  partners: [],
  selectedPartner: {}, 
  partnerIsError: false,
  partnerISuccess: false,
  partnerIsLoading: false,
  partnerMessage: "",
  partnererCreated: false,
};

// Create user
export const createPartner = createAsyncThunk(
  "partner/createPartner",
  async (user, thunkAPI) => {
    try {
      return await partnerService.createPartner(user);
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
export const login = createAsyncThunk("partner/login", async (user, thunkAPI) => {
  try {
    return await partnerService.login(user);

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Log out
export const logout = createAsyncThunk("partner/logout", async () => {
  await partnerService.logout();
});


// Get all Users
export const getPartners = createAsyncThunk(
  "partner/getPartners",
  async (thunkAPI) => {
    try {
      return await partnerService.getPartners();
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
export const getPartnerById = createAsyncThunk(
  "partner/getPartnerById",
  async (id, thunkAPI) => {
    try {
      return await partnerService.getPartnerById(id);
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
export const updatePartner = createAsyncThunk(
  "partner/updatePartner",
  async (data, thunkAPI) => {
    try {
      return await partnerService.updatePartner(data.id, data.partner);
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
export const deletePartner = createAsyncThunk(
  "partner/deletePartner",
  async (id, thunkAPI) => {
    try {
      return await partnerService.deletePartner(id);
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

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    resetPartners: (state) => {
      state.partnerIsLoading = false;
      state.partnerISuccess = false;
      state.partnerIsError = false;
      state.partnerMessage = "";
      state.partnererCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPartner.pending, (state) => {
        state.partnerIsLoading = true;
      })
      .addCase(createPartner.fulfilled, (state, action) => { 
        state.partnerIsLoading = false;
        state.partnerISuccess = true;
        state.partnererCreated = true; 
        state.loggedInPartner = action.payload;
        state.partnerIsLoggedIn = true;
      })
      .addCase(createPartner.rejected, (state, action) => {
        state.partnerIsLoading = false;
        state.partnerIsError = true;
        state.partnerMessage = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.partnerIsLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.partnerIsLoading = false;
        state.partnerISuccess = true;
        state.partnerIsLoggedIn = true;
        state.loggedInPartner = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.partnerIsLoading = false;
        state.partnerIsError = true;
        state.partnerMessage = action.payload;
        state.partnerIsLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.partnerIsLoggedIn = false;
        state.loggedInPartner = null;
      })
      .addCase(getPartners.pending, (state) => {
        state.partnerIsLoading = true;
      })
      .addCase(getPartners.fulfilled, (state, action) => {
        state.partnerIsLoading = false;
        state.partnerISuccess = true;
        state.partners = action.payload;
      })
      .addCase(getPartners.rejected, (state, action) => { 
        state.partnerIsLoading = false;
        state.partnerIsError = true;
        state.partnerMessage = action.payload;
      })
      .addCase(getPartnerById.pending, (state) => {
        state.partnerIsLoading = true;
      })
      .addCase(getPartnerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.partnerISuccess = true;
        state.selectedPartner = action.payload; 
      })
      .addCase(getPartnerById.rejected, (state, action) => { 
        state.partnerIsLoading = false;
        state.partnerIsError = true;
        state.partnerMessage = action.payload;
      })
      .addCase(updatePartner.pending, (state) => {
        state.partnerIsLoading = true;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.partnerIsLoading = false;
        state.partnerISuccess = true;
        state.selectedPartner = action.payload;
        state.updatePartner = action.payload;
      })
      .addCase(updatePartner.rejected, (state, action) => { 
        state.partnerIsLoading = false;
        state.partnerIsError = true;
        state.partnerMessage = action.payload;
      })
      .addCase(deletePartner.pending, (state) => {
        state.partnerIsLoading = true;
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.partnerIsLoading = false;
        state.partnerISuccess = true; 
      })
      .addCase(deletePartner.rejected, (state, action) => { 
        state.partnerIsLoading = false; 
        state.partnerIsError = true; 
        state.partnerMessage = action.payload; 
      });
  },
});
export const { resetPartners } = partnerSlice.actions;  
export default partnerSlice.reducer;