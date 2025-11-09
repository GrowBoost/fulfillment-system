import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import WikiComponent from "@/components/wiki/WikiComponent";

export const metadata: Metadata = {
  title: "Wiki | GrowBoost",
  description: "Dies ist die Wiki-Seite",
};

export default function WikiPage() {
  return (
    <div className="flex h-full flex-col">
      <PageBreadcrumb pageTitle="Wiki" />
      <div className="flex-1 overflow-y-auto rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <WikiComponent />
      </div>
    </div>
  );
}
