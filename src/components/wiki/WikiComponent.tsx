"use client";

import React, { useState, useCallback } from 'react';
import { WikiFile, WikiBlock, BlockType } from '@/types/Wiki';
import WikiBlockRenderer from './WikiBlockRenderer';
import WikiFileTreeItem from './WikiFileTreeItem';

const initialWikiFiles: WikiFile[] = [
  {
    id: crypto.randomUUID(),
    name: 'Einführung',
    blocks: [
      { id: crypto.randomUUID(), type: 'heading1', content: 'Willkommen im Wiki!' },
      { id: crypto.randomUUID(), type: 'text', content: 'Dies ist die Einführungsseite des Wikis. Hier können Sie wichtige Informationen und Ressourcen finden.' },
      { id: crypto.randomUUID(), type: 'image', url: 'https://via.placeholder.com/400x200?text=Wiki+Image', alt: 'Placeholder Wiki Image' },
      { id: crypto.randomUUID(), type: 'link', url: 'https://www.google.com', text: 'Besuchen Sie Google' },
      { id: crypto.randomUUID(), type: 'document', url: 'https://www.africau.edu/images/default/sample.pdf', name: 'Beispiel-PDF' },
    ],
    children: [
      {
        id: crypto.randomUUID(),
        name: 'Unterseite 1',
        blocks: [{ id: crypto.randomUUID(), type: 'text', content: 'Inhalt der Unterseite 1.' }],
      },
      {
        id: crypto.randomUUID(),
        name: 'Unterseite 2',
        blocks: [{ id: crypto.randomUUID(), type: 'text', content: 'Inhalt der Unterseite 2.' }],
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Regeln & Richtlinien',
    blocks: [
      { id: crypto.randomUUID(), type: 'heading2', content: 'Unsere Regeln' },
      { id: crypto.randomUUID(), type: 'text', content: 'Hier finden Sie die Regeln und Richtlinien für die Nutzung des Systems.' },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Häufige Fragen',
    blocks: [
      { id: crypto.randomUUID(), type: 'heading3', content: 'FAQ' },
      { id: crypto.randomUUID(), type: 'text', content: 'Antworten auf häufig gestellte Fragen.' },
    ],
  },
];

const WikiComponent: React.FC = () => {
  const [wikiFiles, setWikiFiles] = useState<WikiFile[]>(initialWikiFiles);
  const [activeFileId, setActiveFileId] = useState<string | null>(
    initialWikiFiles.length > 0 ? initialWikiFiles[0].id : null
  );

  const moveBlock = useCallback((dragIndex: number, hoverIndex: number) => {
    setWikiFiles(prevFiles =>
      prevFiles.map(file => {
        if (file.id === activeFileId) {
          const newBlocks = [...file.blocks];
          const [draggedBlock] = newBlocks.splice(dragIndex, 1);
          newBlocks.splice(hoverIndex, 0, draggedBlock);
          return { ...file, blocks: newBlocks };
        }
        return file;
      })
    );
  }, [activeFileId]);

  const handleUpdateBlock = (fileId: string, updatedBlock: WikiBlock) => {
    setWikiFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId
          ? {
              ...file,
              blocks: file.blocks.map(block =>
                block.id === updatedBlock.id ? updatedBlock : block
              ),
            }
          : file
      )
    );
  };

  // Helper function to recursively find a file
  const findFileRecursive = (files: WikiFile[], fileId: string): WikiFile | undefined => {
    for (const file of files) {
      if (file.id === fileId) {
        return file;
      }
      if (file.children) {
        const found = findFileRecursive(file.children, fileId);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  };

  const handleAddFile = () => {
    const newFileId = crypto.randomUUID();
    const newFileName = `Neue Datei ${wikiFiles.length + 1}`;
    const newFile: WikiFile = {
      id: newFileId,
      name: newFileName,
      blocks: [{ id: crypto.randomUUID(), type: 'text', content: 'Neuer Inhalt hier.' }],
    };
    setWikiFiles(prevFiles => [...prevFiles, newFile]);
    setActiveFileId(newFileId);
  };

  const handleAddSubFile = (parentId: string) => {
    setWikiFiles(prevFiles => {
      const addSubFileRecursive = (files: WikiFile[]): WikiFile[] => {
        return files.map(file => {
          if (file.id === parentId) {
            const newSubFileId = crypto.randomUUID();
            const newSubFile: WikiFile = {
              id: newSubFileId,
              name: `Neue Unterseite ${file.children ? file.children.length + 1 : 1}`,
              blocks: [{ id: crypto.randomUUID(), type: 'text', content: 'Neuer Inhalt hier.' }],
            };
            return {
              ...file,
              children: [...(file.children || []), newSubFile],
            };
          }
          if (file.children) {
            return { ...file, children: addSubFileRecursive(file.children) };
          }
          return file;
        });
      };
      return addSubFileRecursive(prevFiles);
    });
  };

  const handleDeleteFile = (id: string) => {
    setWikiFiles(prevFiles => {
      const deleteFileRecursive = (files: WikiFile[]): WikiFile[] => {
        return files.filter(file => {
          if (file.id === id) {
            return false;
          }
          if (file.children) {
            file.children = deleteFileRecursive(file.children);
          }
          return true;
        });
      };
      const updatedFiles = deleteFileRecursive(prevFiles);
      if (activeFileId === id) {
        setActiveFileId(updatedFiles.length > 0 ? updatedFiles[0].id : null);
      }
      return updatedFiles;
    });
  };

  const handleAddBlock = (fileId: string, type: BlockType) => {
    setWikiFiles(prevFiles =>
      prevFiles.map(file => {
        if (file.id === fileId) {
          const newBlockId = crypto.randomUUID();
          let newBlock: WikiBlock;
          switch (type) {
            case 'text':
              newBlock = { id: newBlockId, type: 'text', content: '' };
              break;
            case 'heading1':
              newBlock = { id: newBlockId, type: 'heading1', content: '' };
              break;
            case 'heading2':
              newBlock = { id: newBlockId, type: 'heading2', content: '' };
              break;
            case 'heading3':
              newBlock = { id: newBlockId, type: 'heading3', content: '' };
              break;
            case 'image':
              newBlock = { id: newBlockId, type: 'image', url: '', alt: '' };
              break;
            case 'link':
              newBlock = { id: newBlockId, type: 'link', url: '', text: '' };
              break;
            case 'document':
              newBlock = { id: newBlockId, type: 'document', url: '', name: '' };
              break;
            default:
              return file;
          }
          return { ...file, blocks: [...file.blocks, newBlock] };
        }
        return file;
      })
    );
  };

  const handleDeleteBlock = (fileId: string, blockId: string) => {
    setWikiFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId
          ? {
              ...file,
              blocks: file.blocks.filter(block => block.id !== blockId),
            }
          : file
      )
    );
  };

  const activeFile = activeFileId ? findFileRecursive(wikiFiles, activeFileId) : undefined;

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
            <WikiFileTreeItem
              key={file.id}
              file={file}
              level={0}
              activeFileId={activeFileId}
              setActiveFileId={setActiveFileId}
              onAddSubFile={handleAddSubFile}
              onDeleteFile={handleDeleteFile}
            />
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
              <button
                onClick={() => handleAddBlock(activeFile.id, 'text')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
              >
                Add Text
              </button>
              <button
                onClick={() => handleAddBlock(activeFile.id, 'image')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
              >
                Add Image
              </button>
              <button
                onClick={() => handleAddBlock(activeFile.id, 'link')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
              >
                Add Link
              </button>
              <button
                onClick={() => handleAddBlock(activeFile.id, 'document')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
              >
                Add Document
              </button>
            </div>
          )}
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {activeFile ? (
            <div className="prose dark:prose-invert">
              {activeFile.blocks.map((block, index) => (
                <WikiBlockRenderer
                  key={block.id}
                  index={index}
                  block={block}
                  onUpdate={(updatedBlock) => handleUpdateBlock(activeFile.id, updatedBlock)}
                  onDelete={() => handleDeleteBlock(activeFile.id, block.id)}
                  moveBlock={moveBlock}
                  isEditing={true}
                />
              ))}
            </div>
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
