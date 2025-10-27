import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "KPIs | GrowBoost",
  description: "Dies ist die KPIs-Seite für Geschäftsführung",
};

export default function KpisPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="KPIs" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            KPIs
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Beginnen Sie, Inhalte in Rastern oder Panels zu platzieren, Sie können auch verschiedene
            Kombinationen von Rastern verwenden. Bitte überprüfen Sie das Dashboard und andere Seiten
          </p>
        </div>
      </div>
    </div>
  );
}
