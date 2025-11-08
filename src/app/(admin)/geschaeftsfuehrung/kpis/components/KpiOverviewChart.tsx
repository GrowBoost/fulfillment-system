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
      name: "Customer Lifetime (Monate)",
      data: [30, 31, 32, 31, 33, 34, 35, 36, 37, 36, 38, 39],
    },
    {
      name: "Aktive Kunden",
      data: [12000, 12100, 12050, 12200, 12300, 12400, 12450, 12500, 12600, 12550, 12700, 12800],
    },
    {
      name: "Kündigungsrate (%)",
      data: [2.8, 2.7, 2.5, 2.6, 2.4, 2.3, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7],
    },
    {
      name: "Durchschnittlicher Kundenwert (€)",
      data: [400, 410, 405, 415, 420, 425, 430, 435, 440, 445, 450, 455],
    },
  ];

  return (
    <Card
      className="h-full"
      headerContent={<h3 className="text-lg font-semibold text-gray-900 dark:text-white">KPI Übersicht</h3>}
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
