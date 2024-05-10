import {
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import PatchTransModal from "../modals/PatchTransModal";
import DeleteTransModal from "../modals/DeleteTransModal";


const Transactions = ({ single }) => {
  return (
    <Card className="card" id={single._id} sx={{ width: "70%", mb: "24px" }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: "#FA98A8" }}>
          {single.type === "income" ? "Income" : "Expense"}: {single.amount} €
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          Description: {single.description}
        </Typography>
        <Typography variant="subtitle2" color="#9686AB" gutterBottom>
          {single.date}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <PatchTransModal single={single} />
        <DeleteTransModal transactionId={single._id} userId={single.userId}/>
      </CardActions>
    </Card>
  );
};

export default Transactions;
