import { createSlice } from "@reduxjs/toolkit";

type UiInitialState = {
  isCartDrawerVisible: boolean;
};

const initialState = {
  isCartDrawerVisible: false,
} as UiInitialState;

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCartDrawer: (state) => {
      state.isCartDrawerVisible = !state.isCartDrawerVisible;
    },
  },
});

export const { toggleCartDrawer } = uiSlice.actions;
export const ui = uiSlice.reducer;
