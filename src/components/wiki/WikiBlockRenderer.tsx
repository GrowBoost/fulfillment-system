import React, { useState, useRef } from 'react';
import { WikiBlock, TextBlock, Heading1Block, Heading2Block, Heading3Block, ImageBlock, LinkBlock, DocumentBlock, BlockType } from '@/types/Wiki';

interface WikiBlockRendererProps {
  block: WikiBlock;
  index: number;
  onUpdate: (updatedBlock: WikiBlock) => void;
  onDelete: () => void;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  isEditing: boolean;
}

const WikiBlockRenderer: React.FC<WikiBlockRendererProps> = ({ block, index, onUpdate, onDelete, moveBlock, isEditing }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('blockIndex', index.toString());
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    const dragIndex = parseInt(e.dataTransfer.getData('blockIndex'), 10);
    const hoverIndex = index;

    if (dragIndex === hoverIndex) {
      return;
    }

    moveBlock(dragIndex, hoverIndex);
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };
  const [editText, setEditText] = useState(
    (block.type === 'text' || block.type === 'heading1' || block.type === 'heading2' || block.type === 'heading3')
      ? (block as TextBlock | Heading1Block | Heading2Block | Heading3Block).content
      : ''
  );
  const [editUrl, setEditUrl] = useState(
    (block.type === 'image' || block.type === 'link' || block.type === 'document')
      ? (block as ImageBlock | LinkBlock | DocumentBlock).url
      : ''
  );
  const [editAlt, setEditAlt] = useState(block.type === 'image' ? (block as ImageBlock).alt : '');
  const [editLinkText, setEditLinkText] = useState(block.type === 'link' ? (block as LinkBlock).text : '');
  const [editDocName, setEditDocName] = useState(block.type === 'document' ? (block as DocumentBlock).name : '');
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEditText(e.target.value);
    onUpdate({ ...block, content: e.target.value } as TextBlock | Heading1Block | Heading2Block | Heading3Block);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUrl(e.target.value);
    onUpdate({ ...block, url: e.target.value } as ImageBlock);
  };

  const handleImageAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditAlt(e.target.value);
    onUpdate({ ...block, alt: e.target.value } as ImageBlock);
  };

  const handleLinkUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUrl(e.target.value);
    onUpdate({ ...block, url: e.target.value } as LinkBlock);
  };

  const handleLinkTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditLinkText(e.target.value);
    onUpdate({ ...block, text: e.target.value } as LinkBlock);
  };

  const handleDocumentUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUrl(e.target.value);
    onUpdate({ ...block, url: e.target.value } as DocumentBlock);
  };

  const handleDocumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDocName(e.target.value);
    onUpdate({ ...block, name: e.target.value } as DocumentBlock);
  };

  const handleTransformBlock = (newType: BlockType) => {
    let newBlock: WikiBlock;
    const currentContent = (block as TextBlock | Heading1Block | Heading2Block | Heading3Block).content || '';

    switch (newType) {
      case 'text':
        newBlock = { id: block.id, type: 'text', content: currentContent };
        break;
      case 'heading1':
        newBlock = { id: block.id, type: 'heading1', content: currentContent };
        break;
      case 'heading2':
        newBlock = { id: block.id, type: 'heading2', content: currentContent };
        break;
      case 'heading3':
        newBlock = { id: block.id, type: 'heading3', content: currentContent };
        break;
      case 'image':
        newBlock = { id: block.id, type: 'image', url: '', alt: '' };
        break;
      case 'link':
        newBlock = { id: block.id, type: 'link', url: '', text: '' };
        break;
      case 'document':
        newBlock = { id: block.id, type: 'document', url: '', name: '' };
        break;
      default:
        return;
    }
    onUpdate(newBlock);
    setShowTypeSelector(false);
  };

  const renderBlockContent = () => {
    const dragHandle = isEditing ? (
      <span className="cursor-grab mr-2 text-gray-400 opacity-0 group-hover:opacity-100" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        &#x22EE; {/* Vertical ellipsis for drag handle */}
      </span>
    ) : null;

    const deleteButton = isEditing ? (
      <button onClick={onDelete} className="ml-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100">
        X
      </button>
    ) : null;

    const typeSelector = isEditing && (block.type === 'text' || block.type.startsWith('heading')) ? (
      <div className="relative">
        <button
          onClick={() => setShowTypeSelector(!showTypeSelector)}
          className="ml-2 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100"
        >
          Change Type
        </button>
        {showTypeSelector && (
          <div className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => handleTransformBlock('text')}>Text</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => handleTransformBlock('heading1')}>Heading 1</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => handleTransformBlock('heading2')}>Heading 2</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => handleTransformBlock('heading3')}>Heading 3</button>
          </div>
        )}
      </div>
    ) : null;

    switch (block.type) {
      case 'text':
      case 'heading1':
      case 'heading2':
      case 'heading3':
        const Tag = block.type === 'heading1' ? 'h1' : block.type === 'heading2' ? 'h2' : block.type === 'heading3' ? 'h3' : 'p';
        return (
          <div className="flex items-center group w-full">
            {dragHandle}
            {isEditing ? (
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={editText}
                onChange={handleTextChange}
              />
            ) : (
              <Tag className="flex-grow">{(block as TextBlock | Heading1Block | Heading2Block | Heading3Block).content}</Tag>
            )}
            {typeSelector}
            {deleteButton}
          </div>
        );
      case 'image':
        const imageBlock = block as ImageBlock;
        return (
          <div className="flex items-center group w-full">
            {dragHandle}
            {isEditing ? (
              <div className="flex flex-col space-y-2 flex-grow">
                <input
                  type="text"
                  placeholder="Image URL"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={editUrl}
                  onChange={handleImageUrlChange}
                />
                <input
                  type="text"
                  placeholder="Alt text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={editAlt}
                  onChange={handleImageAltChange}
                />
              </div>
            ) : (
              <img src={imageBlock.url} alt={imageBlock.alt} className="max-w-full h-auto flex-grow" />
            )}
            {deleteButton}
          </div>
        );
      case 'link':
        const linkBlock = block as LinkBlock;
        return (
          <div className="flex items-center group w-full">
            {dragHandle}
            {isEditing ? (
              <div className="flex flex-col space-y-2 flex-grow">
                <input
                  type="text"
                  placeholder="Link URL"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={editUrl}
                  onChange={handleLinkUrlChange}
                />
                <input
                  type="text"
                  placeholder="Link Text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={editLinkText}
                  onChange={handleLinkTextChange}
                />
              </div>
            ) : (
              <a href={linkBlock.url} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline flex-grow">
                {linkBlock.text}
              </a>
            )}
            {deleteButton}
          </div>
        );
      case 'document':
        const documentBlock = block as DocumentBlock;
        return (
          <div className="flex items-center group w-full">
            {dragHandle}
            {isEditing ? (
              <div className="flex flex-col space-y-2 flex-grow">
                <input
                  type="text"
                  placeholder="Document URL"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={editUrl}
                  onChange={handleDocumentUrlChange}
                />
                <input
                  type="text"
                  placeholder="Document Name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={editDocName}
                  onChange={handleDocumentNameChange}
                />
              </div>
            ) : (
              <a href={documentBlock.url} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline flex items-center flex-grow">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0118 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                {documentBlock.name}
              </a>
            )}
            {deleteButton}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={`wiki-block ${isDragging ? 'opacity-50' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {renderBlockContent()}
    </div>
  );
};

export default WikiBlockRenderer;
