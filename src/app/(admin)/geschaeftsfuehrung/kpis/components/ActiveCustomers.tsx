import React from 'react';
import Card from '@/components/common/Card';

const ActiveCustomers: React.FC = () => {
  const activeCustomers = 1234; // Placeholder data

  return (
    <Card headerContent={<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aktive Kunden</h3>}>
      <div className="text-2xl font-bold text-gray-800 dark:text-white">
        {activeCustomers.toLocaleString()}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Currently active customers.
      </p>
    </Card>
  );
};

export default ActiveCustomers;
