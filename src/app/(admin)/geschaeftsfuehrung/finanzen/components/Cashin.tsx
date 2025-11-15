import React from 'react';
import Card from '@/components/common/Card';
import { DollarLineIcon } from "@/icons"; // Added DollarLineIcon

interface CashinProps {
  className?: string;
}

const TargetVsActual: React.FC<CashinProps> = ({ className }) => {
  const cashThisMonth = 8500; // Placeholder data for Cash in diesen Monat

  return (
    <Card
      className={`bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 h-full flex flex-col justify-between ${className || ''}`}
      noHeaderBorder={true}
      headerContent={
        <div className="flex items-center gap-2">
          <DollarLineIcon className="text-white size-5" />
          <h3 className="text-lg font-semibold text-white">Cash in diesen Monat</h3>
        </div>
      }
    >
      <div className="flex-grow flex flex-col justify-around items-center text-center py-4">
        <div className="mb-4">
          <p className="text-md text-gray-600 dark:text-gray-400">Verfügbarer Cash:</p>
          <p className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">€{cashThisMonth.toLocaleString()}</p>
        </div>
        {/* Removed percentage bar as it's not relevant for "Cash in diesen Monat" */}
      </div>
    </Card>
  );
};

export default TargetVsActual;
