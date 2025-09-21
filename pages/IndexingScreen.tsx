
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Document, IndexStatus, DocumentStatus } from '../types';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import Spinner from '../components/common/Spinner';
import { Plus, Trash2, CheckCircle, RefreshCw, FileText } from 'lucide-react';

const IndexingScreen: React.FC = () => {
    const { documents, indexes, addIndex, deleteIndex, syncIndex } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [indexName, setIndexName] = useState('');
    const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
    const [error, setError] = useState('');

    const completedDocuments = documents.filter(doc => doc.status === DocumentStatus.Completed);

    const handleToggleDoc = (docId: string) => {
        setSelectedDocs(prev => {
            const newSet = new Set(prev);
            if (newSet.has(docId)) {
                newSet.delete(docId);
            } else {
                newSet.add(docId);
            }
            return newSet;
        });
    };

    const handleCreateIndex = () => {
        if (!indexName.trim()) {
            setError('Index name cannot be empty.');
            return;
        }
        if (selectedDocs.size === 0) {
            setError('Please select at least one document.');
            return;
        }
        const docsToAdd = completedDocuments.filter(doc => selectedDocs.has(doc.id));
        addIndex(indexName, docsToAdd);
        setIsModalOpen(false);
        setIndexName('');
        setSelectedDocs(new Set());
        setError('');
    };

    const getStatusIndicator = (status: IndexStatus) => {
        switch (status) {
            case IndexStatus.Created:
                return <div className="flex items-center gap-2 text-gray-400"><span >Ready to Sync</span></div>;
            case IndexStatus.Syncing:
                return <div className="flex items-center gap-2 text-blue-400"><Spinner size={16} /><span>Syncing...</span></div>;
            case IndexStatus.Completed:
                return <div className="flex items-center gap-2 text-nvidia-green"><CheckCircle size={16} /><span>Completed</span></div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Indexes</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} />
                    Create Index
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {indexes.length > 0 ? indexes.map(index => (
                    <Card key={index.id} className="flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-semibold text-white">{index.name}</h2>
                                {getStatusIndicator(index.status)}
                            </div>
                            <p className="text-sm text-gray-400 mb-4">
                                {index.documents.length} document{index.documents.length !== 1 ? 's' : ''} attached.
                            </p>
                            <ul className="space-y-2 mb-4">
                                {index.documents.slice(0, 3).map(doc => (
                                    <li key={doc.id} className="flex items-center gap-2 text-sm text-gray-300">
                                        <FileText size={14} /> {doc.name}
                                    </li>
                                ))}
                                {index.documents.length > 3 && <li className="text-sm text-gray-500">...and {index.documents.length - 3} more.</li>}
                            </ul>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-dark-border">
                             <Button
                                variant="secondary"
                                onClick={() => syncIndex(index.id)}
                                disabled={index.status === IndexStatus.Syncing || index.status === IndexStatus.Completed}
                            >
                                <RefreshCw size={16} className={index.status === IndexStatus.Syncing ? "animate-spin" : ""} />
                                {index.status === IndexStatus.Completed ? 'Synced' : 'Sync'}
                            </Button>
                            <button onClick={() => deleteIndex(index.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </Card>
                )) : (
                     <div className="col-span-full text-center py-16 text-gray-500">
                        No indexes created yet. Click "Create Index" to begin.
                    </div>
                )}
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Index">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="indexName" className="block text-sm font-medium text-gray-300 mb-1">Index Name</label>
                        <input
                            id="indexName"
                            type="text"
                            value={indexName}
                            onChange={(e) => setIndexName(e.target.value)}
                            placeholder="e.g., Q3 Financial Reports"
                            className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-white focus:ring-nvidia-green focus:border-nvidia-green"
                        />
                    </div>
                    <div>
                        <h3 className="text-md font-medium text-gray-300 mb-2">Select Documents (Completed Only)</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-dark-border rounded-md">
                            {completedDocuments.length > 0 ? completedDocuments.map(doc => (
                                <label key={doc.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-dark-border cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedDocs.has(doc.id)}
                                        onChange={() => handleToggleDoc(doc.id)}
                                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-nvidia-green focus:ring-soft-green"
                                    />
                                    <FileText size={16} className="text-gray-400"/>
                                    <span>{doc.name}</span>
                                </label>
                            )) : <p className="text-gray-500 text-center p-4">No completed documents available to add.</p>}
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateIndex}>Create Index</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default IndexingScreen;
