"use client";

import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; // Assuming Heroicons are available

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string | number; label: string }[];
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, className, ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label htmlFor={props.id || props.name} className="block text-theme-sm text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-theme-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pr-3">
          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
