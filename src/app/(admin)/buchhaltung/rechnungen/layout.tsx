import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Rechnungen | GrowBoost",
  description: "Dies ist die Rechnungen-Seite für Buchhaltung",
};

export default function RechnungenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
