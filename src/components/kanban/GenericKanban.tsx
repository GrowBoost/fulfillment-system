"use client";

import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Card from "@/components/common/Card";

export interface GenericItem {
  id: string;
  [key: string]: unknown; // Allow any other properties
}

export interface GenericColumn {
  id: string;
  title: string;
  itemIds: string[];
  color?: string; // Added color property
}

interface GenericKanbanProps<T extends GenericItem> {
  initialItems: { [key: string]: T };
  initialColumns: { [key: string]: GenericColumn };
  renderItem: (item: T, index: number) => React.ReactNode;
  onDragEndCallback?: (
    newItems: { [key: string]: T },
    newColumns: { [key: string]: GenericColumn }
  ) => void;
  onEditItem?: (item: T) => void;
  itemType: string; // e.g., "Task", "Project"
  columnType: string; // e.g., "Category", "Phase"
  onAddItem: (columnId: string) => void;
  onAddColumn: (newColumnTitle: string) => void; // Updated signature
  onEditColumnTitle?: (columnId: string, newTitle: string) => void; // Made optional
  onEditColumn?: (columnId: string, newTitle: string, newColor: string) => void; // Updated prop for editing column details
}

export default function GenericKanban<T extends GenericItem>({
  initialItems,
  initialColumns,
  renderItem,
  onDragEndCallback,
  onEditItem,
  itemType,
  columnType,
  onAddItem,
  onAddColumn,
  onEditColumnTitle, // Destructure new prop
  onEditColumn, // Destructure new prop
}: GenericKanbanProps<T>) {
  const [items, setItems] = useState(initialItems);
  const [columns, setColumns] = useState(initialColumns);
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null); // State to manage which column title is being edited
  const [editingColumnTitle, setEditingColumnTitle] = useState<string>(""); // State for the new column title
  const [addingColumn, setAddingColumn] = useState(false); // State to manage adding a new column
  const [newColumnTitle, setNewColumnTitle] = useState(""); // State for the new column's title

  const [isColumnEditModalOpen, setIsColumnEditModalOpen] = useState(false);
  const [currentColumnToEdit, setCurrentColumnToEdit] = useState<GenericColumn | null>(null);
  const [tempColumnTitle, setTempColumnTitle] = useState("");
  const [tempColumnColor, setTempColumnColor] = useState("#6b7280"); // Default color changed to gray-500

  const PRESET_COLORS = [
    "#ef4444", // red-500
    "#f97316", // orange-500
    "#eab308", // yellow-500
    "#22c55e", // green-500
    "#0ea5e9", // sky-500
    "#6366f1", // indigo-500
    "#a855f7", // purple-500
    "#ec4899", // pink-500
    "#6b7280", // gray-500
  ];

  // Sync initial data with state if it changes from parent
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isCardDragging, setIsCardDragging] = useState(false);

  const onDragStart = () => {
    setIsCardDragging(true);
  };

  const onDragEnd = (result: DropResult) => {
    setIsCardDragging(false);
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
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        itemIds: newItemIds,
      };

      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };
      setColumns(newColumns);
      onDragEndCallback?.(items, newColumns);
      return;
    }

    // Moving from one column to another
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      itemIds: startItemIds,
    };

    const finishItemIds = Array.from(finish.itemIds);
    finishItemIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      itemIds: finishItemIds,
    };

    const newColumns = {
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };
    setColumns(newColumns);
    onDragEndCallback?.(items, newColumns);
  };

  const handleColumnTitleClick = (columnId: string, currentTitle: string) => {
    setEditingColumnId(columnId);
    setEditingColumnTitle(currentTitle);
  };

  const handleSaveColumnTitle = (columnId: string) => {
    if (editingColumnTitle.trim() === "") {
      setEditingColumnId(null);
      return;
    }
    onEditColumnTitle?.(columnId, editingColumnTitle); // Safely call the optional prop
    setEditingColumnId(null);
  };

  const handleColumnTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, columnId: string) => {
    if (e.key === "Enter") {
      handleSaveColumnTitle(columnId);
    }
    if (e.key === "Escape") {
      setEditingColumnId(null);
      setEditingColumnTitle("");
    }
  };

  const handleOpenColumnEditModal = (column: GenericColumn) => {
    setCurrentColumnToEdit(column);
    setTempColumnTitle(column.title);
    // Assuming column has a 'color' property, otherwise default
    setTempColumnColor(column.color || "#ffffff"); // Removed 'as any' cast
    setIsColumnEditModalOpen(true);
  };

  const handleSaveColumnEdit = () => {
    if (currentColumnToEdit && tempColumnTitle.trim() !== "") {
      // Call the prop to update the column in the parent
      onEditColumn?.(currentColumnToEdit.id, tempColumnTitle, tempColumnColor);

      // Update local state for immediate visual feedback
      setColumns((prevColumns) => ({
        ...prevColumns,
        [currentColumnToEdit.id]: {
          ...prevColumns[currentColumnToEdit.id], // Corrected from prevColumnToEdit
          title: tempColumnTitle,
          color: tempColumnColor, // Assuming color is part of GenericColumn
        },
      }));
    }
    setIsColumnEditModalOpen(false);
    setCurrentColumnToEdit(null);
    setTempColumnTitle("");
    setTempColumnColor("#ffffff");
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current || isCardDragging) return; // Prevent scroll if card is being dragged
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Adjust scroll speed to 1:1
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <div className="mx-auto w-full">
        <div className="mb-6 flex items-center justify-end gap-3">
          {/* Removed the global "Neue {columnType}" button */}
        </div>

        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto no-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {Object.values(columns).map((column) => (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-72 flex-shrink-0 rounded-2xl p-4 min-h-[150px] flex flex-col"
                    style={{ backgroundColor: column.color ? `${column.color}33` : '#6b728033' }} // Apply color with 20% opacity, default to gray
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4
                        className="text-lg font-semibold text-gray-800 dark:text-white/90 cursor-pointer"
                        onClick={() => handleColumnTitleClick(column.id, column.title)}
                      >
                        {editingColumnId === column.id ? (
                          <input
                            type="text"
                            value={editingColumnTitle}
                            onChange={(e) => setEditingColumnTitle(e.target.value)}
                            onBlur={() => handleSaveColumnTitle(column.id)}
                            onKeyDown={(e) => handleColumnTitleKeyDown(e, column.id)}
                            className="w-full rounded-md border border-gray-300 p-1 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            autoFocus
                          />
                        ) : (
                          column.title
                        )}
                      </h4>
                      <button
                        onClick={() => handleOpenColumnEditModal(column)} // Open internal modal
                        className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V7.5a2.25 2.25 0 012.25-2.25H9"
                            />
                        </svg>
                      </button>
                    </div>
                    {column.itemIds.map((itemId, index) => {
                      const item = items[itemId];
                      if (!item) return null; // Handle case where item might be missing

                      return (
                        <Draggable
                          draggableId={item.id}
                          index={index}
                          key={item.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 w-full"
                            >
                              <Card className="p-4 cursor-pointer" onClick={() => onEditItem?.(item)}>
                                {renderItem(item, index)}
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                    <button
                      onClick={() => onAddItem(column.id)}
                      className="mt-4 flex items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 p-2 text-gray-500 hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-400 dark:hover:border-primary dark:hover:text-primary"
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
                      Neue {itemType} hinzufügen
                    </button>
                  </div>
                )}
              </Droppable>
            ))}
            {/* New column add section */}
            <div className="w-72 flex-shrink-0 rounded-2xl bg-gray-100 p-4 dark:bg-gray-700 min-h-[150px] flex flex-col justify-center items-center">
              {addingColumn ? (
                <div className="flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onAddColumn(newColumnTitle);
                        setNewColumnTitle("");
                        setAddingColumn(false);
                      }
                      if (e.key === "Escape") {
                        setNewColumnTitle("");
                        setAddingColumn(false);
                      }
                    }}
                    placeholder={`Neue ${columnType} hinzufügen...`}
                    className="rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        onAddColumn(newColumnTitle);
                        setNewColumnTitle("");
                        setAddingColumn(false);
                      }}
                      className="rounded-md bg-green-500 px-3 py-1 text-white hover:bg-green-600 text-sm"
                    >
                      Hinzufügen
                    </button>
                    <button
                      onClick={() => {
                        setNewColumnTitle("");
                        setAddingColumn(false);
                      }}
                      className="rounded-md bg-gray-300 px-3 py-1 text-gray-800 hover:bg-gray-400 text-sm"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAddingColumn(true)}
                  className="flex items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 p-2 text-gray-500 hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-400 dark:hover:border-primary dark:hover:text-primary w-full h-full"
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
                  Neue {columnType} hinzufügen
                </button>
              )}
            </div>
          </div>
        </DragDropContext>

        {/* Internal Column Edit Modal */}
        {isColumnEditModalOpen && currentColumnToEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {columnType} bearbeiten
              </h3>
              <div className="mb-6">
                <label htmlFor="columnTitle" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  id="columnTitle"
                  value={tempColumnTitle}
                  onChange={(e) => setTempColumnTitle(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Hintergrundfarbe
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((color) => (
                    <div
                      key={color}
                      className={`h-8 w-8 cursor-pointer rounded-full border ${
                        tempColumnColor === color ? "border-primary" : "border-transparent"
                      }`}
                      style={{ backgroundColor: `${color}33` }}
                      onClick={() => setTempColumnColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsColumnEditModalOpen(false)}
                  className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSaveColumnEdit}
                  className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                >
                  Speichern
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
