
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ParserScreen from './pages/ParserScreen';
import IndexingScreen from './pages/IndexingScreen';
import QueryScreen from './pages/QueryScreen';
import ApiKeyScreen from './pages/ApiKeyScreen';
import { AppProvider } from './contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
    return (
        <AppProvider>
            <HashRouter>
                <div className="flex h-screen bg-dark-bg font-sans">
                    <Sidebar />
                    <main className="flex-1 p-8 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            <Routes>
                                <Route path="/" element={<PageWrapper><ParserScreen /></PageWrapper>} />
                                <Route path="/indexing" element={<PageWrapper><IndexingScreen /></PageWrapper>} />
                                <Route path="/query" element={<PageWrapper><QueryScreen /></PageWrapper>} />
                                <Route path="/api-key" element={<PageWrapper><ApiKeyScreen /></PageWrapper>} />
                            </Routes>
                        </AnimatePresence>
                    </main>
                </div>
            </HashRouter>
        </AppProvider>
    );
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);

export default App;
