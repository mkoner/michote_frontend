import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import routeService from "./routeService"; 



const initialState = {
  routes: [],
  selectedRoute: {},  
  routeIsError: false, 
  routeISuccess: false, 
  routeIsLoading: false, 
  routeMessage: "", 
  routeCreated: false, 
};

// Create route
export const createRoute = createAsyncThunk( 
  "route/createRoute",
  async (route, thunkAPI) => {
    try {
      return await routeService.createRoute(route);
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


// Get all routes or matching routes based on search string 
export const getRoutes = createAsyncThunk( 
  "route/getRoutes",
  async (string, thunkAPI) => {
    try {
      return await routeService.getRoutes(string);
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

// Get route by id
export const getRouteById = createAsyncThunk(
  "route/getRouteById",
  async (id, thunkAPI) => {
    try {
      return await routeService.getRouteById(id);
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

// Update route
export const updateRoute = createAsyncThunk( 
  "route/updateRoute",
  async (data, thunkAPI) => {
    try {
      return await routeService.updateRoute(data.id, data.route);
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

// Delete route
export const deleteRoute = createAsyncThunk( 
  "route/deleteRoute",
  async (id, thunkAPI) => {
    try {
      return await routeService.deleteRoute(id);
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

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    resetRoutes: (state) => { 
      state.routeIsLoading = false;
      state.routeISuccess = false;
      state.routeIsError = false;
      state.routeMessage = "";
      state.routeCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoute.pending, (state) => {
        state.routeIsLoading = true;
      })
      .addCase(createRoute.fulfilled, (state, action) => { 
        state.routeIsLoading = false;
        state.routeISuccess = true;
        state.routeCreated = true; 
      })
      .addCase(createRoute.rejected, (state, action) => {
        state.routeIsLoading = false;
        state.routeIsError = true;
        state.routeMessage = action.payload;
      })
      .addCase(getRoutes.pending, (state) => {
        state.routeIsLoading = true;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.routeIsLoading = false;
        state.routeISuccess = true;
        state.routes = action.payload;
      })
      .addCase(getRoutes.rejected, (state, action) => { 
        state.routeIsLoading = false;
        state.routeIsError = true;
        state.routeMessage = action.payload;
      })
      .addCase(getRouteById.pending, (state) => {
        state.routeIsLoading = true;
      })
      .addCase(getRouteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.routeISuccess = true;
        state.selectedRoute = action.payload; 
      })
      .addCase(getRouteById.rejected, (state, action) => { 
        state.routeIsLoading = false;
        state.routeIsError = true;
        state.routeMessage = action.payload;
      })
      .addCase(updateRoute.pending, (state) => {
        state.routeIsLoading = true;
      })
      .addCase(updateRoute.fulfilled, (state, action) => {
        state.routeIsLoading = false;
        state.routeISuccess = true;
        state.selectedRoute = action.payload;
      })
      .addCase(updateRoute.rejected, (state, action) => { 
        state.routeIsLoading = false;
        state.routeIsError = true;
        state.routeMessage = action.payload;
      })
      .addCase(deleteRoute.pending, (state) => {
        state.routeIsLoading = true;
      })
      .addCase(deleteRoute.fulfilled, (state, action) => {
        state.routeIsLoading = false;
        state.routeISuccess = true; 
      })
      .addCase(deleteRoute.rejected, (state, action) => { 
        state.routeIsLoading = false; 
        state.routeIsError = true; 
        state.routeMessage = action.payload; 
      });
  },
});
export const { resetRoutes } = routeSlice.actions;  
export default routeSlice.reducer;