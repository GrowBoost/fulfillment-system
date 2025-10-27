import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Basistabelle | TailAdmin - Next.js Dashboard-Vorlage",
  description:
    "Dies ist die Next.js Basistabellen-Seite für TailAdmin Tailwind CSS Admin Dashboard-Vorlage",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Basistabelle" />
      <div className="space-y-6">
        <ComponentCard title="Basistabelle 1">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
