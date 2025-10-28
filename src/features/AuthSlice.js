import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../service/api";
import Cookies from "js-cookie";

export const userRegister = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      let response = await api.post("/register", data);
      console.log("Reseponse :", response);
    } catch (error) {
      console.log(error);
      
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

export const userLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      let response = await api.post("/login", data);
      console.log("Reseponse :", response);
      Cookies.set("authToken", response.data.token, {
        expires: 7,
        sameSite: "Strict",
      });
    } catch (error) {
      console.log(error);
      
      if (error.response.status === 401) {
        return rejectWithValue({ message: "Invalid credentials" });
      }
      return rejectWithValue({
        message: "Network Error or Server Unreachable. Please try again later.",
      });
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    userRegister: {
      status: "idle",
    },
    userLogin: {
      status: "idle",
      data: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state, action) => {
        state.userRegister.status = "loading";

        console.log("Register Pending:", action);
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.userRegister.status = "succeeded";

        console.log("Register Fulfilled:", action);
      })
      .addCase(userRegister.rejected, (state, action) => {
        (state.userRegister.status = "failed"),
          console.log("Register Rejected:", action);
      });

    builder
      .addCase(userLogin.pending, (state, action) => {
        state.userLogin.status = "loading";

        console.log("Login Pending:", action);
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userLogin.status = "succeeded";
        state.userLogin.data = action;

        console.log("Login Fulfilled:", action);
      })
      .addCase(userLogin.rejected, (state, action) => {
        (state.userLogin.status = "failed"),
          console.log("Login Rejected:", action);
      });
  },
});

export default AuthSlice.reducer;
