import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Document, Index, DocumentStatus, IndexStatus } from '../types';

interface AppContextType {
    documents: Document[];
    indexes: Index[];
    addDocument: (file: File) => void;
    deleteDocument: (id: string) => void;
    addIndex: (name: string, selectedDocs: Document[]) => void;
    deleteIndex: (id: string) => void;
    syncIndex: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [documents, setDocuments] = useLocalStorage<Document[]>('documents', []);
    const [indexes, setIndexes] = useLocalStorage<Index[]>('indexes', []);

    const updateDocumentStatus = useCallback((id: string, status: DocumentStatus) => {
        setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, status } : doc));
    }, [setDocuments]);

    const updateIndexStatus = useCallback((id: string, status: IndexStatus) => {
        setIndexes(prev => prev.map(idx => idx.id === id ? { ...idx, status } : idx));
    }, [setIndexes]);

    const addDocument = (file: File) => {
        const newDoc: Document = {
            id: crypto.randomUUID(),
            name: file.name,
            status: DocumentStatus.Pending,
            content: `Simulated content for ${file.name}:\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam. Sorbi in justo.`
        };
        setDocuments(prev => [...prev, newDoc]);

        setTimeout(() => {
            updateDocumentStatus(newDoc.id, DocumentStatus.Processing);
            setTimeout(() => {
                updateDocumentStatus(newDoc.id, DocumentStatus.Completed);
            }, 3000);
        }, 3000);
    };

    const deleteDocument = (id: string) => {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
        // Also remove from any indexes
        setIndexes(prev => prev.map(index => ({
            ...index,
            documents: index.documents.filter(doc => doc.id !== id)
        })));
    };

    const addIndex = (name: string, selectedDocs: Document[]) => {
        const newIndex: Index = {
            id: crypto.randomUUID(),
            name,
            documents: selectedDocs,
            status: IndexStatus.Created
        };
        setIndexes(prev => [...prev, newIndex]);
    };
    
    const deleteIndex = (id: string) => {
        setIndexes(prev => prev.filter(idx => idx.id !== id));
    };

    const syncIndex = (id: string) => {
        updateIndexStatus(id, IndexStatus.Syncing);
        setTimeout(() => {
            updateIndexStatus(id, IndexStatus.Completed);
        }, 5000);
    };

    return (
        <AppContext.Provider value={{ documents, indexes, addDocument, deleteDocument, addIndex, deleteIndex, syncIndex }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};