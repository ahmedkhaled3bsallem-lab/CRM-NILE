import Chart from "react-apexcharts";
import { Card, CardContent, Typography } from "@mui/material";
import type { ApexOptions } from "apexcharts";

export default function PerformanceChart() {
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    stroke: {
      curve: "smooth",
      width: 4,
    },

    colors: ["#1976D2"],

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: "#ECECEC",
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
      ],
    },
  };

  const series = [
    {
      name: "Orders",
      data: [20, 35, 28, 42, 56, 61],
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        mt: 4,
        borderRadius: 4,
        border: "1px solid #ECECEC",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Performance Overview
        </Typography>

        <Chart
          options={options}
          series={series}
          type="line"
          height={320}
        />
      </CardContent>
    </Card>
  );
}