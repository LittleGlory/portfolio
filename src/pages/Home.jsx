import React from 'react';
import Hero from '../components/Hero';
import GameSection from '../components/GameSection';
import Marketing from '../components/Marketing';
import Projects from '../components/Projects';
import Process from '../components/Process';
import About from '../components/About';
import Impact from '../components/Impact';
import Contact from '../components/Contact';

import SEO from '../components/SEO';

const Home = () => {
    return (
        <>
            <SEO
                title="Home"
                description="Portfolio of Saakshi Baheti - Creative Content Writer & Frontend Developer."
            />
            <Hero />
            <GameSection />
            <div id="marketing">
                <Marketing />
            </div>
            <Projects />
            {/* Process is removed from display as per request, or just hidden? User said "remove process". 
                I will not include Process component here. */}
            <Impact />
            <About />
        </>
    );
};

export default Home;
