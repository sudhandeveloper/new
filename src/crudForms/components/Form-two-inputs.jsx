import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  cancelEditUser,
  clearInputFields,
  clearValidationError,
  setInputValue,
  setValidationError,
  startEditUser,
  updateEditedUser,
} from "../../Redux/AllSlices/Formslices/SliceOne";
//  API START //

import { editeThunk, postThunk } from "./From-two-thunk-apis";
import { toast } from "react-toastify";

// API END//

const FormTwo = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.userdata?.formData?.name);
  const age = useSelector((state) => state.userdata?.formData?.age);
  const role = useSelector((state) => state.userdata?.formData?.role);
  const { error, editingUserId, validationErrors } = useSelector(
    (state) => state.userdata
  ); // Access error state
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setInputValue({ field: name, value }));
    dispatch(clearValidationError({ field: name }));
  };

  const handleSubmit = () => {
    if (!name || !age || !role) {
      if (!name)
        dispatch(
          setValidationError({ field: "name", message: "Name is required" })
        );
      if (!age)
        dispatch(
          setValidationError({ field: "age", message: "Age is required" })
        );
      if (!role)
        dispatch(
          setValidationError({ field: "role", message: "Role is required" })
        );
      return;
    }

    const postData = { name, age, role };
    dispatch(postThunk(postData))
      .then(() => {
        setSubmitted(true);
        dispatch(clearInputFields());
        toast.success("Successfully to submit data! ", {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.error("Error posting data:", err);
        toast.error("Failed to submit data!");
      });
  };

  const handleCancelEdit = () => {
    dispatch(cancelEditUser());
  };

  const handleUpdate = () => {
    // Validate inputs before dispatching editeThunk
    if (!name || !age || !role) {
      if (!name)
        dispatch(
          setValidationError({ field: "name", message: "Name is required" })
        );
      if (!age)
        dispatch(
          setValidationError({ field: "age", message: "Age is required" })
        );
      if (!role)
        dispatch(
          setValidationError({ field: "role", message: "Role is required" })
        );
      return;
    }

    const updatedUserData = { name, age, role };
    dispatch(editeThunk({ id: editingUserId, updateuser: updatedUserData }))
      .then(() => {
        dispatch(cancelEditUser());
        toast.success("Successfully to edited data!", {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.error("Error updating data:", err);
        toast.error("Failed to update data!");
      });
  };

  return (
    <Box>
      <ToastContainer />
      <Typography variant="h6" color="initial">
        FORM TWO
      </Typography>
      <TextField
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
        error={!!validationErrors.name}
        helperText={validationErrors.name}
      />

      <Divider />
      <br />
      <TextField
        type="text"
        placeholder="age"
        name="age"
        value={age}
        onChange={handleChange}
        error={!!validationErrors.age}
        helperText={validationErrors.age}
      />
      <Divider />
      <br />
      <TextField
        type="text"
        placeholder="role"
        name="role"
        value={role}
        onChange={handleChange}
        error={!!validationErrors.role}
        helperText={validationErrors.role}
      />
      <Box sx={{ marginTop: "20px" }}>
        {" "}
        {editingUserId ? ( // Show update button if editing
          <>
            <Button variant="contained" type="button" onClick={handleUpdate}>
              Update
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={handleCancelEdit}
              sx={{ marginLeft: 1 }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button> // Show submit button for adding
        )}{" "}
      </Box>
    </Box>
  );
};

export default FormTwo;
