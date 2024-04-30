import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import getUser from "../api/getUser";
import getTrans from "../api/getTrans";
import getGoals from "../api/getGoals";
import Goals from "../cards/Goals";
import Transactions from "../cards/Transactions";
import SideDrawer from "../sideDrawer/SideDrawer";
import "./Home.css";

const Home = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [trans, setTrans] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser(userId);
        const userTrans = await getTrans(userId);
        const userGoals = await getGoals(userId);
        setUser(userData);
        setTrans(userTrans);
        setGoals(userGoals);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Box sx={{ flexGrow: 1 }} component="main">
      <Grid container spacing={2} columns={16}>

        <Grid item xs={12} md={2}>
          <SideDrawer user={user} />
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "#FA98A8", mb: "16px" }}>
            Transactions
          </Typography>

          {trans.length === 0 ? (
            <Typography sx={{ mt: "16px", color: "#FFCF74" }}>
              No transactions yet
            </Typography>
          ) : (
            trans.map((single) => <Transactions single={single} />)
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "#FA98A8", mb: "16px" }}>
            Goals
          </Typography>
          {goals.length === 0 ? (
            <Typography sx={{ mt: "16px", color: "#FFCF74" }}>
              No goals yet
            </Typography>
          ) : (
            goals.map((goal) => <Goals goal={goal} />)
          )}
        </Grid>

        <Grid item xs={12} md={2}>
          <Button size="large">+</Button>
          <Button size="large">-</Button>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default Home;
