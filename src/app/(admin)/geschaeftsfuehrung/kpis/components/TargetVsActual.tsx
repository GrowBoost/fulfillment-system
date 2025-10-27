import React from 'react';
import Card from '@/components/common/Card';

const TargetVsActual: React.FC = () => {
  const target = 15000;
  const actual = 12345;
  const percentage = (actual / target) * 100;

  return (
    <Card
      className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 h-full flex flex-col"
      noHeaderBorder={true}
      headerContent={<h3 className="text-lg font-semibold text-white">Ziel vs Ist</h3>}
    >
      <div className="flex-grow flex flex-col justify-around items-center text-center py-4">
        <div className="mb-4">
          <p className="text-md text-gray-600 dark:text-gray-400">Ziel:</p>
          <p className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">€{target.toLocaleString()}</p>
        </div>
        <div className="mb-6">
          <p className="text-md text-gray-600 dark:text-gray-400">Ist:</p>
          <p className="text-4xl font-extrabold text-gray-800 dark:text-white">€{actual.toLocaleString()}</p>
        </div>
        <div className="w-full px-4">
          <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {percentage.toFixed(2)}% des Ziels erreicht.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TargetVsActual;
