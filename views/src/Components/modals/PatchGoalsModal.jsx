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
} from "@mui/material";
import { PennyWiseContext } from "../../Context/PennyWiseContext";
import patchGoal from "../api/patchGoals";
import getGoals from "../api/getGoals";

const PatchGoalModal = ({ goal }) => {
  
  const { userId } = useParams();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(goal);
  const {updatesData} = useContext(PennyWiseContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    try {
      await patchGoal(goal._id, formData);
      const updatedGoalData = await getGoals(userId); 
      updatesData("setGoals", updatedGoalData);
      handleClose();
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };


  return (
    <React.Fragment>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Modify
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#FFAD8E" }}>Modify Goal</DialogTitle>
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
                  <MenuItem value={"daily"}>Daily</MenuItem>
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
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
              />
            </Grid>
          </Grid>
        </Box>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PatchGoalModal;