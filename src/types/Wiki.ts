export type BlockType = 'text' | 'heading1' | 'heading2' | 'heading3' | 'image' | 'link' | 'document';

export interface TextBlock {
  id: string;
  type: 'text';
  content: string;
}

export interface Heading1Block {
  id: string;
  type: 'heading1';
  content: string;
}

export interface Heading2Block {
  id: string;
  type: 'heading2';
  content: string;
}

export interface Heading3Block {
  id: string;
  type: 'heading3';
  content: string;
}

export interface ImageBlock {
  id: string;
  type: 'image';
  url: string;
  alt: string;
}

export interface LinkBlock {
  id: string;
  type: 'link';
  url: string;
  text: string;
}

export interface DocumentBlock {
  id: string;
  type: 'document';
  url: string;
  name: string;
}

export type WikiBlock = TextBlock | Heading1Block | Heading2Block | Heading3Block | ImageBlock | LinkBlock | DocumentBlock;

export interface WikiFile {
  id: string;
  name: string;
  blocks: WikiBlock[];
  children?: WikiFile[]; // Optional array of nested WikiFiles
}
