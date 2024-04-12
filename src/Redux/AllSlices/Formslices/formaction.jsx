// userActions.js
import { setInputValue } from "./SliceOne"; 

export const updateUserField = (fieldName, value) => {
  return (dispatch) => {
    dispatch(setInputValue({ fieldName, value }));
  };
};
