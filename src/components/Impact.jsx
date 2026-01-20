import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BrandCollage = () => {
    // Mix of logos and handwritten skills
    const items = [
        { type: 'note', text: "Branding", rotate: "-rotate-12", color: "text-indigo-400" },
        { type: 'logo', src: "/brands/bhoos.png" },
        { type: 'logo', src: "/brands/digitalin.jpeg" },
        { type: 'note', text: "SEO", rotate: "rotate-6", color: "text-pink-400" },
        { type: 'logo', src: "/brands/josh.jpg" },

        { type: 'logo', src: "/brands/avani.png" },
        { type: 'logo', src: "/brands/standard.png" },
        { type: 'note', text: "Strategy", rotate: "-rotate-3", color: "text-orange-400" },
        { type: 'logo', src: "/brands/sunplay.jpeg" },
        { type: 'logo', src: "/brands/happydent.jpeg" },

        { type: 'note', text: "ASO", rotate: "rotate-12", color: "text-green-500" },
        { type: 'logo', src: "/brands/oxy.jpeg" },
        { type: 'logo', src: "/brands/baba.jpeg" },
        { type: 'logo', src: "/brands/jj.jpeg" },
        { type: 'note', text: "Growth", rotate: "-rotate-6", color: "text-purple-400" },

        { type: 'logo', src: "/brands/mbl.png" },
        { type: 'note', text: "Copywriting", rotate: "rotate-6", color: "text-red-400" },
        { type: 'logo', src: "/brands/knp.png" }
    ];

    return (
        <div className="w-full h-full bg-white p-6 md:p-8 grid grid-cols-5 gap-2 content-center overflow-hidden">
            {items.map((item, index) => {
                if (item.type === 'note') {
                    // Wriggly handwritten text
                    return (
                        <div key={index} className={`flex items-center justify-center p-1 aspect-square transform ${item.rotate} hover:scale-125 transition-transform duration-300`}>
                            <span
                                className={`text-sm md:text-lg font-bold leading-none ${item.color}`}
                                style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Marker Felt", sans-serif' }}
                            >
                                {item.text}
                            </span>
                        </div>
                    );
                }

                // Smaller logos
                const rotate = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
                return (
                    <div key={index} className={`flex items-center justify-center p-2 bg-white border border-gray-100 rounded-xl shadow-sm aspect-square transform ${rotate} hover:scale-110 hover:z-10 transition-all duration-300`}>
                        <img src={item.src} alt="Brand" className="w-full h-full object-contain mix-blend-multiply opacity-80" />
                    </div>
                );
            })}
        </div>
    );
};

const slides = [
    {
        id: 2,
        title: "Building Together",
        vertical: "Content and Marketing",
        desc: "Worked with 10+ Brands. Creating content that resonates, and marketing that sells.",
        component: <BrandCollage />
    },
    {
        id: 3,
        title: "Innovation",
        vertical: "PUSHING LIMITS",
        desc: "0 to 1 Mindset. Bringing entrepreneurial energy to turn wild ideas into functional reality.",
        image: "/ideation_new.png",
        objectPosition: "center center" // Focus on face at podium
    },
    {
        id: 4,
        title: "Culture",
        vertical: "GOOD VIBES ONLY",
        desc: "∞ Good Vibes Shared. Fostering a positive and inclusive environment.",
        image: "/culture.jpg"
    },
    {
        id: 1,
        title: "Mentorship",
        vertical: "EMPOWERING OTHERS",
        desc: "150+ Students Mentored. Teaching calligraphy through online and physical 15 days workshops.",
        image: "/calligraphy.jpg"
    },
    {
        id: 5,
        title: "Community",
        vertical: "GIVING BACK",
        desc: "Advocate for Change. believing in the power of shared happiness.",
        image: "/community.jpg",
        objectPosition: "25% 50%" // Shift visible area to show user on the side
    }
];

