import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Payment } from "@/data/paymentData";
import { Filter } from "@/app/(admin)/buchhaltung/zahlungen/page"; // Assuming Filter type is defined in page.tsx
import { Select } from "../ui/select/Select";

interface PaymentTableProps {
  payments: Payment[];
  filters: Filter[];
  generalSearchTerm: string;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filterLogic: 'AND' | 'OR';
}

export default function PaymentTable({
  payments,
  filters,
  generalSearchTerm,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  filterLogic,
}: PaymentTableProps) {
  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'gezahlt':
        return 'success';
      case 'überfällig':
        return 'warning';
      case 'gemahnt':
        return 'info';
      case 'offen':
        return 'primary';
      default:
        return 'primary';
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const checkFilter = (filter: Filter) => {
      if (!filter.column || !filter.operator || !filter.value) {
        return true; // Ignore incomplete filters
      }

      const columnValue = payment[filter.column as keyof Payment];
      const lowerCaseFilterValue = filter.value.toLowerCase();

      if (typeof columnValue === 'string') {
        const lowerCaseColumnValue = columnValue.toLowerCase();
        switch (filter.operator) {
          case '=':
            return lowerCaseColumnValue === lowerCaseFilterValue;
          case '!=':
            return lowerCaseColumnValue !== lowerCaseFilterValue;
          case 'contains':
            if (lowerCaseFilterValue.includes('|')) {
              const values = lowerCaseFilterValue.split('|').map((v: string) => v.trim());
              return values.some((val: string) => lowerCaseColumnValue.includes(val));
            }
            return lowerCaseColumnValue.includes(lowerCaseFilterValue);
          case 'starts with':
            return lowerCaseColumnValue.startsWith(lowerCaseFilterValue);
          case 'ends with':
            return lowerCaseColumnValue.endsWith(lowerCaseFilterValue);
          default:
            return true;
        }
      } else if (typeof columnValue === 'number') {
        const numColumnValue = columnValue;
        const numFilterValue = parseFloat(filter.value);

        if (isNaN(numFilterValue)) {
          return true; // If filter value is not a valid number, ignore filter
        } else {
          switch (filter.operator) {
            case '=':
              return numColumnValue === numFilterValue;
            case '!=':
              return numColumnValue !== numFilterValue;
            case '>':
              return numColumnValue > numFilterValue;
            case '<':
              return numColumnValue < numFilterValue;
            case '>=':
              return numColumnValue >= numFilterValue;
            case '<=':
              return numColumnValue <= numFilterValue;
            default:
              return true;
          }
        }
      }
      return true;
    };

    let passesColumnFilters = true;
    if (filters.length > 0) {
      if (filterLogic === 'AND') {
        passesColumnFilters = filters.every(checkFilter);
      } else {
        passesColumnFilters = filters.some(checkFilter);
      }
    }

    let passesGeneralSearch = true;
    if (generalSearchTerm) {
      const lowerCaseGeneralSearchTerm = generalSearchTerm.toLowerCase();
      passesGeneralSearch = Object.values(payment).some((value) =>
        String(value).toLowerCase().includes(lowerCaseGeneralSearchTerm)
      );
    }

    return passesColumnFilters && passesGeneralSearch;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Kunden ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Betrag
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Fälligkeitsdatum
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Zahlungsdatum
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Beschreibung
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                    {payment.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {payment.customerId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {payment.amount} {payment.currency}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {payment.dueDate}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {payment.paymentDate || '-'}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {payment.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {filteredPayments.length > 0 && (
        <div className="border-t border-gray-100 dark:border-white/[0.05] pt-4 mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <label htmlFor="items-per-page" className="text-theme-sm text-gray-700 dark:text-gray-300">
                Einträge pro Seite:
              </label>
              <Select
                id="items-per-page"
                value={itemsPerPage}
                onChange={onItemsPerPageChange}
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
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 text-theme-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              Zurück
            </button>
            <span className="text-theme-sm text-gray-700 dark:text-gray-300">
              Seite {currentPage} von {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
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
}
