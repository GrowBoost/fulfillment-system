export type ProjectStatus = 'begonnen' | 'in Bearbeitung' | 'abgeschlossen' | 'pausiert' | 'abgebrochen';

export interface Project {
  id: string;
  customerId: number;
  name: string;
  description: string;
  startDate: string;
  endDate?: string; // Optional, if not yet completed
  status: ProjectStatus;
  progress: number; // Percentage
  responsibleManager: string; // New field for responsible manager
}

export const projectData: Project[] = [
  {
    id: 'PROJ001',
    customerId: 1,
    name: 'Website Relaunch',
    description: 'Komplette Neugestaltung der Unternehmenswebsite.',
    startDate: '2025-08-01',
    status: 'in Bearbeitung',
    progress: 60,
    responsibleManager: 'Max Mustermann',
  },
  {
    id: 'PROJ002',
    customerId: 2,
    name: 'Marketingkampagne Q4',
    description: 'Entwicklung und Durchführung einer Marketingkampagne für das vierte Quartal.',
    startDate: '2025-09-15',
    status: 'begonnen',
    progress: 20,
    responsibleManager: 'Erika Musterfrau',
  },
  {
    id: 'PROJ003',
    customerId: 3,
    name: 'Mobile App Entwicklung',
    description: 'Konzeption und Entwicklung einer nativen mobilen App.',
    startDate: '2025-07-01',
    endDate: '2025-10-31',
    status: 'abgeschlossen',
    progress: 100,
    responsibleManager: 'Hans Schmidt',
  },
  {
    id: 'PROJ004',
    customerId: 4,
    name: 'CRM-System Implementierung',
    description: 'Einführung eines neuen CRM-Systems zur Kundenverwaltung.',
    startDate: '2025-10-01',
    status: 'in Bearbeitung',
    progress: 40,
    responsibleManager: 'Lena Meier',
  },
  {
    id: 'PROJ005',
    customerId: 5,
    name: 'Cloud-Migration',
    description: 'Migration der bestehenden IT-Infrastruktur in die Cloud.',
    startDate: '2025-09-01',
    status: 'pausiert',
    progress: 30,
    responsibleManager: 'Peter Müller',
  },
];
