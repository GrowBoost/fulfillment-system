"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState, useRef } from "react";
import GenericKanban, { GenericColumn, GenericItem } from "@/components/kanban/GenericKanban";

interface Task extends GenericItem {
  title: string;
  description: string;
  assignee: string;
  deadline: string;
  priority: "low" | "medium" | "high";
}

const initialTasks: { [key: string]: Task } = {
  "task-1": { id: "task-1", title: "Website Redesign", description: "Redesign the company website for a modern look.", assignee: "John Doe", deadline: "2025-12-31", priority: "high" },
  "task-2": { id: "task-2", title: "Database Migration", description: "Migrate old database to a new cloud solution.", assignee: "Jane Smith", deadline: "2025-11-15", priority: "medium" },
  "task-3": { id: "task-3", title: "API Development", description: "Develop new RESTful APIs for mobile application.", assignee: "Peter Jones", deadline: "2026-01-31", priority: "high" },
  "task-4": { id: "task-4", title: "Bug Fixing", description: "Fix critical bugs reported by users.", assignee: "Alice Brown", deadline: "2025-10-28", priority: "low" },
};

const initialColumns: { [key: string]: GenericColumn } = {
  "column-1": {
    id: "column-1",
    title: "To Do",
    itemIds: ["task-1", "task-2"],
  },
  "column-2": {
    id: "column-2",
    title: "In Progress",
    itemIds: ["task-3"],
  },
  "column-3": {
    id: "column-3",
    title: "Review",
    itemIds: [],
  },
  "column-4": {
    id: "column-4",
    title: "Testing",
    itemIds: [],
  },
  "column-5": {
    id: "column-5",
    title: "Done",
    itemIds: ["task-4"],
  },
};

