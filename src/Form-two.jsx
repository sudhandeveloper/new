import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useSelector, useDispatch } from "react-redux";

import { updateUserField } from "./Redux/AllSlices/Formslices/formaction";

const FormTwo = () => {
  const dispatch = useDispatch();
  const {sata} = useSelector((state) => state.formdata.formdata);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateUserField(name, value));
  };
  return (
    <Box>
      {sata.name}{" "}
      <TextField
        type="text"
        name="name"
        placeholder="Name"
    value={sata.name}
        onChange={handleChange}
      />

      <TextField
        type="text"
        name="age"
        placeholder="Username"
        value={sata.age}
        onChange={handleChange}
      />
    </Box>
  );
};

export default FormTwo;
