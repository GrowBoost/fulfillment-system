import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ResponsiveImage from "@/components/ui/images/ResponsiveImage";
import ThreeColumnImageGrid from "@/components/ui/images/ThreeColumnImageGrid";
import TwoColumnImageGrid from "@/components/ui/images/TwoColumnImageGrid";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Bilder | TailAdmin - Next.js Dashboard-Vorlage",
  description:
    "Dies ist die Next.js Bilderseite für TailAdmin - Next.js Tailwind CSS Admin Dashboard-Vorlage",
  // other metadata
};

export default function Images() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Bilder" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Responsives Bild">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Bild in 2 Spalten">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Bild in 3 Spalten">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </div>
  );
}
