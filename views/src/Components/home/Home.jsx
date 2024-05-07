import { useContext, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { PennyWiseContext } from "../../Context/PennyWiseContext";
import getUser from "../api/getUser";
import getTrans from "../api/getTrans";
import getGoals from "../api/getGoals";
import getSavings from "../api/getSavings";
import getBalance from "../api/getBalance";
import deleteTrans from "../api/deleteTrans";
import deleteGoal from "../api/deleteGoals";
import deleteSavings from "../api/deleteSavings";
import PostTransModal from "../modals/PostTransModal";
import PostGoalModal from "../modals/PostGoalModal";
import PostSavingsModal from "../modals/PostSavingsModal";
import Goals from "../cards/Goals";
import Transactions from "../cards/Transactions";
import Savings from "../cards/Savings";
import SideDrawer from "../sideDrawer/SideDrawer";
import "./Home.css";

const Home = () => {
  const { updatesData, trans, goals, savings, balance } = useContext(PennyWiseContext);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser(userId);
        updatesData("setUser", userData);
        
        const userTrans = await getTrans(userId);
        updatesData("setTrans", userTrans);

        const userGoals = await getGoals(userId);
        updatesData("setGoals", userGoals);
        
        const userSavings = await getSavings(userId);
        updatesData("setSavings", userSavings);
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

      const userBalance = await getBalance(userId);

      updatesData(
        "setTrans",
        trans.filter((transaction) => transaction._id !== transactionId)
      );
      updatesData("setBalance", userBalance);
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

  const handleDeleteSavings = async (e) => {
    const savingsId = e.target.closest(".card").id;
    try {
      await deleteSavings(savingsId);

      updatesData(
        "setSavings",
        savings.filter((saving) => saving._id !== savingsId)
      );
    } catch (error) {
      console.error("Error deleting savings:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} component="main">
      <Grid container spacing={2} columns={16}>

        <Grid
          container
          columns={16}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: "24px",
          }}
        >
          <Grid item xs={16} md={8}>
          <SideDrawer />
          </Grid>
          
          <Grid item xs={16} md={8}>
          <Box sx={{display: "flex", justifyContent: "end"}}>
            <PostGoalModal />
            <PostTransModal />
            <PostSavingsModal />
          </Box>
          </Grid>
        </Grid>

        <Grid className="balance" item xs={16} my="16px" mx="36px" pb="16px">
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography variant="h4" color="#FFAD8E">
            Balance: {balance}€
            </Typography>
          </Box>
        </Grid>


        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "#9686AB", mb: "16px" }}>
            Transactions
          </Typography>

          {trans?.length === 0 ? (
            <Typography sx={{ mt: "16px", color: "#FFAD8E" }}>
              No transactions yet
            </Typography>
          ) : (
            trans?.slice()
              .reverse()
              .map((single) => (
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
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "#9686AB", mb: "16px" }}>
            Goals
          </Typography>
          {goals?.length === 0 ? (
            <Typography sx={{ mt: "16px", color: "#FFAD8E" }}>
              No goals yet
            </Typography>
          ) : (
            goals?.slice()
              .reverse()
              .map((goal) => (
                <Goals
                  key={goal._id}
                  goal={goal}
                  handleDeleteGoal={handleDeleteGoal}
                />
              ))
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "#9686AB", mb: "16px" }}>
            Savings
          </Typography>
          {savings?.length === 0 ? (
            <Typography sx={{ mt: "16px", color: "#FFAD8E" }}>
              No savings yet
            </Typography>
          ) : (
            savings?.slice()
              .reverse()
              .map((saving) => (
                <Savings
                  key={saving._id}
                  saving={saving}
                  handleDeleteSavings={handleDeleteSavings}
                />
              ))
          )}
        </Grid>

      </Grid>
    </Box>
  );
};

export default Home;
