import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmFiNTUyNTkxNDk2NGI0YThiYjBlYSIsImlhdCI6MTczNTA0NjQ4MiwiZXhwIjoxNzM1MDUwMDgyfQ.5MnXDohNercAoq48TItTn0h_xAPeb0zBvmCI2pDTwKw",
//   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmFiNTUyNTkxNDk2NGI0YThiYjBlYSIsImlhdCI6MTczNTA0NjQ4MiwiZXhwIjoxNzM1NjUxMjgyfQ.c9OSER0JibbAGCIp8q3EpxRa7gDaF0vutxz-_3atoNY"

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

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
  async (values, thunkAPI) => {
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
