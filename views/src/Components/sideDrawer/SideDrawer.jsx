import { useEffect, useState, useContext } from "react";
import { Box, Typography, Drawer, Button, Divider } from "@mui/material";
import { PennyWiseContext } from "../../Context/PennyWiseContext";
import { useParams } from "react-router-dom"; 
import getBalance from "../api/getBalance";

const SideDrawer = () => {
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const { updatesData, user, balance } = useContext(PennyWiseContext);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]); 

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 270 }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography>{user.name} {user.surname}'s details</Typography>
      <Typography>Balance: {balance}</Typography>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button variant="contained" sx={{ m: "4px", ":hover": { backgroundColor: "#FFAD8E" } }} onClick={toggleDrawer(true)}>Show details</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideDrawer;
