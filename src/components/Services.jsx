import React from 'react';
import { TrendingUp, Globe, Megaphone, Smartphone, Layout, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    {
        icon: <Smartphone size={32} />,
        title: "App Store Optimization (ASO)",
        description: "Boosting your app's visibility and downloads through keyword optimization and creative asset strategies.",
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: <Globe size={32} />,
        title: "SEO Strategy",
        description: "Driving organic traffic to your website with data-driven SEO techniques and content planning.",
        color: "bg-green-50 text-green-600"
    },
    {
        icon: <Megaphone size={32} />,
        title: "Ad Campaigns",
        description: "Managing high-ROI ad campaigns across Google, Facebook, and Instagram to reach your target audience.",
        color: "bg-orange-50 text-orange-600"
    },
    {
        icon: <Layout size={32} />,
        title: "Web Development",
        description: "Building responsive, aesthetic websites that convert visitors into loyal customers.",
        color: "bg-pink-50 text-pink-600"
    },
    {
        icon: <BarChart size={32} />,
        title: "Analytics & Growth",
        description: "Analyzing user behavior and data to refine strategies and accelerate digital growth.",
        color: "bg-purple-50 text-purple-600"
    },
    {
        icon: <TrendingUp size={32} />,
        title: "Content Marketing",
        description: "Creating valuable content that resonates with your audience and builds brand authority.",
        color: "bg-yellow-50 text-yellow-600"
    }
];

const Services = () => {
    return (
        <section id="services" className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Expertise</h2>
                    <div className="w-20 h-1 bg-pink-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive digital solutions tailored to <span className="text-pink-500 font-bold">elevate</span> your <span className="text-red-500 font-bold">brand</span>.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
