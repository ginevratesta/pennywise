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
import patchSavings from "../api/patchSavings";
import getSavings from "../api/getSavings";
import getUserSavings from "../api/getUserSavings";
import "./Modals.css";

const PatchSavingsModal = ({ saving }) => {
  const { userId } = useParams();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(saving);
  const { updatesData, goals } = useContext(PennyWiseContext);

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
      await patchSavings(saving._id, formData);

      const updatedSavingsData = await getSavings(userId);
      updatesData("setSavings", updatedSavingsData);
      const userSavings = await getUserSavings(userId);
      updatesData("setTotalSavings", userSavings);
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

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PatchSavingsModal;
