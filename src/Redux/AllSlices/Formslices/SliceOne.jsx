import { createSlice } from "@reduxjs/toolkit";
import {
  deleteThunk,
  editeThunk,
  getThunk,
  postThunk,
} from "../../../crudForms/components/From-two-thunk-apis";

const initialState = {
  formData: { name: "", age: "", role: "" },
  users: [],
  isLoading: false,
  error: null,
  editingUserId: null,
  validationErrors: {}
};

export const formSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    clearInputFields: (state) => {
      state.formData = { name: "", age: "", role: "" }; // Reset formData to initial empty values
    },
    startEditUser: (state, action) => {
      state.editingUserId = action.payload; // Set the ID of the user being edited
      const userToEdit = state.users.find((user) => user.id === action.payload);
      if (userToEdit) {
        // Populate the form with the user's information being edited
        state.formData = { ...userToEdit };
      }
    },
    cancelEditUser: (state) => {
      state.editingUserId = null; // Reset the editing user ID
      state.formData = { name: "", age: "", role: "" };
    },
    setValidationError: (state, action) => {
      const { field, message } = action.payload;
      state.validationErrors[field] = message;
    },
    clearValidationError: (state, action) => {
      const { field } = action.payload;
      delete state.validationErrors[field];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = [...state.users, action.payload];
        state.formData = { name: "", age: "", role: "" };
      })
      .addCase(postThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Filter out the deleted item from the users array
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
        state.formData = { name: "", age: "", role: "" };
      })
      .addCase(deleteThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the user's information in the users array
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        // Reset editingUserId and formData
        state.editingUserId = null;
        state.formData = { name: "", age: "", role: "" };
      });
  },
});
export const {
  setInputValue,
  clearInputFields,
  startEditUser,
  cancelEditUser,
  setValidationError,
  clearValidationError
} = formSlice.actions;

export default formSlice.reducer;
