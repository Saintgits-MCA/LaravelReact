
import React from 'react';
import { Link } from 'react-router-dom';
import testImage from "../../images/photo-1524758631624-e2822e304c36.avif"
function About() {
    const values = [
        {
            icon: 'bi-lightbulb',
            title: 'Innovation',
            description: 'We explore better ideas and embrace modern technologies to create meaningful solutions.'
        },
        {
            icon: 'bi-shield-check',
            title: 'Integrity',
            description: 'We believe in honest communication, transparency and building lasting relationships.'
        },
        {
            icon: 'bi-people',
            title: 'Collaboration',
            description: 'We work closely with our clients and treat every project as a shared journey.'
        },
        {
            icon: 'bi-award',
            title: 'Quality',
            description: 'We focus on delivering reliable, thoughtful and high-quality work.'
        }
    ];

    const milestones = [
        { number: '01', title: 'Understand', description: 'We listen to your goals, challenges and expectations.' },
        { number: '02', title: 'Plan', description: 'We create a clear strategy and practical project roadmap.' },
        { number: '03', title: 'Create', description: 'We design and develop a solution around your needs.' },
        { number: '04', title: 'Deliver', description: 'We test, launch and help you move forward.' }
    ];

    return (
        <>
          

            <section className="py-5">
                <div className="container py-4">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <img
                                src={testImage}
                                alt="Our workspace"
                                className="img-fluid rounded-4 shadow"
                            />
                        </div>

                        <div className="col-lg-6">
                            <span className="text-primary fw-semibold">OUR STORY</span>
                            <h2 className="display-6 fw-bold mt-2">
                                We Make Technology Work for People
                            </h2>
                            <p className="text-secondary mt-3">
                                LaravelReact is built around a simple idea:
                                technology should help people and businesses
                                achieve more. We bring together design,
                                development and problem-solving to create
                                useful digital experiences.
                            </p>
                            <p className="text-secondary">
                                We believe every project deserves attention,
                                clear communication and a solution that fits
                                its real requirements. Our approach is practical,
                                collaborative and focused on long-term value.
                            </p>
                            <Link to="/contact" className="btn btn-primary rounded-pill px-4 mt-2">
                                Work With Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-light py-5">
                <div className="container py-4">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                                <div className="text-primary fs-1">
                                    <i className="bi bi-bullseye"></i>
                                </div>
                                <h3 className="fw-bold">Our Mission</h3>
                                <p className="text-secondary mb-0">
                                    To create accessible, reliable and effective
                                    digital solutions that help businesses solve
                                    problems, serve customers and grow with confidence.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                                <div className="text-primary fs-1">
                                    <i className="bi bi-eye"></i>
                                </div>
                                <h3 className="fw-bold">Our Vision</h3>
                                <p className="text-secondary mb-0">
                                    To become a trusted technology partner known
                                    for thoughtful design, dependable development
                                    and meaningful relationships.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-primary fw-semibold">WHAT MATTERS TO US</span>
                        <h2 className="display-6 fw-bold mt-2">Our Core Values</h2>
                    </div>

                    <div className="row g-4">
                        {values.map((value) => (
                            <div className="col-md-6 col-lg-3" key={value.title}>
                                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                    <i className={`bi ${value.icon} fs-1 text-primary mb-3`}></i>
                                    <h5 className="fw-bold">{value.title}</h5>
                                    <p className="text-secondary mb-0">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-light py-5">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-primary fw-semibold">HOW WE WORK</span>
                        <h2 className="display-6 fw-bold mt-2">From Idea to Delivery</h2>
                    </div>

                    <div className="row g-4">
                        {milestones.map((item) => (
                            <div className="col-md-6 col-lg-3" key={item.number}>
                                <div className="bg-white p-4 rounded-4 h-100 shadow-sm">
                                    <span className="display-5 text-primary fw-bold">{item.number}</span>
                                    <h5 className="fw-bold mt-3">{item.title}</h5>
                                    <p className="text-secondary mb-0">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-5 text-center">
                <div className="container py-4">
                    <h2 className="fw-bold">Let's Build Something Great</h2>
                    <p className="text-secondary">
                        Tell us about your goals and let's explore what we can create together.
                    </p>
                    <Link to="/contact" className="btn btn-primary rounded-pill px-4">
                        Get in Touch
                    </Link>
                </div>
            </section>
        </>
    );
}

export default About;
