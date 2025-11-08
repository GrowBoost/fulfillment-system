"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { customerData } from "@/data/customerData";
import Select from "@/components/form/Select";
import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Card from "@/components/common/Card";

// Metadata cannot be exported from a client component.
// If metadata is needed, it should be defined in a layout.tsx or a server component.

interface Option {
  value: string;
  label: string;
}

interface OffboardingFormState {
  offboardingCompleted: boolean;
  offboardingDate: string;
  reason: string;
  notes: string;
}

const OffboardingPage = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [offboardingForm, setOffboardingForm] = useState<OffboardingFormState>({
    offboardingCompleted: false,
    offboardingDate: "",
    reason: "",
    notes: "",
  });

  const selectedCustomer = customerData.find((customer) => customer.id === selectedCustomerId);

  const customerOptions: Option[] = customerData.map((customer) => ({
    value: String(customer.id),
    label: `${customer.name} (${customer.company})`,
  }));

  const handleCustomerChange = (value: string) => {
    setSelectedCustomerId(Number(value));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setOffboardingForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setOffboardingForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCustomer) {
      console.log("Offboarding data submitted for customer:", selectedCustomer.name, offboardingForm);
      // Here you would typically send this data to a backend API
      alert(`Offboarding data for ${selectedCustomer.name} submitted successfully!`);
      // Reset form or provide feedback
      setOffboardingForm({
        offboardingCompleted: false,
        offboardingDate: "",
        reason: "",
        notes: "",
      });
      setSelectedCustomerId(null);
    } else {
      alert("Please select a customer first.");
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Offboarding" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[800px]">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Kunden Offboarding
          </h3>

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
          </Card>

          {selectedCustomer && (
            <Card className="p-6">
              <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Offboarding Formular</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="offboardingCompleted">Offboarding abgeschlossen</Label>
                  <input
                    type="checkbox"
                    id="offboardingCompleted"
                    name="offboardingCompleted"
                    checked={offboardingForm.offboardingCompleted}
                    onChange={handleFormChange}
                    className="ml-2 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-brand-600"
                  />
                </div>
                <div>
                  <Label htmlFor="offboardingDate">Datum des Offboardings</Label>
                  <InputField
                    type="date"
                    id="offboardingDate"
                    name="offboardingDate"
                    value={offboardingForm.offboardingDate}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label htmlFor="reason">Grund für Offboarding</Label>
                  <Select
                    options={[
                      { value: "churn", label: "Kundenabwanderung" },
                      { value: "contract_end", label: "Vertragsende" },
                      { value: "dissatisfaction", label: "Unzufriedenheit" },
                      { value: "other", label: "Sonstiges" },
                    ]}
                    placeholder="Grund auswählen"
                    onChange={(value) => setOffboardingForm((prev) => ({ ...prev, reason: value }))}
                    className="w-full"
                    defaultValue={offboardingForm.reason}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notizen zum Offboarding</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={offboardingForm.notes}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
                >
                  Offboarding speichern
                </button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OffboardingPage;
