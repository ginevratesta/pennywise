import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const Transactions = ({ single }) => {
  return (
    <Card sx={{ width: "70%", mb: "24px" }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }}>{single.amount} €</Typography>
        <Typography variant="body2">
          {single.type}: {single.description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="#FA98A8" gutterBottom>
          {single.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Modify</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Transactions;
