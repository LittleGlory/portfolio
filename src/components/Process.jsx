import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Rocket } from 'lucide-react';

const steps = [
    {
        id: '01',
        title: 'Discovery',
        description: 'Immersing in your brand to understand goals, audience, and core values.',
        icon: <Search size={24} />,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        id: '02',
        title: 'Design & Strategy',
        description: 'Crafting the visual identity and content strategy that aligns with your vision.',
        icon: <PenTool size={24} />,
        color: 'bg-pink-50 text-pink-600'
    },
    {
        id: '03',
        title: 'Delivery & Impact',
        description: 'Launching the final product and optimizing for maximum reach and engagement.',
        icon: <Rocket size={24} />,
        color: 'bg-purple-50 text-purple-600'
    }
];

const Process = () => {
    return (
        <section id="process" className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Approach</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        A structured workflow designed to bring clarity and results.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-pink-200 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 font-bold text-6xl text-gray-300 select-none group-hover:text-pink-200 transition-colors">
                                {step.id}
                            </div>

                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${step.color}`}>
                                {step.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed relative z-10">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
