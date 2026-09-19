import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function OrdersStatusChart() {

  const options: ApexOptions = {

    labels: [
      "Completed",
      "Pending",
      "Cancelled",
    ],

    legend: {
      position: "bottom",
    },

    colors: [
      "#2E7D32",
      "#FB8C00",
      "#D32F2F",
    ],

    dataLabels: {
      enabled: false,
    },
  };

  const series = [64, 28, 8];

  return (

    <Card
      elevation={0}
      sx={{
        borderRadius:4,
        border:"1px solid #ECECEC",
        height:"100%"
      }}
    >

      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Orders Status
        </Typography>

        <Chart
          options={options}
          series={series}
          type="donut"
          height={320}
        />

      </CardContent>

    </Card>

  );

}