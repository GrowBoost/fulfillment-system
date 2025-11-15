import { NextResponse } from 'next/server';
import { addCancellation } from '@/data/cancellationData'; // Assuming a new function for cancellations

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, reason } = data;

    if (!name || !email || !reason) {
      return NextResponse.json({ message: 'Name, E-Mail und Kündigungsgrund sind erforderlich' }, { status: 400 });
    }

    // Simulate adding the cancellation to a database
    const newCancellation = addCancellation({ name, email, reason });
    console.log('Neue Kündigung erstellt:', newCancellation);

    return NextResponse.json({ message: 'Kündigung erfolgreich übermittelt', cancellation: newCancellation }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Verarbeiten der Kündigungsformular-Übermittlung:', error);
    return NextResponse.json({ message: 'Fehler beim Erstellen der Kündigung' }, { status: 500 });
  }
}
