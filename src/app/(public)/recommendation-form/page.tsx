"use client";

import React, { useState } from 'react';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Form from '@/components/form/Form';

export default function RecommendationFormPage() {
  const [referrerName, setReferrerName] = useState('');
  const [referrerEmail, setReferrerEmail] = useState('');
  const [recommendedName, setRecommendedName] = useState('');
  const [recommendedEmail, setRecommendedEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/recommendation-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referrerName, referrerEmail, recommendedName, recommendedEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Empfehlungsformular erfolgreich übermittelt!');
        setReferrerName('');
        setReferrerEmail('');
        setRecommendedName('');
        setRecommendedEmail('');
      } else {
        setMessage(data.message || 'Fehler beim Übermitteln des Empfehlungsformulars.');
      }
    } catch (error) {
      console.error('Übermittlungsfehler:', error);
      setMessage('Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">Empfehlungsformular</h1>
        <Form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="referrerName">Ihr Name</Label>
            <Input
              type="text"
              id="referrerName"
              name="referrerName"
              value={referrerName}
              onChange={(e) => setReferrerName(e.target.value)}
              placeholder="Geben Sie Ihren Namen ein"
              required
            />
          </div>
          <div>
            <Label htmlFor="referrerEmail">Ihre E-Mail</Label>
            <Input
              type="email"
              id="referrerEmail"
              name="referrerEmail"
              value={referrerEmail}
              onChange={(e) => setReferrerEmail(e.target.value)}
              placeholder="Geben Sie Ihre E-Mail-Adresse ein"
              required
            />
          </div>
          <div>
            <Label htmlFor="recommendedName">Name der empfohlenen Person/Firma</Label>
            <Input
              type="text"
              id="recommendedName"
              name="recommendedName"
              value={recommendedName}
              onChange={(e) => setRecommendedName(e.target.value)}
              placeholder="Name der empfohlenen Person/Firma"
              required
            />
          </div>
          <div>
            <Label htmlFor="recommendedEmail">E-Mail der empfohlenen Person/Firma</Label>
            <Input
              type="email"
              id="recommendedEmail"
              name="recommendedEmail"
              value={recommendedEmail}
              onChange={(e) => setRecommendedEmail(e.target.value)}
              placeholder="E-Mail der empfohlenen Person/Firma"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wird übermittelt...' : 'Senden'}
          </button>
          {message && (
            <p className={`mt-4 text-center ${message.includes('erfolgreich') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </Form>
      </div>
    </div>
  );
}
