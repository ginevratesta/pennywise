import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PennyWiseContext } from "../../Context/PennyWiseContext";
import getUser from "../api/getUser";
// import patchUser from "../api/patchUser";
import deleteUser from "../api/deleteUser";
import { Container, Box, Button, Grid, Typography, TextField } from "@mui/material";
import "./Settings.css";

const Settings = () => {
    const { updatesData, user } = useContext(PennyWiseContext);
    const {userId} = useParams()
    const [formData, setFormData] = useState(user);
    const navigate = useNavigate();

    useEffect( () => {
        const fetchData = async () => {
            const userData = await getUser(userId);
            setFormData(userData);
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userId])

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

      const handleSubmit = () => {
        console.log("hello");
      }

      console.log(formData)

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
              {/* {successAlert && (
                <Alert
                  severity="success"
                >
                  Update successfull!
                </Alert>
              )} */}

              <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" color="#FFAD8E">Name</Typography>
                    <TextField
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="#FFAD8E">Surname</Typography>
                    <TextField
                      fullWidth
                      autoComplete="family-name"
                      onChange={handleChange}
                      value={formData.surname}
                    />
                  </Grid>

                <Grid item xs={12}>
                <Typography variant="body1" color="#FFAD8E">Email</Typography>
                  <TextField
                    fullWidth
                    autoComplete="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </Grid>

                  <Grid item xs={12}>
                  <Typography variant="body1" color="#FFAD8E">Occupation</Typography>
                    <TextField
                      fullWidth
                      onChange={handleChange}
                      value={formData.occupation}
                    />
                  </Grid>

                  <Grid item xs={12}>
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    type="password"
                    label="Password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </Grid>
              </Grid>

              {/* {errorAlert && (
                <Alert severity="error" onClose={() => setErrorAlert(false)}>
                    Error updating user
                </Alert>
              )} */}

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
