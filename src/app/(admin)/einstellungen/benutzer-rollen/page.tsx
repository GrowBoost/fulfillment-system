"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import { Modal } from "../../../../components/ui/modal";
import { useModal } from "../../../../hooks/useModal";
import Button from "../../../../components/ui/button/Button";
import { PlusIcon, PencilIcon, TrashBinIcon } from "../../../../icons"; // Added PencilIcon and TrashBinIcon

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: "Eingeladen" | "Mitglied" | "Entfernt" | "Gesperrt"; // Added status property
}

const initialUsers: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Mitglied", // Default status for existing users
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    status: "Mitglied",
  },
  {
    id: 3,
    firstName: "Peter",
    lastName: "Jones",
    email: "peter.jones@example.com",
    role: "Viewer",
    status: "Mitglied",
  },
];

export default function BenutzerUndRollenPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const { isOpen, openModal, closeModal } = useModal();
  const [newUsers, setNewUsers] = useState([{ firstName: "", lastName: "", email: "", role: "Viewer", status: "Eingeladen" as const }]); // Default status for new users

  const handleAddUserRow = () => {
    setNewUsers([...newUsers, { firstName: "", lastName: "", email: "", role: "Viewer", status: "Eingeladen" as const }]);
  };

  const handleNewUserChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedUsers = [...newUsers];
    updatedUsers[index] = { ...updatedUsers[index], [name]: value };
    setNewUsers(updatedUsers);
  };

  const handleInviteUsers = (e: React.FormEvent) => {
    e.preventDefault();
    const validNewUsers = newUsers.filter(user => user.firstName && user.lastName && user.email && user.role);
    if (validNewUsers.length > 0) {
      setUsers((prev) => [
        ...prev,
        ...validNewUsers.map((user, index) => ({
          ...user,
          id: prev.length > 0 ? Math.max(...prev.map((u) => u.id)) + 1 + index : 1 + index,
          status: "Eingeladen" as const, // Explicitly cast to literal type
        })),
      ]);
      setNewUsers([{ firstName: "", lastName: "", email: "", role: "Viewer", status: "Eingeladen" as const }]); // Reset form
      closeModal();
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Benutzer & Rollen" />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] py-5 xl:py-10">
        <div className="px-5 xl:px-10">
          <div className="mb-6 flex justify-start"> {/* Changed to justify-start */}
            <Button onClick={openModal} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" startIcon={<PlusIcon className="h-4 w-4" />}>
              Benutzer hinzufügen
            </Button>
          </div>

          {/* User Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[700px]"> {/* Adjusted min-width */}
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Vorname
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Nachname
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        E-Mail
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Rolle
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Status
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Aktionen
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                          {user.firstName}
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                          {user.lastName}
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                          {user.email}
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                          {user.role}
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                          {user.status}
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="p-2 w-8 h-8 flex items-center justify-center"
                              startIcon={<PencilIcon className="h-4 w-4" />}
                              onClick={() => console.log("Edit user", user.id)}
                            >
                              {''} {/* Added empty children */}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="p-2 w-8 h-8 flex items-center justify-center"
                              startIcon={<TrashBinIcon className="h-4 w-4" />}
                              onClick={() => console.log("Delete user", user.id)}
                            >
                              {''} {/* Added empty children */}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} title="Benutzer hinzufügen" className="max-w-3xl p-6"> {/* Adjusted width and added padding */}
        <form onSubmit={handleInviteUsers}>
          {newUsers.map((user, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="Vorname"
                value={user.firstName}
                onChange={(e) => handleNewUserChange(index, e)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nachname"
                value={user.lastName}
                onChange={(e) => handleNewUserChange(index, e)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                value={user.email}
                onChange={(e) => handleNewUserChange(index, e)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <select
                name="role"
                value={user.role}
                onChange={(e) => handleNewUserChange(index, e)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <Button type="button" onClick={handleAddUserRow} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
              Weitere Nutzer hinzufügen
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Nutzer einladen
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
