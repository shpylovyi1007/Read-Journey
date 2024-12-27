import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

type UserToken = {
  token: string;
};

const setAuthHeaders = (token: UserToken) => {
  axios.defaults.headers.common["Authorization"] = `Baerer ${token}`;
};

const clearAuthHeaders = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

export const register = createAsyncThunk(
  "/auth/register",
  async (credentials: RegisterData, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);

export const login = createAsyncThunk(
  "/auth/login",
  async (values: LoginData, thunkAPI) => {
    try {
      const response = await axios.post("/users/signin", values);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);

export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
});

export const refrefhUser = createAsyncThunk(
  "/auth/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const saveToken = reduxState.auth.token;
    setAuthHeaders(saveToken);
    const response = await axios.get("/users/current");
  },

  {
    condition: () => {},
  }
);
