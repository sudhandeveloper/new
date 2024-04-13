import React from "react";
import {
  styled,
  Paper,
  TextField,
  Button,
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
const Formtwocomponent = () => {
    const { name,age,role } = useSelector((state) => state.userdata.formData); 
  return (
    <>
      <Typography variant="h6" color="initial" sx={{ marginTop: "25px" }}>
        Form Two Table
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: "4px" }}>
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
            {/* {dispdata.map((row, Index) => ( */}
            <StyledTableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>{name} </StyledTableCell>
              <StyledTableCell>{age}</StyledTableCell>
              <StyledTableCell>{role}</StyledTableCell>

              <StyledTableCell>
                <IconButton
                  aria-label="delete"
                  size="small"
                  // onClick={() => handleDelete(row.id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  size="small"
                  // onClick={() => handleEdit(row.id)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
            {/* ))} */}
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
