"use client";

import React, { useState, useEffect } from 'react';
import { Customer, customerData } from '@/data/customerData';
import { Invoice, invoiceData } from '@/data/invoiceData';
import { Dunning, dunningData } from '@/data/dunningData';
import { Onboarding, onboardingData } from '@/data/onboardingData';
import { Project, projectData } from '@/data/projectData';
import { Contact, contactHistoryData } from '@/data/contactHistoryData';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { Tab } from '@headlessui/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";

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

  const getInvoiceStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'gezahlt':
        return 'success';
      case 'überfällig':
        return 'warning';
      case 'gemahnt':
        return 'info';
      case 'offen':
        return 'primary';
      default:
        return 'primary';
    }
  };

  const getDunningStatusColor = (status: Dunning['status']) => {
    switch (status) {
      case 'gemahnt':
        return 'info';
      default:
        return 'primary';
    }
  };

  const getOnboardingStatusColor = (status: Onboarding['status']) => {
    switch (status) {
      case 'abgeschlossen':
        return 'success';
      case 'in Bearbeitung':
        return 'info';
      case 'begonnen':
        return 'primary';
      case 'abgebrochen':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const getProjectStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'abgeschlossen':
        return 'success';
      case 'in Bearbeitung':
        return 'info';
      case 'begonnen':
        return 'primary';
      case 'pausiert':
        return 'warning';
      case 'abgebrochen':
        return 'error';
      default:
        return 'primary';
    }
  };

  const renderInvoicesTable = (invoices: Invoice[]) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Rechnungsnummer
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Betrag
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Fälligkeitsdatum
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Beschreibung
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                  {invoice.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.amount} {invoice.currency}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.dueDate}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={getInvoiceStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderDunningTable = (dunnings: Dunning[]) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Betrag
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Überfällig seit
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Anrufversuche
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ergebnis
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Neues Fälligkeitsdatum
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Verantwortlicher
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {dunnings.map((dunning) => (
              <TableRow key={dunning.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                  {dunning.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {dunning.amount} {dunning.currency}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {dunning.overdueSince}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {dunning.callAttempts}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={getDunningStatusColor(dunning.status)}>
                    {dunning.result}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {dunning.newDueDate}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {dunning.responsiblePerson}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderOnboardingTable = (onboardings: Onboarding[]) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Startdatum
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Schritte
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Verantwortlicher
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {onboardings.map((onboarding) => (
              <TableRow key={onboarding.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                  {onboarding.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {onboarding.startDate}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={getOnboardingStatusColor(onboarding.status)}>
                    {onboarding.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {onboarding.stepsCompleted}/{onboarding.totalSteps}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {onboarding.responsibleAgent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderProjectsTable = (projects: Project[]) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Fortschritt
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Verantwortlicher
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                  {project.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {project.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={getProjectStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {project.progress}%
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {project.responsibleManager}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderContactHistoryTable = (contacts: Contact[]) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Datum
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Typ
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Betreff
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Agent
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                  {contact.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {contact.date}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {contact.type}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {contact.subject}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {contact.agent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

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
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${selected
                    ? 'bg-brand-500 text-white shadow'
                    : 'text-brand-500 hover:bg-brand-500/20'}`
                }>Stammdaten</Tab>
                <Tab className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${selected
                    ? 'bg-brand-500 text-white shadow'
                    : 'text-brand-500 hover:bg-brand-500/20'}`
                }>Onboarding</Tab>
                <Tab className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${selected
                    ? 'bg-brand-500 text-white shadow'
                    : 'text-brand-500 hover:bg-brand-500/20'}`
                }>Projekte</Tab>
                <Tab className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${selected
                    ? 'bg-brand-500 text-white shadow'
                    : 'text-brand-500 hover:bg-brand-500/20'}`
                }>Rechnungen</Tab>
                <Tab className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${selected
                    ? 'bg-brand-500 text-white shadow'
                    : 'text-brand-500 hover:bg-brand-500/20'}`
                }>Mahnungen</Tab>
                <Tab className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${selected
                    ? 'bg-brand-500 text-white shadow'
                    : 'text-brand-500 hover:bg-brand-500/20'}`
                }>Kontakt-Historie</Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={editedCustomer.name}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedCustomer.email}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Firma</Label>
                      <Input
                        id="company"
                        type="text"
                        value={editedCustomer.company}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, company: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        type="text"
                        value={editedCustomer.address}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, address: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        type="text"
                        value={editedCustomer.phone}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  {renderOnboardingTable(onboardingData.filter(onb => onb.customerId === selectedCustomer.id))}
                </Tab.Panel>
                <Tab.Panel>
                  {renderProjectsTable(projectData.filter(proj => proj.customerId === selectedCustomer.id))}
                </Tab.Panel>
                <Tab.Panel>
                  {renderInvoicesTable(invoiceData.filter(inv => inv.customerId === selectedCustomer.id))}
                </Tab.Panel>
                <Tab.Panel>
                  {renderDunningTable(dunningData.filter(dun => dun.customerId === selectedCustomer.id))}
                </Tab.Panel>
                <Tab.Panel>
                  {renderContactHistoryTable(contactHistoryData.filter(con => con.customerId === selectedCustomer.id))}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
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
