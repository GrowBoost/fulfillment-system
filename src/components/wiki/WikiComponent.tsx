"use client";

import React, { useState } from 'react';

interface WikiFile {
  id: string;
  name: string;
  content: string;
}

const initialWikiFiles: WikiFile[] = [
  { id: 'file1', name: 'Einführung', content: 'Dies ist die Einführungsseite des Wikis.' },
  { id: 'file2', name: 'Regeln & Richtlinien', content: 'Hier finden Sie die Regeln und Richtlinien.' },
  { id: 'file3', name: 'Häufige Fragen', content: 'Antworten auf häufig gestellte Fragen.' },
];

const WikiComponent: React.FC = () => {
  const [wikiFiles, setWikiFiles] = useState<WikiFile[]>(initialWikiFiles);
  const [activeFileId, setActiveFileId] = useState<string | null>(
    initialWikiFiles.length > 0 ? initialWikiFiles[0].id : null
  );
  const [editingContent, setEditingContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    if (activeFileId) {
      const activeFile = wikiFiles.find(file => file.id === activeFileId);
      setEditingContent(activeFile ? activeFile.content : '');
    } else {
      setEditingContent('');
    }
  }, [activeFileId, wikiFiles]);

  const handleSaveContent = () => {
    if (activeFileId) {
      setWikiFiles(prevFiles =>
        prevFiles.map(file =>
          file.id === activeFileId ? { ...file, content: editingContent } : file
        )
      );
      setIsEditing(false);
    }
  };

  const handleAddFile = () => {
    const newFileId = `file${wikiFiles.length + 1}`;
    const newFileName = `Neue Datei ${wikiFiles.length + 1}`;
    const newFile: WikiFile = { id: newFileId, name: newFileName, content: 'Neuer Inhalt hier.' };
    setWikiFiles(prevFiles => [...prevFiles, newFile]);
    setActiveFileId(newFileId);
    setIsEditing(true);
  };

  const handleDeleteFile = (id: string) => {
    setWikiFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(file => file.id !== id);
      if (activeFileId === id) {
        setActiveFileId(updatedFiles.length > 0 ? updatedFiles[0].id : null);
      }
      return updatedFiles;
    });
  };

  const activeFile = wikiFiles.find(file => file.id === activeFileId);

  return (
    <div className="flex h-full">
      {/* Left Sidebar for Wiki Files */}
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={handleAddFile}
            className="mt-2 w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
          >
            Neue Datei
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {wikiFiles.map((file) => (
            <div
              key={file.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center ${
                activeFileId === file.id ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
              onClick={() => setActiveFileId(file.id)}
            >
              <h4 className="font-medium text-gray-900 dark:text-white">{file.name}</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent selecting the file when deleting
                  handleDeleteFile(file.id);
                }}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm"
              >
                Löschen
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {activeFile ? activeFile.name : 'Wählen Sie eine Datei aus'}
          </h3>
          {activeFile && (
            <div className="flex space-x-2">
              {isEditing ? (
                <button
                  onClick={handleSaveContent}
                  className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
                >
                  Speichern
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg text-sm dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  Bearbeiten
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {activeFile ? (
            isEditing ? (
              <textarea
                className="w-full h-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
            ) : (
              <div className="prose dark:prose-invert">
                <p>{activeFile.content}</p>
              </div>
            )
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Wählen Sie eine Datei aus oder erstellen Sie eine neue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WikiComponent;
