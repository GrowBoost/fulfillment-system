import { randomUUID } from 'crypto';

export interface Recommendation {
  id: string;
  referrerName: string;
  referrerEmail: string;
  recommendedName: string;
  recommendedEmail: string;
  submissionDate: string;
  status: 'eingereicht' | 'kontaktiert' | 'abgeschlossen';
}

export const recommendationData: Recommendation[] = [
  {
    id: 'REC001',
    referrerName: 'Max Mustermann',
    referrerEmail: 'max.mustermann@example.com',
    recommendedName: 'Anna Beispiel',
    recommendedEmail: 'anna.beispiel@example.com',
    submissionDate: '2025-10-01',
    status: 'eingereicht',
  },
  {
    id: 'REC002',
    referrerName: 'Erika Musterfrau',
    referrerEmail: 'erika.musterfrau@example.com',
    recommendedName: 'Paul Test',
    recommendedEmail: 'paul.test@example.com',
    submissionDate: '2025-09-15',
    status: 'kontaktiert',
  },
];

export function addRecommendation(newRecommendationData: {
  referrerName: string;
  referrerEmail: string;
  recommendedName: string;
  recommendedEmail: string;
}): Recommendation {
  const newId = randomUUID(); // Generate a unique ID
  const newRecommendation: Recommendation = {
    id: newId,
    submissionDate: new Date().toISOString().split('T')[0],
    status: 'eingereicht',
    ...newRecommendationData,
  };
  recommendationData.push(newRecommendation);
  return newRecommendation;
}
