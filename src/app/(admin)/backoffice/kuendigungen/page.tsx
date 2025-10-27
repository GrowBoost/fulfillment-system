import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CancellationTable from "@/components/tables/CancellationTable";

export const metadata: Metadata = {
  title: "Kündigungen | GrowBoost",
  description: "Dies ist die Kündigungen-Seite für Buchhaltung",
};

export default function KuendigungenPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Kündigungen" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="border-b border-gray-100 px-5 py-7 dark:border-white/[0.05] xl:px-10 xl:py-12">
          <h3 className="font-semibold text-gray-800 text-theme-2xl dark:text-white/90">
            Alle Kündigungen
          </h3>
        </div>
        <div className="px-5 py-7 xl:px-10 xl:py-12">
          <CancellationTable />
        </div>
      </div>
    </div>
  );
}
