import React from 'react';
import Badge from "@/components/ui/badge/Badge";
import { ArrowUpIcon, PieChartIcon } from "@/icons"; // Changed icon to PieChartIcon

interface InvsOutProps {
  className?: string;
}

const CustomerLifetime: React.FC<InvsOutProps> = ({ className }) => {
  const income = 25000; // Placeholder data for Einnahmen
  const expenses = 18000; // Placeholder data for Ausgaben
  const difference = income - expenses;

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex flex-col justify-between ${className || ''}`}>
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <PieChartIcon className="text-gray-800 dark:text-white/90" /> {/* Changed icon */}
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Einnahmen vs Ausgaben
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            €{difference.toLocaleString()}
          </h4>
        </div>

        <Badge color={difference >= 0 ? "success" : "error"}>
          {difference >= 0 ? <ArrowUpIcon /> : <ArrowUpIcon className="rotate-180" />} {/* Reusing ArrowUpIcon and rotating for down */}
          {(Math.abs(difference) / Math.max(income, expenses) * 100).toFixed(2)}%
        </Badge>
      </div>
    </div>
  );
};

export default CustomerLifetime;
