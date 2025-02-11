import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book, getBooks } from "./operations";

interface BooksState {
  items: Book[];
  currentBooks: Record<string, Book>;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
}

const initialState: BooksState = {
  items: [],
  currentBooks: {},
  loading: false,
  error: null,
  total: 0,
  page: 1,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getBooks.fulfilled,
        (
          state,
          action: PayloadAction<{ items: Book[]; page: number; total: number }>
        ) => {
          state.loading = false;
          state.items = action.payload.items;
          state.page = action.payload.page;
          state.total = action.payload.total;

          action.payload.items.forEach((book) => {
            state.currentBooks[book.id] = book;
          });
        }
      )
      .addCase(getBooks.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export const booksReducer = booksSlice.reducer;
