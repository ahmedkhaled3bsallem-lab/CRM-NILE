import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import OrdersStatusChart from "../components/dashboard/OrdersStatusChart";
import RecentActivities from "../components/dashboard/RecentActivities";
import TodayVisits from "../components/dashboard/TodayVisits";
import TopRepresentatives from "../components/dashboard/TopRepresentatives";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  return (
    <Box
      sx={{
        width: "100%",
        px: 1,
        py: 1,
      }}
    >
      <DashboardHeader />

      <Box sx={{ mb: 4 }}>
        <StatsGrid />
      </Box>

      <Grid
        container
        spacing={4}
        alignItems="stretch"
      >
        <Grid
          size={{
            xs: 12,
            xl: 8,
          }}
        >
          <PerformanceChart />
        </Grid>

        <Grid
          size={{
            xs: 12,
            xl: 4,
          }}
        >
          <OrdersStatusChart />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        sx={{ mt: 1 }}
        alignItems="stretch"
      >
        <Grid
          size={{
            xs: 12,
            xl: 6,
          }}
        >
          <RecentActivities />
        </Grid>

        <Grid
          size={{
            xs: 12,
            xl: 6,
          }}
        >
          <TodayVisits />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        sx={{ mt: 1 }}
        alignItems="stretch"
      >
        <Grid
          size={{
            xs: 12,
            xl: 7,
          }}
        >
          <TopRepresentatives />
        </Grid>

        <Grid
          size={{
            xs: 12,
            xl: 5,
          }}
        >
          <QuickActions />
        </Grid>
      </Grid>
    </Box>
  );
}