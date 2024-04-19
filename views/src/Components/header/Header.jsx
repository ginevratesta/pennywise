import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../pics/penny.png"
import "./Header.css"

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="logo" />
          <Typography color="inherit">PennyWise</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
