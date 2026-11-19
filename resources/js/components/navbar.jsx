
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {

    // Load saved theme or use light mode by default
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    // Apply theme to the entire application
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Toggle dark and light mode
    const toggleDarkMode = () => {
        setDarkMode(previous => !previous);
    };

    return (
        <nav className={`navbar navbar-expand-lg sticky-top shadow-sm py-3 ${darkMode ? 'navbar-dark-mode' : 'navbar-light bg-white'}`}>

            <div className="container">

                {/* BRAND */}
                <Link to="/" className="navbar-brand fw-bold fs-3">
                    Laravel<span className="text-primary">React</span>
                </Link>


                {/* MOBILE TOGGLE */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="mainNavbar">

                    <ul className="navbar-nav ms-auto align-items-center gap-lg-4">

                        {/* HOME */}
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active text-primary fw-semibold' : ''}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>


                        {/* ABOUT */}
                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active text-primary fw-semibold' : ''}`
                                }
                            >
                                About
                            </NavLink>
                        </li>


                        {/* SERVICES */}
                        <li className="nav-item">
                            <NavLink
                                to="/services"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active text-primary fw-semibold' : ''}`
                                }
                            >
                                Services
                            </NavLink>
                        </li>


                        {/* CONTACT */}
                        <li className="nav-item">
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active text-primary fw-semibold' : ''}`
                                }
                            >
                                Contact
                            </NavLink>
                        </li>


                        {/* DARK MODE BUTTON */}
                        <li className="nav-item ms-lg-2">

                            <button
                                type="button"
                                className="theme-toggle-btn"
                                onClick={toggleDarkMode}
                                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >

                                {darkMode ? (
                                    <>
                                        <i className="bi bi-sun-fill"></i>
                                        <span>Light Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-moon-stars-fill"></i>
                                        <span>Dark Mode</span>
                                    </>
                                )}

                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
