import React from "react";
import { useEffect } from "react";
import {
  styled,
  Paper,
  // TextField,
  // Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from "react-redux";

import { editeThunk, getThunk } from "./From-two-thunk-apis";
import { deleteThunk } from "./From-two-thunk-apis";
import { startEditUser } from "../../Redux/AllSlices/Formslices/SliceOne";
import { toast } from "react-toastify";

const Formtwocomponent = () => {
  const dispatch = useDispatch();
  const { isLoading, error, users } = useSelector((state) => state.userdata); // Destructure users, isLoading, and error from state
  // console.log(useSelector((state) => state.userdata));
  // console.log(users);
  // This is get method :           (><)....
  useEffect(() => {
    dispatch(getThunk());
  }, [dispatch]);
  const deletedata = (id) => {
    dispatch(deleteThunk(id));
    toast.success("Successfully to Deleted data!", {
      position: "top-center"
    });
  };
  // End of the get method !!!

  // This start of edite method :   (><)....
  const handleEdit = (id) => {
    dispatch(startEditUser(id));
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
        <Typography variant="h6" color="initial" sx={{ marginTop: "25px" }}>
          Form Two Table
        </Typography>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>Employment Role</StyledTableCell>
              <StyledTableCell>Action </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{user.name}</StyledTableCell>
                  <StyledTableCell>{user.age}</StyledTableCell>
                  <StyledTableCell>{user.role}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => deletedata(user.id)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleEdit(user.id)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Formtwocomponent;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
