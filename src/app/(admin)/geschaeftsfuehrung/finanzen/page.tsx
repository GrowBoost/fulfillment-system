import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FinanceOverviewChart from "./components/FinanceOverviewChart";
import Cashin from "./components/Cashin";
import InvsOut from "./components/InvsOut";
import Profit from "./components/profit";
import RevenueForecast from "./components/RevenueForecast";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finanzen | GrowBoost",
  description: "Dies ist die Finanzen-Seite für die Geschäftsführung",
};

const FinanzenPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Finanzen" />
      <div className="grid grid-cols-1 col-span-12 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-4 2xl:gap-7.5">
        <Cashin />
        <InvsOut />
        <Profit />
        <RevenueForecast />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12">
          <FinanceOverviewChart />
        </div>
      </div>
    </div>
  );
};

export default FinanzenPage;
