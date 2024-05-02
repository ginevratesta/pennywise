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
        <Typography sx={{ mb: 1.5 }}>{single.amount} €</Typography>
        <Typography variant="body2">
          {single.type}: {single.description}
        </Typography>
        <Typography variant="subtitle2" color="#FA98A8" gutterBottom>
          {single.date}
        </Typography>
      </CardContent>
      <CardActions>
        <PatchTransModal single={single} />
        <Button size="small" onClick={handleDeleteTrans}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Transactions;
