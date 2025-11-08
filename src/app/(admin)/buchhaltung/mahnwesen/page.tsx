"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import DunningTable from "@/components/tables/DunningTable";
import InputField from "@/components/form/input/InputField";
import { Dunning } from "@/data/dunningData"; // Import Dunning interface for column keys
import { Select } from "@/components/ui/select/Select";
import Button from "@/components/ui/button/Button"; // Import Button component
import { TrashBinIcon } from "@/icons"; // Import Trash icon

export type FilterColumn = keyof Dunning | '';
export type FilterOperator = '=' | '!=' | 'contains' | 'starts with' | 'ends with' | '>' | '<' | '>=' | '<=' | '';

export interface Filter {
  id: number;
  column: FilterColumn;
  operator: FilterOperator;
  value: string;
}

export type DunningFilterType = 'Geklärt' | 'Handlung nötig' | 'bereit für Inkasso' | '';

export default function MahnwesenPage() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [generalSearchTerm, setGeneralSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeDunningFilter, setActiveDunningFilter] = useState<DunningFilterType>('');
  const [filterLogic, setFilterLogic] = useState<'AND' | 'OR'>('AND'); // Default to AND

  const handleFilterChange = (id: number, field: keyof Filter, value: string | number) => {
    setFilters(prevFilters => prevFilters.map(filter =>
      filter.id === id ? { ...filter, [field]: value } : filter
    ));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleDunningFilterClick = (filterType: DunningFilterType) => {
    if (activeDunningFilter === filterType) {
      // If the same filter is clicked again, clear it
      setActiveDunningFilter('');
      setFilters(prevFilters => prevFilters.filter(f => f.column !== 'result' && f.column !== 'callAttempts'));
    } else {
      setActiveDunningFilter(filterType);
      setFilters(prevFilters => {
        let currentMaxId = Math.max(...prevFilters.map(f => f.id), 0);
        const newFilters: Filter[] = [];
        const filteredPrevFilters = prevFilters.filter(f => f.column !== 'result' && f.column !== 'callAttempts'); // Clear existing result/callAttempts filters

        let resultValues: string[] = [];
        if (filterType === 'Geklärt') {
          resultValues = ['Erfolgreich, neues Zahlungsziel vereinbart', 'Erfolgreich, Zahlung erwartet', 'Erfolgreich, Ratenzahlung vereinbart'];
        } else if (filterType === 'Handlung nötig') {
          resultValues = ['Nicht erreicht', 'Keine Antwort', 'Mail gesendet'];
        }

        if (filterType === 'bereit für Inkasso') {
          // Filter for callAttempts >= 3
          newFilters.push({
            id: ++currentMaxId,
            column: 'callAttempts',
            operator: '>=',
            value: '3'
          });

          // Filter for result 'Nicht erreicht' or 'Keine Antwort'
          newFilters.push({
            id: ++currentMaxId,
            column: 'result',
            operator: 'contains',
            value: 'Nicht erreicht|Keine Antwort'
          });
        } else {
          newFilters.push({
            id: ++currentMaxId,
            column: 'result',
            operator: 'contains',
            value: resultValues.join('|')
          });
        }
        return [...filteredPrevFilters, ...newFilters];
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

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const columns: { value: FilterColumn; label: string }[] = [
    { value: '', label: 'Spalte auswählen' },
    { value: 'id', label: 'ID' },
    { value: 'customerId', label: 'Kunden ID' },
    { value: 'amount', label: 'Betrag' },
    { value: 'currency', label: 'Währung' },
    { value: 'overdueSince', label: 'Überfällig seit' },
    { value: 'callAttempts', label: 'Anrufversuche' },
    { value: 'result', label: 'Ergebnis' },
    { value: 'newDueDate', label: 'Neues Zahlungsziel' },
    { value: 'description', label: 'Beschreibung' },
    { value: 'responsiblePerson', label: 'Verantwortlicher' },
  ];

  const getOperatorsForColumn = (col: FilterColumn) => {
    if (!col) return [];
    if (col === 'amount' || col === 'callAttempts') {
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
      <PageBreadcrumb pageTitle="Buchhaltung / Mahnwesen" />
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
                {/* Dunning Filter Buttons */}
                <Button
                  onClick={() => handleDunningFilterClick('Geklärt')}
                  className={`px-4 py-2 rounded ${activeDunningFilter === 'Geklärt' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                >
                  Geklärt
                </Button>
                <Button
                  onClick={() => handleDunningFilterClick('bereit für Inkasso')}
                  className={`px-4 py-2 rounded ${activeDunningFilter === 'bereit für Inkasso' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                >
                  Bereit für Inkasso
                </Button>
                <Button
                  onClick={() => handleDunningFilterClick('Handlung nötig')}
                  className={`px-4 py-2 rounded ${activeDunningFilter === 'Handlung nötig' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                >
                  Handlung nötig
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
                      type={filter.column === 'amount' || filter.column === 'callAttempts' ? 'number' : 'text'}
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
          <DunningTable
            filters={filters}
            generalSearchTerm={generalSearchTerm}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            filterLogic={filterLogic}
          />
        </div>
      </div>
    </div>
  );
}
