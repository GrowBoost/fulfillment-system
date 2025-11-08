import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Alert from "@/components/ui/alert/Alert";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Benachrichtigungen | TailAdmin - Next.js Dashboard-Vorlage",
  description:
    "Dies ist die Next.js Benachrichtigungsseite für TailAdmin - Next.js Tailwind CSS Admin Dashboard-Vorlage",
  // other metadata
};

export default function Alerts() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Benachrichtigungen" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Erfolgsmeldung">
          <Alert
            variant="success"
            title="Erfolgsmeldung"
            message="Seien Sie vorsichtig, wenn Sie diese Aktion ausführen."
            showLink={true}
            linkHref="/"
            linkText="Mehr erfahren"
          />
          <Alert
            variant="success"
            title="Erfolgsmeldung"
            message="Seien Sie vorsichtig, wenn Sie diese Aktion ausführen."
            showLink={false}
          />
        </ComponentCard>
        <ComponentCard title="Warnmeldung">
          <Alert
            variant="warning"
            title="Warnmeldung"
            message="Seien Sie vorsichtig, wenn Sie diese Aktion ausführen."
            showLink={true}
            linkHref="/"
            linkText="Mehr erfahren"
          />
          <Alert
            variant="warning"
            title="Warnmeldung"
            message="Seien Sie vorsichtig, wenn Sie diese Aktion ausführen."
            showLink={false}
          />
        </ComponentCard>{" "}
        <ComponentCard title="Fehlermeldung">
          <Alert
            variant="error"
            title="Fehlermeldung"
            message="Seien Sie vorsichtig, wenn Sie diese Aktion ausführen."
            showLink={true}
            linkHref="/"
            linkText="Mehr erfahren"
          />
          <Alert
            variant="error"
            title="Fehlermeldung"
            message="Seien Sie vorsichtig, wenn Sie diese Aktion ausführen."
            showLink={false}
          />
        </ComponentCard>{" "}
        <ComponentCard title="Info-Meldung">
          <Alert
            variant="info"
            title="Info-Meldung"
            message="Seien Sie vorsichtig, wenn Sie diese Aktion ausführen."
            showLink={true}
            linkHref="/"
            linkText="Mehr erfahren"
          />
          <Alert
            variant="info"
            title="Info-Meldung"
            message="Seien Sie vorsichtig, wenn Sie diese Aktion ausführen."
            showLink={false}
          />
        </ComponentCard>
      </div>
    </div>
  );
}
