"use client";

import React, { useState } from 'react';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Form from '@/components/form/Form';

export default function CancellationFormPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/cancellation-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, reason }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Kündigungsformular erfolgreich übermittelt!');
        setName('');
        setEmail('');
        setReason('');
      } else {
        setMessage(data.message || 'Fehler beim Übermitteln des Kündigungsformulars.');
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
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">Kündigungsformular</h1>
        <Form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Geben Sie Ihren Namen ein"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Geben Sie Ihre E-Mail-Adresse ein"
              required
            />
          </div>
          <div>
            <Label htmlFor="reason">Kündigungsgrund</Label>
            <Input
              type="text"
              id="reason"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Geben Sie den Kündigungsgrund an"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
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
