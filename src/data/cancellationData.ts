export type CancellationStatus = 'Kündigung eingegangen' | 'offboarding' | 'offboarding abgeschlossen';

export interface Cancellation {
  id: string;
  customerId: string;
  customerName: string;
  cancellationDate: string;
  effectiveDate: string;
  status: CancellationStatus;
  reason: string;
}

export const cancellationData: Cancellation[] = [
  {
    id: 'CANC001',
    customerId: 'CUST001',
    customerName: 'Max Mustermann',
    cancellationDate: '2025-09-10',
    effectiveDate: '2025-12-31',
    status: 'Kündigung eingegangen',
    reason: 'Umstrukturierung',
  },
  {
    id: 'CANC002',
    customerId: 'CUST002',
    customerName: 'Erika Musterfrau',
    cancellationDate: '2025-08-01',
    effectiveDate: '2025-10-31',
    status: 'offboarding',
    reason: 'Budgetkürzungen',
  },
  {
    id: 'CANC003',
    customerId: 'CUST003',
    customerName: 'John Doe',
    cancellationDate: '2025-07-15',
    effectiveDate: '2025-09-30',
    status: 'offboarding abgeschlossen',
    reason: 'Unzufriedenheit mit Service',
  },
  {
    id: 'CANC004',
    customerId: 'CUST004',
    customerName: 'Jane Smith',
    cancellationDate: '2025-10-01',
    effectiveDate: '2026-01-31',
    status: 'Kündigung eingegangen',
    reason: 'Besseres Angebot der Konkurrenz',
  },
  {
    id: 'CANC005',
    customerId: 'CUST005',
    customerName: 'Peter Müller',
    cancellationDate: '2025-09-20',
    effectiveDate: '2025-12-15',
    status: 'offboarding',
    reason: 'Geschäftsaufgabe',
  },
];
