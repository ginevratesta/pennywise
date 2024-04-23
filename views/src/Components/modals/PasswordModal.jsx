import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import "./PasswordModal.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PasswordModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Typography
        className="pointer"
        variant="subtitle2"
        color="#CA8EB4"
        sx={{ ":hover": { color: "#FFAD8E" } }}
        onClick={handleClickOpen}
      >
        Password Policy
      </Typography>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="#CA8EB4">{"PASSWORD POLICY RULES"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <ul>
              <li>
                Passwords must be at least{" "}
                <span className="rules">8 characters</span> long and no more
                than <span className="rules">12 characters</span>.
              </li>
              <li>
                Passwords must contain at least{" "}
                <span className="rules">one uppercase letter</span>.
              </li>
              <li>
                Passwords must contain at least{" "}
                <span className="rules">one number</span>.
              </li>
              <li>
                Passwords must contain at least{" "}
                <span className="rules">one special character</span>.
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#CA8EB4",
              ":hover": { bgcolor: "#fffee0", color: "#FFAD8E" },
            }}
            onClick={handleClose}
          >
            I understand
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PasswordModal;
