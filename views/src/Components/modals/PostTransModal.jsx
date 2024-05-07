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
import getTrans from "../api/getTrans";
import getBalance from "../api/getBalance";
import postTrans from "../api/postTrans";
import "./Modals.css";

const PostTransModal = () => {
  const { userId } = useParams();

  const [open, setOpen] = useState(false);
  const { updatesData } = useContext(PennyWiseContext);
  const [formData, setFormData] = useState({
    userId: userId,
    type: "",
    description: "",
    amount: "",
    date: "",
  });

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
      date: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await postTrans(userId, formData);
      const postedTransData = await getTrans(userId);
      const userBalance = await getBalance(userId);
      updatesData("setTrans", postedTransData);
      updatesData("setBalance", userBalance);
      handleClose();
    } catch (error) {
      console.error("Error posting transaction:", error);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{ m: "4px", ":hover": { backgroundColor: "#FFAD8E" } }}
        onClick={handleClickOpen}
      >
        New Transaction
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#FFAD8E" }}>Add new expense</DialogTitle>
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
                  <MenuItem value={"expense"}>Expense</MenuItem>
                  <MenuItem value={"income"}>Income</MenuItem>
                </Select>
              </FormControl>
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

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PostTransModal;
