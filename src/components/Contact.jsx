import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, ArrowUpRight, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <section id="contact" className="bg-gray-900 text-white pt-24 pb-12 rounded-t-[3rem] overflow-hidden relative">

            {/* Background Details */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-pink-600 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">

                {/* Left: Call to Action */}
                <div className="space-y-8 max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-block w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse" />
                            <span className="text-gray-400 font-medium tracking-wide text-sm uppercase">Available for new projects</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                            Let's Build<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Something Cool.</span>
                        </h2>
                    </motion.div>

                    <p className="text-xl text-gray-400 max-w-md">
                        Have an idea? Need a digital partner? Let's turn your vision into a reality that users love.
                    </p>

                    <div className="flex gap-4">
                        <a href="mailto:hello@example.com" className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-pink-50 transition-colors shadow-lg flex items-center gap-2 group">
                            Start a Project
                            <ArrowUpRight size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#" className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                            Just Say Hi
                        </a>
                    </div>
                </div>

                {/* Right: Fun/Interactive Element */}
                <div className="flex flex-col items-center md:items-end justify-between h-full pt-12 md:pt-0">

                    {/* Level Up Animation Container */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative group cursor-pointer"
                    >
                        <div className="w-40 h-40 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700 shadow-2xl relative overflow-hidden">
                            {/* Pixel Heart */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            >
                                <Heart size={64} className="text-pink-500 fill-pink-500" />
                            </motion.div>

                            {/* Particles (Simplified) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-full h-full border-t-2 border-pink-500/0 group-hover:border-pink-500/50 animate-ping absolute" />
                            </div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <span className="text-sm font-bold text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                LEVEL UP!
                            </span>
                        </div>
                    </motion.div>

                    {/* Socials */}
                    <div className="flex gap-6 mt-16 md:mt-24">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Mail size={24} /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
                <p>&copy; 2024 Little Glory. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white">Privacy</a>
                    <a href="#" className="hover:text-white">Terms</a>
                    <a href="#" className="hover:text-white">Sitemap</a>
                </div>
            </div>
        </section>
    );
};

export default Footer;
