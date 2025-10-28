import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../service/api";
import Cookies from "js-cookie";

function getInitialUser() {
    const userCookie = Cookies.get('authUser'); // 'js-cookie' handles URI decoding
    if (!userCookie) {
        return null;
    }
    try {
        // Parse the JSON string back into an object
        return JSON.parse(userCookie);
    } catch (e) {
        console.error("Failed to parse user cookie:", e);
        Cookies.remove('authUser'); // Clear the bad cookie
        return null;
    }
}


// --- Initial State (Loaded from Cookies) ---
const initialUser = getInitialUser();

export const userRegister = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      await api.post("/register", data);
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

export const userLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      let response = await api.post("/login", data);

      const { token } = response.data;

      if (token) {
        Cookies.set("authToken", token, {
          expires: 7,
          sameSite: "strict",
        });
      }

      return { token };
    } catch (error) {
      if (error.response.status === 401) {
        return rejectWithValue({ message: "Invalid credentials" });
      }
      return rejectWithValue({
        message: "Network Error or Server Unreachable. Please try again later.",
      });
    }
  }
);

export const fetchAuthUser = createAsyncThunk(
  "auth/fetchAuthUser",
  async (_, { rejectWithValue }) => {
try {
      const response = await api.get("/user");
      return response.data.user;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token invalid or missing
        Cookies.remove("authToken");
        Cookies.remove("authUser");
        return rejectWithValue({ message: "Unauthenticated" });
      }
      return rejectWithValue({
        message: "Network or server error",
      });
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/logout");

      Cookies.remove("authToken");
      Cookies.remove("authUser");

      return true;
    } catch (error) {
      console.error("Logout failed:", error);

      return rejectWithValue({
        message: "Logout failed or server unreachable",
      });
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("authToken") ? Cookies.get("authToken") : null,
    user: initialUser,
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

        state.token = action.payload.token;

        Cookies.set("authToken", action.payload.token, {
          expires: 7,
          sameSite: "strict",
        });

        console.log("Login Fulfilled:", action);
      })
      .addCase(userLogin.rejected, (state, action) => {
        (state.userLogin.status = "failed"),
          console.log("Login Rejected:", action);
        state.token = null;
        Cookies.remove("authToken");
      });

    builder
      .addCase(fetchAuthUser.pending, (state, action) => {
        state.userLogin.status = "loading";

        console.log("Fetch Auth User Pending:", action);
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.userLogin.status = "succeeded";
        state.user = action.payload;

        console.log("Fetch Auth User Fullfilled:", action);
      })
      .addCase(fetchAuthUser.rejected, (state, action) => {
        state.userLogin.status = "failed";
        state.user = null;
        state.token = null;

        console.log("Fetch Auth User Rejected:", action);
      });
    builder
      .addCase(userLogout.pending, (state) => {
        state.userLogin.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.userLogin.status = "succeeded";
        state.token = null;
        state.user = null;
        Cookies.remove("authToken");
        Cookies.remove("authUser");
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.userLogin.status = "failed";
        console.log("Logout Rejected:", action);
      });
  },
});

export default AuthSlice.reducer;
