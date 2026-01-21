import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Megaphone, Users, PenTool, Circle } from 'lucide-react';

const experiences = [
    {
        id: 1,
        company: "Bhoos Games",
        role: "Content & Marketing",
        details: "Managing SEO/ASO for hit games.",
        color: "text-blue-600 bg-blue-50 border-blue-200",
        logo: "/brands/bhoos.png",
        items: [
            { name: "Marriage Card Game", img: "/brands/marrige.png" },
            { name: "Callbreak Legend", img: "/brands/clients/callbreak.png" },
            { name: "Carrom Board", img: "/brands/clients/carrom.png" }
        ]
    },
    {
        id: 2,
        company: "DigitalIn",
        role: "Social Media Strategy",
        details: "Crafted monthly plans for big names.",
        color: "text-orange-600 bg-orange-50 border-orange-200",
        logo: "/brands/digitalin.jpeg",
        items: [
            { name: "Standard Chartered", img: "/brands/standard.png" },
            { name: "Sunplay", img: "/brands/sunplay.jpeg" },
            { name: "Happydent", img: "/brands/happydent.jpeg" },
            { name: "OXY", img: "/brands/oxy.jpeg" }
        ]
    },
    {
        id: 3,
        company: "Josh Talks",
        role: "Content Curator",
        details: "Curated impactful stories and content that resonates with a wide audience.",
        color: "text-red-600 bg-red-50 border-red-200",
        logo: "/brands/josh.jpg",
        items: [
            { name: "Shantanu Sharma", img: "https://img.youtube.com/vi/Zzzj0cqdYpU/mqdefault.jpg", link: "https://www.youtube.com/watch?v=Zzzj0cqdYpU" },
            { name: "Maya Gurung", img: "https://img.youtube.com/vi/rnDpvk716OA/mqdefault.jpg", link: "https://www.youtube.com/watch?v=rnDpvk716OA" },
            { name: "Surakshya Bhandari", img: "https://img.youtube.com/vi/smGVScim3_Q/mqdefault.jpg", link: "https://www.youtube.com/watch?v=smGVScim3_Q" }
        ]
    },
    {
        id: 4,
        company: "Avani Advertising",
        role: "Client Handling",
        details: "Managed diverse portfolios including Baba Oil, JJ Jewellers, Macchapuchre Bank, KNP.",
        color: "text-green-600 bg-green-50 border-green-200",
        logo: "/brands/avani.png",
        items: [
            { name: "Baba Oil", img: "/brands/baba.jpeg" },
            { name: "JJ Jewellers", img: "/brands/jj.jpeg" },
            { name: "MBL", img: "/brands/mbl.png" },
            { name: "KNP", img: "/brands/knp.png" }
        ]
    }
];

const ExperienceCard = ({ exp, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Toggle click state, but only if not hovering (to avoid double toggle on some devices)
    // or simply allow click to override.
    // Simpler approach: Desktop uses hover, Mobile uses click.
    // We can track both. logic: expanded = isHovered || isClicked.

    const toggleClick = () => setIsClicked(!isClicked);

    return (
        <div className={`flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

            {/* Empty Space for Grid alignment */}
            <div className="hidden md:block flex-1" />

            {/* Timeline Node / Logo */}
            <div className={`z-10 absolute left-6 md:left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden bg-white ${exp.color.split(' ')[2]}`}>
                <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain p-2" />
            </div>

            {/* Content Card */}
            <div className="pl-16 md:pl-0 flex-1 w-full md:w-auto">
                <motion.div
                    className={`relative p-6 rounded-3xl border ${exp.color} bg-opacity-30 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-shadow duration-300 md:max-w-sm ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onClick={toggleClick}
                    animate={isHovered || isClicked ? "expanded" : "collapsed"}
                    initial="collapsed"
                >
                    <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{exp.company}</h3>
                    </div>

                    {/* Revealable Content */}
                    <motion.div
                        variants={{
                            collapsed: { height: 0, opacity: 0, marginTop: 0 },
                            expanded: { height: 'auto', opacity: 1, marginTop: 12 }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="font-semibold text-gray-700 text-sm uppercase tracking-wide mb-3">
                            {exp.role}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {exp.details}
                        </p>

                        {/* Items Grid */}
                        {exp.items && exp.items.length > 0 && (
                            <div className="grid grid-cols-3 gap-3">
                                {exp.items.map((item, i) => {
                                    const Content = () => (
                                        <div className="flex flex-col items-center gap-1 group/item">
                                            <div className="w-12 h-12 rounded-lg bg-white/70 shadow-sm flex items-center justify-center p-1.5 border border-white overflow-hidden relative" title={item.name}>
                                                <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = item.name[0]; }} />
                                                {item.link && (
                                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                        <div className="w-4 h-4 bg-white/80 rounded-full flex items-center justify-center">
                                                            <span className="text-[8px] text-red-600">▶</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[10px] text-gray-500 font-medium text-center leading-tight opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                {item.name}
                                            </span>
                                        </div>
                                    );

                                    return item.link ? (
                                        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="block" onClick={(e) => e.stopPropagation()}>
                                            <Content />
                                        </a>
                                    ) : (
                                        <div key={i}>
                                            <Content />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

const Marketing = () => {
    return (
        <section id="marketing" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative">

                {/* Header */}
                <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1 rounded-full bg-pink-50 text-pink-500 text-sm font-bold tracking-wide uppercase mb-4">
                        Experience
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Marketing Journey
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        A timeline of creating <span className="text-pink-500 font-bold">impact</span> and <span className="text-red-500 font-bold">growth</span>.
                    </p>
                </div>

                {/* Timeline Line */}
                <div className="absolute left-6 md:left-1/2 top-48 bottom-0 w-0.5 bg-gradient-to-b from-pink-200 via-purple-200 to-transparent transform md:-translate-x-1/2 h-[calc(100%-12rem)]" />

                <div className="space-y-12 relative">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={exp.id} exp={exp} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Marketing;
