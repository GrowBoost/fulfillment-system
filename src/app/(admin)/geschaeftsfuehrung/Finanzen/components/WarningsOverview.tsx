import React from "react";
import Card from "@/components/common/Card";

interface Warning {
  id: string;
  message: string;
  type: "info" | "warning" | "error";
}

const dummyWarnings: Warning[] = [
  { id: "warn-1", message: "Niedriger Lagerbestand für Produkt X.", type: "warning" },
  { id: "warn-2", message: "Serverauslastung über 80%.", type: "error" },
  { id: "warn-3", message: "Neue Kundenanfrage wartet auf Bearbeitung.", type: "info" },
];

export const WarningsOverview = () => {
  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Warnings Overview
          </h3>
        </div>
      </div>
      {dummyWarnings.length > 0 ? (
        <ul className="space-y-3">
          {dummyWarnings.map((warning) => (
            <li key={warning.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0">
              <p className={`font-medium ${warning.type === "error" ? "text-red-500" : warning.type === "warning" ? "text-yellow-500" : "text-blue-500"}`}>
                {warning.message}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No warnings to display.
        </p>
      )}
    </Card>
  );
};
