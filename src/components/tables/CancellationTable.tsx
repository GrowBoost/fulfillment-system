import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { cancellationData, Cancellation } from "@/data/cancellationData";
import { Filter } from "@/app/(admin)/buchhaltung/kuendigungen/page"; // Import types from page.tsx
import { Select } from "../ui/select/Select";

interface CancellationTableProps {
  filters: Filter[];
  generalSearchTerm: string;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filterLogic: 'AND' | 'OR';
}

export default function CancellationTable({
  filters,
  generalSearchTerm,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  filterLogic,
}: CancellationTableProps) {
  const getStatusColor = (status: Cancellation['status']) => {
    switch (status) {
      case 'Kündigung eingegangen':
        return 'info';
      case 'offboarding':
        return 'warning';
      case 'offboarding abgeschlossen':
        return 'success';
      default:
        return 'primary';
    }
  };

  const filteredCancellations = cancellationData.filter((cancellation) => {
    const checkFilter = (filter: Filter) => {
      if (!filter.column || !filter.operator || !filter.value) {
        return true; // Ignore incomplete filters
      }

      const columnValue = cancellation[filter.column as keyof Cancellation];
      const lowerCaseFilterValue = filter.value.toLowerCase();

      if (typeof columnValue === 'string') {
        const lowerCaseColumnValue = columnValue.toLowerCase();
        switch (filter.operator) {
          case '=':
            return lowerCaseColumnValue === lowerCaseFilterValue;
          case '!=':
            return lowerCaseColumnValue !== lowerCaseFilterValue;
          case 'contains':
            // Handle multiple values separated by '|' as OR condition
            if (lowerCaseFilterValue.includes('|')) {
              const values = lowerCaseFilterValue.split('|').map(v => v.trim());
              return values.some(val => lowerCaseColumnValue.includes(val));
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

    // Apply specific column filters based on filterLogic
    let passesColumnFilters = true;
    if (filters.length > 0) {
      if (filterLogic === 'AND') {
        passesColumnFilters = filters.every(checkFilter);
      } else { // OR logic
        passesColumnFilters = filters.some(checkFilter);
      }
    }

    // Apply general search filter
    let passesGeneralSearch = true;
    if (generalSearchTerm) {
      const lowerCaseGeneralSearchTerm = generalSearchTerm.toLowerCase();
      passesGeneralSearch = Object.values(cancellation).some((value) =>
        String(value).toLowerCase().includes(lowerCaseGeneralSearchTerm)
      );
    }

    return passesColumnFilters && passesGeneralSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCancellations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCancellations = filteredCancellations.slice(startIndex, endIndex);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div>
          <Table>
            {/* Table Header */}
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
                  Kundenname
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Kündigungsdatum
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Wirksames Datum
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
                  Grund
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedCancellations.map((cancellation) => (
                <TableRow key={cancellation.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                    {cancellation.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cancellation.customerId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cancellation.customerName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cancellation.cancellationDate}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cancellation.effectiveDate}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={getStatusColor(cancellation.status)}>
                      {cancellation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cancellation.reason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      {filteredCancellations.length > 0 && (
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
