import React, { useContext, useState } from "react";
import {
    Box,
  Button,
  Dialog,
  Typography,
  DialogActions,
  DialogTitle,
  Alert,
} from "@mui/material";
import { PennyWiseContext } from "../../Context/PennyWiseContext";
import { useNavigate } from "react-router-dom";
import deleteUser from "../api/deleteUser";
import "./Modals.css";

const DeleteUserModal = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const { updatesData } = useContext(PennyWiseContext);
  const navigate = useNavigate()

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  const handleDeleteUser = async (e) => {
    try {
      await deleteUser(userId);
      updatesData("setUser", {});
      
      setSuccessAlert(true)
      setTimeout(() => {
        updatesData("setUser", {})
        navigate("/");
        setSuccessAlert(false)
      }, 1500)
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false)
      }, 1500)
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Delete account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#FFAD8E" }}>Do you really want to delete your account?</DialogTitle>

        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100px"}} >
        
        <Typography color="#CA8EB4">This action will be irreversible</Typography>

        {successAlert && (
          <Alert severity="success">User deleted successfully</Alert>
        )}

        {errorAlert && <Alert severity="error">Error deleting user</Alert>}
        </Box>
        <DialogActions sx={{display: "flex", justifyContent: "space-evenly"}}>
          <Button variant="contained" size="small" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" size="small" onClick={handleDeleteUser}>Delete my account</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteUserModal;