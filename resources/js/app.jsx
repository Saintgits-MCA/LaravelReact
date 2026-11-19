
import React from 'react';
import { createRoot } from 'react-dom/client';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Custom CSS
import '../css/app.css';

// Layout
import MainLayout from './Layouts/mainlayouts';

// Pages
import HomePage from './Pages/Homepage';
import About from './Pages/About';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Contactlist from './Pages/Contactlist';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/contacts" element={<Contactlist />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById('app');

if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
