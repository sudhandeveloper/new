import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../AllSlices/dataslice";
import formReducer from "../AllSlices/Formslices/SliceOne";

export const store = configureStore({
  reducer: {
    userdata: formReducer,
    user: userReducer,
  },
});
