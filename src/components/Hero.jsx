import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Code, Sprout, Users, PenTool, Compass } from 'lucide-react';

const FloatingCard = ({ children, className, x, y, delay }) => (
    <motion.div
        initial={{ x: x, y: y, opacity: 0, scale: 0.8 }}
        animate={{
            x: x,
            y: [y - 10, y + 10, y - 10],
            opacity: 1,
            scale: 1,
        }}
        transition={{
            y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 }
        }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-md bg-white/30 border border-white/40 shadow-xl shadow-purple-500/5 ${className}`}
    >
        {children}
    </motion.div>
);

const Hero = () => {
    // Permanent Floating State
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="home" className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative pt-[30px] pb-20 overflow-hidden bg-gradient-to-b from-white via-pink-50 to-white">

            {/* Main Content Container */}
            <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center space-y-12">

                {/* 1. Central Avatar & Floating Cards Area */}
                <div className="relative w-48 h-48 md:w-80 md:h-80 flex items-center justify-center">

                    {/* Central Avatar */}
                    <motion.div
                        className="relative z-30 w-full h-full rounded-full p-2 bg-gradient-to-tr from-pink-200 to-purple-200 shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
                            <img
                                src="/hero.png"
                                alt="Girl Avatar"
                                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                            />
                        </div>
                    </motion.div>

                    {/* Floating Cards (Always Visible) */}

                    {/* 1. Community (Top Left) */}
                    <a href="https://www.instagram.com/rotaractdillibazar_ktm/" target="_blank" rel="noopener noreferrer">
                        <FloatingCard
                            x={isMobile ? -90 : -260} y={isMobile ? -90 : -130}
                            delay={0}
                            className="p-2 md:p-4 rounded-full md:rounded-3xl flex items-center gap-0 md:gap-3 w-auto md:w-48 justify-center"
                        >
                            <div className="bg-orange-100 p-2 md:p-2.5 rounded-full md:rounded-2xl text-orange-600 shadow-sm">
                                <Users size={isMobile ? 18 : 24} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-gray-800 text-sm hidden md:block">Community</span>
                        </FloatingCard>
                    </a>

                    {/* 2. Calligrapher (Top Right) */}
                    <FloatingCard
                        x={isMobile ? 95 : 260} y={isMobile ? -85 : -110}
                        delay={1} // Staggered float
                        className="p-2 md:p-4 rounded-full md:rounded-3xl flex items-center gap-0 md:gap-3 w-auto md:w-48 justify-center"
                    >
                        <div className="bg-blue-100 p-2 md:p-2.5 rounded-full md:rounded-2xl text-blue-600 shadow-sm">
                            <PenTool size={isMobile ? 18 : 24} strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-gray-800 text-sm hidden md:block">Calligrapher</span>
                    </FloatingCard>

                    {/* 3. Strategist (Bottom Left) */}
                    <a href="#marketing">
                        <FloatingCard
                            x={isMobile ? -85 : -240} y={isMobile ? 95 : 120}
                            delay={2}
                            className="p-2 md:p-4 rounded-full md:rounded-3xl flex items-center gap-0 md:gap-3 w-auto md:w-48 justify-center"
                        >
                            <div className="bg-purple-100 p-2 md:p-2.5 rounded-full md:rounded-2xl text-purple-600 shadow-sm">
                                <Compass size={isMobile ? 18 : 24} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-gray-800 text-sm hidden md:block">Strategist</span>
                        </FloatingCard>
                    </a>

                    {/* 4. Content (Bottom Right) */}
                    <a href="https://bhoos.com/author/saakshi/" target="_blank" rel="noopener noreferrer">
                        <FloatingCard
                            x={isMobile ? 90 : 250} y={isMobile ? 95 : 140}
                            delay={1.5}
                            className="p-2 md:p-4 rounded-full md:rounded-3xl flex items-center gap-0 md:gap-3 w-auto md:w-44 justify-center"
                        >
                            <div className="bg-rose-100 p-2 md:p-2.5 rounded-full md:rounded-2xl text-rose-600 shadow-sm">
                                <Sprout size={isMobile ? 18 : 24} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-gray-800 text-sm hidden md:block">Content</span>
                        </FloatingCard>
                    </a>

                    {/* Decorative Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none" />
                </div>

                {/* 2. Text Content (Centered Below) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center space-y-6 max-w-2xl px-4"
                >
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900 tracking-tight">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Saakshi Baheti</span>
                        <span className="block mt-2 text-3xl md:text-4xl text-gray-800 font-normal">Turning complex ideas into impact.</span>
                    </h1>

                    <div className="flex justify-center gap-4 pt-2">
                        <a href="#contact" className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            Let's Talk
                        </a>
                        <a href="#marketing" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-full font-semibold hover:border-pink-200 hover:bg-pink-50 transition-all">
                            View Work
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
