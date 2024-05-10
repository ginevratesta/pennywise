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
import patchSavings from "../api/patchSavings";
import getSavings from "../api/getSavings";
import getUserSavings from "../api/getUserSavings";
import getGoalSavings from "../api/getGoalSavings";
import getBalance from "../api/getBalance";
import "./Modals.css";

const PatchSavingsModal = ({ saving }) => {
  const { userId } = useParams();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(saving);
  const { updatesData, goals } = useContext(PennyWiseContext);

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(saving);
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
        handleClose();
      }, 1500);
      return;
    }

    try {
      if (formData.amount > 0) {
        await patchSavings(saving._id, formData);

        const updatedSavingsData = await getSavings(userId);
        updatesData("setSavings", updatedSavingsData);
        const userBalance = await getBalance(userId);
        updatesData("setBalance", userBalance);
        const userSavings = await getUserSavings(userId);
        updatesData("setTotalSavings", userSavings);
        const goalSavings = await getGoalSavings(userId);
        updatesData("setGoalSavings", goalSavings);

        setSuccessAlert(true);
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        setErrorAlert(true);
        setTimeout(() => {
          handleClose();
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      setErrorAlert(true);
      setTimeout(() => {
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
        <DialogTitle sx={{ color: "#FFAD8E" }}>Modify Goal</DialogTitle>
        {successAlert && (
          <Alert severity="success">Savings modified successfully!</Alert>
        )}

        <Box sx={{ p: "16px" }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16} sm={8}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={16} sm={8}>
              <FormControl fullWidth>
                <InputLabel id="type-label">Goal</InputLabel>
                <Select
                  labelId="type-label"
                  id="Goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                >
                  {goals.map((goal) => {
                    return (
                      <MenuItem key={goal._id} value={goal.description}>
                        {goal.description}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {errorAlert && <Alert severity="error">Error modifying savings</Alert>}

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PatchSavingsModal;
