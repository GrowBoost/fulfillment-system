import { Employee } from '../types/Employee';

export const employeeData: Employee[] = [
  {
    id: '1',
    name: 'Max Mustermann',
    email: 'max.mustermann@example.com',
    role: 'Admin',
    permissions: ['manage_users', 'view_all_data', 'edit_settings'],
    lastActivity: '2025-11-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Erika Musterfrau',
    email: 'erika.musterfrau@example.com',
    role: 'Manager',
    permissions: ['manage_projects', 'view_team_data'],
    lastActivity: '2025-11-15T09:45:00Z',
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Employee',
    permissions: ['view_own_data'],
    lastActivity: '2025-11-14T16:00:00Z',
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Employee',
    permissions: ['view_own_data'],
    lastActivity: '2025-11-15T11:15:00Z',
  },
];
