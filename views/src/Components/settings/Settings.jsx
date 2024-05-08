import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PennyWiseContext } from "../../Context/PennyWiseContext";
import getUser from "../api/getUser";
import patchUser from "../api/patchUser";
import deleteUser from "../api/deleteUser";
import {
  Container,
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Alert,
} from "@mui/material";
import "./Settings.css";

const Settings = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { updatesData, user } = useContext(PennyWiseContext);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    dateOfBirth: "",
    occupation: "",
  });

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId);
        updatesData("setUser", userData);
      } catch (error) {
        console.error("Error getting user", error);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleDeleteUser = async (e) => {
    try {
      await deleteUser(userId);
      updatesData("setUser", {});

      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredData = {};
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        filteredData[key] = formData[key];
      }
    }

    console.log(filteredData);

    try {
      await patchUser(userId, filteredData);
      const userData = await getUser(userId);
      updatesData("setUser", userData);

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 1500);
    } catch (error) {
      console.error("Error updating transaction:", error);
      setErrorAlert(true);
    }

    setFormData({
      name: "",
      surname: "",
      email: "",
      dateOfBirth: "",
      occupation: "",
    });
  };

  return (
    <Container component="main" maxWidth="md">
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
          Modify details
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
            <Alert severity="success">Update successfull!</Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} md={6} color="#FFAD8E">
              <Typography>{user.name}</Typography>
              <TextField
                fullWidth
                id="name"
                label="Name"
                autoComplete="first-name"
                autoFocus
                onChange={handleChange}
                value={formData.name}
              />
            </Grid>

            <Grid item xs={12} md={6} color="#FFAD8E">
              <Typography>{user.surname}</Typography>
              <TextField
                fullWidth
                id="surname"
                label="Surname"
                autoComplete="family-name"
                onChange={handleChange}
                value={formData.surname}
              />
            </Grid>

            <Grid item xs={12} color="#FFAD8E">
              <Typography>{user.email}</Typography>
              <TextField
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                onChange={handleChange}
                value={formData.email}
              />
            </Grid>

            <Grid item xs={12} color="#FFAD8E">
              <Typography>{user.occupation}</Typography>
              <TextField
                fullWidth
                id="occupation"
                label="Occupation"
                onChange={handleChange}
                value={formData.occupation}
              />
            </Grid>

            <Grid item xs={12} color="#FFAD8E">
              <Typography sx={{ marginInlineEnd: "24px", width: "100px" }}>
                {user.dateOfBirth}
              </Typography>
              <TextField
                fullWidth
                id="dateOfBirth"
                type="date"
                onChange={handleChange}
                value={formData.dateOfBirth}
                inputProps={{
                  max: new Date().toISOString().split("T")[0],
                }}
              />
            </Grid>

            {/* <Grid item xs={12}>
                <Typography variant="body1" color="#FFAD8E">Password</Typography>
                  <TextField
                    fullWidth
                    id="password"
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </Grid> */}
          </Grid>

          {errorAlert && (
            <Alert severity="error" onClose={() => setErrorAlert(false)}>
              Error updating user
            </Alert>
          )}

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
            Modify
          </Button>

          {/* <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    sx={{ textAlign: "right" }}
                    id="signin"
                  >
                    Modify user
                  </Typography>
                </Grid>
              </Grid> */}
        </Box>
      </Box>
      <Button size="small" variant="contained" onClick={handleDeleteUser}>
        Delete user account
      </Button>
    </Container>
  );
};

export default Settings;
