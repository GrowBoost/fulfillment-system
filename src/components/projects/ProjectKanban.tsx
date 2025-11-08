"use client";

import React, { useState, useRef } from "react";
import GenericKanban, { GenericColumn, GenericItem } from "@/components/kanban/GenericKanban";
import Checkbox from "@/components/form/input/Checkbox";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ProjectCard extends GenericItem {
  customerName: string;
  description: string;
  responsible: string;
  deadline: string; // Using string for simplicity, can be Date object
  checklist: ChecklistItem[];
}

const initialProjectCards: { [key: string]: ProjectCard } = {
  "project-1": {
    id: "project-1",
    customerName: "Kunde A",
    description: "Website Relaunch für Kunde A",
    responsible: "Max Mustermann",
    deadline: "2024-12-31",
    checklist: [
      { id: "check-1-1", text: "Anforderungsanalyse", completed: true },
      { id: "check-1-2", text: "Design-Entwurf", completed: false },
      { id: "check-1-3", text: "Entwicklung Backend", completed: false },
    ],
  },
  "project-2": {
    id: "project-2",
    customerName: "Kunde B",
    description: "Marketingkampagne für Produkt X",
    responsible: "Erika Musterfrau",
    deadline: "2024-11-15",
    checklist: [
      { id: "check-2-1", text: "Strategieentwicklung", completed: true },
      { id: "check-2-2", text: "Content-Erstellung", completed: true },
      { id: "check-2-3", text: "Kampagnenstart", completed: false },
    ],
  },
  "project-3": {
    id: "project-3",
    customerName: "Kunde C",
    description: "Mobile App Entwicklung",
    responsible: "Max Mustermann",
    deadline: "2025-01-31",
    checklist: [
      { id: "check-3-1", text: "Konzeptphase", completed: false },
      { id: "check-3-2", text: "UI/UX Design", completed: false },
    ],
  },
};

const initialProjectColumns: { [key: string]: GenericColumn } = {
  "column-1": {
    id: "column-1",
    title: "Gestartet",
    itemIds: ["project-1", "project-3"],
  },
  "column-2": {
    id: "column-2",
    title: "In Arbeit",
    itemIds: ["project-2"],
  },
  "column-3": {
    id: "column-3",
    title: "Kunde liefert",
    itemIds: [],
  },
  "column-4": {
    id: "column-4",
    title: "Review",
    itemIds: [],
  },
  "column-5": {
    id: "column-5",
    title: "Ausgeliefert",
    itemIds: [],
  },
};

