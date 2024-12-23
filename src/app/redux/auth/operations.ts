import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://readjourney.b.goit.stydy/api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  "/auth/register",
  async (credentials: RegisterData) => {
    console.log(credentials);

    // const response = await axios.post("/users/signup");
  }
);
