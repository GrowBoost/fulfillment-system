"use client";

import React, { useState } from 'react';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Form from '@/components/form/Form';

export default function OnboardingFormPage() {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/onboarding-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName, contactPerson, contactEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Onboarding-Formular erfolgreich übermittelt!');
        setCompanyName('');
        setContactPerson('');
        setContactEmail('');
      } else {
        setMessage(data.message || 'Fehler beim Übermitteln des Onboarding-Formulars.');
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
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">Onboarding-Formular</h1>
        <Form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="companyName">Firmenname</Label>
            <Input
              type="text"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Geben Sie den Firmennamen ein"
              required
            />
          </div>
          <div>
            <Label htmlFor="contactPerson">Ansprechpartner</Label>
            <Input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="Geben Sie den Namen des Ansprechpartners ein"
              required
            />
          </div>
          <div>
            <Label htmlFor="contactEmail">E-Mail des Ansprechpartners</Label>
            <Input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Geben Sie die E-Mail-Adresse des Ansprechpartners ein"
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
