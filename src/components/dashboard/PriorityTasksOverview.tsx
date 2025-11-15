"use client";

import React, { useState } from "react";
import Card from "@/components/common/Card";

interface Task {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  priority: "low" | "medium" | "high";
}

// Dummy Kanban-like data for tasks
const kanbanTasks: { [key: string]: Task } = {
  "task-1": { id: "task-1", title: "Website-Neugestaltung", assignee: "John Doe", deadline: "2025-12-31", priority: "high" },
  "task-2": { id: "task-2", title: "Datenbankoptimierung", assignee: "Jane Smith", deadline: "2025-11-15", priority: "medium" },
  "task-3": { id: "task-3", title: "API-Entwicklung", assignee: "Peter Jones", deadline: "2026-01-31", priority: "high" },
  "task-4": { id: "task-4", title: "Fehlerbehebung", assignee: "Alice Brown", deadline: "2025-10-30", priority: "low" },
};


export const PriorityTasksOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Filter tasks to get high priority ones from the kanbanTasks
  const highPriorityTasks = Object.values(kanbanTasks).filter(
    (task) => task.priority === "high"
  );

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <Card className="p-5 md:p-6 h-full">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Übersicht der Prioritätsaufgaben
          </h3>
        </div>
      </div>
      {highPriorityTasks.length > 0 ? (
        <div className="space-y-3">
          {highPriorityTasks.map((task) => (
            <Card
              key={task.id}
              className="p-4 cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <h5 className="font-medium text-gray-800 dark:text-white/90">
                {task.title}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Verantwortlicher: {task.assignee}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Deadline: {task.deadline}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Keine Aufgaben mit hoher Priorität gefunden.
        </p>
      )}

      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Aufgabendetails
            </h3>
            <p className="text-gray-800 dark:text-white/90">
              <strong>Titel:</strong> {selectedTask.title}
            </p>
            <p className="text-gray-800 dark:text-white/90">
              <strong>Verantwortlicher:</strong> {selectedTask.assignee}
            </p>
            <p className="text-gray-800 dark:text-white/90">
              <strong>Frist:</strong> {selectedTask.deadline}
            </p>
            <p className="text-gray-800 dark:text-white/90">
              <strong>Priorität:</strong> {selectedTask.priority}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
