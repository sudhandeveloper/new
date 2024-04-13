import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "../../Redux/AllSlices/Formslices/SliceOne";

const FormTwo = () => {
  const dispatch = useDispatch();
  const { name, age, role } = useSelector((state) => state.userdata.formData); // Handle potential undefined state

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setInputValue({ field: name, value }));
  };

  console.log(name);

  return (
    <Box>
      <Typography variant="h6" color="initial">
        FORM TWO
      </Typography>
      <TextField
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <Divider />
      <br />
      <TextField type="text" placeholder="age" name="age" value={age}  onChange={handleChange}/>
      <Divider />
      <br />
      <TextField type="text" name="role" value={role}  onChange={handleChange}/>
      <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default FormTwo;
