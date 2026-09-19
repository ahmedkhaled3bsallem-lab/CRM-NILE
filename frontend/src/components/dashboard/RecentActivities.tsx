import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  CheckCircle,
} from "@mui/icons-material";

const activities = [
  "New customer added",
  "Order created",
  "Collection received",
  "Representative checked in",
];

export default function RecentActivities() {
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
          Recent Activities
        </Typography>

        <List>
          {activities.map((item) => (
            <ListItem key={item} disableGutters>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>

              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}