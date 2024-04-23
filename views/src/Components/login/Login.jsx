import {
  Box,
  Typography,
  TextField,
  Grid,
  Container,
  Button,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Animation from "../animation/Animation";
import "./Login.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    dateOfBirth: "",
    occupation: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isUser, setIsUser] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUser) {
        await axios.post("http://localhost:3023/login", loginData);
      } else {
        await axios.post("http://localhost:3023/signup", formData);
        setSuccessAlert(true);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorAlert(true);
    } finally {
      if (isUser) {
        setLoginData({
          email: "",
          password: "",
        });
      } else {
        setFormData({
          name: "",
          surname: "",
          email: "",
          dateOfBirth: "",
          occupation: "",
          password: "",
        });
      }
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  };

  const handleChange = (e) => {
    if (isUser) {
      setLoginData({ ...loginData, [e.target.id]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleUser = () => {
    if (!isUser) {
      setIsUser(true);
      setFormData({
        name: "",
        surname: "",
        email: "",
        dateOfBirth: "",
        occupation: "",
        password: "",
      });
    } else {
      setIsUser(false);
      setLoginData({
        email: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, [formData, loginData, isUser]);

  return (
    <>
    { isLoading ? (
      <Animation />
    ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: "24px",
          mb: "40px",
          mt: "24px",
        }}
      >
        <Typography variant="h4" m="0" pb="16px" color="#CA8EB4">
          {isUser ? "Sign in" : "Sign up"}
        </Typography>

        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            border: 2,
            borderColor: "#CA8EB4",
            borderRadius: "16px",
            boxShadow: 10,
          }}
          p="32px"
        >
          {successAlert && (
            <Alert severity="success" onClose={() => setSuccessAlert(false)}>
              Signup successful!
            </Alert>
          )}
          {errorAlert && (
            <Alert severity="error" onClose={() => setErrorAlert(false)}>
              User already exists. Please sign in.
            </Alert>
          )}

          <Grid container spacing={2}>
            {!isUser && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Name"
                  autoComplete="first-name"
                  autoFocus
                  onChange={handleChange}
                  value={formData.name}
                />
              </Grid>
            )}

            {!isUser && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="surname"
                  label="Surname"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={formData.surname}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="email"
                label="Email"
                autoComplete="email"
                onChange={handleChange}
                value={isUser ? loginData.email : formData.email}
              />
            </Grid>

            {!isUser && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="occupation"
                  label="Occupation"
                  onChange={handleChange}
                  value={formData.occupation}
                />
              </Grid>
            )}

            {!isUser && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="dateOfBirth"
                  type="date"
                  onChange={handleChange}
                  value={formData.dateOfBirth}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="password"
                type="password"
                label="Password"
                onChange={handleChange}
                value={isUser ? loginData.password : formData.password}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#CA8EB4",
              ":hover": { bgcolor: "#FFAD8E" },
            }}
          >
            {isUser ? "Sign in" : "Sign Up"}
          </Button>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                sx={{ textAlign: "right" }}
                id="signin"
                onClick={handleUser}
                value={isUser}
              >
                {isUser
                  ? "Don't have an account yet? Sign up"
                  : "Already have an account? Sign in"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    )}
    </>
  );
};

export default LoginPage;
