
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Database, FileText, Search, KeyRound, BrainCircuit } from 'lucide-react';

const navItems = [
    { to: '/', text: 'Parser', icon: <FileText size={20} /> },
    { to: '/indexing', text: 'Indexing', icon: <Database size={20} /> },
    { to: '/query', text: 'Query', icon: <Search size={20} /> },
    { to: '/api-key', text: 'API Key', icon: <KeyRound size={20} /> },
];

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-dark-card border-r border-dark-border flex flex-col p-4">
            <div className="flex items-center gap-2 mb-10 p-2">
                <BrainCircuit size={32} className="text-nvidia-green" />
                <h1 className="text-xl font-bold text-white">Shared KB</h1>
            </div>
            <nav className="flex flex-col gap-2">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                isActive
                                    ? 'bg-nvidia-green text-white'
                                    : 'text-gray-400 hover:bg-dark-border hover:text-white'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-medium">{item.text}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
