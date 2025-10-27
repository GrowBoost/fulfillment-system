import React from 'react';
import Card from '@/components/common/Card';

const MonthlyRevenue: React.FC = () => {
  const monthlyRevenue = '€12,345'; // Placeholder data

  return (
    <Card headerContent={<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monatsumsatz</h3>}>
      <div className="text-2xl font-bold text-gray-800 dark:text-white">
        {monthlyRevenue}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Total revenue for the current month.
      </p>
    </Card>
  );
};

export default MonthlyRevenue;
