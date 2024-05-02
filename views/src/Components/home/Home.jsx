import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import getUser from "../api/getUser";
import getTrans from "../api/getTrans";
import getGoals from "../api/getGoals";
import deleteTrans from "../api/deleteTrans";
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

  const handleDelete = async (e) => {
    const transactionId = e.target.closest(".card").id;
    console.log(transactionId);
    try {
      await deleteTrans(transactionId);

      setTrans(
        trans.filter((transaction) => transaction._id !== transactionId)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} component="main">
      <Grid container spacing={2} columns={16}>
        <Grid
          item
          xs={16}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: "24px",
          }}
        >
          <SideDrawer user={user} />
          <Box>
            <Button size="large">+</Button>
            <Button size="large">-</Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
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
            trans.map((single) => (
              <Transactions
                key={single._id}
                single={single}
                handleDelete={handleDelete}
              />
            ))
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
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
            goals.map((goal) => <Goals key={goal._id} goal={goal} />)
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
