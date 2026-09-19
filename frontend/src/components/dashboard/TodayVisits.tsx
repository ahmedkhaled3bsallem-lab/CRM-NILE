import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
} from "@mui/material";

const visits = [
  {
    rep: "Ahmed Hassan",
    customer: "El Salam Pharmacy",
    status: "In Progress",
  },
  {
    rep: "Mohamed Ali",
    customer: "El Amal Pharmacy",
    status: "Completed",
  },
];

export default function TodayVisits() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Today's Visits
        </Typography>

        {visits.map((visit) => (
          <Box
            key={`${visit.rep}-${visit.customer}`}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Box display="flex" alignItems="center">
              <Avatar sx={{ mr: 2 }}>
                {visit.rep.charAt(0)}
              </Avatar>

              <Box>
                <Typography fontWeight={600}>
                  {visit.rep}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {visit.customer}
                </Typography>
              </Box>
            </Box>

            <Chip
              label={visit.status}
              color={
                visit.status === "Completed"
                  ? "success"
                  : "warning"
              }
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}