import { Box, Typography, TextField, Grid, Container, Button } from "@mui/material";
import "./LoginPage.css";

const LoginPage = () => {
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
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
                required
                id="surname"
                label="Surname"
                autoComplete="family-name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
              fullWidth
                required
                id="email"
                label="Email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
              fullWidth
                required
                id="occupation"
                label="Occupation"
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
              fullWidth
                required
                id="dateOfBirth"
                type="date"
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
              fullWidth
                required
                id="password"
                type="password"
                label="Password"
              />
            </Grid>
          </Grid>

          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
