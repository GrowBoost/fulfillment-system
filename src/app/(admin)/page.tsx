import type { Metadata } from "next";
import { Metrics } from "@/app/(admin)/geschaeftsfuehrung/Finanzen/components/Metrics";
import React from "react";
import MonthlyTarget from "@/app/(admin)/geschaeftsfuehrung/Finanzen/components/MonthlyTarget";
import StatisticsChart from "@/app/(admin)/geschaeftsfuehrung/Finanzen/components/StatisticsChart";
import RecentOrders from "@/app/(admin)/geschaeftsfuehrung/Finanzen/components/RecentOrders";
import { PriorityTasksOverview } from "@/app/(admin)/geschaeftsfuehrung/Finanzen/components/PriorityTasksOverview";
import { WarningsOverview } from "@/app/(admin)/geschaeftsfuehrung/Finanzen/components/WarningsOverview";

export const metadata: Metadata = {
  title: "Next.js Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <Metrics />
        <WarningsOverview />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <PriorityTasksOverview />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
