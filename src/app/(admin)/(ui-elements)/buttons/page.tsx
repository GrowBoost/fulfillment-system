import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import { BoxIcon } from "@/icons";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Schaltflächen | TailAdmin - Next.js Dashboard-Vorlage",
  description:
    "Dies ist die Next.js Schaltflächenseite für TailAdmin - Next.js Tailwind CSS Admin Dashboard-Vorlage",
};

export default function Buttons() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Schaltflächen" />
      <div className="space-y-5 sm:space-y-6">
        {/* Primäre Schaltfläche */}
        <ComponentCard title="Primäre Schaltfläche">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary">
              Schaltflächentext
            </Button>
            <Button size="md" variant="primary">
              Schaltflächentext
            </Button>
          </div>
        </ComponentCard>
        {/* Primäre Schaltfläche mit linkem Symbol */}
        <ComponentCard title="Primäre Schaltfläche mit linkem Symbol">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary" startIcon={<BoxIcon />}>
              Schaltflächentext
            </Button>
            <Button size="md" variant="primary" startIcon={<BoxIcon />}>
              Schaltflächentext
            </Button>
          </div>
        </ComponentCard>{" "}
        {/* Primäre Schaltfläche mit rechtem Symbol */}
        <ComponentCard title="Primäre Schaltfläche mit rechtem Symbol">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary" endIcon={<BoxIcon />}>
              Schaltflächentext
            </Button>
            <Button size="md" variant="primary" endIcon={<BoxIcon />}>
              Schaltflächentext
            </Button>
          </div>
        </ComponentCard>
        {/* Umriss-Schaltfläche */}
        <ComponentCard title="Sekundäre Schaltfläche">
          <div className="flex items-center gap-5">
            {/* Umriss-Schaltfläche */}
            <Button size="sm" variant="outline">
              Schaltflächentext
            </Button>
            <Button size="md" variant="outline">
              Schaltflächentext
            </Button>
          </div>
        </ComponentCard>
        {/* Umriss-Schaltfläche mit linkem Symbol */}
        <ComponentCard title="Umriss-Schaltfläche mit linkem Symbol">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline" startIcon={<BoxIcon />}>
              Schaltflächentext
            </Button>
            <Button size="md" variant="outline" startIcon={<BoxIcon />}>
              Schaltflächentext
            </Button>
          </div>
        </ComponentCard>{" "}
        {/* Umriss-Schaltfläche mit rechtem Symbol */}
        <ComponentCard title="Umriss-Schaltfläche mit rechtem Symbol">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline" endIcon={<BoxIcon />}>
              Schaltflächentext
            </Button>
            <Button size="md" variant="outline" endIcon={<BoxIcon />}>
              Schaltflächentext
            </Button>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
