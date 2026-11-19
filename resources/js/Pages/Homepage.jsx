
import React from 'react';
import { Link } from 'react-router-dom';
import teamImage from '../../images/photo-1521737711867-e3b97375f902.avif';
import Hero from '../sections/Hero';
import Features from '../sections/Features';

function HomePage() {
    const services = [
        {
            icon: 'bi-code-slash',
            title: 'Web Development',
            description: 'Modern, responsive and scalable websites built around your business needs.'
        },
        {
            icon: 'bi-palette',
            title: 'UI/UX Design',
            description: 'Beautiful and user-friendly designs that make every interaction meaningful.'
        },
        {
            icon: 'bi-phone',
            title: 'Mobile Applications',
            description: 'Powerful mobile experiences that help you connect with your customers.'
        }
    ];

    const testimonials = [
        {
            name: 'John Mathew',
            role: 'Business Owner',
            review: 'The team understood our requirements and delivered a professional solution. The entire experience was smooth.'
        },
        {
            name: 'Sarah Thomas',
            role: 'Entrepreneur',
            review: 'Excellent communication, creative ideas and a great attention to detail. I would definitely recommend them.'
        },
        {
            name: 'David Wilson',
            role: 'Startup Founder',
            review: 'A reliable team that helped us turn our ideas into a working digital product.'
        }
    ];

    return (
        <>
            <Hero />

            <Features />

            {/* Introduction */}
            <section className="py-5">
                <div className="container py-4">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <img
                                src={teamImage}
                                alt="Team working together"
                                className="img-fluid rounded-4 shadow"  style={{
        width: '80%',
        height: '350px',
        objectFit: 'cover'
    }}
                            />
                        </div>

                        <div className="col-lg-6">
                            <span className="text-primary fw-semibold">WHO WE ARE</span>

                            <h2 className="display-6 fw-bold mt-2">
                                Turning Ideas Into Digital Experiences
                            </h2>

                            <p className="text-secondary mt-3">
                                We believe that great digital products begin with
                                understanding people and their needs. Our team
                                combines creativity, technology and strategy to
                                deliver solutions that make a difference.
                            </p>

                            <p className="text-secondary">
                                Whether you are starting a new business or
                                improving an existing one, we are here to help
                                you move forward with confidence.
                            </p>

                            <Link to="/about" className="btn btn-primary rounded-pill px-4 mt-2">
                                Discover Our Story
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-5 bg-light">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-primary fw-semibold">WHAT WE DO</span>

                        <h2 className="display-6 fw-bold mt-2">
                            Our Services
                        </h2>

                        <p className="text-secondary">
                            Everything you need to build and grow your digital presence.
                        </p>
                    </div>

                    <div className="row g-4">
                        {services.map((service) => (
                            <div className="col-md-4" key={service.title}>
                                <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
                                    <div className="text-primary fs-1 mb-3">
                                        <i className={`bi ${service.icon}`}></i>
                                    </div>

                                    <h4 className="fw-bold">{service.title}</h4>

                                    <p className="text-secondary mb-0">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/services" className="btn btn-outline-primary rounded-pill px-4">
                            View All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-5">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-primary fw-semibold">TESTIMONIALS</span>

                        <h2 className="display-6 fw-bold mt-2">
                            What People Say
                        </h2>

                        <p className="text-secondary">
                            A few words from people who have worked with us.
                        </p>
                    </div>

                    <div className="row g-4">
                        {testimonials.map((item) => (
                            <div className="col-md-4" key={item.name}>
                                <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
                                    <div className="text-warning mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i className="bi bi-star-fill me-1" key={star}></i>
                                        ))}
                                    </div>

                                    <p className="text-secondary">
                                        "{item.review}"
                                    </p>

                                    <div className="mt-auto">
                                        <h6 className="fw-bold mb-1">{item.name}</h6>
                                        <small className="text-secondary">{item.role}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-5 bg-primary text-white">
                <div className="container text-center py-4">
                    <h2 className="display-6 fw-bold">
                        Have a Project in Mind?
                    </h2>

                    <p className="lead mt-3">
                        Let's discuss your ideas and create something meaningful together.
                    </p>

                    <Link to="/contact" className="btn btn-light btn-lg rounded-pill px-5 mt-3">
                        Contact Us
                    </Link>
                </div>
            </section>
        </>
    );
}

export default HomePage;
