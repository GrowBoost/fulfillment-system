import React from "react";
import Card from "@/components/common/Card";

interface Task {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  priority: "low" | "medium" | "high";
}

const highPriorityTasks: Task[] = [
  { id: "task-1", title: "Website Redesign", assignee: "John Doe", deadline: "2025-12-31", priority: "high" },
  { id: "task-3", title: "API Development", assignee: "Peter Jones", deadline: "2026-01-31", priority: "high" },
];

export const PriorityTasksOverview = () => {
  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Priority Tasks Overview
          </h3>
        </div>
      </div>
      {highPriorityTasks.length > 0 ? (
        <ul className="space-y-3">
          {highPriorityTasks.map((task) => (
            <li key={task.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0">
              <h5 className="font-medium text-gray-800 dark:text-white/90">
                {task.title}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Verantwortlicher: {task.assignee}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Deadline: {task.deadline}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No high priority tasks found.
        </p>
      )}
    </Card>
  );
};
