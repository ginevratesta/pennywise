import { Card, CardContent, Typography, CardActions } from "@mui/material";
import PatchGoalModal from "../modals/PatchGoalsModal";
import DeleteGoalModal from "../modals/DeleteGoalModal";

const Goals = ({ goal }) => {
  return (
    <Card className="card" id={goal._id} sx={{ width: "70%", mb: "24px" }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h5" sx={{ color: "#FA98A8" }}>
          Goal: {goal.amount} €
        </Typography>
        <Typography>What for: {goal.description}</Typography>
        <Typography>
          Saving max: {goal.savings} € {goal.type}
        </Typography>
        <Typography variant="subtitle2" color="#9686AB" gutterBottom>
          Starting: {goal.date}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <PatchGoalModal goal={goal} />
        <DeleteGoalModal goalId={goal._id} />
      </CardActions>
    </Card>
  );
};

export default Goals;
