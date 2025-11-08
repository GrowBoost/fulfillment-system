"use client";

import React, { useState } from "react";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import Select from "@/components/form/Select";
import FileInput from "@/components/form/input/FileInput";
import Label from "@/components/form/Label"; // Assuming a Label component exists
import { customerData } from "@/data/customerData";
import Card from "@/components/common/Card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

interface Option {
  value: string;
  label: string;
}

interface ContactEntry {
  id: number;
  customerId: number;
  customerName: string;
  contactType: string;
  protocol: string;
  documentName?: string;
  date: string;
}

const KontaktHistoriePage: React.FC = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [contactType, setContactType] = useState("");
  const [protocol, setProtocol] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [contactHistory, setContactHistory] = useState<ContactEntry[]>([]);

  const selectedCustomer = customerData.find((customer) => customer.id === selectedCustomerId);

  const customerOptions: Option[] = customerData.map((customer) => ({
    value: String(customer.id),
    label: `${customer.name} (${customer.company})`,
  }));

  const contactTypeOptions = [
    { value: "E-Mail", label: "E-Mail" },
    { value: "Call", label: "Call" },
    { value: "Meeting", label: "Meeting" },
  ];

  const handleCustomerChange = (value: string) => {
    setSelectedCustomerId(Number(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !contactType || !protocol) {
      alert("Bitte wählen Sie einen Kunden aus und füllen Sie alle Pflichtfelder aus.");
      return;
    }

    const newEntry: ContactEntry = {
      id: contactHistory.length + 1,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      contactType,
      protocol,
      documentName: selectedFile ? selectedFile.name : undefined,
      date: new Date().toLocaleDateString("de-DE"),
    };

    setContactHistory([...contactHistory, newEntry]);
    setContactType("");
    setProtocol("");
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <PageBreadCrumb pageTitle="Kunden / Kontakt-Historie" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[800px]">
          <Card className="mb-6 p-6">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Kunden auswählen</h4>
            <div className="mb-4">
              <Label htmlFor="customer-select">Kunde</Label>
              <Select
                options={customerOptions}
                placeholder="Kunden auswählen"
                onChange={handleCustomerChange}
                className="w-full"
                defaultValue={selectedCustomerId ? String(selectedCustomerId) : ""}
              />
            </div>
            {selectedCustomer && (
              <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                <p className="font-medium text-gray-800 dark:text-white">Ausgewählter Kunde:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedCustomer.name}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedCustomer.company}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedCustomer.email}</p>
              </div>
            )}
            {selectedCustomer && (
              <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Neuer Kontakt-Eintrag</h4>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="contactType">Kontaktart</Label>
                <Select
                  options={contactTypeOptions}
                  onChange={(value) => setContactType(value)}
                  className="w-full"
                  defaultValue={contactType}
                />
              </div>

              <div>
                <Label htmlFor="documentUpload">Dokumente</Label>
                <FileInput
                  onChange={handleFileChange}
                />
                {selectedFile && <span className="text-sm text-gray-500">{selectedFile.name}</span>}
              </div>

              <div>
                <Label htmlFor="protocol">Protokoll</Label>
                <textarea
                  id="protocol"
                  value={protocol}
                  onChange={(e) => setProtocol(e.target.value)}
                  rows={4}
                  placeholder="Geben Sie hier das Protokoll ein..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                ></textarea>
              </div>

              <button
                type="submit"
                className="rounded-md bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
              >
                Eintrag hinzufügen
              </button>
            </form>
          </Card>

          <Card className="p-6">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
              Kontakt-Historie Einträge
            </h4>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Kunde
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
                        Kontaktart
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Protokoll
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Dokument
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {contactHistory.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                          {entry.customerName}
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                          {entry.date}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {entry.contactType}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {entry.protocol}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {entry.documentName || "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                    {contactHistory.length === 0 && (
                      <TableRow>
                        <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">
                          Keine Einträge vorhanden.
                        </td>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KontaktHistoriePage;
