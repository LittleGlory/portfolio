import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { blogs } from '../data/blogs';
import SEO from '../components/SEO';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const blog = blogs.find(b => b.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h2>
                    <Link to="/blogs" className="text-purple-600 hover:text-purple-700 font-medium">
                        Return to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-white py-24">
            <SEO
                title={blog.title}
                description={blog.excerpt}
                type="article"
            />
            {/* Progress Bar (Optional) */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
                style={{ scaleX: 0 }} // Could add scroll progress here
            />

            <div className="max-w-3xl mx-auto px-6">
                {/* Back Link */}
                <Link
                    to="/blogs"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Insights
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mb-6">
                        <span className={`px-3 py-1 rounded-full ${blog.color} text-gray-900`}>
                            Marketing
                        </span>
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {blog.date}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {blog.readTime}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                        {blog.title}
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-purple-500 pl-6 italic">
                        {blog.excerpt}
                    </p>
                </header>

                {/* Divider */}
                <hr className="border-gray-100 my-12" />

                {/* Content */}
                <div className="prose prose-lg prose-purple max-w-none">
                    {blog.content}
                </div>

                {/* Footer / Share */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-gray-500 font-medium">
                        Thanks for reading!
                    </div>
                    <button className="flex items-center gap-2 text-gray-900 font-bold hover:text-purple-600 transition-colors">
                        <Share2 size={20} />
                        Share Article
                    </button>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
