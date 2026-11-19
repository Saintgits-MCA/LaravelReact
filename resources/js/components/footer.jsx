
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-3">
            <div className="container">

                <div className="row g-4">

                    <div className="col-lg-4">
                        <h3 className="fw-bold">
                            Laravel<span className="text-primary">React</span>
                        </h3>

                        <p className="text-white-50 mt-3">
                            We help businesses grow through modern technology,
                            creative solutions and reliable digital services.
                            Let's build something great together.
                        </p>

                        <div className="d-flex gap-3 mt-4">
                            <a href="https://facebook.com" className="text-white fs-5" aria-label="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://instagram.com" className="text-white fs-5" aria-label="Instagram">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://linkedin.com" className="text-white fs-5" aria-label="LinkedIn">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href="https://twitter.com" className="text-white fs-5" aria-label="Twitter">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-6 col-lg-2">
                        <h5 className="fw-semibold mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
                            <li className="mb-2"><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
                            <li className="mb-2"><Link to="/services" className="text-white-50 text-decoration-none">Services</Link></li>
                            <li className="mb-2"><Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3">
                        <h5 className="fw-semibold mb-3">Our Services</h5>
                        <ul className="list-unstyled text-white-50">
                            <li className="mb-2">Web Development</li>
                            <li className="mb-2">UI/UX Design</li>
                            <li className="mb-2">Mobile Applications</li>
                            <li className="mb-2">Digital Consulting</li>
                        </ul>
                    </div>

                    <div className="col-lg-3">
                        <h5 className="fw-semibold mb-3">Contact Us</h5>
                        <p className="text-white-50 mb-2">
                            <i className="bi bi-envelope me-2"></i>
                            shift@gmail.com
                        </p>
                        <p className="text-white-50 mb-2">
                            <i className="bi bi-telephone me-2"></i>
                            +91 98765 43210
                        </p>
                        <p className="text-white-50">
                            <i className="bi bi-geo-alt me-2"></i>
                            Kerala, India
                        </p>
                    </div>

                </div>

                <hr className="border-secondary my-4" />

                <div className="text-center text-white-50">
                    <small>
                        © {new Date().getFullYear()} LaravelReact. All rights reserved.
                    </small>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
