import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

import SEO from '../components/SEO';

const Blogs = () => {
    return (
        <div className="min-h-screen bg-white py-24 relative">
            <SEO
                title="Blogs"
                description="Marketing Thoughts: Exploring strategies, stories, and the science of connection."
            />
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-4">
                        Insights
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Thoughts</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Exploring strategies, stories, and the science of connection.
                    </p>
                </div>

                {/* Blogs Grid */}
                <div className="space-y-8">
                    {blogs.map((blog) => (
                        <Link to={`/blogs/${blog.id}`} key={blog.id} className="block group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow duration-300 ${blog.color}`}
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm">
                                        {blog.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            <span>{blog.date}</span>
                                            <span>•</span>
                                            <span>{blog.readTime}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {blog.excerpt}
                                        </p>
                                    </div>
                                    <div className="hidden md:block">
                                        <span className="px-6 py-2 bg-white text-gray-900 font-bold rounded-full text-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            Read
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Blogs;