const Impact = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [activeIndex, setActiveIndex] = useState(0);

    const phrases = [
        "the lives you touch.",
        "the minds you ignite.",
        "the stories you tell.",
        "the change you create."
    ];

    // Typing effect logic
    useEffect(() => {
        let ticker = setTimeout(() => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            if (isDeleting) {
                setText(prev => fullText.substring(0, prev.length - 1));
                setTypingSpeed(50);
            } else {
                setText(prev => fullText.substring(0, prev.length + 1));
                setTypingSpeed(100);
            }

            if (!isDeleting && text === fullText) {
                setTypingSpeed(2000);
                setIsDeleting(true);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500);
            }
        }, typingSpeed);

        return () => clearTimeout(ticker);
    }, [text, isDeleting, loopNum, phrases, typingSpeed]);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const minSwipeDistance = 50;
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const onTouchStart = (e) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
    };

    const getSlidePosition = (index) => {
        const diff = (index - activeIndex + slides.length) % slides.length;
        if (diff === 0) return 'center';
        if (diff === 1) return 'right';
        if (diff === 2) return 'far-right';
        if (diff === slides.length - 2) return 'far-left';
        if (diff === slides.length - 1) return 'left';
        return 'hidden';
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden min-h-[900px]">
            {/* Background decoration - Colorful Blobs for Glass Effect */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col h-full">

                <h2 className="text-center mb-16 text-xl md:text-4xl text-gray-500 font-medium tracking-tight italic">
                    <span className="block mb-4">
                        <span className="inline-block px-4 py-1 rounded-full bg-pink-50 text-pink-500 text-sm font-bold tracking-wide uppercase not-italic">
                            Gallery
                        </span>
                    </span>
                    <span className="text-gray-500">True Impact</span> <span className="text-gray-500">is about</span> <br className="md:hidden" />
                    <span className="inline-block min-w-[20px] md:min-w-[180px] text-left ml-2">
                        <span className="text-pink-500 font-bold">
                            {text}
                            <span className="animate-pulse border-r-2 border-pink-500 ml-1 h-full align-middle"></span>
                        </span>
                    </span>
                </h2>

                {/* Flat Glass Carousel Container */}
                <div
                    className="relative w-full h-[500px] md:h-[600px] flex justify-center items-center"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 md:left-20 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md shadow-lg text-gray-700 hover:bg-white hover:scale-110 transition-all border border-white/30"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 md:right-20 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md shadow-lg text-gray-700 hover:bg-white hover:scale-110 transition-all border border-white/30"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {slides.map((slide, index) => {
                        const position = getSlidePosition(index);
                        const isCenter = position === 'center';
                        const isLeft = position === 'left';
                        const isRight = position === 'right';
                        const isFarLeft = position === 'far-left';
                        const isFarRight = position === 'far-right';
                        const isHidden = position === 'hidden';

                        // Calculate visual properties
                        // Flat offsets instead of perspective
                        let x = '0%';
                        let scale = 1;
                        let zIndex = 30;
                        let opacity = 1;
                        let blur = 0;

                        if (isCenter) {
                            x = '0%';
                            scale = 1;
                            zIndex = 30;
                            opacity = 1;
                        } else if (isLeft) {
                            x = '-40%'; // Tucked mostly behind
                            scale = 0.7; // Significantly smaller
                            zIndex = 20;
                            opacity = 0.5;
                            blur = 4; // More blur for depth
                        } else if (isRight) {
                            x = '40%';
                            scale = 0.7;
                            zIndex = 20;
                            opacity = 0.5;
                            blur = 4;
                        } else if (isFarLeft) {
                            x = '-60%';
                            scale = 0.5; // Tiny
                            zIndex = 10;
                            opacity = 0.2; // Barely visible
                            blur = 8;
                        } else if (isFarRight) {
                            x = '60%';
                            scale = 0.5;
                            zIndex = 10;
                            opacity = 0.2;
                            blur = 8;
                        } else {
                            opacity = 0;
                            scale = 0;
                        }

                        // Extract main metric number if possible (e.g. "500+")
                        const metric = slide.desc.split('.')[0];
                        const description = slide.desc.split('.').slice(1).join('.');

                        return (
                            <motion.div
                                key={slide.id}
                                className={`absolute rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 ease-out origin-center cursor-pointer w-[300px] md:w-[600px] h-[500px] md:h-[600px]`}
                                initial={false}
                                animate={{
                                    x,
                                    scale,
                                    zIndex,
                                    opacity,
                                    filter: `blur(${blur}px)`,
                                }}
                                onClick={() => {
                                    if (isLeft) prevSlide();
                                    if (isRight) nextSlide();
                                }}
                            >
                                {/* Base Image or Component */}
                                <div className={`absolute inset-0 ${slide.objectFit === 'contain' ? 'bg-white' : 'bg-white'}`}>
                                    {slide.component ? (
                                        slide.component
                                    ) : (
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className={`w-full h-full ${slide.objectFit || 'object-cover'}`}
                                            style={{
                                                objectPosition: slide.objectPosition || 'center',
                                            }}
                                        />
                                    )}
                                    {/* Gradient Overlay for Text Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                </div>

                                {/* Glassmorphic Overlay Content */}
                                <div className="absolute bottom-0 w-full p-6 bg-white/10 backdrop-blur-md border-t border-white/20 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-pink-400 font-bold tracking-widest text-xs mb-1 uppercase">
                                            {slide.vertical}
                                        </span>
                                        <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                                            {slide.title}
                                        </h3>
                                        <p className="text-white/90 font-bold text-xl mb-2">
                                            {metric}
                                        </p>
                                        {isCenter && (
                                            <>
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="text-gray-300 text-sm leading-relaxed text-center line-clamp-2 mb-3"
                                                >
                                                    {description}
                                                </motion.p>
                                                {slide.link && (
                                                    <motion.a
                                                        href={slide.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/50 rounded-full text-xs font-bold text-white uppercase tracking-wider transition-all"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        View Gallery
                                                    </motion.a>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
};

export default Impact;
