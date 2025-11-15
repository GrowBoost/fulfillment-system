"use client";

import React, { useState } from 'react';
import { Employee } from '../../../../../types/Employee';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select } from '@/components/ui/select/Select';

import Button from '@/components/ui/button/Button';
import { PencilIcon, TrashBinIcon } from '@/icons';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Pagination logic
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = employees.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Email
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Rolle
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Berechtigungen
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Letzte Aktivität
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Aktionen
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                    {employee.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {employee.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {employee.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {employee.permissions.join(', ')}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(employee.lastActivity).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="border-blue-500 bg-blue-500/50 dark:border-blue-500/30 text-blue-500 hover:bg-blue-500/60 dark:hover:bg-blue-500/40"
                        startIcon={<PencilIcon className="h-4 w-4" fill="#3B82F6" />}
                        onClick={() => onEdit(employee)}
                      >
                        Bearbeiten
                      </Button>
                      <Button
                        size="sm"
                        className="border-error-500 bg-error-500/50 dark:border-error-500/30 text-error-500 hover:bg-error-500/60 dark:hover:bg-error-500/40"
                        startIcon={<TrashBinIcon className="h-4 w-4" fill="#EF4444" />}
                        onClick={() => onDelete(employee.id)}
                      >
                        Löschen
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {employees.length > 0 && (
        <div className="border-t border-gray-100 dark:border-white/[0.05] pt-4 mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <label htmlFor="items-per-page" className="text-theme-sm text-gray-700 dark:text-gray-300">
                Einträge pro Seite:
              </label>
              <Select
                id="items-per-page"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                options={[
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                  { value: 20, label: '20' },
                  { value: 50, label: '50' },
                ]}
                className="w-24"
              />
            </div>
            <nav className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 text-theme-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
              >
                Zurück
              </button>
              <span className="text-theme-sm text-gray-700 dark:text-gray-300">
                Seite {currentPage} von {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 text-theme-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
              >
                Weiter
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
