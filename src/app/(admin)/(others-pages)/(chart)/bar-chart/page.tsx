import BarChartOne from "@/components/charts/bar/BarChartOne";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Balkendiagramm | TailAdmin - Next.js Dashboard-Vorlage",
  description:
    "Dies ist die Next.js Balkendiagramm-Seite für TailAdmin - Next.js Tailwind CSS Admin Dashboard-Vorlage",
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Balkendiagramm" />
      <div className="space-y-6">
        <ComponentCard title="Balkendiagramm 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
