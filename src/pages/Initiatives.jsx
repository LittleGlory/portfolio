import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { impactCategories } from '../data/impactEvents.jsx';
import { ChevronDown, ChevronUp } from 'lucide-react';

import SEO from '../components/SEO';

const Initiatives = () => {
    // State to track which categories are expanded
    const [expandedIds, setExpandedIds] = useState([]);

    const toggleExpand = (id) => {
        setExpandedIds(prev =>
            prev.includes(id)
                ? prev.filter(catId => catId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-white py-24">
            <SEO
                title="Initiatives"
                description="Showcase of executed initiatives and future concepts for sustainable change."
            />
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-4"
                    >
                        Innovation Lab
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                    >
                        Initiatives for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">Better Future</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-xl text-gray-600"
                    >
                        Some executed initiatives and some future concepts for a better world.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {impactCategories.map((category, index) => (
                        <ImpactCard
                            key={category.id}
                            category={category}
                            index={index}
                            isExpanded={expandedIds.includes(category.id)}
                            onToggle={() => toggleExpand(category.id)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

// Extracted Card Component
const ImpactCard = ({ category, index, isExpanded, onToggle }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        // Apply category.color classes to the container for "colorful" look
        className={`rounded-2xl border transition-all duration-300 ${category.color} ${isExpanded ? 'shadow-xl ring-2 ring-offset-2 ring-gray-100' : 'hover:shadow-lg'}`}
    >
        <div
            onClick={onToggle}
            className={`p-6 cursor-pointer flex items-start gap-4 ${isExpanded ? '' : 'hover:bg-white/50'} transition-colors rounded-2xl`}
        >
            {/* Icon Container with white background for contrast */}
            <div className="p-3 rounded-xl bg-white shadow-sm">
                {category.icon}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold bg-white/80`}>
                                {category.sdg}
                            </span>
                            {category.type === 'concept' && (
                                <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 text-purple-700">
                                    Concept
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-1">{category.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">{category.description}</p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 opacity-50" /> : <ChevronDown className="w-5 h-5 opacity-50" />}
                </div>

                <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium opacity-75">
                        {category.type === 'concept' ? 'Coming Soon' : `${category.events.length} Projects`}
                    </span>
                    <button className={`p-2 rounded-full transition-colors bg-white/50 hover:bg-white`}>
                        {isExpanded ? 'Close' : 'View Details'}
                    </button>
                </div>
            </div>
        </div>

        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-white/50 border-t border-black/5 rounded-b-2xl"
                >
                    <div className="p-6 pt-2">
                        <ul className="space-y-3 mt-4">
                            {category.events.map((event, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-start gap-3 bg-white p-3 rounded-lg border border-black/5 shadow-sm"
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${category.type === 'concept' ? 'bg-yellow-400' : 'bg-current'}`} />
                                    {typeof event === 'object' && event.link ? (
                                        <a
                                            href={event.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                        >
                                            {event.text}
                                        </a>
                                    ) : (
                                        <span className="text-sm text-gray-800">
                                            {typeof event === 'object' ? event.text : event}
                                        </span>
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

export default Initiatives;
