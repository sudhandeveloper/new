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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserAge } from "./Redux/AllSlices/dataslice";
import { setInputValue } from "./Redux/AllSlices/Formslices/SliceOne";

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const user = useSelector((state) => state.user.value);
  const formData = useSelector((state) => state.form.formData);

  const dispatch = useDispatch();

  const onchange = (e) => {
    const { name, value } = e.target; // Destructure event target
    dispatch(setInputValue({ field: name, value }));
  };

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

  const [errors, setErrors] = useState({
    email: "",
    age: "",
    employmentRole: "",
  });

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
  const handleEdit = (id) => {
    setEditingId(id);
    setUploaddata(dispdata.find((user) => user.id === id)); // Pre-populate form with user data
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setUploaddata({ name: "", age: "", employmentRole: "" }); // Reset form data
  };

  // const handleUpdateData = async () => {
  //   if (editingId) {
  //     const updatedUser = { ...setUploaddata, id: editingId };
  //     axios
  //       .put(`http://localhost:8080/users/${editingId}`, updatedUser)
  //       .then((response) => {
  //         setDispdata((prevData) =>
  //           prevData.map((user) =>
  //             user.id === editingId ? response.data : user
  //           )
  //         );
  //         setEditingId(null);
  //         setUploaddata({ name: "", age: "", employmentRole: "" });
  //       })

  //       .catch((error) => {
  //         console.error("Error updating data:", error);
  //         throw error;
  //       });
  //   }
  // };

  const handleUpdate = async () => {
    const updatedUser = { ...uploaddata };

    return axios
      .put(`http://localhost:8080/users/${editingId}`, updatedUser)
      .then((response) => {
        const updatedData = response.data;

        // Update dispdata with the updated user
        setDispdata((prevData) =>
          prevData.map((user) => (user.id === editingId ? updatedData : user))
        );

        setEditingId(null);
        setUploaddata({ name: "", age: "", employmentRole: "" }); // Reset form data
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Handle errors appropriately (e.g., display error message to user)
      });
  };

  const submite = async () => {
    let newErrors = {};

    if (!uploaddata.name) {
      newErrors.name = "name is required";
    }

    if (!uploaddata.age) {
      newErrors.age = "age is required";
    }

    if (!uploaddata.employmentRole) {
      newErrors.employmentRole = "employmentRole is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...newErrors });
      return false; // Validation failed
    }
    try {
      await addData();
    } catch (error) {
      console.error("Error adding data:", error);
    }

    setErrors({});
    return true;
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
                  placeholder="Name"
                  variant="outlined"
                  error={errors.name}
                  name="name"
                  value={uploaddata.name}
                  onChange={handleOnchanges}
                />
              </ListItem>
              {errors.name && (
                <Typography
                  sx={{ paddingLeft: 3 }}
                  variant="caption"
                  color="error"
                >
                  {errors.name}
                </Typography>
              )}
            </List>

            <List>
              <ListItem>
                <TextField
                  id="outlined-basic"
                  placeholder="Age"
                  variant="outlined"
                  name="age"
                  error={errors.age}
                  value={uploaddata.age}
                  onChange={handleOnchanges}
                />
              </ListItem>
              {errors.age && (
                <Typography
                  sx={{ paddingLeft: 3 }}
                  variant="caption"
                  color="error"
                >
                  {errors.age}
                </Typography>
              )}
            </List>
            <List>
              <ListItem>
                <TextField
                  id="outlined-basic"
                  placeholder="Employment Role"
                  variant="outlined"
                  name="employmentRole"
                  error={errors.employmentRole}
                  value={uploaddata.employmentRole}
                  onChange={handleOnchanges}
                />
              </ListItem>
              {errors.employmentRole && (
                <Typography
                  sx={{ paddingLeft: 3 }}
                  variant="caption"
                  color="error"
                >
                  {errors.employmentRole}
                </Typography>
              )}
            </List>
            <List>
              <ListItem>
                <ListItem>
                  {editingId ? ( // Show update button if editing
                    <Button
                      variant="contained"
                      type="button"
                      onClick={handleUpdate}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button variant="contained" type="submit" onClick={submite}>
                      Submit
                    </Button> // Show submit button for adding
                  )}
                  {editingId && ( // Show cancel button only when editing
                    <Button
                      variant="contained"
                      type="button"
                      onClick={handleCancelEdit}
                      sx={{ marginLeft: 2 }}
                    >
                      Cancel
                    </Button>
                  )}
                  {/* <Button variant="contained" onClick={submite}>
                  Submite
                </Button> */}
                </ListItem>
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
                      onClick={() => handleEdit(row.id)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ padding: 20 }}>
          <ul>
            <li>{user.name}</li>
            <li>{user.age}</li>
            <li>{user.email}</li>
            <Button onClick={() => dispatch(updateUserAge())}>increment</Button>
          </ul>

          <TextField
            id="outlined-basic"
            placeholder="Age"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={onchange}
          />
          {formData.name && ( // Only display content if formData.sudhan exists
            <p>The value of sudhan is: {formData.name}</p>
          )}

          <TextField
            id="outlined-basic"
            placeholder="name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={onchange}
          />
  
          <TextField
            id="outlined-basic"
            placeholder="age"
            variant="outlined"
            name="age"
            value={formData.age}
            onChange={onchange}
          />
         <p>Name: {formData.name}</p>
      <p>Age: {formData.age}</p>
        </Box>
      </Box>

      {/* {formdata.map((item) => {
        <div key={item.id}>{item.sudhan}</div>;
      })} */}
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
