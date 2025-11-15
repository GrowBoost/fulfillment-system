import React from "react";
import Card from "@/components/common/Card";
import Alert from "@/components/ui/alert/Alert";

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
    <Card className="p-5 md:p-6 h-full">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Warnungsübersicht
          </h3>
        </div>
      </div>
      {dummyWarnings.length > 0 ? (
        <div className="space-y-3">
          {dummyWarnings.map((warning) => {
            const translatedType = {
              info: "Info",
              warning: "Warnung",
              error: "Fehler",
            }[warning.type];
            return (
              <Alert
                key={warning.id}
                variant={warning.type}
                title={translatedType}
                message={warning.message}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Keine Warnungen anzuzeigen.
        </p>
      )}
    </Card>
  );
};
