import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

interface VisitPlanStatsProps {
  totalPlans: number;
  plannedCount: number;
  completedCount: number;
  cancelledCount: number;
}

export default function VisitPlanStats({
  totalPlans,
  plannedCount,
  completedCount,
  cancelledCount,
}: VisitPlanStatsProps) {
  const cards = [
    {
      title: "Total Plans",
      value: totalPlans,
    },
    {
      title: "Planned",
      value: plannedCount,
    },
    {
      title: "Completed",
      value: completedCount,
    },
    {
      title: "Cancelled",
      value: cancelledCount,
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 3 }}
    >
      {cards.map((card) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 3 }}
          key={card.title}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
              >
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}