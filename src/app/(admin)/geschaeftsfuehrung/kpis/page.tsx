import type { Metadata } from "next";
import React from "react";
import ChurnRate from "@/app/(admin)/geschaeftsfuehrung/kpis/components/ChurnRate";
import AverageCustomerValue from "@/app/(admin)/geschaeftsfuehrung/kpis/components/AverageCustomerValue";
import TargetVsActual from "@/app/(admin)/geschaeftsfuehrung/kpis/components/TargetVsActual";
import CustomerLifetime from "@/app/(admin)/geschaeftsfuehrung/kpis/components/CustomerLifetime";
import KpiOverviewChart from "@/app/(admin)/geschaeftsfuehrung/kpis/components/KpiOverviewChart";
import Badge from "@/components/ui/badge/Badge";
import { ArrowUpIcon, GroupIcon } from "@/icons";

export const metadata: Metadata = {
  title: "KPIs | GrowBoost",
  description: "KPIs Übersicht für GrowBoost",
};

export default function KpisPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <CustomerLifetime />

          {/* <!-- Aktive Kunden Metric Item Start --> */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Aktive Kunden
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  12,450
                </h4>
              </div>
              <Badge color="success">
                <ArrowUpIcon />
                5.50%
              </Badge>
            </div>
          </div>
          {/* <!-- Aktive Kunden Metric Item End --> */}

          <ChurnRate />

          <AverageCustomerValue />
        </div>
      </div>

      <div className="col-span-12 xl:col-span-5">
        <TargetVsActual />
      </div>

      <div className="col-span-12">
        <KpiOverviewChart />
      </div>
    </div>
  );
}
