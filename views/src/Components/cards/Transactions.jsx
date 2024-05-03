import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import PatchTransModal from "../modals/PatchTransModal";

const Transactions = ({ single, handleDeleteTrans }) => {
  return (
    <Card className="card" id={single._id} sx={{ width: "70%", mb: "24px" }}>
      <CardContent>
        <Typography variant="h5" sx={{color:"#FA98A8"}}>
          {single.type}: {single.amount} €
        </Typography>
        <Typography sx={{ mb: 1.5 }}>Description: {single.description}</Typography>
        <Typography variant="subtitle2" color="#9686AB" gutterBottom>
          {single.date}
        </Typography>
      </CardContent>
      <CardActions sx={{display: "flex", justifyContent: "space-around"}}>
        <PatchTransModal single={single} />
        <Button size="small" variant="contained" onClick={handleDeleteTrans}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Transactions;
