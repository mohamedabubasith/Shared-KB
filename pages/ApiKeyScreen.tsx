
import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Copy, RefreshCw, Check, KeyRound } from 'lucide-react';

const ApiKeyScreen: React.FC = () => {
    const [apiKey, setApiKey] = useLocalStorage<string>('user-api-key', '');
    const [copied, setCopied] = useState(false);

    const generateKey = () => {
        setApiKey(`sk-${crypto.randomUUID().replace(/-/g, '')}`);
    };

    useEffect(() => {
        if (!apiKey) {
            generateKey();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">API Key Management</h1>
            <Card className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                    <KeyRound size={28} className="text-nvidia-green"/>
                    <h2 className="text-xl font-semibold">Your API Key</h2>
                </div>
                <p className="text-gray-400 mb-6">
                    Use this API key in your application's headers to authenticate requests and access your Knowledgebase programmatically.
                </p>
                <div className="flex items-center gap-2 p-3 bg-dark-bg border border-dark-border rounded-lg">
                    <span className="font-mono text-sm text-gray-300 flex-grow truncate">{apiKey}</span>
                    <Button variant="secondary" onClick={handleCopy}>
                        {copied ? <Check size={18} className="text-nvidia-green"/> : <Copy size={18} />}
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                </div>
                <div className="mt-6 pt-6 border-t border-dark-border">
                    <h3 className="font-semibold text-lg text-red-400">Regenerate Key</h3>
                    <p className="text-gray-400 mt-2 mb-4">
                        Regenerating your key is irreversible. Your old API key will stop working immediately.
                    </p>
                    <Button variant="secondary" onClick={generateKey}>
                        <RefreshCw size={18}/>
                        Regenerate API Key
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ApiKeyScreen;
