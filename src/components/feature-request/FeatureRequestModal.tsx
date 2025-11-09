"use client";

import React, { useState } from 'react';

const FeatureRequestModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feature Request Submitted:', { name, email, request });
    // Here you would typically send this data to a backend
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Feature-Request einreichen</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="request" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Ihr Feature-Request
            </label>
            <textarea
              id="request"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Senden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeatureRequestModal;