export default function AufgabenPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [editingTaskDescription, setEditingTaskDescription] = useState("");
  const [editingTaskAssignee, setEditingTaskAssignee] = useState("");
  const [editingTaskDeadline, setEditingTaskDeadline] = useState("");
  const [editingTaskPriority, setEditingTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const nextTaskIdRef = useRef(Object.keys(initialTasks).length + 1);
  const nextColumnIdRef = useRef(Object.keys(initialColumns).length + 1);

  const handleAddTask = (columnId: string) => {
    if (newTaskTitle.trim() === "") return;

    const newTaskId = `task-${nextTaskIdRef.current++}`;
    const newTask: Task = {
      id: newTaskId,
      title: newTaskTitle,
      description: newTaskDescription,
      assignee: newTaskAssignee,
      deadline: newTaskDeadline,
      priority: newTaskPriority,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      [newTaskId]: newTask,
    }));

    setColumns((prevColumns) => {
      const targetColumn = prevColumns[columnId];
      if (!targetColumn) return prevColumns;

      const updatedItemIds = [...targetColumn.itemIds, newTaskId];
      return {
        ...prevColumns,
        [columnId]: {
          ...targetColumn,
          itemIds: updatedItemIds,
        },
      };
    });

    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskAssignee("");
    setNewTaskDeadline("");
    setNewTaskPriority("medium");
    setIsAddTaskModalOpen(false);
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === "") return;

    const newColumnId = `column-${nextColumnIdRef.current++}`;
    const newColumn: GenericColumn = {
      id: newColumnId,
      title: newColumnTitle,
      itemIds: [],
    };

    setColumns((prevColumns) => ({
      ...prevColumns,
      [newColumnId]: newColumn,
    }));

    setNewColumnTitle("");
    setIsAddColumnModalOpen(false);
  };

  const handleEditTask = () => {
    if (editingTaskId && editingTaskTitle.trim() !== "") {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [editingTaskId]: {
          ...prevTasks[editingTaskId],
          title: editingTaskTitle,
          description: editingTaskDescription,
          assignee: editingTaskAssignee,
          deadline: editingTaskDeadline,
          priority: editingTaskPriority,
        },
      }));
      setIsEditTaskModalOpen(false);
      setEditingTaskId(null);
      setEditingTaskTitle("");
      setEditingTaskDescription("");
      setEditingTaskAssignee("");
      setEditingTaskDeadline("");
      setEditingTaskPriority("medium");
    }
  };

  const openEditTaskModal = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
    setEditingTaskDescription(task.description);
    setEditingTaskAssignee(task.assignee);
    setEditingTaskDeadline(task.deadline);
    setEditingTaskPriority(task.priority);
    setIsEditTaskModalOpen(true);
  };

  const handleDragEnd = (newItems: { [key: string]: Task }, newColumns: { [key: string]: GenericColumn }) => {
    setTasks(newItems);
    setColumns(newColumns);
  };

  const renderTaskCard = (task: Task) => (
    <>
      <h5 className="mb-1 font-medium text-gray-800 dark:text-white/90">
        {task.title}
      </h5>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {task.description}
      </p>
      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
        <p><strong>Verantwortlicher:</strong> {task.assignee}</p>
        <p><strong>Deadline:</strong> {task.deadline}</p>
        <p><strong>Priorität:</strong> {task.priority}</p>
      </div>
    </>
  );

  return (
    <div>
      <PageBreadcrumb pageTitle="Aufgaben" />
      <GenericKanban<Task>
        initialItems={tasks}
        initialColumns={columns}
        renderItem={renderTaskCard}
        onDragEndCallback={handleDragEnd}
        onEditItem={openEditTaskModal}
        itemType="Aufgabe"
        columnType="Kategorie"
        onAddItem={() => setIsAddTaskModalOpen(true)}
        onAddColumn={() => setIsAddColumnModalOpen(true)}
      />

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
              Neue Aufgabe erstellen
            </h4>
            <div className="mb-4">
              <label
                htmlFor="taskTitle"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Titel
              </label>
              <input
                type="text"
                id="taskTitle"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="taskDescription"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Beschreibung
              </label>
              <textarea
                id="taskDescription"
                rows={3}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="taskAssignee"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Verantwortlicher
              </label>
              <input
                type="text"
                id="taskAssignee"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="taskDeadline"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Deadline
              </label>
              <input
                type="date"
                id="taskDeadline"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={newTaskDeadline}
                onChange={(e) => setNewTaskDeadline(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="taskPriority"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Priorität
              </label>
              <select
                id="taskPriority"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as "low" | "medium" | "high")}
              >
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAddTaskModalOpen(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleAddTask(Object.keys(columns)[0])}
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
              >
                Aufgabe hinzufügen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {isEditTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
              Aufgabe bearbeiten
            </h4>
            <div className="mb-4">
              <label
                htmlFor="editTaskTitle"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Titel
              </label>
              <input
                type="text"
                id="editTaskTitle"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={editingTaskTitle}
                onChange={(e) => setEditingTaskTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editTaskDescription"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Beschreibung
              </label>
              <textarea
                id="editTaskDescription"
                rows={3}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={editingTaskDescription}
                onChange={(e) => setEditingTaskDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="editTaskAssignee"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Verantwortlicher
              </label>
              <input
                type="text"
                id="editTaskAssignee"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={editingTaskAssignee}
                onChange={(e) => setEditingTaskAssignee(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editTaskDeadline"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Deadline
              </label>
              <input
                type="date"
                id="editTaskDeadline"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={editingTaskDeadline}
                onChange={(e) => setEditingTaskDeadline(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editTaskPriority"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Priorität
              </label>
              <select
                id="editTaskPriority"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={editingTaskPriority}
                onChange={(e) => setEditingTaskPriority(e.target.value as "low" | "medium" | "high")}
              >
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditTaskModalOpen(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Abbrechen
              </button>
              <button
                onClick={handleEditTask}
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
              Neue Kategorie erstellen
            </h4>
            <div className="mb-4">
              <label
                htmlFor="newColumnTitle"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Kategorie Titel
              </label>
              <input
                type="text"
                id="newColumnTitle"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
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
                Kategorie hinzufügen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
