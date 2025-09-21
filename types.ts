export enum DocumentStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Completed = 'Completed',
}

export enum IndexStatus {
  Created = 'Created',
  Syncing = 'Syncing',
  Completed = 'Completed',
}

export interface Document {
  id: string;
  name: string;
  status: DocumentStatus;
  content: string;
}

export interface Index {
  id: string;
  name: string;
  documents: Document[];
  status: IndexStatus;
}