import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  Box,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Alert,
} from "@mui/material";
import { PennyWiseContext } from "../../Context/PennyWiseContext";
import patchTrans from "../api/patchTrans";
import getTrans from "../api/getTrans";
import getBalance from "../api/getBalance";
import "./Modals.css";

const PatchTransModal = ({ single }) => {
  const { userId } = useParams();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(single);
  const { updatesData } = useContext(PennyWiseContext);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let allFieldsValid = true;

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (value === "" || value === null || value === undefined) {
          allFieldsValid = false;
          break;
        }
      }
    }

    if (!allFieldsValid) {
      setErrorAlert(true);
      setTimeout(() => {
        setFormData(single);
        handleClose();
      }, 1500);
      return;
    }
    try {
      await patchTrans(single._id, formData);

      const updatedTransData = await getTrans(userId);
      const userBalance = await getBalance(userId);

      updatesData("setTrans", updatedTransData);
      updatesData("setBalance", userBalance);

      setSuccessAlert(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      console.error("Error updating transaction:", error);
      setErrorAlert(true);
      setTimeout(() => {
        setFormData(single);
        handleClose();
      }, 1500);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Modify
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#FFAD8E" }}>Modify transaction</DialogTitle>
        {successAlert && (
          <Alert severity="success">Transaction modified successfully!</Alert>
        )}

        <Box sx={{ p: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                autoFocus
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <MenuItem value={"expense"}>Expense</MenuItem>
                  <MenuItem value={"income"}>Income</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                inputProps={{
                  max: new Date().toISOString().split("T")[0],
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {errorAlert && (
          <Alert severity="error">Error modifying transaction</Alert>
        )}

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PatchTransModal;
