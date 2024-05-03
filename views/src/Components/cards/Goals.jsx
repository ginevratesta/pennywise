import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import PatchGoalModal from "../modals/PatchGoalsModal";

const Goals = ({ goal, handleDeleteGoal }) => {
  return (
    <Card className="card" id={goal._id} sx={{ width: "70%", mb: "24px" }}>
      <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Typography variant="h5" sx={{ color:"#FA98A8" }}>Goal: {goal.amount} €</Typography>
        <Typography>What for: {goal.description}</Typography>
        <Typography>Saving: {goal.type}</Typography>
        <Typography variant="subtitle2" color="#9686AB" gutterBottom>
          {goal.date}
        </Typography>
      </CardContent>
      <CardActions sx={{display: "flex", justifyContent: "space-around"}}>
        <PatchGoalModal goal={goal} />
        <Button size="small" variant="contained" onClick={handleDeleteGoal}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Goals;
