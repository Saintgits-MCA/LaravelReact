
import React from 'react';

const features = [
    {
        icon: 'bi-code-slash',
        title: 'Web Development',
        description:
            'We develop responsive, fast and scalable websites using modern technologies to support your business goals.',
    },
    {
        icon: 'bi-palette',
        title: 'Creative UI/UX Design',
        description:
            'We create attractive and easy-to-use interfaces that provide a smooth and enjoyable experience for your visitors.',
    },
    {
        icon: 'bi-phone',
        title: 'Mobile Friendly',
        description:
            'Our websites work smoothly across desktops, tablets and smartphones so your customers can access them anywhere.',
    },
    {
        icon: 'bi-speedometer2',
        title: 'High Performance',
        description:
            'We focus on optimized code, fast loading times and reliable performance for a better user experience.',
    },
    {
        icon: 'bi-shield-check',
        title: 'Secure Solutions',
        description:
            'We follow good development practices to help protect your website, business information and customer data.',
    },
    {
        icon: 'bi-headset',
        title: 'Reliable Support',
        description:
            'We provide ongoing assistance and guidance to help keep your digital products running smoothly.',
    },
];

function Features() {
    return (
        <section className="py-5">
            <div className="container py-lg-4">

                <div className="text-center mb-5">
                    <span className="text-primary fw-semibold">
                        OUR FEATURES
                    </span>

                    <h2 className="display-6 fw-bold mt-2">
                        Why Choose Us?
                    </h2>

                    <p className="text-secondary mx-auto mt-3" style={{ maxWidth: '650px' }}>
                        We combine technology, creativity and experience to
                        deliver digital solutions that help your business move forward.
                    </p>
                </div>

                <div className="row g-4">
                    {features.map((feature) => (
                        <div className="col-md-6 col-lg-4" key={feature.title}>
                            <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
                                <div
                                    className="bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: '60px', height: '60px' }}
                                >
                                    <i className={`bi ${feature.icon} fs-3`}></i>
                                </div>

                                <h4 className="fw-bold mb-3">
                                    {feature.title}
                                </h4>

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
