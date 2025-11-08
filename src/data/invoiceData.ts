export type InvoiceStatus = 'gezahlt' | 'überfällig' | 'gemahnt' | 'offen';

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  currency: string;
  dueDate: string;
  paymentDate?: string; // Optional, if payment is not yet made
  status: InvoiceStatus;
  description: string;
  overdueSince?: string; // e.g., "38 Tage"
  callAttempts?: number;
  result?: string; // e.g., "Erfolgreich", "Keine Antwort", "Rückruf vereinbart"
  newDueDate?: string; // e.g., "YYYY-MM-DD"
}

export const invoiceData: Invoice[] = [
  {
    id: 'PAY001',
    customerId: 'CUST001',
    amount: 150.00,
    currency: 'EUR',
    dueDate: '2025-10-25',
    paymentDate: '2025-10-24',
    status: 'gezahlt',
    description: 'Monatliche Gebühr Oktober',
  },
  {
    id: 'PAY002',
    customerId: 'CUST002',
    amount: 200.00,
    currency: 'EUR',
    dueDate: '2025-10-20',
    paymentDate: '2025-10-19',
    status: 'gezahlt',
    description: 'Servicepaket A',
  },
  {
    id: 'PAY003',
    customerId: 'CUST003',
    amount: 75.50,
    currency: 'EUR',
    dueDate: '2025-10-15',
    status: 'überfällig',
    description: 'Beratungsleistung',
  },
  {
    id: 'PAY004',
    customerId: 'CUST004',
    amount: 300.00,
    currency: 'EUR',
    dueDate: '2025-11-01',
    status: 'offen',
    description: 'Jahresabo',
  },
  {
    id: 'PAY005',
    customerId: 'CUST005',
    amount: 50.00,
    currency: 'EUR',
    dueDate: '2025-10-30',
    paymentDate: '2025-10-29',
    status: 'gezahlt',
    description: 'Zusatzleistung',
  },
  {
    id: 'PAY006',
    customerId: 'CUST001',
    amount: 150.00,
    currency: 'EUR',
    dueDate: '2025-11-25',
    status: 'offen',
    description: 'Monatliche Gebühr November',
  },
  {
    id: 'PAY007',
    customerId: 'CUST003',
    amount: 75.50,
    currency: 'EUR',
    dueDate: '2025-09-15',
    status: 'gemahnt',
    description: 'Beratungsleistung (Mahnung)',
    overdueSince: '38 Tage',
    callAttempts: 2,
    result: 'Rückruf vereinbart',
    newDueDate: '2025-11-05',
  },
  {
    id: 'PAY008',
    customerId: 'CUST006',
    amount: 120.00,
    currency: 'EUR',
    dueDate: '2025-11-10',
    status: 'offen',
    description: 'Marketingkampagne',
  },
  {
    id: 'PAY009',
    customerId: 'CUST007',
    amount: 90.00,
    currency: 'EUR',
    dueDate: '2025-10-05',
    status: 'überfällig',
    description: 'Support-Vertrag',
  },
  {
    id: 'PAY010',
    customerId: 'CUST008',
    amount: 450.00,
    currency: 'EUR',
    dueDate: '2025-12-01',
    status: 'offen',
    description: 'Projekt X Phase 1',
  },
  {
    id: 'PAY011',
    customerId: 'CUST009',
    amount: 100.00,
    currency: 'EUR',
    dueDate: '2025-10-01',
    status: 'gemahnt',
    description: 'Webdesign Leistung',
    overdueSince: '52 Tage',
    callAttempts: 1,
    result: 'Keine Antwort',
    newDueDate: '2025-11-15',
  },
];
