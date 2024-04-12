import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../AllSlices/dataslice";
import formSliceReducer from "../AllSlices/Formslices/SliceOne";

export const store = configureStore({
  reducer: {
    formdata: formSliceReducer,
    user: userReducer,
  },
});
