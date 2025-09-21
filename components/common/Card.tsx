
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <motion.div
            className={`bg-dark-card border border-dark-border rounded-xl p-6 shadow-lg ${className}`}
            whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(118, 185, 0, 0.1), 0 4px 6px -2px rgba(118, 185, 0, 0.05)' }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

export default Card;
