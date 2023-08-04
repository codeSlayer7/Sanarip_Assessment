import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../slices/cardSlice";
import userReducer from "../slices/userSlice";
export const store = configureStore({
  reducer: {
    card: cardReducer,
    user: userReducer,
  },
});
