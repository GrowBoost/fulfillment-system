"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import InvoiceTable from "@/components/tables/InvoiceTable";
import InputField from "@/components/form/input/InputField";
import { invoiceData as initialInvoiceData, Invoice } from "@/data/invoiceData"; // Import initialInvoiceData and Invoice interface
import { Select } from "@/components/ui/select/Select";
import Button from "@/components/ui/button/Button"; // Import Button component
import { TrashBinIcon } from "@/icons"; // Import Trash icon
import { InvoiceStatus } from "@/data/invoiceData";

export type FilterColumn = keyof Invoice | '';
export type FilterOperator = '=' | '!=' | 'contains' | 'starts with' | 'ends with' | '>' | '<' | '>=' | '<=' | '';

export interface Filter {
  id: number;
  column: FilterColumn;
  operator: FilterOperator;
  value: string;
}

export default function RechnungenPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoiceData); // Manage invoice data as state
  const [filters, setFilters] = useState<Filter[]>([]);
  const [generalSearchTerm, setGeneralSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeStatusFilter, setActiveStatusFilter] = useState<InvoiceStatus | ''>('');
  const [filterLogic, setFilterLogic] = useState<'AND' | 'OR'>('AND'); // Default to AND

  // Function to update invoice data
  const handleDataUpdate = (newData: Invoice[]) => {
    setInvoices(newData);
    setCurrentPage(1); // Reset to first page after data update
  };

  const handleFilterChange = (id: number, field: keyof Filter, value: string | number) => {
    setFilters(prevFilters => prevFilters.map(filter =>
      filter.id === id ? { ...filter, [field]: value } : filter
    ));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleStatusFilterClick = (status: InvoiceStatus) => {
    if (activeStatusFilter === status) {
      // If the same filter is clicked again, clear it
      setActiveStatusFilter('');
      setFilters(prevFilters => prevFilters.filter(f => f.column !== 'status'));
    } else {
      // Set new filter
      setActiveStatusFilter(status);
      setFilters(prevFilters => {
        const existingStatusFilter = prevFilters.find(f => f.column === 'status');
        if (existingStatusFilter) {
          return prevFilters.map(f => f.column === 'status' ? { ...f, value: status } : f);
        } else {
          return [...prevFilters, { id: prevFilters.length > 0 ? Math.max(...prevFilters.map(f => f.id)) + 1 : 0, column: 'status', operator: '=', value: status }];
        }
      });
    }
    setCurrentPage(1);
  };

  const addFilterRow = () => {
    setFilters(prevFilters => [...prevFilters, { id: prevFilters.length > 0 ? Math.max(...prevFilters.map(f => f.id)) + 1 : 0, column: '', operator: '', value: '' }]);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const removeFilterRow = (id: number) => {
    setFilters(prevFilters => prevFilters.filter(filter => filter.id !== id));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleGeneralSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const columns: { value: FilterColumn; label: string }[] = [
    { value: '', label: 'Spalte auswählen' },
    { value: 'id', label: 'Rechnungs-ID' },
    { value: 'customerId', label: 'Kunden ID' },
    { value: 'amount', label: 'Betrag' },
    { value: 'currency', label: 'Währung' },
    { value: 'dueDate', label: 'Fälligkeitsdatum' },
    { value: 'paymentDate', label: 'Zahlungsdatum' },
    { value: 'status', label: 'Status' },
    { value: 'description', label: 'Beschreibung' },
  ];

  const getOperatorsForColumn = (col: FilterColumn) => {
    if (!col) return [];
    if (col === 'amount') {
      return [
        { value: '', label: 'Operator auswählen' },
        { value: '=', label: 'ist gleich' },
        { value: '!=', label: 'ist nicht gleich' },
        { value: '>', label: 'größer als' },
        { value: '<', label: 'kleiner als' },
        { value: '>=', label: 'größer oder gleich' },
        { value: '<=', label: 'kleiner oder gleich' },
      ];
    }
    return [
      { value: '', label: 'Operator auswählen' },
      { value: '=', label: 'ist gleich' },
      { value: '!=', label: 'ist nicht gleich' },
      { value: 'contains', label: 'enthält' },
      { value: 'starts with', label: 'beginnt mit' },
      { value: 'ends with', label: 'endet mit' },
    ];
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Buchhaltung / Rechnungen" />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] py-5 xl:py-10">
        <div className="px-5 xl:px-10">
          <div className="mb-6 flex flex-col gap-4">
            {/* Top row: Add Filter Button, Status Filter Buttons and Allgemeine Suche */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-3 flex gap-2 items-center">
                {filters.length === 0 ? (
                  <Button onClick={addFilterRow} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Filter hinzufügen
                  </Button>
                ) : (
                  <Button onClick={addFilterRow} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    + weiteren Filter hinzufügen
                  </Button>
                )}
                {/* Status Filter Buttons */}
                <Button
                  onClick={() => handleStatusFilterClick('offen')}
                  className={`px-4 py-2 rounded ${activeStatusFilter === 'offen' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                >
                  Offen
                </Button>
                <Button
                  onClick={() => handleStatusFilterClick('gezahlt')}
                  className={`px-4 py-2 rounded ${activeStatusFilter === 'gezahlt' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                >
                  Gezahlt
                </Button>
                <Button
                  onClick={() => handleStatusFilterClick('überfällig')}
                  className={`px-4 py-2 rounded ${activeStatusFilter === 'überfällig' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                >
                  Überfällig
                </Button>
              </div>
              <div className="md:col-start-4">
                <label htmlFor="general-search" className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Eintrag suchen
                </label>
                <InputField
                  id="general-search"
                  name="general-search"
                  type="text"
                  placeholder="Suche in allen Spalten..."
                  value={generalSearchTerm}
                  onChange={handleGeneralSearchChange}
                  className="w-full"
                />
              </div>
            </div>

            {/* Filter Logic Selector */}
            {filters.length > 1 && (
              <div className="flex items-center gap-2">
                <label htmlFor="filter-logic" className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300">
                  Filter Logik:
                </label>
                <Select
                  id="filter-logic"
                  value={filterLogic}
                  onChange={(e) => setFilterLogic(e.target.value as 'AND' | 'OR')}
                  options={[
                    { value: 'AND', label: 'UND' },
                    { value: 'OR', label: 'ODER' },
                  ]}
                  className="w-24"
                />
              </div>
            )}

            {/* Filter rows appear below the top row */}
            {filters.map((filter) => (
              <div key={filter.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor={`column-select-${filter.id}`} className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Filter nach
                  </label>
                  <Select
                    id={`column-select-${filter.id}`}
                    value={filter.column}
                    onChange={(e) => handleFilterChange(filter.id, 'column', e.target.value as FilterColumn)}
                    options={columns}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor={`operator-select-${filter.id}`} className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Operator
                  </label>
                  <Select
                    id={`operator-select-${filter.id}`}
                    value={filter.operator}
                    onChange={(e) => handleFilterChange(filter.id, 'operator', e.target.value as FilterOperator)}
                    options={getOperatorsForColumn(filter.column)}
                    className="w-full"
                  />
                </div>

                <div className="flex items-end">
                  <div className="flex-grow">
                    <label htmlFor={`filter-value-${filter.id}`} className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Wert
                    </label>
                    <InputField
                      id={`filter-value-${filter.id}`}
                      name={`filter-value-${filter.id}`}
                      type={filter.column === 'amount' ? 'number' : 'text'}
                      placeholder="Wert eingeben..."
                      value={filter.value}
                      onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button
                    size="sm"
                    className="border-error-500 bg-error-500/50 dark:border-error-500/30 text-error-500 hover:bg-error-500/60 dark:hover:bg-error-500/40 ml-2"
                    startIcon={<TrashBinIcon className="h-4 w-4" fill="#EF4444" />}
                    onClick={() => removeFilterRow(filter.id)}
                  >
                    {''}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <InvoiceTable
            invoices={invoices} // Pass the state variable
            filters={filters}
            generalSearchTerm={generalSearchTerm}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            filterLogic={filterLogic}
            onDataUpdate={handleDataUpdate} // Pass the data update function
          />
        </div>
      </div>
    </div>
  );
}
