import React from 'react';
import Badge from "@/components/ui/badge/Badge";
import { ArrowUpIcon, DollarLineIcon } from "@/icons"; // Corrected icon import

const AverageCustomerValue: React.FC = () => {
  const revenueForecast = 15000; // Placeholder data for Umsatzprognose

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <DollarLineIcon className="text-gray-800 dark:text-white/90" /> {/* Corrected icon */}
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Umsatzprognose nächsten Monat
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            €{revenueForecast.toLocaleString()}
          </h4>
        </div>
        <Badge color="success">
          <ArrowUpIcon />
          7.20%
        </Badge>
      </div>
    </div>
  );
};

export default AverageCustomerValue;
