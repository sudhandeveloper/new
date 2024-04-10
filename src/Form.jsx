import * as React from "react";
import {
  styled,
  Grid,
  Paper,
  Autocomplete,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Modal,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  // =================================================================
  const [uploaddata, setUploaddata] = useState({});
  const [dispdata, setDispdata] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleOnchanges = (e) => {
    setUploaddata({ ...uploaddata, [e.target.name]: e.target.value });
  };
  const addData = async () => {
    return axios
      .post("http://localhost:8080/users", uploaddata)
      .then(() => {
        alert("Submitted");
        setUploaddata({
          name: "",
          age: "",
          employmentRole: "",
        });
        setTimeout(fetchData, 500);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        throw error;
      });
  };

  const fetchData = async () => {
    return axios
      .get("http://localhost:8080/users")
      .then((response) => setDispdata(response.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  // =============================
  const handleDelete = async (id) => {
    return axios
      .delete(`http://localhost:8080/users/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        throw error;
      });
  };
  // =================================

  const handleUpdateData = async (id) => {
    return axios
      .put(`http://localhost:8080/users/${id}`, dispdata)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error updating data:", error);
        throw error;
      });
  };

  // const handleOpen = (id) => {
   
  //   setEditingId(id);
  //   const item = dispdata.find((row) => row.id === id);
   
   
  // };
  
  const submite = () => {
    addData();
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {/* -------------------------Drawer */}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <div>
            <Toolbar />
            <Divider />

            <Divider />
            <List>
              <ListItem>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={uploaddata.name }
                  onChange={handleOnchanges}
                />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <TextField
                  id="outlined-basic"
                  label="Age"
                  variant="outlined"
                  name="age"
                  value={uploaddata.age}
                  onChange={handleOnchanges}
                />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <TextField
                  id="outlined-basic"
                  label="Employment Role"
                  variant="outlined"
                  name="employmentRole"
                  value={uploaddata.employmentRole}
                  onChange={handleOnchanges}
                />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <Button variant="contained" onClick={submite}>
                  Submite
                </Button>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: "80px",
        }}
      >
        <TableContainer component={Paper}>
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
              {dispdata.map((row, Index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{Index + 1}</StyledTableCell>
                  <StyledTableCell>{row.name} </StyledTableCell>
                  <StyledTableCell>{row.age} </StyledTableCell>
                  <StyledTableCell>{row.employmentRole} </StyledTableCell>

                  <StyledTableCell>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleUpdateData(row.id)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

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
