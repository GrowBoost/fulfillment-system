import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FinanceOverviewChart from "./components/FinanceOverviewChart";
import Cashin from "./components/Cashin";
import InvsOut from "./components/InvsOut";
import Profit from "./components/profit";
import RevenueForecastMetric from "./components/RevenueForecastMetric";
import ForecastLineChart from "./components/ForecastLineChart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finanzen | GrowBoost",
  description: "Dies ist die Finanzen-Seite für die Geschäftsführung",
};

const FinanzenPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Finanzen" />
      <div className="grid grid-cols-1 col-span-12 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-4 2xl:gap-7.5 items-stretch">
        <Cashin className="h-full" />
        <InvsOut className="h-full" />
        <Profit className="h-full" />
        <RevenueForecastMetric className="h-full" />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 md:col-span-6">
          <ForecastLineChart />
        </div>
        <div className="col-span-12 md:col-span-6">
          <FinanceOverviewChart />
        </div>
      </div>
    </div>
  );
};

export default FinanzenPage;
