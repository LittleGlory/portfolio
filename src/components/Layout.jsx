import React, { useState } from 'react';
import { Menu, X, Instagram, Linkedin, Mail, Twitter, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Experience', to: '/#marketing' }, // User requested Projects link to go to Marketing Journey
        { name: 'Initiatives', to: '/initiatives' },         // Replaced Process with Initiatives
        { name: 'Blogs', to: '/blogs' },
        { name: 'Contact', to: '/#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
                <HashLink smooth to="/#" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs p-1">
                        LG
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-pink-600 transition-colors">
                        Little Glory.
                    </span>
                </HashLink>

                {/* Right Side: Menu & CTA */}
                <div className="flex items-center gap-8">
                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8">
                        {links.map((link) => (
                            <HashLink
                                key={link.name}
                                smooth
                                to={link.to}
                                className="text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm tracking-wide"
                            >
                                {link.name}
                            </HashLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <HashLink smooth to="/#contact" className="hidden md:block px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                            Let's Talk
                        </HashLink>

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col space-y-4 px-6 py-6">
                            {links.map((link) => (
                                <HashLink
                                    key={link.name}
                                    smooth
                                    to={link.to}
                                    className="text-gray-600 hover:text-pink-500 font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </HashLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Footer = () => (
    <footer id="contact" className="bg-[#0a0514] text-white pt-20 pb-8 border-t border-white/5 relative overflow-hidden">
        {/* Ambience */}
        <div className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[10%] w-[400px] h-[400px] bg-pink-900/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-24 lg:items-center">
                {/* Left Column: Header, Info & Connect */}
                <div className="contents lg:flex lg:flex-col lg:gap-12">
                    {/* Header Section */}
                    <div className="order-1">
                        <div className="flex items-center gap-3 bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/10 mb-6">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-green-300">Currently available for new projects</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-xl">
                            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">remarkable.</span>
                        </h2>
                    </div>

                    {/* Info & Connect */}
                    <div className="order-3 space-y-8">
                        <div>
                            <span className="text-xl font-bold tracking-tight">Saakshi Baheti</span>
                            <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-xs">
                                Turning complex ideas into impact.
                            </p>
                            <div className="mt-6 text-gray-500 font-medium text-sm">
                                Kathmandu, Nepal 🇳🇵
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <a href="mailto:rtrsaakshi@gmail.com" className="flex items-center gap-4 group bg-white/5 pr-8 rounded-full hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10">
                                <div className="p-3 rounded-full bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 group-hover:scale-110 transition-all duration-300">
                                    <Mail size={20} />
                                </div>
                                <span className="text-gray-400 group-hover:text-white transition-colors font-medium">Mail</span>
                            </a>

                            <a href="https://www.linkedin.com/in/saakshi-baheti/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group bg-white/5 pr-8 rounded-full hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10">
                                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                                    <Linkedin size={20} />
                                </div>
                                <span className="text-gray-400 group-hover:text-white transition-colors font-medium">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="order-2 bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const subject = formData.get('subject');
                            const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\nMessage:\n${formData.get('message')}`;
                            window.location.href = `mailto:rtrsaakshi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors"
                        />
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors"
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="4"
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors resize-none"
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-pink-500/20"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            <div className="relative mt-16 pt-8 flex flex-col gap-1 items-center text-center text-gray-500 text-sm">
                {/* Gradient Separator */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <p>&copy; {new Date().getFullYear()} Saakshi Baheti. All rights reserved.</p>
                <p className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                    Crafted for impact. Built with <span className="text-pink-500 animate-pulse">❤️</span>
                </p>
            </div>
        </div>
    </footer>
)

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-800 selection:bg-pink-100 selection:text-pink-900">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
