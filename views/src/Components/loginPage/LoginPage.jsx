import {
    Box,
    Typography,
    TextField,
    Grid,
    Container,
    Button,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import axios from "axios";
  import "./LoginPage.css";

  const LoginPage = () => {
    const [formData, setFormData] = useState({
      name: "",
      surname: "",
      email: "",
      dateOfBirth: "",
      occupation: "",
      password: "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:3023/signup",
          formData
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    useEffect(() => {
    }, [formData]);

    return (
      <Container component="main" maxWidth="xs" display="flex">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: "24px",
          }}
        >
          <Typography variant="h4" m="0" pb="16px" color="#A4D8E7">
            Sign up
          </Typography>

          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              border: 2,
              borderColor: "#A4D8E7",
              borderRadius: "16px",
              boxShadow: 3,
            }}
            p="32px"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Name"
                  autoComplete="first-name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="surname"
                  label="Surname"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="occupation"
                  label="Occupation"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="dateOfBirth"
                  type="date"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="password"
                  type="password"
                  label="Password"
                  onChange={handleChange}
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
                bgcolor: "#A4D8E7",
                ":hover": { bgcolor: "#5B96CB" },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };

  export default LoginPage;
