import * as React from "react";
import { Box, Typography, Drawer, Button, Divider } from "@mui/material";
import { PennyWiseContext } from "../../Context/PennyWiseContext";

const SideDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const { user } = React.useContext(PennyWiseContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 270 }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography>{user.name}</Typography>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Show details</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideDrawer;
