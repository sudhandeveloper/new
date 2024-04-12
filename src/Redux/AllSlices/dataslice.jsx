import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    name: "sudharshan M",
    age: 0,
    email: "gmsudhan3@gmail.com",
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.value = action.payload;
    },
    updateUserAge: (state, action) => {
      state.value.age += 1;
    },
    // updateUserEmail: (state, action) => {
    //   state.value.email = action.payload;
    // },
  },
});
export const { updateData, updateUserAge } = userSlice.actions;
export default userSlice.reducer;
