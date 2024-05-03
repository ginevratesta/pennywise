import { useContext, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { PennyWiseContext } from "../../Context/PennyWiseContext";
import getUser from "../api/getUser";
import getTrans from "../api/getTrans";
import getGoals from "../api/getGoals";
import deleteTrans from "../api/deleteTrans";
import deleteGoal from "../api/deleteGoals";
import PostTransModal from "../modals/PostTransModal";
import PostGoalModal from "../modals/PostGoalModal";
import Goals from "../cards/Goals";
import Transactions from "../cards/Transactions";
import SideDrawer from "../sideDrawer/SideDrawer";
import "./Home.css";

const Home = () => {
  const { updatesData, trans, goals } = useContext(PennyWiseContext);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser(userId);
        const userTrans = await getTrans(userId);
        const userGoals = await getGoals(userId);
        updatesData("setUser", userData);
        updatesData("setTrans", userTrans);
        updatesData("setGoals", userGoals);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleDeleteTrans = async (e) => {
    const transactionId = e.target.closest(".card").id;
    try {
      await deleteTrans(transactionId);

      updatesData(
        "setTrans",
        trans.filter((transaction) => transaction._id !== transactionId)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleDeleteGoal = async (e) => {
    const goalId = e.target.closest(".card").id;
    try {
      await deleteGoal(goalId);

      updatesData(
        "setGoals",
        goals.filter((goal) => goal._id !== goalId)
      );
    } catch (error) {
      console.error("Error deleting goal:", error);
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
          <SideDrawer />
          <Box>
            <PostGoalModal />
            <PostTransModal />
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
            trans.slice().reverse().map((single) => (
              <Transactions
                key={single._id}
                single={single}
                handleDeleteTrans={handleDeleteTrans}
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
            goals.slice().reverse().map((goal) => (
              <Goals
                key={goal._id}
                goal={goal}
                handleDeleteGoal={handleDeleteGoal}
              />
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
