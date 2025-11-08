import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import Card from "@/components/common/Card";
import StatusBadge from "@/components/common/StatusBadge";
import { BoltIcon, CloseLineIcon } from "@/icons";
import AgentInfoPopup from "@/components/agenten/AgentInfoPopup";
import Alert from "@/components/ui/alert/Alert";

export const metadata: Metadata = {
  title: "Agenten & Automationen | GrowBoost",
  description: "Dies ist die Agenten- und Automationen-Seite",
};

type AgentStatus = "Aktiv" | "Inaktiv";

const getRandomStatus = (): AgentStatus => {
  const statuses: AgentStatus[] = ["Aktiv", "Inaktiv"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper function to generate random stats for demonstration
const getRandomStats = () => ({
  runs: Math.floor(Math.random() * 1000) + 50,
  timeSaved: `${Math.floor(Math.random() * 200) + 10} Stunden`,
  moneySaved: `${Math.floor(Math.random() * 5000) + 500} €`,
  qualityScore: Math.floor(Math.random() * 100) + 1, // Random quality score between 1 and 100
  hasError: Math.random() < 0.3, // 30% chance of having an error for demonstration
});

export default function AgentenPage() {
  const agents = [
    { name: "Anruf-Agent", description: "Automatisiert ausgehende Anrufe, um Kunden an überfällige Rechnungen zu erinnern und Inkassoprozesse zu optimieren.", status: getRandomStatus(), ...getRandomStats() },
    { name: "E-Mail-Marketing", description: "Verwaltet und versendet personalisierte E-Mail-Kampagnen, um Kundenbeziehungen zu pflegen und Verkäufe zu steigern.", status: getRandomStatus(), ...getRandomStats() },
    { name: "Social Media Manager", description: "Plant, erstellt und veröffentlicht Beiträge auf verschiedenen sozialen Medienplattformen, um die Markenpräsenz zu erhöhen.", status: getRandomStatus(), ...getRandomStats() },
    { name: "Kunden-Support", description: "Beantwortet häufig gestellte Fragen (FAQs) automatisch und leitet komplexe Anfragen an menschliche Supportmitarbeiter weiter, um die Effizienz zu verbessern.", status: getRandomStatus(), ...getRandomStats() },
  ];

  const automations = [
    { name: "Rechnungsversand", description: "Automatisiert den Versand von Rechnungen an Kunden nach erbrachter Leistung oder Produktlieferung, inklusive Mahnwesen.", status: getRandomStatus(), ...getRandomStats() },
    { name: "Onboarding-Workflow", description: "Führt neue Kunden systematisch durch den Onboarding-Prozess, von der Begrüßung bis zur ersten erfolgreichen Nutzung des Dienstes.", status: getRandomStatus(), ...getRandomStats() },
    { name: "Feedback-Sammler", description: "Sammelt strukturiertes Kundenfeedback nach Projektabschluss oder Serviceerbringung, um die Zufriedenheit zu messen und Verbesserungen zu identifizieren.", status: getRandomStatus(), ...getRandomStats() },
    { name: "Terminplaner", description: "Verwaltet und bestätigt Termine automatisch, sendet Erinnerungen und synchronisiert Kalender, um Planungsaufwand zu minimieren.", status: getRandomStatus(), ...getRandomStats() },
    { name: "Datenbereiniger", description: "Bereinigt und aktualisiert Kundendatenbanken regelmäßig, entfernt Duplikate und korrigiert fehlerhafte Einträge, um Datenqualität zu gewährleisten.", status: getRandomStatus(), ...getRandomStats() },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Agenten & Automationen" />
      <div className="min-h-screen">
        <div className="mb-5">
          <h4 className="mb-5 font-semibold text-gray-800 text-xl dark:text-white/90">Ihre Agenten</h4>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agents.map((agent, index) => (
              <Card
                key={index}
                headerContent={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AgentInfoPopup
                        name={agent.name}
                        runs={agent.runs}
                        timeSaved={agent.timeSaved}
                        moneySaved={agent.moneySaved}
                        qualityScore={agent.qualityScore}
                      />
                      <h4 className="font-semibold text-gray-800 text-base dark:text-white/90">{agent.name}</h4>
                    </div>
                    <StatusBadge status={agent.status} />
                  </div>
                }
                className="flex flex-col"
              >
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{agent.description}</p>
                {agent.status === "Aktiv" ? (
                  <button className="mt-auto ml-auto flex items-center justify-center gap-1 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Deaktivieren
                    <CloseLineIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> {/* Use CloseLineIcon */}
                  </button>
                ) : (
                  <button className="mt-auto ml-auto flex items-center justify-center gap-1 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Aktivieren
                    <BoltIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> {/* Standardized icon size */}
                  </button>
                )}
                {agent.hasError && (
                  <Alert
                    variant="warning"
                    title="Warnhinweis"
                    message="Dieser Agent wurde aufgrund eines Fehlers deaktiviert."
                    showLink={false}
                    className="mt-4"
                  />
                )}
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-semibold text-gray-800 text-xl dark:text-white/90">Ihre Automationen</h4>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {automations.map((automation, index) => (
              <Card
                key={index}
                headerContent={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AgentInfoPopup
                        name={automation.name}
                        runs={automation.runs}
                        timeSaved={automation.timeSaved}
                        moneySaved={automation.moneySaved}
                        qualityScore={automation.qualityScore}
                      />
                      <h4 className="font-semibold text-gray-800 text-base dark:text-white/90">{automation.name}</h4>
                    </div>
                    <StatusBadge status={automation.status} />
                  </div>
                }
                className="flex flex-col"
              >
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{automation.description}</p>
                {automation.status === "Aktiv" ? (
                  <button className="mt-auto ml-auto flex items-center justify-center gap-1 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Deaktivieren
                    <CloseLineIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> {/* Use CloseLineIcon */}
                  </button>
                ) : (
                  <button className="mt-auto ml-auto flex items-center justify-center gap-1 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Aktivieren
                    <BoltIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> {/* Standardized icon size */}
                  </button>
                )}
                {automation.hasError && (
                  <Alert
                    variant="warning"
                    title="Warnhinweis"
                    message="Diese Automation wurde aufgrund eines Fehlers deaktiviert."
                    showLink={false}
                    className="mt-4"
                  />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
