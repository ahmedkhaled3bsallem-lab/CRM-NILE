import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

interface RepresentativeStatsProps {
  totalRepresentatives: number;
  activeRepresentatives: number;
  inactiveRepresentatives: number;
  totalCustomers: number;
}

export default function RepresentativeStats({
  totalRepresentatives,
  activeRepresentatives,
  inactiveRepresentatives,
  totalCustomers,
}: RepresentativeStatsProps) {
  const cards = [
    {
      title: "Total Representatives",
      value: totalRepresentatives,
      icon: <GroupsIcon fontSize="large" color="primary" />,
    },
    {
      title: "Active Representatives",
      value: activeRepresentatives,
      icon: <CheckCircleIcon fontSize="large" color="success" />,
    },
    {
      title: "Inactive Representatives",
      value: inactiveRepresentatives,
      icon: <CancelIcon fontSize="large" color="error" />,
    },
    {
      title: "Assigned Customers",
      value: totalCustomers,
      icon: <PeopleAltIcon fontSize="large" color="warning" />,
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid #ECECEC",
              boxShadow: "0 8px 24px rgba(0,0,0,.05)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ mb: 2 }}
              >
                {card.value}
              </Typography>

              {card.icon}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}