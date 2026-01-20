import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Youtube } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "Baheti's LedgerBook",
        category: "Web Application",
        description: "A comprehensive dashboard for managing sales, inventory, customers, and analytics.",
        image: "/bahetii.png",
        colSpan: "md:col-span-1",
        color: "bg-purple-50",
        youtube: "https://www.youtube.com/watch?v=xk6fflgDC00"
    },
    {
        id: 2,
        title: "Smart Mate",
        category: "Web Application and Chat Bot",
        description: "A Companion to talk about all your Mental Health Concerns, while maintaining a diary",
        image: "/smartmate.png",
        colSpan: "md:col-span-1",
        color: "bg-pink-50",
        youtube: "https://www.youtube.com/watch?v=KQDmUYbPN4Q"
    },
];

const ProjectCard = ({ project }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`group relative overflow-hidden rounded-3xl ${project.colSpan} ${project.color} h-[300px] md:h-[400px] shadow-sm hover:shadow-xl transition-all duration-300 border border-white/50`}
    >
        {/* Image Background */}
        <div className="absolute inset-0 top-0 h-2/3 overflow-hidden">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Content Box (Bottom) */}
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-white/80 backdrop-blur-md p-6 flex flex-col justify-center border-t border-white/50">
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">
                        {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                        {project.title}
                    </h3>
                </div>
                <div className="flex gap-2">
                    {project.youtube && (
                        <a href={project.youtube} target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 text-red-600 transition-all z-10">
                            <Youtube size={20} />
                        </a>
                    )}

                </div>
            </div>
            <p className="text-gray-600 text-sm mt-2 line-clamp-1">{project.description}</p>
        </div>
    </motion.div>
);

const Projects = () => {
    return (
        <section id="projects" className="py-24 relative">
            <div className="max-w-6xl mx-auto px-6">

                {/* Section Header */}
                <div className="mb-16 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-pink-50 text-pink-500 text-sm font-bold tracking-wide uppercase mb-4">
                        Projects
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Best of Developer Mind
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Projects developed based on <span className="text-red-500 font-bold">need</span> and <span className="text-pink-500 font-bold">passion</span>.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>


            </div>
        </section>
    );
};

export default Projects;
