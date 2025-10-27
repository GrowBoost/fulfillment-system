import Calendar from "@/components/calendar/Calendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Kalender | TailAdmin - Next.js Dashboard-Vorlage",
  description:
    "Dies ist die Next.js Kalenderseite für TailAdmin Tailwind CSS Admin Dashboard-Vorlage",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Kalender" />
      <Calendar />
    </div>
  );
}
