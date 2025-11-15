"use client";
import React from "react";
import Card from '@/components/common/Card'; // Import Card component
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ForecastLineChartProps {
  className?: string;
}

const ForecastLineChart: React.FC<ForecastLineChartProps> = ({ className }) => {
  const options: ApexOptions = {
    legend: {
      show: false,
    },
    colors: ["#0ba5ec"], // Single color for forecast line
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth", // Smooth curve for forecast
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "Umsatzprognose (€)",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          color: "#6B7280",
        },
      },
    },
  };

  const series = [
    {
      name: "Prognose",
      data: [10000, 11000, 10500, 12000, 13000, 12500, 14000, 15000, 14500, 16000, 17000, 16500], // Placeholder forecast data
    },
  ];

  return (
    <Card
      className={`h-full ${className || ''}`}
      headerContent={<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Umsatzprognose</h3>}
    >
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div id="forecastLineChart" className="min-w-[1000px]">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>
    </Card>
  );
};

export default ForecastLineChart;
