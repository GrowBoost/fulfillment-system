"use client";

import React, { useState } from 'react';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from '@/components/employee/EmployeeModal';
import Button from '@/components/ui/button/Button';
import { employeeData as initialEmployeeData } from '../../../../data/employeeData';
import { Employee } from '../../../../types/Employee';
import { PlusIcon, PencilIcon, TrashBinIcon } from '@/icons';

const TeammanagementPage = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployeeData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | undefined>(undefined);

  const handleAddEmployee = () => {
    setEmployeeToEdit(undefined);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleSaveEmployee = (newEmployee: Employee) => {
    if (employeeToEdit) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === newEmployee.id ? newEmployee : emp))
      );
    } else {
      setEmployees((prev) => [...prev, { ...newEmployee, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold text-black dark:text-white">
        Teammanagement
      </h2>
      <div className="flex flex-col gap-10">
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleAddEmployee}
            className="bg-blue-500 text-white hover:bg-blue-600"
            startIcon={<PlusIcon className="h-4 w-4" fill="#fff" />}
          >
            Mitarbeiter hinzufügen
          </Button>
        </div>
        <EmployeeTable
          employees={employees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />
      </div>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        employeeToEdit={employeeToEdit}
      />
    </>
  );
};

export default TeammanagementPage;
