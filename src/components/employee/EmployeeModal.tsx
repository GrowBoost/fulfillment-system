import React, { useState, useEffect } from 'react';
import { Employee } from '../../types/Employee';
import Button from '../ui/button/Button';
import InputField from '../form/input/InputField';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
  employeeToEdit?: Employee;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, onSave, employeeToEdit }) => {
  const [employee, setEmployee] = useState<Employee>({
    id: '',
    name: '',
    email: '',
    role: '',
    permissions: [],
    lastActivity: new Date().toISOString(),
  });
  const [permissionsInput, setPermissionsInput] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
      setPermissionsInput(employeeToEdit.permissions.join(', '));
    } else {
      setEmployee({
        id: '',
        name: '',
        email: '',
        role: '',
        permissions: [],
        lastActivity: new Date().toISOString(),
      });
      setPermissionsInput('');
    }
  }, [employeeToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPermissionsInput(e.target.value);
    setEmployee((prev) => ({ ...prev, permissions: e.target.value.split(',').map((p) => p.trim()) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(employee);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-boxdark">
        <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
          {employeeToEdit ? 'Mitarbeiter bearbeiten' : 'Neuen Mitarbeiter hinzufügen'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Name</label>
            <InputField
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Email</label>
            <InputField
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Rolle</label>
            <InputField
              type="text"
              name="role"
              value={employee.role}
              onChange={handleChange}
              placeholder="Rolle"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Berechtigungen (Komma-getrennt)</label>
            <InputField
              type="text"
              name="permissions"
              value={permissionsInput}
              onChange={handlePermissionsChange}
              placeholder="Berechtigungen"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" onClick={onClose} className="bg-gray-300 text-black hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              Abbrechen
            </Button>
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
              Speichern
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
