import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const Goals = ({ goal, handleDeleteGoal }) => {
  return (
    <Card className="card" id={goal._id} sx={{ width: "70%", mb: "24px" }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }}>{goal.amount} €</Typography>
        <Typography variant="body2">{goal.description}</Typography>
        <Typography variant="body2">Saving: {goal.type}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Modify</Button>
        <Button size="small" onClick={handleDeleteGoal}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Goals;
