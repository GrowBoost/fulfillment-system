import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProjectKanban from "@/components/projects/ProjectKanban";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projekte | GrowBoost",
  description: "Dies ist die Projekte-Seite für Kunden",
};

const ProjektePage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Projekte" />
      <ProjectKanban />
    </div>
  );
};

export default ProjektePage;
