import { combineReducers } from "@reduxjs/toolkit";

import { books } from "redux/slices/books";
import { ui } from "redux/slices/ui";

export const rootReducer = combineReducers({
  books,
  ui,
});
