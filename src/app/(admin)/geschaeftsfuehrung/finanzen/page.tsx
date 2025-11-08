import type { Metadata } from "next";
import React from "react";
import AverageCustomerValue from "./components/RevenueForecast";
import ChurnRate from "./components/profit";
import CustomerLifetime from "./components/InvsOut";
import KpiOverviewChart from "./components/FinanceOverviewChart";
import TargetVsActual from "./components/Cashin";

export const metadata: Metadata = {
  title: "Finanzen | GrowBoost",
  description: "Finanzen Übersicht für GrowBoost",
};

export default function FinanzenPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <CustomerLifetime />
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
