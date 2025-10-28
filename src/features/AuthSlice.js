import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../service/api";

export const userRegister = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      let response = await api.post("/register", data);
      console.log("Reseponse :", response);
    } catch (error) {
      if (error.response) {
        // Erreur de validation Laravel (souvent statut 422)
        if (error.response.status === 422 && error.response.data.errors) {
          return rejectWithValue(error.response.data);
        }

        // Autres erreurs (401, 500, etc.). Renvoyez un message général.
        return rejectWithValue({
          message:
            "Network Error or Server Unreachable. Please try again later.",
        });
      }
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    userRegister: {
      status: "idle",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state, action) => {
        state.userRegister.status = "loading";

        console.log("Register Pending:", action.payload);
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.userRegister.status = "succeeded";

        console.log("Register Fulfilled:", action);
      })
      .addCase(userRegister.rejected, (state, action) => {
        (state.userRegister.status = "failed"),
          console.log("Register Rejected:", action);
      });
  },
});

export default AuthSlice.reducer;
