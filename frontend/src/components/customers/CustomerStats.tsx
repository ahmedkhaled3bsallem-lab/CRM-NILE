import Grid from "@mui/material/Grid";

import {
  People,
  CheckCircle,
  CreditScore,
  PersonOff,
} from "@mui/icons-material";

import StatCard from "../dashboard/StatCard";

interface CustomerStatsProps {
  totalCustomers: number;

  activeCustomers: number;

  inactiveCustomers: number;

  creditCustomers: number;
}

export default function CustomerStats({
  totalCustomers,
  activeCustomers,
  inactiveCustomers,
  creditCustomers,
}: CustomerStatsProps) {
  return (
    <Grid
      container
      spacing={3}
      sx={{ mb: 4 }}
    >
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 6,
          lg: 3,
        }}
      >
        <StatCard
          title="Total Customers"
          value={totalCustomers}
          icon={<People fontSize="large" />}
          color="#1976D2"
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 6,
          lg: 3,
        }}
      >
        <StatCard
          title="Active Customers"
          value={activeCustomers}
          icon={<CheckCircle fontSize="large" />}
          color="#2E7D32"
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 6,
          lg: 3,
        }}
      >
        <StatCard
          title="Credit Customers"
          value={creditCustomers}
          icon={<CreditScore fontSize="large" />}
          color="#EF6C00"
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 6,
          lg: 3,
        }}
      >
        <StatCard
          title="Inactive"
          value={inactiveCustomers}
          icon={<PersonOff fontSize="large" />}
          color="#D32F2F"
        />
      </Grid>
    </Grid>
  );
}