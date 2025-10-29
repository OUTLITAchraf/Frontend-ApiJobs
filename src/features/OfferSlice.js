import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../service/api";
import Cookies from "js-cookie";

export const fetchOffers = createAsyncThunk(
  "offers/fetchOffers",
  async (title, { rejectWithValue }) => {
    try {
      const response = await api.get("/offers", {
        params: { title },
      });
      console.log("API response:", response.data);
      return response.data.offers;
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }
);

const OffersSlice = createSlice({
  name: "offers",
  initialState: {
    offers: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = "loading";
        state.error = null;
        console.log("Fetching offers started...");
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = "success";
        state.offers = action.payload;
        console.log("Fetching offers successful:", action.payload);
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Something went wrong.";
        console.error("Fetching offers failed:", action.payload);
      });
  },
});

export default OffersSlice.reducer;
