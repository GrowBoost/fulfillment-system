import { NextResponse } from 'next/server';
import { addRecommendation } from '@/data/recommendationData'; // Assuming a new function for recommendations

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { referrerName, referrerEmail, recommendedName, recommendedEmail } = data;

    if (!referrerName || !referrerEmail || !recommendedName || !recommendedEmail) {
      return NextResponse.json({ message: 'Alle Felder sind erforderlich' }, { status: 400 });
    }

    // Simulate adding the recommendation to a database
    const newRecommendation = addRecommendation({ referrerName, referrerEmail, recommendedName, recommendedEmail });
    console.log('Neue Empfehlung erstellt:', newRecommendation);

    return NextResponse.json({ message: 'Empfehlung erfolgreich übermittelt', recommendation: newRecommendation }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Verarbeiten der Empfehlungsformular-Übermittlung:', error);
    return NextResponse.json({ message: 'Fehler beim Erstellen der Empfehlung' }, { status: 500 });
  }
}
