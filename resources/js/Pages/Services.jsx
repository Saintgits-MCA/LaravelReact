
import React from 'react';

const features = [
    {
        icon: 'bi-lightning-charge',
        title: 'High Performance',
        description: 'Experience fast, reliable and optimized application performance.',
    },
    {
        icon: 'bi-shield-check',
        title: 'Secure Platform',
        description: 'Keep your information protected with modern security practices.',
    },
    {
        icon: 'bi-phone',
        title: 'Fully Responsive',
        description: 'Enjoy a seamless experience across desktop, tablet and mobile.',
    },
    {
        icon: 'bi-gear',
        title: 'Easy Management',
        description: 'Manage your daily activities with simple and powerful tools.',
    },
];

function Features() {
    return (
        <section className="features-section py-5" id="features">
            <div className="container py-5">

                <div className="text-center mb-5">
                    <span className="section-label">OUR FEATURES</span>

                    <h2 className="display-5 fw-bold mt-3">
                        Everything You Need
                    </h2>

                    <p className="text-secondary">
                        Powerful features to make your work easier.
                    </p>
                </div>

                <div className="row g-4">
                    {features.map((feature) => (
                        <div className="col-md-6 col-lg-3" key={feature.title}>
                            <div className="feature-card h-100">

                                <div className="feature-icon">
                                    <i className={`bi ${feature.icon}`}></i>
                                </div>

                                <h5 className="fw-bold mt-4">
                                    {feature.title}
                                </h5>

                                <p className="text-secondary mb-0">
                                    {feature.description}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Features;
