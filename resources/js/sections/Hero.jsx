
import React from 'react';
import { Link } from 'react-router-dom';
import teamImage from '../../images/photo-1498050108023-c5249f4df085.avif'

function Hero() {
    return (
        <section className="bg-light py-5">
            <div className="container py-lg-5">
                <div className="row align-items-center g-5">

                    <div className="col-lg-6">
                        <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
                            Welcome to LaravelReact
                        </span>

                        <h1 className="display-4 fw-bold lh-sm">
                            We Build Digital Solutions
                            <span className="text-primary"> For Your Business</span>
                        </h1>

                        <p className="lead text-secondary mt-4">
                            Transform your ideas into powerful digital experiences.
                            We help businesses grow with modern websites, creative
                            designs and innovative technology.
                        </p>

                        <div className="d-flex flex-wrap gap-3 mt-4">
                            <Link
                                to="/services"
                                className="btn btn-primary btn-lg rounded-pill px-4"
                            >
                                Explore Our Services
                                <i className="bi bi-arrow-right ms-2"></i>
                            </Link>

                            <Link
                                to="/contact"
                                className="btn btn-dark btn-lg rounded-pill px-4"
                            >
                                Get In Touch
                            </Link>
                        </div>

                        <div className="row mt-5 g-3">
                            <div className="col-4">
                                <h3 className="fw-bold text-primary mb-0">50+</h3>
                                <small className="text-secondary">Projects</small>
                            </div>

                            <div className="col-4">
                                <h3 className="fw-bold text-primary mb-0">30+</h3>
                                <small className="text-secondary">Happy Clients</small>
                            </div>

                            <div className="col-4">
                                <h3 className="fw-bold text-primary mb-0">5+</h3>
                                <small className="text-secondary">Years Experience</small>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="position-relative">
                            <img
                                src={teamImage}
                                alt="Developer working on a computer"
                                className="img-fluid rounded-4 shadow-lg"
                            />

                            <div className="bg-white shadow rounded-4 p-3 position-absolute bottom-0 ms-0 m-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-primary-subtle text-primary rounded-circle p-3">
                                        <i className="bi bi-lightning-charge-fill fs-4"></i>
                                    </div>
                                    <div>
                                        <h6 className="fw-bold mb-1">Creative Solutions</h6>
                                        <small className="text-secondary">
                                            Ideas into reality
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;
