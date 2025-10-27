import React from 'react';
import Badge from "@/components/ui/badge/Badge";
import { ArrowUpIcon, BoxIconLine } from "@/icons";

const CustomerLifetime: React.FC = () => {
  const customerLifetime = 36; // Placeholder data in months

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <BoxIconLine className="text-gray-800 dark:text-white/90" />
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Customer Lifetime
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {customerLifetime} Monate
          </h4>
        </div>

        <Badge color="success">
          <ArrowUpIcon />
          1.20%
        </Badge>
      </div>
    </div>
  );
};

export default CustomerLifetime;
