export type ContactType = 'Telefon' | 'E-Mail' | 'Meeting' | 'Chat';

export interface Contact {
  id: string;
  customerId: number;
  date: string;
  type: ContactType;
  subject: string;
  notes: string;
  agent: string;
}

export const contactHistoryData: Contact[] = [
  {
    id: 'CON001',
    customerId: 1,
    date: '2025-10-20',
    type: 'Telefon',
    subject: 'Rückfrage zum Website-Relaunch',
    notes: 'Kunde wollte Status-Update. Nächste Schritte besprochen.',
    agent: 'Max Mustermann',
  },
  {
    id: 'CON002',
    customerId: 2,
    date: '2025-10-18',
    type: 'E-Mail',
    subject: 'Informationen zur Marketingkampagne',
    notes: 'Details zur Kampagnenstrategie zugesendet.',
    agent: 'Erika Musterfrau',
  },
  {
    id: 'CON003',
    customerId: 3,
    date: '2025-10-15',
    type: 'Meeting',
    subject: 'Projektbesprechung Mobile App',
    notes: 'Meilensteine und Zeitplan für die App-Entwicklung festgelegt.',
    agent: 'Hans Schmidt',
  },
  {
    id: 'CON004',
    customerId: 1,
    date: '2025-10-22',
    type: 'E-Mail',
    subject: 'Zusätzliche Anforderungen Website',
    notes: 'Kunde hat neue Feature-Wünsche geäußert. Intern zur Prüfung weitergeleitet.',
    agent: 'Max Mustermann',
  },
  {
    id: 'CON005',
    customerId: 4,
    date: '2025-10-25',
    type: 'Telefon',
    subject: 'Follow-up CRM-System',
    notes: 'Status des CRM-Projekts besprochen. Nächster Termin vereinbart.',
    agent: 'Lena Meier',
  },
];
