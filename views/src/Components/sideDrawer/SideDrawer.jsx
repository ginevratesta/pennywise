import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Drawer, Button, Divider } from "@mui/material";
import { PennyWiseContext } from "../../Context/PennyWiseContext";
import { useParams } from "react-router-dom";
import getBalance from "../api/getBalance";
import "./SideDrawer.css";

const SideDrawer = () => {
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const { updatesData, user, balance, goals } = useContext(PennyWiseContext);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userBalance = await getBalance(userId);
        updatesData("setBalance", userBalance);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBalance();
  }, [userId, updatesData]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      key={user._id}
      sx={{ width: 270, p: "16px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Typography variant="h6" color="#FFAD8E">
        {user.name} {user.surname}'s details
      </Typography>
      <Typography mb="16px" color="#FA98A8">Current balance: {balance}€</Typography>
      <Divider />

      <Typography variant="h6" mt="16px" color="#FFCF74">
        GOALS:
      </Typography>

      <ol>
        {goals?.map((goal) => {
          const monthsToSave = Math.ceil(goal.amount / goal.savings);
          const endDate = new Date(goal.date);
          endDate.setMonth(endDate.getMonth() + monthsToSave);
          const formattedEndDate = endDate.toLocaleDateString();
          const calc = Math.round(goal.amount / monthsToSave);

          return (
            <li key={goal._id}>
              <Box my="16px">
                <Typography variant="h6" color="#CA8EB4">{goal.description}</Typography>
                <Typography color="#FA98A8">Total amount: {goal.amount}€ </Typography>
                <Typography color="#FFAD8E">
                  Estimated {calc}€ {goal.type}
                </Typography>
                <Typography color="#FFCF74">Goal date: {formattedEndDate}</Typography>
                <Typography variant="body2" color="#9686AB">
                  in {monthsToSave} months
                </Typography>
              </Box>
              <Divider />
            </li>
          );
        })}
      </ol>
    </Box>
  );

  return (
    <div>
      <Button
        variant="contained"
        sx={{ m: "4px", ":hover": { backgroundColor: "#FFAD8E" } }}
        onClick={toggleDrawer(true)}
      >
        Show details
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideDrawer;
