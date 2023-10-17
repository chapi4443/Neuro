import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

//   const url = process.env.FLIGHT_SEARCH;
//   console.log("url:",url)

// Create an async thunk action to fetch flight data
export const fetchRegistration = createAsyncThunk(
  "registration/fetchRegistration",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        formData
      );
      return response.data;
    } catch (error) {
      console.log("error", thunkAPI.rejectWithValue(error.response.data));
    }
  }
);
// Create a flights slice with initial state
const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default registrationSlice.reducer;
