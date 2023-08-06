import { createSlice } from "@reduxjs/toolkit";
import data from "../../assets/data/MOCK_DATA.json";
const initialState = {
  data,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    customData: (state) => {
      state.data.forEach((el) => (el.liked = false));
      state.data = state.data.splice(0, 20);
    },
    favorites: (state) => {
      state.data = state.data.filter((el) => el.liked === true);
    },
    likedItem: (state, { payload }) => {
      console.log(payload);
      let liked = state.data.find((el) => el.id === payload.id);
      console.log(liked);
      liked.liked = !liked.liked;
    },
  },
});

// Action creators are generated for each case reducer function
export const { customData, favorites, likedItem } = cardSlice.actions;

export default cardSlice.reducer;
