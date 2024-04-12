import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  formdata: {
    name:"",
    age:"",
   // Provide an initial value (e.g., empty string)
  },
};
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setInputValue(state, action) {
        const { field, value } = action.payload; // Destructure payload
        state.formdata[field] = value;
    },
  },
});
export const { setInputValue } = formSlice.actions;
export default formSlice.reducer;
