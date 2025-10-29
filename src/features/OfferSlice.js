import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../service/api";
import Cookies from "js-cookie";

export const fetchOffers = createAsyncThunk(
  "offers/fetchOffers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/offers");
      console.log("API response:", response.data); 
      return response.data.offers;
    } catch (error) {
      console.error("Error fetching offers:", error); 
      if (error.response) {
        if (error.response.status === 401) {
          Cookies.remove("authToken");
          Cookies.remove("authUser");
          console.log("User unauthenticated, cookies removed");
          return rejectWithValue({
            message: "Unauthenticated. Please log in again.",
          });
        }

        console.log("Server error:", error.response.data);
        return rejectWithValue({
          message:
            error.response.data?.message ||
            "Failed to fetch offers from the server.",
          status: error.response.status,
        });
      }

      console.log("Network or unknown error");
      return rejectWithValue({
        message: "Network error: Unable to connect to the server.",
      });
    }
  }
);

const OffersSlice = createSlice({
  name: "offers",
  initialState: {
    offers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching offers started...");
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
        console.log("Fetching offers successful:", action.payload);
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong.";
        console.error("Fetching offers failed:", action.payload);
      });
  },
});

export default OffersSlice.reducer;
