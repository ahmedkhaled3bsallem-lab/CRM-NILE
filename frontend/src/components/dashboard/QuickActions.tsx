import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import {
  PersonAdd,
  AddShoppingCart,
  Assignment,
} from "@mui/icons-material";

export default function QuickActions() {
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
          Quick Actions
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            fullWidth
          >
            Add Customer
          </Button>

          <Button
            variant="outlined"
            startIcon={<Assignment />}
            fullWidth
          >
            New Visit
          </Button>

          <Button
            variant="outlined"
            startIcon={<AddShoppingCart />}
            fullWidth
          >
            New Order
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}