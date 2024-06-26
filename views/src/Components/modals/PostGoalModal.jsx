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
import getGoals from "../api/getGoals";
import postGoal from "../api/postGoal";
import "./Modals.css";

const PostGoalModal = () => {
  const { userId } = useParams();

  const [open, setOpen] = useState(false);
  const { updatesData } = useContext(PennyWiseContext);
  const [formData, setFormData] = useState({
    userId: userId,
    type: "",
    description: "",
    amount: "",
    savings: "",
    date: "",
  });
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      userId: userId,
      type: "",
      description: "",
      amount: "",
      savings: "",
      date: "",
    });
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (formData.amount > 0) {
        await postGoal(userId, formData);
        const postedGoalData = await getGoals(userId);
        updatesData("setGoals", postedGoalData);

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
      console.error("Error posting goal:", error);
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
        New Goal
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#FFAD8E" }}>Add new Goal</DialogTitle>
        {successAlert && (
          <Alert severity="success">New Goal added successfully!</Alert>
        )}

        <Box sx={{ p: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
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
                required
                label="Amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Savings"
                type="number"
                name="savings"
                value={formData.savings}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  required
                  labelId="type-label"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <MenuItem value={"daily"}>Daily</MenuItem>
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        {errorAlert && <Alert severity="error">Error adding goal</Alert>}

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PostGoalModal;
