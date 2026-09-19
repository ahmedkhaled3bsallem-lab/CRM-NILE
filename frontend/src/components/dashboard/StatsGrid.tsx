import Grid from "@mui/material/Grid";

import {
  People,
  Badge,
  LocationOn,
  ShoppingCart,
  Payments,
} from "@mui/icons-material";

import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <Grid
      container
      spacing={3}
      sx={{ mb: 4 }}
    >
      <Grid size={{ xs: 12, sm: 6, md: 4, xl: 2 }}>
        <StatCard
          title="Customers"
          value={542}
          icon={<People fontSize="large" />}
          color="#1976D2"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, xl: 2 }}>
        <StatCard
          title="Representatives"
          value={18}
          icon={<Badge fontSize="large" />}
          color="#2E7D32"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, xl: 2 }}>
        <StatCard
          title="Today's Visits"
          value={37}
          icon={<LocationOn fontSize="large" />}
          color="#EF6C00"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, xl: 2 }}>
        <StatCard
          title="Orders"
          value={89}
          icon={<ShoppingCart fontSize="large" />}
          color="#8E24AA"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }}>
        <StatCard
          title="Collections"
          value="235K"
          icon={<Payments fontSize="large" />}
          color="#00897B"
        />
      </Grid>
    </Grid>
  );
}