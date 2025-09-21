
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { IndexStatus } from '../types';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';
import { Send, FileJson } from 'lucide-react';

const QueryScreen: React.FC = () => {
    const { indexes } = useAppContext();
    const [selectedIndex, setSelectedIndex] = useState<string>('');
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const completedIndexes = indexes.filter(idx => idx.status === IndexStatus.Completed);

    const handleQuery = () => {
        if (!query.trim() || !selectedIndex) return;
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            setResult(`This is a simulated vector search answer for your query: "${query}". The result is based on documents within the selected index. In a real application, this would contain contextually relevant information extracted from the indexed PDFs, providing precise and accurate answers to user questions.`);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Query Knowledgebase</h1>
            <Card className="max-w-4xl mx-auto">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="index-select" className="block text-sm font-medium text-gray-300 mb-1">Select an Index</label>
                        <select
                            id="index-select"
                            value={selectedIndex}
                            onChange={(e) => setSelectedIndex(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-white focus:ring-nvidia-green focus:border-nvidia-green"
                        >
                            <option value="" disabled>-- Select a completed index --</option>
                            {completedIndexes.map(idx => (
                                <option key={idx.id} value={idx.id}>{idx.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="query-input" className="block text-sm font-medium text-gray-300 mb-1">Your Query</label>
                        <textarea
                            id="query-input"
                            rows={4}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask a question about the documents in your selected index..."
                            className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-white focus:ring-nvidia-green focus:border-nvidia-green"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleQuery} disabled={!query.trim() || !selectedIndex || isLoading}>
                            {isLoading ? <Spinner size={18} /> : <Send size={18} />}
                            {isLoading ? 'Searching...' : 'Submit Query'}
                        </Button>
                    </div>
                </div>
            </Card>

            {(isLoading || result) && (
                <div className="mt-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-nvidia-green">Result</h2>
                    {isLoading ? (
                        <Card className="flex items-center justify-center p-12">
                            <Spinner size={48} />
                            <p className="ml-4 text-lg text-gray-300">Performing vector search...</p>
                        </Card>
                    ) : (
                         result && (
                            <Card>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-nvidia-green/20 rounded-full">
                                        <FileJson size={24} className="text-nvidia-green"/>
                                    </div>
                                    <p className="text-gray-200 leading-relaxed">{result}</p>
                                </div>
                            </Card>
                         )
                    )}
                </div>
            )}
        </div>
    );
};

export default QueryScreen;
