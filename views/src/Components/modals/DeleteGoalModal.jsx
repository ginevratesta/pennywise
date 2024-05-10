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
import deleteGoal from "../api/deleteGoals";
import "./Modals.css";

const DeleteGoalModal = ({ goalId }) => {
  const [open, setOpen] = useState(false);
  const { updatesData, goals } = useContext(PennyWiseContext);

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

  const handleDeleteGoal = async () => {
    try {
      await deleteGoal(goalId);

      setSuccessAlert(true);
      setTimeout(() => {
        updatesData(
          "setGoals",
          goals.filter((goal) => goal._id !== goalId)
        );
        setSuccessAlert(false);
      }, 1500);
    } catch (error) {
      console.error("Error deleting goal:", error);
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
          Do you really want to delete this goal?
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
            <Alert severity="success">Goal deleted successfully</Alert>
          )}

          {errorAlert && <Alert severity="error">Error deleting Goal</Alert>}
        </Box>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="contained" size="small" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" size="small" onClick={handleDeleteGoal}>
            Delete goal
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteGoalModal;
