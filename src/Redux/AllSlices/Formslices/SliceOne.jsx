import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  values: {
    name: 'sfvfdv',
    age: '',
  },

};
export const formSlice = createSlice({
  name: "formdata",
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      const { fieldName, value } = action.payload;
      state.formdata[fieldName] = value;

    },
  },
});
export const { setInputValue } = formSlice.actions;
export default formSlice.reducer;
