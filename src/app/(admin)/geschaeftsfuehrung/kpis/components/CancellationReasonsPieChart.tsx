"use client";
import React from "react";
import Card from "@/components/common/Card";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const CancellationReasonsPieChart = () => {
  const options: ApexOptions = {
    chart: {
      type: "pie",
      height: 350,
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    labels: ["Preis", "Service", "Wettbewerb", "Umzug", "Sonstiges"],
    colors: ["#0ba5ec", "#7cd4fd", "#FF5733", "#33FF57", "#FFC300"], // Main colors for borders
    stroke: {
      colors: ["#0ba5ec", "#7cd4fd", "#FF5733", "#33FF57", "#FFC300"], // Borders in their own color
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light", // Changed to light shade for inner colors
        type: "radial",
        shadeIntensity: 0.7,
        gradientToColors: ["#4dc2f7", "#a3e0ff", "#FF8C66", "#66FF8C", "#FFE066"], // Lighter inner colors
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.5, // 50% opacity
        stops: [0, 100],
      },
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "bottom",
    },
  };

  const series = [44, 55, 13, 43, 22]; // Dummy data for cancellation reasons

  return (
    <Card
      className="border-brand-500 dark:border-brand-500/50 bg-brand-50/50 dark:bg-brand-500/50" // Applying notification-like background and border with 50% opacity
      headerContent={<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Kündigungsgründe</h3>}
    >
      <div id="chartCancellationReasons">
        <ReactApexChart options={options} series={series} type="pie" height={350} />
      </div>
    </Card>
  );
};

export default CancellationReasonsPieChart;
