import { createSlice } from '@reduxjs/toolkit'
import data from '../../assets/data/json_mock.json'
const initialState = {
   data
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    customData: (state) => {
     
      state.data.forEach(el => el.liked = false);
      state.data = state.data.splice(0,20);
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { customData } = cardSlice.actions

export default cardSlice.reducer