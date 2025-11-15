export type OnboardingStatus = 'begonnen' | 'in Bearbeitung' | 'abgeschlossen' | 'abgebrochen';

export interface Onboarding {
  id: string;
  customerId: number;
  startDate: string;
  endDate?: string; // Optional, if not yet completed
  status: OnboardingStatus;
  stepsCompleted: number;
  totalSteps: number;
  notes?: string;
  responsibleAgent: string; // New field for responsible agent
}

export const onboardingData: Onboarding[] = [
  {
    id: 'ONB001',
    customerId: 1,
    startDate: '2025-09-01',
    endDate: '2025-09-15',
    status: 'abgeschlossen',
    stepsCompleted: 5,
    totalSteps: 5,
    notes: 'Alle Schritte erfolgreich durchlaufen.',
    responsibleAgent: 'Agent A',
  },
  {
    id: 'ONB002',
    customerId: 2,
    startDate: '2025-10-01',
    status: 'in Bearbeitung',
    stepsCompleted: 3,
    totalSteps: 5,
    notes: 'Wartet auf Kundenrückmeldung für Schritt 4.',
    responsibleAgent: 'Agent B',
  },
  {
    id: 'ONB003',
    customerId: 3,
    startDate: '2025-10-10',
    status: 'begonnen',
    stepsCompleted: 1,
    totalSteps: 4,
    notes: 'Erster Kontakt hergestellt.',
    responsibleAgent: 'Agent C',
  },
  {
    id: 'ONB004',
    customerId: 4,
    startDate: '2025-09-20',
    endDate: '2025-10-05',
    status: 'abgeschlossen',
    stepsCompleted: 6,
    totalSteps: 6,
    notes: 'Reibungsloser Onboarding-Prozess.',
    responsibleAgent: 'Agent A',
  },
  {
    id: 'ONB005',
    customerId: 5,
    startDate: '2025-11-01',
    status: 'begonnen',
    stepsCompleted: 0,
    totalSteps: 3,
    notes: 'Neuer Kunde, Onboarding startet nächste Woche.',
    responsibleAgent: 'Agent B',
  },
];

export function addOnboarding(newOnboardingData: {
  companyName: string;
  contactPerson: string;
  contactEmail: string;
}): Onboarding {
  const newId = `ONB${String(onboardingData.length + 1).padStart(3, '0')}`;
  const newCustomerId = onboardingData.length > 0 ? Math.max(...onboardingData.map(o => o.customerId)) + 1 : 1;
  const newOnboarding: Onboarding = {
    id: newId,
    customerId: newCustomerId,
    startDate: new Date().toISOString().split('T')[0],
    status: 'begonnen',
    stepsCompleted: 0,
    totalSteps: 5, // Default total steps
    notes: `Onboarding-Anfrage von ${newOnboardingData.contactPerson} (${newOnboardingData.contactEmail}) für ${newOnboardingData.companyName}.`,
    responsibleAgent: 'Unzugewiesen', // Default responsible agent
  };
  onboardingData.push(newOnboarding);
  return newOnboarding;
}
