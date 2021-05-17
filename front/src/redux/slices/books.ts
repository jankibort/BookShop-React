import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ModifyQuantityOption {
  Add,
  Remove,
}

type BooksInitialState = {
  booksInCart: {
    id: number;
    quantity: number;
    cover_url: string;
    title: string;
  }[];
};

const initialState = {
  booksInCart: [],
} as BooksInitialState;

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBookToCart: (
      state,
      action: PayloadAction<{ id: number; cover_url: string; title: string }>
    ) => {
      const isInCart: boolean = state.booksInCart.some(
        (element) => element.id === action.payload.id
      );
      !isInCart
        ? state.booksInCart.push({
            id: action.payload.id,
            quantity: 1,
            cover_url: action.payload.cover_url,
            title: action.payload.title,
          })
        : (state.booksInCart[
            state.booksInCart.findIndex((book) => book.id === action.payload.id)
          ].quantity += 1);
    },
    modifyQuantity: (
      state,
      action: PayloadAction<{ option: ModifyQuantityOption; id: number }>
    ) => {
      switch (action.payload.option) {
        case ModifyQuantityOption.Add:
          state.booksInCart[
            state.booksInCart.findIndex((book) => book.id === action.payload.id)
          ].quantity += 1;
          break;
        case ModifyQuantityOption.Remove:
          const selectedBook = state.booksInCart.findIndex(
            (book) => book.id === action.payload.id
          );
          if (state.booksInCart[selectedBook].quantity === 1) {
            state.booksInCart = state.booksInCart.filter(
              (selectedBook) => selectedBook.id !== action.payload.id
            );
            break;
          }
          state.booksInCart[
            state.booksInCart.findIndex((book) => book.id === action.payload.id)
          ].quantity -= 1;
          break;
      }
    },
  },
});

export const { addBookToCart, modifyQuantity } = booksSlice.actions;
export const books = booksSlice.reducer;
