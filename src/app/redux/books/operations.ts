import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ITEMS_PER_PAGE = 2;

interface Filters {
  title?: string;
  author?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
}

interface BookResponse {
  results: Book[];
  total: number;
}

interface GetBooksParams {
  page?: number;
  filters?: Filters;
}

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (searchParams: GetBooksParams = { page: 1, filters: {} }) => {
    const { page = 1, filters = {} as Filters } = searchParams;

    const filtersBook = {
      title: "title",
      author: "author",
    } as const;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: ITEMS_PER_PAGE.toString(),
    });

    if (filters?.title) {
      queryParams.append(filtersBook.title, filters.title);
    }

    if (filters?.author) {
      queryParams.append(filtersBook.author, filters.author);
    }
    try {
      const response = await axios.get<BookResponse>(
        `/books/recommend?${queryParams}`
      );

      console.log(response.data);

      return {
        items: response.data.results,
        page,
        total: response.data.total || 0,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  }
);
