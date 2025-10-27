import LineChartOne from "@/components/charts/line/LineChartOne";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Liniendiagramm | TailAdmin - Next.js Dashboard-Vorlage",
  description:
    "Dies ist die Next.js Liniendiagramm-Seite für TailAdmin - Next.js Tailwind CSS Admin Dashboard-Vorlage",
};
export default function LineChart() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Liniendiagramm" />
      <div className="space-y-6">
        <ComponentCard title="Liniendiagramm 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
