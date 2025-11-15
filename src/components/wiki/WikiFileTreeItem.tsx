import React, { useState } from 'react';
import { WikiFile } from '@/types/Wiki';

interface WikiFileTreeItemProps {
  file: WikiFile;
  level: number;
  activeFileId: string | null;
  setActiveFileId: (id: string) => void;
  onAddSubFile: (parentId: string) => void;
  onDeleteFile: (id: string) => void;
}

const WikiFileTreeItem: React.FC<WikiFileTreeItemProps> = ({
  file,
  level,
  activeFileId,
  setActiveFileId,
  onAddSubFile,
  onDeleteFile,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const paddingLeft = level * 20; // Adjust as needed for indentation

  return (
    <div>
      <div
        className={`p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center ${
          activeFileId === file.id ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`}
        style={{ paddingLeft: `${paddingLeft + 16}px` }} // Add base padding for content
        onClick={() => setActiveFileId(file.id)}
      >
        <div className="flex items-center flex-grow">
          {file.children && file.children.length > 0 && (
            <span
              className="mr-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          <h4 className="font-medium text-gray-900 dark:text-white">{file.name}</h4>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddSubFile(file.id);
            }}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            title="Add Subpage"
          >
            +
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteFile(file.id);
            }}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm"
            title="Delete Page"
          >
            Löschen
          </button>
        </div>
      </div>
      {isExpanded && file.children && file.children.map((childFile) => (
        <WikiFileTreeItem
          key={childFile.id}
          file={childFile}
          level={level + 1}
          activeFileId={activeFileId}
          setActiveFileId={setActiveFileId}
          onAddSubFile={onAddSubFile}
          onDeleteFile={onDeleteFile}
        />
      ))}
    </div>
  );
};

export default WikiFileTreeItem;
