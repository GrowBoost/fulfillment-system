"use client";

import Card from "@/components/common/Card";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Checkbox from "@/components/form/input/Checkbox";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ProjectCard {
  id: string;
  customerName: string;
  description: string;
  checklist: ChecklistItem[];
}

interface ProjectColumn {
  id: string;
  title: string;
  projectCardIds: string[];
}

const initialProjectCards: { [key: string]: ProjectCard } = {
  "project-1": {
    id: "project-1",
    customerName: "Kunde A",
    description: "Website Relaunch für Kunde A",
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
    checklist: [
      { id: "check-3-1", text: "Konzeptphase", completed: false },
      { id: "check-3-2", text: "UI/UX Design", completed: false },
    ],
  },
};

const initialProjectColumns: { [key: string]: ProjectColumn } = {
  "column-1": {
    id: "column-1",
    title: "Gestartet",
    projectCardIds: ["project-1", "project-3"],
  },
  "column-2": {
    id: "column-2",
    title: "In Arbeit",
    projectCardIds: ["project-2"],
  },
  "column-3": {
    id: "column-3",
    title: "Kunde liefert",
    projectCardIds: [],
  },
  "column-4": {
    id: "column-4",
    title: "Review",
    projectCardIds: [],
  },
  "column-5": {
    id: "column-5",
    title: "Ausgeliefert",
    projectCardIds: [],
  },
};

export default function ProjectKanban() {
  const [projectCards, setProjectCards] = useState(initialProjectCards);
  const [projectColumns, setProjectColumns] = useState(initialProjectColumns);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [newCardCustomerName, setNewCardCustomerName] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardChecklistItems, setNewCardChecklistItems] = useState(""); // Comma separated
  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingCardCustomerName, setEditingCardCustomerName] = useState("");
  const [editingCardDescription, setEditingCardDescription] = useState("");
  const [editingCardChecklistItems, setEditingCardChecklistItems] = useState("");
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = projectColumns[source.droppableId];
    const finish = projectColumns[destination.droppableId];

    // Moving within the same column
    if (start === finish) {
      const newProjectCardIds = Array.from(start.projectCardIds);
      newProjectCardIds.splice(source.index, 1);
      newProjectCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        projectCardIds: newProjectCardIds,
      };

      setProjectColumns({
        ...projectColumns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    // Moving from one column to another
    const startProjectCardIds = Array.from(start.projectCardIds);
    startProjectCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      projectCardIds: startProjectCardIds,
    };

    const finishProjectCardIds = Array.from(finish.projectCardIds);
    finishProjectCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      projectCardIds: finishProjectCardIds,
    };

    setProjectColumns({
      ...projectColumns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  const handleAddCard = () => {
    if (newCardCustomerName.trim() === "") return;

    const newCardId = `project-${Object.keys(projectCards).length + 1}`;
    const newChecklist: ChecklistItem[] = newCardChecklistItems
      .split(",")
      .filter((item) => item.trim() !== "")
      .map((item, index) => ({ id: `${newCardId}-check-${index + 1}`, text: item.trim(), completed: false }));

    const newCard: ProjectCard = {
      id: newCardId,
      customerName: newCardCustomerName,
      description: newCardDescription,
      checklist: newChecklist,
    };

    setProjectCards((prevCards) => ({
      ...prevCards,
      [newCardId]: newCard,
    }));

    setProjectColumns((prevColumns) => {
      const gestartetColumn = prevColumns["column-1"]; // Assuming "Gestartet" is the first column
      const updatedGestartetCardIds = [...gestartetColumn.projectCardIds, newCardId];
      return {
        ...prevColumns,
        "column-1": {
          ...gestartetColumn,
          projectCardIds: updatedGestartetCardIds,
        },
      };
    });

    setNewCardCustomerName("");
    setNewCardDescription("");
    setNewCardChecklistItems("");
    setIsAddCardModalOpen(false);
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === "") return;

    const newColumnId = `column-${Object.keys(projectColumns).length + 1}`;
    const newColumn: ProjectColumn = {
      id: newColumnId,
      title: newColumnTitle,
      projectCardIds: [],
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
          checklist: updatedChecklist,
        },
      }));
      setIsEditCardModalOpen(false);
      setEditingCardId(null);
      setEditingCardCustomerName("");
      setEditingCardDescription("");
      setEditingCardChecklistItems("");
    }
  };

  const openEditCardModal = (card: ProjectCard) => {
    setEditingCardId(card.id);
    setEditingCardCustomerName(card.customerName);
    setEditingCardDescription(card.description);
    setEditingCardChecklistItems(card.checklist.map((item) => item.text).join(", "));
    setIsEditCardModalOpen(true);
  };

  const toggleChecklistItem = (cardId: string, itemId: string) => {
    setProjectCards((prevCards) => {
      const card = prevCards[cardId];
      const updatedChecklist = card.checklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      return {
        ...prevCards,
        [cardId]: {
          ...card,
          checklist: updatedChecklist,
        },
      };
    });
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-6 flex items-center justify-end gap-3">
          <button
            onClick={() => setIsAddCardModalOpen(true)}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Neues Projekt
          </button>
          <button
            onClick={() => setIsAddColumnModalOpen(true)}
            className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Neue Phase
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div
            className="flex gap-4 overflow-x-auto pb-4 no-scrollbar"
            onMouseDown={(e) => {
              setIsDragging(true);
              setStartX(e.pageX - e.currentTarget.offsetLeft);
              setScrollLeft(e.currentTarget.scrollLeft);
            }}
            onMouseLeave={() => setIsDragging(false)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={(e) => {
              if (!isDragging) return;
              e.preventDefault();
              const x = e.pageX - e.currentTarget.offsetLeft;
              const walk = (x - startX) * 2;
              e.currentTarget.scrollLeft = scrollLeft - walk;
            }}
          >
            {Object.values(projectColumns).map((column) => (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-72 flex-shrink-0 rounded-2xl bg-gray-100 p-4 dark:bg-gray-700 min-h-[150px] flex flex-col"
                  >
                    <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                      {column.title}
                    </h4>
                    {column.projectCardIds.map((cardId, index) => {
                      const card = projectCards[cardId];
                      return (
                        <Draggable
                          draggableId={card.id}
                          index={index}
                          key={card.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 w-full"
                            >
                              <Card className="p-4 cursor-pointer" onClick={() => openEditCardModal(card)}>
                                <h5 className="mb-1 font-medium text-gray-800 dark:text-white/90">
                                  {card.customerName}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {card.description}
                                </p>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

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
                onClick={handleAddCard}
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
    </div>
  );
}
