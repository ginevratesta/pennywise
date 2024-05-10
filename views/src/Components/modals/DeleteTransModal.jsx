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
import deleteTrans from "../api/deleteTrans";
import getBalance from "../api/getBalance";
import "./Modals.css";

const DeleteTransModal = ({ transactionId, userId }) => {
  const [open, setOpen] = useState(false);
  const { updatesData, trans } = useContext(PennyWiseContext);

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

  const handleDeleteTrans = async () => {
    try {
      await deleteTrans(transactionId);

      const userBalance = await getBalance(userId);

      setSuccessAlert(true);
      setTimeout(() => {
        updatesData("setBalance", userBalance);
        updatesData(
          "setTrans",
          trans.filter((transaction) => transaction._id !== transactionId)
        );
        setSuccessAlert(false);
      }, 1500);
    } catch (error) {
      console.error("Error deleting transaction:", error);
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
          Do you really want to delete this transaction?
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
            <Alert severity="success">Transaction deleted successfully</Alert>
          )}

          {errorAlert && (
            <Alert severity="error">Error deleting Transaction</Alert>
          )}
        </Box>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="contained" size="small" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" size="small" onClick={handleDeleteTrans}>
            Delete trans
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteTransModal;
