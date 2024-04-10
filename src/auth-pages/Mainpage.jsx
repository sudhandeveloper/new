import * as React from "react";
import Button from "@mui/material/Button";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation
    let newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // } else {
    //   // Submit the form if there are no errors
    //   console.log("Form submitted:", formData);
    //   // Reset the form
    //   setFormData({
    //     email: "",
    //     password: "",
    //   });
    //   setErrors({
    //     email: "",
    //     password: "",
    //   });
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Simulate authentication (replace with your actual logic)
      console.log("Login attempted:", formData);
      // In a real application, you would call your backend API here
      // and handle the response accordingly, potentially setting
      // a token in localStorage or state to indicate successful login.

      // For demonstration purposes, assume successful login
      setIsLoggedIn(true);
      // if (!isLoggedIn) {
      //   navigate("/dashboard");
      // } else {
      //   <navigate to="/dashboard" replace />;
      //   alert("redirectoted back to login");
      // }
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      {" "}
      <Box
        sx={{
          height: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: "-webkit-linear-gradient(left, #E9278F, #8A3A93)",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "340px",
            padding: "7%",
            borderRadius: "25px",
            bgcolor: "#FEF2FF",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              background: "-webkit-linear-gradient(left, #E9278F, #8A3A93)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Sign In to continue
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              name="email"
              autoComplete="email"
              placeholder="email"
              autoFocus
              sx={{
                bgcolor: "white",
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                  },

                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main",
                    },
                  },
                  "&:hover:not(.Mui-focused)": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main",
                    },
                  },
                },
              }}
            />{" "}
            {errors.email && (
              <Typography variant="caption" color="error">
                {errors.email}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="password"
              autoComplete="current-password"
              sx={{
                bgcolor: "white",

                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                  },

                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main",
                    },
                  },

                  "&:hover:not(.Mui-focused)": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main",
                    },
                  },
                },
                bgcolor: "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#A5A5A5",
                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main",
                    },
                  },
                  "&:hover fieldset": {
                    borderColor: "#A5A5A5",
                    borderRadius: "4px",
                  },
                  "&.Mui-error .MuiOutlinedInput-notchedOutline , &:hover .Mui-error .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid #FF0000 !important",
                    },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      //   sx={{ color: errors.password ? "red" : "" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <Typography variant="caption" color="error">
                {errors.password}
              </Typography>
            )}
            <Grid container alignItems="center">
              <Grid item xs>
                <FormControlLabel
                  sx={{
                    color: "#9A3792", // Text color
                    "& .MuiCheckbox-root": {
                      color: "#9A3792",
                    },
                  }}
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  //   sx={{
                  //     background:
                  //       "-webkit-linear-gradient(left, #E9278F, #8A3A93)",
                  //     WebkitBackgroundClip: "text",
                  //     WebkitTextFillColor: "transparent",
                  //   }}
                  sx={{
                    color: "#9A3792", // Text color
                  }}
                >
                  Forgot password?
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                height: "52px",
                mt: 3,
                mb: 2,
                backgroundImage:
                  "linear-gradient(to right, #E9278F 0%, #8A3A93 100%)",
              }}
            >
              Sign In
            </Button>
          </Box>
        </Card>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Box>
    </>
  );
};

export default Login;
