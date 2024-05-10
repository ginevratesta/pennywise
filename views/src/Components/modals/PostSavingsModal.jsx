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
import getSavings from "../api/getSavings";
import postSavings from "../api/postSavings";
import getUserSavings from "../api/getUserSavings";
import getGoalSavings from "../api/getGoalSavings";
import getBalance from "../api/getBalance";
import "./Modals.css";

const PostSavingsModal = () => {
  const { userId } = useParams();

  const [open, setOpen] = useState(false);
  const { updatesData, goals } = useContext(PennyWiseContext);
  const [formData, setFormData] = useState({
    userId: userId,
    amount: "",
    goal: "",
  });
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      ...formData,
      amount: "",
      goal: "",
    });
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (formData.amount > 0) {
        await postSavings(userId, formData);
        const postedSavingsData = await getSavings(userId);
        const userBalance = await getBalance(userId);
        updatesData("setBalance", userBalance);
        updatesData("setSavings", postedSavingsData);
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
      console.error("Error posting savings:", error);
      setErrorAlert(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{ m: "4px", ":hover": { backgroundColor: "#FFAD8E" } }}
        onClick={handleClickOpen}
      >
        New Savings
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#FFAD8E" }}>Add new savings</DialogTitle>
        {successAlert && (
          <Alert severity="success">New Savings added successfully!</Alert>
        )}

        <Box sx={{ p: "16px" }}>
          <Grid container spacing={2}>
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
                <InputLabel id="type-label">Goal</InputLabel>
                <Select
                  labelId="type-label"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                >
                  {goals.map((goal) => (
                    <MenuItem key={goal._id} value={goal.description}>
                      {goal.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {errorAlert && <Alert severity="error">Error adding savings</Alert>}

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PostSavingsModal;
