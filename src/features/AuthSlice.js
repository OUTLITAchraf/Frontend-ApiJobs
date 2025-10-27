import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../service/api";

export const userRegister = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      let response = await api.post("/register", data);
      console.log("Reseponse :", response);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    userRegister: {
      status: "idle",
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state, action) => {
        state.userRegister.status = "loading";
        state.userRegister.error = null;

        console.log("Register Pending:", action.payload);
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.userRegister.status = "succeeded";
        state.userRegister.error = null;

        console.log("Register Fulfilled:", action);
      })
      .addCase(userRegister.rejected, (state, action) => {
        (state.userRegister.status = "failed"),
          (state.userRegister.error = action),
          console.log("Register Rejected:", action);
      });
  },
});

export default AuthSlice.reducer;
