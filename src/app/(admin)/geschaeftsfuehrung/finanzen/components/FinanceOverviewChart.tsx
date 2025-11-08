"use client";
import React from 'react';
import Card from '@/components/common/Card';
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const KpiOverviewChart: React.FC = () => {
  const options: ApexOptions = {
    legend: {
      show: true, // Show legend for multiple KPIs
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#0ba5ec", "#7cd4fd", "#FF5733", "#33FF57", "#FFC300"], // Define line colors for multiple KPIs
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [2, 2, 2, 2, 2],
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
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
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
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Umsatzprognose nächsten Monat (€)",
      data: [14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500],
    },
    {
      name: "Gewinnberechnung (€)",
      data: [10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500],
    },
    {
      name: "Einnahmen vs Ausgaben (€)",
      data: [5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500],
    },
    {
      name: "Cash in diesen Monat (€)",
      data: [7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500],
    },
  ];

  return (
    <Card
      className="h-full"
      headerContent={<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Finanzübersicht</h3>}
    >
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div id="chartKpiOverview" className="min-w-[1000px]">
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

export default KpiOverviewChart;
