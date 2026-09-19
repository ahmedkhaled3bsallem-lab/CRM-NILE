import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

interface VisitStatsProps {
  totalVisits: number;
  completedVisits: number;
  pendingVisits: number;
  cancelledVisits: number;
}

export default function VisitStats({
  totalVisits,
  completedVisits,
  pendingVisits,
  cancelledVisits,
}: VisitStatsProps) {
  const cards = [
    {
      title: "Total Visits",
      value: totalVisits,
    },
    {
      title: "Completed",
      value: completedVisits,
    },
    {
      title: "Pending",
      value: pendingVisits,
    },
    {
      title: "Cancelled",
      value: cancelledVisits,
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
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              color="text.secondary"
              fontSize={14}
            >
              {card.title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ mt: 1 }}
            >
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}