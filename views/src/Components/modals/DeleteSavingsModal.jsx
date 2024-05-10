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
import deleteSavings from "../api/deleteSavings";
import getUserSavings from "../api/getUserSavings";
import getBalance from "../api/getBalance";
import getGoalSavings from "../api/getGoalSavings";
import "./Modals.css";

const DeleteSavingsModal = ({ savingsId, userId }) => {
  const [open, setOpen] = useState(false);
  const { updatesData, savings } = useContext(PennyWiseContext);

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  const handleDeleteSavings = async () => {
    try {
      await deleteSavings(savingsId);

      const userSavings = await getUserSavings(userId);

      const userBalance = await getBalance(userId);

      const userGoalSavings = await getGoalSavings(userId);

      setSuccessAlert(true);
      setTimeout(() => {
        updatesData(
          "setSavings",
          savings.filter((saving) => saving._id !== savingsId)
        );
        updatesData("setTotalSavings", userSavings);
        updatesData("setBalance", userBalance);
        updatesData("setGoalSavings", userGoalSavings);
        setSuccessAlert(false);
      }, 1500);
    } catch (error) {
      console.error("Error deleting savings:", error);
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
      }, 1500);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#FFAD8E" }}>
          Do you really want to delete this savings?
        </DialogTitle>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100px",
          }}
        >
          <Typography color="#CA8EB4">
            This action will be irreversible
          </Typography>

          {successAlert && (
            <Alert severity="success">Savings deleted successfully</Alert>
          )}

          {errorAlert && <Alert severity="error">Error deleting savings</Alert>}
        </Box>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="contained" size="small" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleDeleteSavings}
          >
            Delete Savings
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteSavingsModal;
