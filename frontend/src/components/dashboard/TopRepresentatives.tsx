import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

const reps = [
  {
    name: "Ahmed Hassan",
    sales: 95,
  },
  {
    name: "Mohamed Ali",
    sales: 82,
  },
  {
    name: "Mahmoud Salem",
    sales: 74,
  },
  {
    name: "Mostafa Adel",
    sales: 68,
  },
];

export default function TopRepresentatives() {
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
          mb={3}
        >
          Top Representatives
        </Typography>

        <Stack spacing={3}>
          {reps.map((rep) => (
            <Box key={rep.name}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Avatar sx={{ bgcolor: "#1976D2" }}>
                    {rep.name.charAt(0)}
                  </Avatar>

                  <Typography fontWeight={600}>
                    {rep.name}
                  </Typography>
                </Box>

                <Typography
                  fontWeight={700}
                  color="primary"
                >
                  {rep.sales}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={rep.sales}
                sx={{
                  height: 10,
                  borderRadius: 10,
                }}
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}