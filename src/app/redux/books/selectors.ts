import { RootState } from "../store";

export const selectBooks = (state: RootState) => state.books.items;

export const selectCurrentBooks = (state: RootState) =>
  state.books.currentBooks;

export const selectIsLoading = (state: RootState) => state.books.loading;

export const selectError = (state: RootState) => state.books.error;

export const selectTotalBooks = (state: RootState) => state.books.total || 0;

export const selectCurrentPage = (state: RootState) => state.books.page || 1;

export const selectBookById = (id: string) => (state: RootState) =>
  state.books.currentBooks[id];
