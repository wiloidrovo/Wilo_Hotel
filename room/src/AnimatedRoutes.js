import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Error404 from 'containers/errors/Error404';
import Home from 'containers/pages/Home';
import Services from 'containers/pages/Services';
import Reservations from 'containers/pages/Reservations';
import About from 'containers/pages/About';
import Contact from 'containers/pages/Contact';
import { AnimatePresence } from 'framer-motion';
import Category from 'containers/pages/Category';
import Search from 'containers/pages/Search';

function AnimatedRoutes(){
    const location = useLocation()
    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                {/* Error Display */}
                <Route path="*" element={<Error404 />} />

                {/* Home Display */}
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/about" element={<About />} />
                <Route path="/s/:term" element={<Search />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </AnimatePresence>
    )
}
export default AnimatedRoutes