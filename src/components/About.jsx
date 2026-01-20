import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { MousePointer2, Code2, PenTool, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section id="about" className="py-32 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Interactive Grid */}
                <div className="grid grid-cols-3 gap-2 md:gap-6">
                    <a href="https://drive.google.com/drive/folders/1N1BapUoabysUlKItD9mvj8ymN0rwn7ML?usp=sharing" target="_blank" rel="noopener noreferrer" className="block">
                        <TiltCard
                            title="I Design."
                            subtitle="Clarity over noise."
                            icon={<PenTool size={32} />}
                            gradient="from-pink-500 to-rose-500"
                        />
                    </a>



                    <Link to="/blogs" className="block">
                        <TiltCard
                            title="I Guide."
                            subtitle="Stories that matter."
                            icon={<MousePointer2 size={32} />}
                            gradient="from-blue-500 to-cyan-500"
                        />
                    </Link>

                    <Link to="/initiatives" className="block">
                        <TiltCard
                            title="I Think."
                            subtitle="Innovation & SDG."
                            icon={<Lightbulb size={32} />}
                            gradient="from-yellow-400 to-orange-500"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const TiltCard = ({ title, subtitle, icon, gradient }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * 32.5;
        const mouseY = (e.clientY - rect.top) * 32.5;

        const rX = (mouseY / height - 32.5 / 2) * -1;
        const rY = mouseX / width - 32.5 / 2;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative h-52 md:h-80 rounded-2xl md:rounded-3xl bg-white p-3 md:p-8 shadow-xl border border-gray-100 flex flex-col justify-end group cursor-pointer overflow-hidden transform-gpu"
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                }}
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            />

            <div
                style={{
                    transform: "translateZ(75px)",
                }}
                className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-auto shadow-lg group-hover:scale-110 transition-transform duration-500`}
            >
                {icon}
            </div>

            <h3
                style={{
                    transform: "translateZ(50px)",
                }}
                className="text-lg md:text-3xl font-bold text-gray-900 mt-4 group-hover:translate-x-2 transition-transform duration-300"
            >
                {title}
            </h3>

            <p
                style={{
                    transform: "translateZ(25px)",
                }}
                className="text-[10px] md:text-base text-gray-400 font-medium group-hover:text-gray-600 transition-colors duration-300 mt-2 leading-tight"
            >
                {subtitle}
            </p>
        </motion.div>
    );
};

export default About;
