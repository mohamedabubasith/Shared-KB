
import React, { useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { DocumentStatus } from '../types';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import { Upload, FileText, Trash2, CheckCircle, Clock } from 'lucide-react';

const ParserScreen: React.FC = () => {
    const { documents, addDocument, deleteDocument } = useAppContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            Array.from(event.target.files).forEach(file => addDocument(file));
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const getStatusIndicator = (status: DocumentStatus) => {
        switch (status) {
            case DocumentStatus.Pending:
                return <div className="flex items-center gap-2 text-yellow-400"><Clock size={16} /><span >Pending</span></div>;
            case DocumentStatus.Processing:
                return <div className="flex items-center gap-2 text-blue-400"><Spinner size={16} /><span>Processing</span></div>;
            case DocumentStatus.Completed:
                return <div className="flex items-center gap-2 text-nvidia-green"><CheckCircle size={16} /><span>Completed</span></div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Document Parser</h1>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf"
                    multiple
                />
                <Button onClick={handleUploadClick}>
                    <Upload size={18} />
                    Upload PDFs
                </Button>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-dark-border/50">
                        <tr>
                            <th className="p-4 font-semibold">File Name</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.length > 0 ? (
                            documents.map(doc => (
                                <tr key={doc.id} className="border-t border-dark-border hover:bg-dark-border/30">
                                    <td className="p-4 flex items-center gap-3">
                                        <FileText className="text-gray-400" />
                                        <span>{doc.name}</span>
                                    </td>
                                    <td className="p-4">{getStatusIndicator(doc.status)}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => deleteDocument(doc.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center p-8 text-gray-500">
                                    No documents uploaded. Click "Upload PDFs" to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParserScreen;
