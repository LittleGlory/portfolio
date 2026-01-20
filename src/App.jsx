import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BlogPost from './pages/BlogPost';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Initiatives from './pages/Initiatives';
import Blogs from './pages/Blogs';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import { HelmetProvider } from 'react-helmet-async';

// ... imports

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
