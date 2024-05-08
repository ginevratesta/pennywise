import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../pics/penny.png";
import "./Header.css";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUser = () => {
    setAnchorEl(null);
    navigate(`/settings/${userId}`);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    navigate(`/`);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate(`/home/${userId}`)}>
              <img src={logo} alt="logo" />
              <Typography color="inherit">PennyWise</Typography>
            </Box>

            <Box>
              {location.pathname !== "/" && (
                <Button
                  id="basic_button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography sx={{ marginInlineEnd: "8px" }}>USER</Typography>
                  <SettingsIcon />
                </Button>
              )}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic_button",
                }}
              >
                <MenuItem onClick={handleUser}>User Settings</MenuItem>
                <MenuItem onClick={handleLogOut}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography marginInlineEnd="8px">Log out</Typography>
                    <LogoutIcon />
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
