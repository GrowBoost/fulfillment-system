"use client";

import React, { useState, useEffect } from 'react';
import { Customer, customerData } from '@/data/customerData';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';

const CustomerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>(customerData);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  useEffect(() => {
    if (selectedCustomer) {
      setEditedCustomer({ ...selectedCustomer });
    } else {
      setEditedCustomer(null);
    }
  }, [selectedCustomer]);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (editedCustomer) {
      setCustomers(prevCustomers =>
        prevCustomers.map(c => (c.id === editedCustomer.id ? editedCustomer : c))
      );
      setIsEditing(false);
      setSelectedCustomerId(editedCustomer.id); // Ensure the updated customer remains selected
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (selectedCustomer) {
      setEditedCustomer({ ...selectedCustomer });
    }
  };

  return (
    <div className="flex h-full">
      {/* Customer List and Search Bar */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-800">
        <div className="flex h-full flex-col p-4">
          <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Kunden</h4>
          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Kunden suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Customer List */}
          <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className={`cursor-pointer rounded-md p-3 hover:bg-brand-200 dark:hover:bg-brand-700 ${
                  selectedCustomerId === customer.id ? 'bg-brand-100 dark:bg-brand-900' : 'bg-gray-100 dark:bg-gray-800'
                }`}
                onClick={() => {
                  setSelectedCustomerId(customer.id);
                  setIsEditing(false);
                }}
              >
                <p className="font-medium text-gray-800 dark:text-white">{customer.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{customer.company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Detail View */}
      <div className="w-2/3">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">Kundendetails</h4>
            {selectedCustomer && (
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="rounded-md bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
                    >
                      Speichern
                    </button>
                    <button
                      onClick={handleCancel}
                      className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                    >
                      Abbrechen
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-md bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
                  >
                    Bearbeiten
                  </button>
                )}
              </div>
            )}
          </div>
          {selectedCustomer && editedCustomer ? (
            <div className="rounded-md border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={editedCustomer.name}
                      onChange={(e) => setEditedCustomer({ ...editedCustomer, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Firma</Label>
                    <Input
                      id="company"
                      type="text"
                      value={editedCustomer.company}
                      onChange={(e) => setEditedCustomer({ ...editedCustomer, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedCustomer.email}
                      onChange={(e) => setEditedCustomer({ ...editedCustomer, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="text"
                      value={editedCustomer.phone}
                      onChange={(e) => setEditedCustomer({ ...editedCustomer, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      type="text"
                      value={editedCustomer.address}
                      onChange={(e) => setEditedCustomer({ ...editedCustomer, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notizen</Label>
                    <textarea
                      id="notes"
                      rows={4}
                      value={editedCustomer.notes}
                      onChange={(e) => setEditedCustomer({ ...editedCustomer, notes: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    ></textarea>
                  </div>
                </div>
              ) : (
                <>
                  <h5 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">{selectedCustomer.name}</h5>
                  <p className="mb-1 text-gray-700 dark:text-gray-300"><strong>Firma:</strong> {selectedCustomer.company}</p>
                  <p className="mb-1 text-gray-700 dark:text-gray-300"><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p className="mb-1 text-gray-700 dark:text-gray-300"><strong>Telefon:</strong> {selectedCustomer.phone}</p>
                  <p className="mb-1 text-gray-700 dark:text-gray-300"><strong>Adresse:</strong> {selectedCustomer.address}</p>
                  <p className="mt-4 text-gray-700 dark:text-gray-300"><strong>Notizen:</strong> {selectedCustomer.notes}</p>
                </>
              )}
            </div>
          ) : (
            <div className="rounded-md border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-gray-700 dark:text-gray-300">Wählen Sie einen Kunden aus, um Details anzuzeigen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
