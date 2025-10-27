"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Card from "@/components/common/Card"; // Assuming Card component is available
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

// Metadata is for server components, so it should not be here with "use client"
// export const metadata: Metadata = {
//   title: "Aufgaben | GrowBoost",
//   description: "Dies ist die Aufgaben-Seite für Geschäftsführung",
// };

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

const initialTasks: { [key: string]: Task } = {
  "task-1": { id: "task-1", title: "Website Redesign", description: "Redesign the company website for a modern look." },
  "task-2": { id: "task-2", title: "Database Migration", description: "Migrate old database to a new cloud solution." },
  "task-3": { id: "task-3", title: "API Development", description: "Develop new RESTful APIs for mobile application." },
  "task-4": { id: "task-4", title: "Bug Fixing", description: "Fix critical bugs reported by users." },
};

const initialColumns: { [key: string]: Column } = {
  "column-1": {
    id: "column-1",
    title: "To Do",
    taskIds: ["task-1", "task-2"],
  },
  "column-2": {
    id: "column-2",
    title: "In Progress",
    taskIds: ["task-3"],
  },
  "column-3": {
    id: "column-3",
    title: "Review",
    taskIds: [],
  },
  "column-4": {
    id: "column-4",
    title: "Testing",
    taskIds: [],
  },
  "column-5": {
    id: "column-5",
    title: "Done",
    taskIds: ["task-4"],
  },
};

export default function AufgabenPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [editingTaskDescription, setEditingTaskDescription] = useState("");
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

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // Moving within the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    // Moving from one column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTaskId = `task-${Object.keys(tasks).length + 1}`;
    const newTask: Task = {
      id: newTaskId,
      title: newTaskTitle,
      description: newTaskDescription,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      [newTaskId]: newTask,
    }));

    setColumns((prevColumns) => {
      const todoColumn = prevColumns["column-1"]; // Assuming "To Do" is the first column
      const updatedTodoTaskIds = [...todoColumn.taskIds, newTaskId];
      return {
        ...prevColumns,
        "column-1": {
          ...todoColumn,
          taskIds: updatedTodoTaskIds,
        },
      };
    });

    setNewTaskTitle("");
    setNewTaskDescription("");
    setIsModalOpen(false);
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === "") return;

    const newColumnId = `column-${Object.keys(columns).length + 1}`;
    const newColumn: Column = {
      id: newColumnId,
      title: newColumnTitle,
      taskIds: [],
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
        },
      }));
      setIsEditModalOpen(false);
      setEditingTaskId(null);
      setEditingTaskTitle("");
      setEditingTaskDescription("");
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
    setEditingTaskDescription(task.description);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Aufgaben" />
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[1200px]"> {/* Re-added max-w and mx-auto for page width control */}
          <div className="mb-6 flex items-center justify-end gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
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
              Neue Aufgabe
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
              Neue Kategorie
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
                const walk = (x - startX) * 2; // Adjust scroll speed
                e.currentTarget.scrollLeft = scrollLeft - walk;
              }}
            >
              {Object.values(columns).map((column) => (
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-72 flex-shrink-0 rounded-2xl bg-gray-100 p-4 dark:bg-gray-700 min-h-[150px] flex flex-col" // Re-added flex flex-col
                  >
                    <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                      {column.title}
                    </h4>
                    {column.taskIds.map((taskId, index) => {
                      const task = tasks[taskId];
                      return (
                        <Draggable
                          draggableId={task.id}
                          index={index}
                          key={task.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 w-full"
                            >
                              <Card className="p-4 cursor-pointer" onClick={() => openEditModal(task)}>
                                <h5 className="mb-1 font-medium text-gray-800 dark:text-white/90">
                                  {task.title}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {task.description}
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

        {/* Add Task Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
                Neue Aufgabe erstellen
              </h4>
              <div className="mb-4">
                <label
                  htmlFor="taskTitle"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Titel
                </label>
                <input
                  type="text"
                  id="taskTitle"
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="taskDescription"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Beschreibung
                </label>
                <textarea
                  id="taskDescription"
                  rows={3}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleAddTask}
                  className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                >
                  Aufgabe hinzufügen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Task Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
                Aufgabe bearbeiten
              </h4>
              <div className="mb-4">
                <label
                  htmlFor="editTaskTitle"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Titel
                </label>
                <input
                  type="text"
                  id="editTaskTitle"
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={editingTaskTitle}
                  onChange={(e) => setEditingTaskTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editTaskDescription"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Beschreibung
                </label>
                <textarea
                  id="editTaskDescription"
                  rows={3}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={editingTaskDescription}
                  onChange={(e) => setEditingTaskDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
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
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Kategorie Titel
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
                  Kategorie hinzufügen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
