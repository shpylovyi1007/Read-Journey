import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

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

const setAuthHeaders = (token: string) => {
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
      setAuthHeaders(response.data.token);
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
      setAuthHeaders(response.data.token);

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
    await axios.post("/users/signout");
    clearAuthHeaders();
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
    const reduxState = thunkAPI.getState() as RootState;
    const saveToken = reduxState.auth.refreshToken;

    if (!saveToken) {
      return thunkAPI.rejectWithValue("Немає токену");
    }

    setAuthHeaders(saveToken);
    const response = await axios.get("/users/current/refresh");

    console.log(response.data);

    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const reduxState = getState() as RootState;
      const savedToken = reduxState.auth.refreshToken;
      return savedToken !== null;
    },
  }
);
