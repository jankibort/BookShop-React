import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BooksInitialState = {
  booksInCart: { id: number; quantity: number }[];
};

const initialState = {
  booksInCart: [{ id: 457, quantity: 2 }],
} as BooksInitialState;

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBookToCart: (state, action: PayloadAction<number>) => {
      state.booksInCart.push();
    },
    // fetchBooks: (state) => {x
    //   state.fetchedBooks = allBooks;
    // },
  },
});

export const { addBookToCart } = booksSlice.actions;
export const books = booksSlice.reducer;
