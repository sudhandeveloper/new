import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  formData: {},
};
export const formSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
  },
});
export const { setInputValue } = formSlice.actions;
export default formSlice.reducer;
