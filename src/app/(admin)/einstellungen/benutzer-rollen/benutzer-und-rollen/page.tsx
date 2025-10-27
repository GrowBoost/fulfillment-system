"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Admin",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "Editor",
  },
  {
    id: 3,
    firstName: "Peter",
    lastName: "Jones",
    email: "peter.jones@example.com",
    role: "Viewer",
  },
];

export default function BenutzerUndRollenPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Viewer", // Default role
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.firstName && newUser.lastName && newUser.email && newUser.role) {
      setUsers((prev) => [
        ...prev,
        { ...newUser, id: prev.length > 0 ? Math.max(...prev.map((u) => u.id)) + 1 : 1 },
      ]);
      setNewUser({ firstName: "", lastName: "", email: "", role: "Viewer" }); // Reset form
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-semibold">Benutzer & Rollen</h1>

      {/* Add New User Form */}
      <div className="mb-8 p-6 border rounded-xl bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <h2 className="mb-4 text-xl font-medium">Neuen Benutzer hinzufügen</h2>
        <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="Vorname"
            value={newUser.firstName}
            onChange={handleInputChange}
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nachname"
            value={newUser.lastName}
            onChange={handleInputChange}
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            value={newUser.email}
            onChange={handleInputChange}
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
          <button
            type="submit"
            className="col-span-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Benutzer hinzufügen
          </button>
        </form>
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
                      {/* Actions like Edit/Delete can go here */}
                      <button className="text-blue-500 hover:underline mr-2">Bearbeiten</button>
                      <button className="text-red-500 hover:underline">Löschen</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
