import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Badge from "@/components/ui/badge/Badge";
import { PlusIcon } from "@/icons";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Abzeichen | TailAdmin - Next.js Dashboard-Vorlage",
  description:
    "Dies ist die Next.js Abzeichenseite für TailAdmin - Next.js Tailwind CSS Admin Dashboard-Vorlage",
  // other metadata
};

export default function BadgePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Abzeichen" />
      <div className="space-y-5 sm:space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Mit hellem Hintergrund
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              {/* Helle Variante */}
              <Badge variant="light" color="primary">
                Primär
              </Badge>
              <Badge variant="light" color="success">
                Erfolg
              </Badge>{" "}
              <Badge variant="light" color="error">
                Fehler
              </Badge>{" "}
              <Badge variant="light" color="warning">
                Warnung
              </Badge>{" "}
              <Badge variant="light" color="info">
                Info
              </Badge>
              <Badge variant="light" color="light">
                Hell
              </Badge>
              <Badge variant="light" color="dark">
                Dunkel
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Mit solidem Hintergrund
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              {/* Solide Variante */}
              <Badge variant="solid" color="primary">
                Primär
              </Badge>
              <Badge variant="solid" color="success">
                Erfolg
              </Badge>{" "}
              <Badge variant="solid" color="error">
                Fehler
              </Badge>{" "}
              <Badge variant="solid" color="warning">
                Warnung
              </Badge>{" "}
              <Badge variant="solid" color="info">
                Info
              </Badge>
              <Badge variant="solid" color="light">
                Hell
              </Badge>
              <Badge variant="solid" color="dark">
                Dunkel
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Heller Hintergrund mit linkem Symbol
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge variant="light" color="primary" startIcon={<PlusIcon />}>
                Primär
              </Badge>
              <Badge variant="light" color="success" startIcon={<PlusIcon />}>
                Erfolg
              </Badge>{" "}
              <Badge variant="light" color="error" startIcon={<PlusIcon />}>
                Fehler
              </Badge>{" "}
              <Badge variant="light" color="warning" startIcon={<PlusIcon />}>
                Warnung
              </Badge>{" "}
              <Badge variant="light" color="info" startIcon={<PlusIcon />}>
                Info
              </Badge>
              <Badge variant="light" color="light" startIcon={<PlusIcon />}>
                Hell
              </Badge>
              <Badge variant="light" color="dark" startIcon={<PlusIcon />}>
                Dunkel
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Solider Hintergrund mit linkem Symbol
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge variant="solid" color="primary" startIcon={<PlusIcon />}>
                Primär
              </Badge>
              <Badge variant="solid" color="success" startIcon={<PlusIcon />}>
                Erfolg
              </Badge>{" "}
              <Badge variant="solid" color="error" startIcon={<PlusIcon />}>
                Fehler
              </Badge>{" "}
              <Badge variant="solid" color="warning" startIcon={<PlusIcon />}>
                Warnung
              </Badge>{" "}
              <Badge variant="solid" color="info" startIcon={<PlusIcon />}>
                Info
              </Badge>
              <Badge variant="solid" color="light" startIcon={<PlusIcon />}>
                Hell
              </Badge>
              <Badge variant="solid" color="dark" startIcon={<PlusIcon />}>
                Dunkel
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Heller Hintergrund mit rechtem Symbol
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge variant="light" color="primary" endIcon={<PlusIcon />}>
                Primär
              </Badge>
              <Badge variant="light" color="success" endIcon={<PlusIcon />}>
                Erfolg
              </Badge>{" "}
              <Badge variant="light" color="error" endIcon={<PlusIcon />}>
                Fehler
              </Badge>{" "}
              <Badge variant="light" color="warning" endIcon={<PlusIcon />}>
                Warnung
              </Badge>{" "}
              <Badge variant="light" color="info" endIcon={<PlusIcon />}>
                Info
              </Badge>
              <Badge variant="light" color="light" endIcon={<PlusIcon />}>
                Hell
              </Badge>
              <Badge variant="light" color="dark" endIcon={<PlusIcon />}>
                Dunkel
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Solider Hintergrund mit rechtem Symbol
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge variant="solid" color="primary" endIcon={<PlusIcon />}>
                Primär
              </Badge>
              <Badge variant="solid" color="success" endIcon={<PlusIcon />}>
                Erfolg
              </Badge>{" "}
              <Badge variant="solid" color="error" endIcon={<PlusIcon />}>
                Fehler
              </Badge>{" "}
              <Badge variant="solid" color="warning" endIcon={<PlusIcon />}>
                Warnung
              </Badge>{" "}
              <Badge variant="solid" color="info" endIcon={<PlusIcon />}>
                Info
              </Badge>
              <Badge variant="solid" color="light" endIcon={<PlusIcon />}>
                Hell
              </Badge>
              <Badge variant="solid" color="dark" endIcon={<PlusIcon />}>
                Dunkel
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
