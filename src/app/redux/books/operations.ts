import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const ITEMS_PER_PAGE = 2;

// Інтерфейси для типізації
interface Filters {
  title?: string;
  author?: string;
}

interface GetBooksParams {
  page?: number;
  filters?: Filters;
}

interface BookResponse {
  items: any[]; // Замініть any на інтерфейс вашої книги
  total: number;
}

interface GetBooksResult {
  items: any[]; // Замініть any на інтерфейс вашої книги
  page: number;
  total: number;
}

export const getBooks = createAsyncThunk
  GetBooksResult,
  GetBooksParams,
  {
    rejectValue: string;
  }
("books/getBooks", async ({ page = 1, filters = {} }, thunkAPI) => {
  const filtersBook = {
    title: "title",
    author: "author",
  };

  const params = new URLSearchParams({
    page: page.toString(),
    limit: ITEMS_PER_PAGE.toString(),
  });

  if (filters.title) {
    params.append(filtersBook.title, filters.title);
  }

  if (filters.author) {
    params.append(filtersBook.author, filters.author);
  }

  try {
    const response = await axios.get<BookResponse>(`/books?${params}`);

    return {
      items: response.data.items,
      page,
      total: response.data.total || 0,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'An error occurred'
      );
    }
    return thunkAPI.rejectWithValue('An unexpected error occurred');
  }
});