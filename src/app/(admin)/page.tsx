import type { Metadata } from "next";
import React from "react";
import { GroupIcon, BoxIconLine } from "@/icons"; // Import icons needed for MetricCard
import MetricCard from "@/components/dashboard/MetricCard"; // Import the new MetricCard component
import MonthlyTarget from "@/components/dashboard/MonthlyTarget";
import { PriorityTasksOverview } from "@/components/dashboard/PriorityTasksOverview";
import RecentOrders from "@/components/dashboard/RecentOrders";
import StatisticsChart from "@/components/dashboard/StatisticsChart";
import { WarningsOverview } from "@/components/dashboard/WarningsOverview";

export const metadata: Metadata = {
  title: "Next.js Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Four Metric Cards at the top */}
      <div className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
        <MetricCard
          title="Neukunden"
          value="3,782"
          percentage="11.01%"
          isPositive={true}
          icon={<GroupIcon className="text-gray-800 size-6 dark:text-white/90" />}
        />
        <MetricCard
          title="Aktive Kunden"
          value="12,450"
          percentage="5.50%"
          isPositive={true}
          icon={<GroupIcon className="text-gray-800 size-6 dark:text-white/90" />}
        />
        <MetricCard
          title="Aktueller Monatsumsatz"
          value="5,359"
          percentage="9.05%"
          isPositive={false}
          icon={<BoxIconLine className="text-gray-800 dark:text-white/90" />}
        />
        <MetricCard
          title="System Performance"
          value="99.9%"
          percentage="0.1%"
          isPositive={true}
          icon={<BoxIconLine className="text-gray-800 dark:text-white/90" />} // Using BoxIconLine as a generic icon
        />
        {/* MonthlyTarget moved here and adjusted to span 3 columns */}
        <div className="col-span-12 xl:col-span-3">
          <MonthlyTarget />
        </div>
      </div>

      {/* PriorityTasksOverview and WarningsOverview side-by-side */}
      <div className="col-span-12 grid grid-cols-12 gap-4 md:gap-6 flex items-stretch"> {/* Added flex and items-stretch */}
        <div className="col-span-12 xl:col-span-6">
          <PriorityTasksOverview />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <WarningsOverview />
        </div>
      </div>

      {/* RecentOrders and StatisticsChart side-by-side */}
      <div className="col-span-12 grid grid-cols-12 gap-4 md:gap-6 flex items-stretch"> {/* Added flex and items-stretch */}
        <div className="col-span-12 xl:col-span-6">
          <RecentOrders />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <StatisticsChart />
        </div>
      </div>
    </div>
  );
}