export default function ProjectKanban() {
  const [projectCards, setProjectCards] = useState(initialProjectCards);
  const [projectColumns, setProjectColumns] = useState(initialProjectColumns);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [newCardCustomerName, setNewCardCustomerName] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardChecklistItems, setNewCardChecklistItems] = useState(""); // Comma separated
  const [newCardResponsible, setNewCardResponsible] = useState("");
  const [newCardDeadline, setNewCardDeadline] = useState("");
  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingCardCustomerName, setEditingCardCustomerName] = useState("");
  const [editingCardDescription, setEditingCardDescription] = useState("");
  const [editingCardChecklistItems, setEditingCardChecklistItems] = useState("");
  const [editingCardResponsible, setEditingCardResponsible] = useState("");
  const [editingCardDeadline, setEditingCardDeadline] = useState("");
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  // Use useRef for unique ID generation
  const nextCardIdRef = useRef(Object.keys(initialProjectCards).length + 1);
  const nextColumnIdRef = useRef(Object.keys(initialProjectColumns).length + 1);

  const handleAddCard = (columnId: string) => {
    if (newCardCustomerName.trim() === "") return;

    const newCardId = `project-${nextCardIdRef.current++}`; // Use ref for unique ID
    const newChecklist: ChecklistItem[] = newCardChecklistItems
      .split(",")
      .filter((item) => item.trim() !== "")
      .map((item, index) => ({ id: `${newCardId}-check-${index + 1}`, text: item.trim(), completed: false }));

    const newCard: ProjectCard = {
      id: newCardId,
      customerName: newCardCustomerName,
      description: newCardDescription,
      responsible: newCardResponsible,
      deadline: newCardDeadline,
      checklist: newChecklist,
    };

    setProjectCards((prevCards) => ({
      ...prevCards,
      [newCardId]: newCard,
    }));

    setProjectColumns((prevColumns) => {
      const targetColumn = prevColumns[columnId];
      if (!targetColumn) return prevColumns;

      const updatedItemIds = [...targetColumn.itemIds, newCardId];
      return {
        ...prevColumns,
        [columnId]: {
          ...targetColumn,
          itemIds: updatedItemIds,
        },
      };
    });

    setNewCardCustomerName("");
    setNewCardDescription("");
    setNewCardResponsible("");
    setNewCardDeadline("");
    setNewCardChecklistItems("");
    setIsAddCardModalOpen(false);
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === "") return;

    const newColumnId = `column-${nextColumnIdRef.current++}`; // Use ref for unique ID
    const newColumn: GenericColumn = {
      id: newColumnId,
      title: newColumnTitle,
      itemIds: [],
    };

    setProjectColumns((prevColumns) => ({
      ...prevColumns,
      [newColumnId]: newColumn,
    }));

    setNewColumnTitle("");
    setIsAddColumnModalOpen(false);
  };

  const handleEditCard = () => {
    if (editingCardId && editingCardCustomerName.trim() !== "") {
      const updatedChecklist: ChecklistItem[] = editingCardChecklistItems
        .split(",")
        .filter((item) => item.trim() !== "")
        .map((item, index) => {
          // Try to preserve completion status if item text hasn't changed
          const existingItem = projectCards[editingCardId]?.checklist.find(
            (check) => check.text === item.trim()
          );
          return {
            id: existingItem?.id || `${editingCardId}-check-${index + 1}`,
            text: item.trim(),
            completed: existingItem?.completed || false,
          };
        });

      setProjectCards((prevCards) => ({
        ...prevCards,
        [editingCardId]: {
          ...prevCards[editingCardId],
          customerName: editingCardCustomerName,
          description: editingCardDescription,
          responsible: editingCardResponsible,
          deadline: editingCardDeadline,
          checklist: updatedChecklist,
        },
      }));
      setIsEditCardModalOpen(false);
      setEditingCardId(null);
      setEditingCardCustomerName("");
      setEditingCardDescription("");
      setEditingCardChecklistItems("");
      setEditingCardResponsible("");
      setEditingCardDeadline("");
    }
  };

  const openEditCardModal = (card: ProjectCard) => {
    setEditingCardId(card.id);
    setEditingCardCustomerName(card.customerName);
    setEditingCardDescription(card.description);
    setEditingCardResponsible(card.responsible);
    setEditingCardDeadline(card.deadline);
    setEditingCardChecklistItems(card.checklist.map((item) => item.text).join(", "));
    setIsEditCardModalOpen(true);
  };

  const toggleChecklistItem = (cardId: string, itemId: string) => {
    setProjectCards((prevCards) => {
      const cardToUpdate = prevCards[cardId];
      if (!cardToUpdate) return prevCards;

      const updatedChecklist = cardToUpdate.checklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );

      return {
        ...prevCards,
        [cardId]: {
          ...cardToUpdate,
          checklist: updatedChecklist,
        },
      };
    });
  };

  const handleDragEnd = (newItems: { [key: string]: ProjectCard }, newColumns: { [key: string]: GenericColumn }) => {
    setProjectCards(newItems);
    setProjectColumns(newColumns);
  };

  const calculateProgress = (checklist: ChecklistItem[]): number => {
    if (checklist.length === 0) return 0;
    const completedItems = checklist.filter((item) => item.completed).length;
    return Math.round((completedItems / checklist.length) * 100);
  };

  const renderProjectCard = (card: ProjectCard) => (
    <>
      <h5 className="mb-1 font-medium text-gray-800 dark:text-white/90">
        {card.customerName}
      </h5>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {card.description}
      </p>
      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
        <p>
          <span className="font-medium">Verantwortlicher:</span> {card.responsible}
        </p>
        <p>
          <span className="font-medium">Deadline:</span> {card.deadline}
        </p>
        <p>
          <span className="font-medium">Fortschritt:</span> {calculateProgress(card.checklist)}%
        </p>
        <div className="mt-1 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${calculateProgress(card.checklist)}%` }}
          ></div>
        </div>
      </div>
      {card.checklist.length > 0 && (
        <div className="mt-2">
          <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300">Checkliste:</h6>
          {card.checklist.map((item) => (
            <div key={item.id} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
              <Checkbox
                checked={item.completed}
                onChange={() => toggleChecklistItem(card.id, item.id)}
                className="mr-1"
                id={`${card.id}-${item.id}`}
              />
              <label htmlFor={`${card.id}-${item.id}`} className={`${item.completed ? "line-through" : ""}`}>
                {item.text}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      <GenericKanban<ProjectCard>
        initialItems={projectCards}
        initialColumns={projectColumns}
        renderItem={renderProjectCard}
        onDragEndCallback={handleDragEnd}
        onEditItem={openEditCardModal}
        itemType="Projekt"
        columnType="Phase"
        onAddItem={() => setIsAddCardModalOpen(true)}
        onAddColumn={() => setIsAddColumnModalOpen(true)}
      />

      {/* Add Project Card Modal */}
      {isAddCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
              Neues Projekt erstellen
            </h4>
            <div className="mb-4">
              <label
                htmlFor="cardCustomerName"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Kundenname
              </label>
              <input
                type="text"
                id="cardCustomerName"
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={newCardCustomerName}
                onChange={(e) => setNewCardCustomerName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardDescription"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Beschreibung
              </label>
              <textarea
                id="cardDescription"
                rows={3}
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={newCardDescription}
                onChange={(e) => setNewCardDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardResponsible"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Verantwortlicher
              </label>
              <input
                type="text"
                id="cardResponsible"
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={newCardResponsible}
                onChange={(e) => setNewCardResponsible(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardDeadline"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Deadline
              </label>
              <input
                type="date"
                id="cardDeadline"
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={newCardDeadline}
                onChange={(e) => setNewCardDeadline(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardChecklistItems"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Checklist-Items (Komma-separiert)
              </label>
              <input
                type="text"
                id="cardChecklistItems"
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={newCardChecklistItems}
                onChange={(e) => setNewCardChecklistItems(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAddCardModalOpen(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleAddCard(Object.keys(projectColumns)[0])}
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
              >
                Projekt hinzufügen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Card Modal */}
      {isEditCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
              Projekt bearbeiten
            </h4>
            <div className="mb-4">
              <label
                htmlFor="editCardCustomerName"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Kundenname
              </label>
              <input
                type="text"
                id="editCardCustomerName"
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={editingCardCustomerName}
                onChange={(e) => setEditingCardCustomerName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editCardDescription"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Beschreibung
              </label>
              <textarea
                id="editCardDescription"
                rows={3}
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={editingCardDescription}
                onChange={(e) => setEditingCardDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="editCardResponsible"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Verantwortlicher
              </label>
              <input
                type="text"
                id="editCardResponsible"
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={editingCardResponsible}
                onChange={(e) => setEditingCardResponsible(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editCardDeadline"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Deadline
              </label>
              <input
                type="date"
                id="editCardDeadline"
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={editingCardDeadline}
                onChange={(e) => setEditingCardDeadline(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editCardChecklistItems"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Checklist-Items (Komma-separiert)
              </label>
              <input
                type="text"
                id="editCardChecklistItems"
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={editingCardChecklistItems}
                onChange={(e) => setEditingCardChecklistItems(e.target.value)}
              />
            </div>
            {editingCardId && projectCards[editingCardId] && (
              <div className="mb-4">
                <h5 className="mb-2 text-base font-medium text-gray-800 dark:text-white/90">Checkliste</h5>
                {projectCards[editingCardId].checklist.map((item) => (
                  <div key={item.id} className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <Checkbox
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(editingCardId, item.id)}
                      className="mr-2"
                      id={`${editingCardId}-${item.id}`}
                    />
                    <label htmlFor={`${editingCardId}-${item.id}`} className={`cursor-pointer ${item.completed ? "line-through" : ""}`}>
                      {item.text}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditCardModalOpen(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Abbrechen
              </button>
              <button
                onClick={handleEditCard}
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
              >
                Änderungen speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Column Modal */}
      {isAddColumnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
              Neue Phase erstellen
            </h4>
            <div className="mb-4">
              <label
                htmlFor="newColumnTitle"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phasen Titel
              </label>
              <input
                type="text"
                id="newColumnTitle"
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAddColumnModalOpen(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Abbrechen
              </button>
              <button
                onClick={handleAddColumn}
                className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Phase hinzufügen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
