import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
  } from "@mui/material";
import PatchSavingsModal from "../modals/PatchSavingsModal";
  
  const Savings = ({ saving, handleDeleteSavings }) => {
    return (
      <Card className="card" id={saving._id} sx={{ width: "70%", mb: "24px" }}>
        <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "end"}}>
          <Typography variant="h5" sx={{ color:"#FA98A8" }}>Saving: {saving.amount} €</Typography>
          <Typography>What for: {saving.goal}</Typography>
          <Typography variant="subtitle2" color="#9686AB" gutterBottom>
           {saving.date}
          </Typography>
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "space-around"}}>
          <PatchSavingsModal saving={saving} />
          <Button size="small" variant="contained" onClick={handleDeleteSavings}>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default Savings;
  