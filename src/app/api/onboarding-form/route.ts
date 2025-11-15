import { NextResponse } from 'next/server';
import { addOnboarding } from '@/data/onboardingData'; // Assuming a new function for onboarding

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { companyName, contactPerson, contactEmail } = data;

    if (!companyName || !contactPerson || !contactEmail) {
      return NextResponse.json({ message: 'Alle Felder sind erforderlich' }, { status: 400 });
    }

    // Simulate adding the onboarding data to a database
    const newOnboarding = addOnboarding({ companyName, contactPerson, contactEmail });
    console.log('Neue Onboarding-Anfrage erstellt:', newOnboarding);

    return NextResponse.json({ message: 'Onboarding-Formular erfolgreich übermittelt', onboarding: newOnboarding }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Verarbeiten der Onboarding-Formular-Übermittlung:', error);
    return NextResponse.json({ message: 'Fehler beim Erstellen der Onboarding-Anfrage' }, { status: 500 });
  }
}
