import React, { useEffect, useState, useContext, Fragment } from "react";
import { Box, Typography, Drawer, Button, Divider } from "@mui/material";
import { PennyWiseContext } from "../../Context/PennyWiseContext";
import { useParams } from "react-router-dom";
import getBalance from "../api/getBalance";

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
      <Typography>
        {user.name} {user.surname}'s details
      </Typography>
      <Typography>Current balance: {balance}€</Typography>
      <Divider />
      
      <Typography mt="16px">GOALS:</Typography>

      {goals?.map((goal) => {

        const monthsToSave = Math.ceil(goal.amount / goal.savings);
        const endDate = new Date(goal.date);
        endDate.setMonth(endDate.getMonth() + monthsToSave);
        const formattedEndDate = endDate.toLocaleDateString();
        const calc = Math.round(goal.amount / monthsToSave);

        return (
          <Fragment key={goal._id}>
            <Box my="16px">
              <Typography>
                {goal.description} {goal.amount}€ total {calc}€{" "}
                {goal.type}
              </Typography>
              <Typography>Goal date: {formattedEndDate} in {monthsToSave} months</Typography>
            </Box>
            <Divider />
          </Fragment>
        );
      })}
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
