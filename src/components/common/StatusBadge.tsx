import React from "react";

interface StatusBadgeProps {
  status: "Aktiv" | "Inaktiv";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let dotColorClass = "";
  let textColorClass = "";
  let bgColorClass = "";
  let animateClass = "";

  switch (status) {
    case "Aktiv":
      dotColorClass = "bg-success-500";
      textColorClass = "text-success-700 dark:text-success-400";
      bgColorClass = "bg-success-100/50 dark:bg-success-700/50";
      animateClass = "animate-ping"; // Only animate for "Aktiv"
      break;
    case "Inaktiv":
      dotColorClass = "bg-error-500";
      textColorClass = "text-error-700 dark:text-error-400";
      bgColorClass = "bg-error-100/50 dark:bg-error-700/50";
      break;
    default: // Fallback for any unexpected status, though type should prevent it
      dotColorClass = "bg-gray-400";
      textColorClass = "text-gray-700 dark:text-gray-400";
      bgColorClass = "bg-gray-100/50 dark:bg-gray-700/50";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${bgColorClass} ${textColorClass}`}
    >
      <span className={`relative flex h-2 w-2`}>
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${animateClass} ${dotColorClass}`}
        ></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColorClass}`}></span>
      </span>
      {status}
    </span>
  );
};

export default StatusBadge;
