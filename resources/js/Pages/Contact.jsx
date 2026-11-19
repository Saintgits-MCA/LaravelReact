
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Contact() {

    // Initial form values
    const initialFormData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    };

    // States
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    // Submitted data is hidden initially
    const [submittedData, setSubmittedData] = useState(null);

    // Automatically hide submitted information after 10 seconds
    useEffect(() => {
        if (!submittedData) return;

        const timer = setTimeout(() => {
            setSubmittedData(null);
        }, 10000);

        return () => clearTimeout(timer);

    }, [submittedData]);


    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: null
        }));

        setSuccessMessage('');
        setApiError('');
    };


    // Submit form to Laravel API
   const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});
    setSuccessMessage('');
    setApiError('');
    setSubmittedData(null);

    const submittedFormData = { ...formData };

    try {

        const response = await axios.post(
            '/api/contact',
            submittedFormData,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                timeout: 15000
            }
        );

        setSuccessMessage(
            response.data.message ||
            'Your message has been submitted successfully.'
        );

        setSubmittedData(submittedFormData);
        setFormData(initialFormData);

    } catch (error) {

        console.error('Contact Form Submission Error:', error);

        // Laravel validation error
        if (error.response?.status === 422) {

            setErrors(error.response.data.errors || {});

            setApiError(
                error.response.data.message ||
                'Please correct the errors in the form.'
            );

        }

        // Unauthorized
        else if (error.response?.status === 401) {

            setApiError(
                'Unauthorized request. Please check your API permissions.'
            );

        }

        // Forbidden
        else if (error.response?.status === 403) {

            setApiError(
                'Access forbidden. You do not have permission to submit this form.'
            );

        }

        // API route not found
        else if (error.response?.status === 404) {

            setApiError(
                'Contact API route not found. Please check routes/api.php.'
            );

        }

        // Server error
        else if (error.response?.status >= 500) {

            setApiError(
                error.response.data?.message ||
                'Laravel server error. Please check your Laravel logs.'
            );

        }

        // Other HTTP errors
        else if (error.response) {

            setApiError(
                error.response.data?.message ||
                `Request failed with status ${error.response.status}.`
            );

        }

        // Server unavailable / connection refused
        else if (error.request) {

            setApiError(
                'Cannot connect to Laravel server. Check whether php artisan serve is running and verify your API URL.'
            );

        }

        // Other JavaScript errors
        else {

            setApiError(
                error.message ||
                'An unexpected error occurred.'
            );

        }

    } finally {

        setLoading(false);

    }
};


    return (
        <section className="py-5">
         <div className="text-center mb-4">
            <Link
                to="/contacts"
                className="btn btn-primary  px-2 mx-5 float-end"
            >
                <i className="bi bi-database me-2"></i>
              Contacts List
            </Link>
        </div>

            <div className="container py-4">

                {/* Page Heading */}
                <div className="text-center mb-5">

                    <span className="text-primary fw-semibold">
                        GET IN TOUCH
                    </span>

                    <h2 className="display-6 fw-bold mt-2">
                        Let's Start a Conversation
                    </h2>

                    <p className="text-secondary">
                        Send us a message and tell us how we can help.
                    </p>

                </div>


                <div className="row g-4">

                    {/* Contact Information */}
                    <div className="col-lg-4">

                        <div className="bg-primary text-white rounded-4 p-4 h-100">

                            <h3 className="fw-bold mb-3">
                                Contact Information
                            </h3>

                            <p className="text-white mb-4">
                                You can reach us through any of the following
                                channels. We look forward to hearing from you.
                            </p>


                            {/* Email */}
                            <div className="d-flex gap-3 mb-4">

                                <i className="bi bi-envelope fs-4"></i>

                                <div>
                                    <h6 className="fw-bold mb-1">
                                        Email Address
                                    </h6>

                                    <p className="mb-0 text-white">
                                        hello@example.com
                                    </p>
                                </div>

                            </div>


                            {/* Phone */}
                            <div className="d-flex gap-3 mb-4">

                                <i className="bi bi-telephone fs-4"></i>

                                <div>
                                    <h6 className="fw-bold mb-1">
                                        Phone Number
                                    </h6>

                                    <p className="mb-0 text-white">
                                        +91 98765 43210
                                    </p>
                                </div>

                            </div>


                            {/* Location */}
                            <div className="d-flex gap-3 mb-4">

                                <i className="bi bi-geo-alt fs-4"></i>

                                <div>
                                    <h6 className="fw-bold mb-1">
                                        Our Location
                                    </h6>

                                    <p className="mb-0 text-white">
                                        Kerala, India
                                    </p>
                                </div>

                            </div>


                            <hr className="border-light opacity-50" />


                            {/* Business Hours */}
                            <h6 className="fw-bold mb-3">
                                Business Hours
                            </h6>

                            <p className="text-white mb-1">
                                Monday – Friday: 9 AM – 6 PM
                            </p>

                            <p className="text-white mb-0">
                                Saturday: 10 AM – 2 PM
                            </p>

                        </div>

                    </div>



                    {/* Contact Form */}
                    <div className="col-lg-8">

                        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">

                            <h3 className="fw-bold mb-2">
                                Send Us a Message
                            </h3>

                            <p className="text-secondary mb-4">
                                Fill in the details below and tell us about your enquiry.
                            </p>



                            {/* Success Message */}
                            {successMessage && (

                                <div className="alert alert-success" role="alert">

                                    <i className="bi bi-check-circle me-2"></i>

                                    {successMessage}

                                </div>

                            )}



                            {/* API Error */}
                            {apiError && (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">

        <div className="d-flex align-items-start gap-2">

            <i className="bi bi-exclamation-triangle-fill fs-5"></i>

            <div>
                <strong>Submission Failed</strong>

                <p className="mb-0 mt-1">
                    {apiError}
                </p>
            </div>

        </div>

        <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setApiError('')}
        ></button>

    </div>

                            )}



                            {/* Submitted Information - Hidden Until Successful Submission */}
                            {submittedData && (

                                <div className="alert alert-info mt-2 mb-4" role="status">

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <h5 className="fw-bold mb-0">

                                            <i className="bi bi-database-check me-2"></i>

                                            Submitted Information

                                        </h5>

                                        <button
                                            type="button"
                                            className="btn-close"
                                            aria-label="Close"
                                            onClick={() => setSubmittedData(null)}
                                        ></button>

                                    </div>


                                    <div className="row g-3">

                                        <div className="col-md-6">

                                            <strong>Full Name:</strong>

                                            <p className="mb-0">
                                                {submittedData.name}
                                            </p>

                                        </div>


                                        <div className="col-md-6">

                                            <strong>Email Address:</strong>

                                            <p className="mb-0">
                                                {submittedData.email}
                                            </p>

                                        </div>


                                        <div className="col-md-6">

                                            <strong>Phone Number:</strong>

                                            <p className="mb-0">
                                                {submittedData.phone || 'Not provided'}
                                            </p>

                                        </div>


                                        <div className="col-md-6">

                                            <strong>Subject:</strong>

                                            <p className="mb-0">
                                                {submittedData.subject}
                                            </p>

                                        </div>


                                        <div className="col-12">

                                            <strong>Your Message:</strong>

                                            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                                                {submittedData.message}
                                            </p>

                                        </div>

                                    </div>


                                    <hr />

                                    <small className="text-secondary">

                                        <i className="bi bi-clock me-1"></i>

                                        This information will automatically disappear after 10 seconds.

                                    </small>

                                </div>

                            )}



                            {/* Form */}
                            <form onSubmit={handleSubmit} noValidate>

                                <div className="row g-3">


                                    {/* Full Name */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                        {errors.name && (

                                            <div className="invalid-feedback">
                                                {errors.name[0]}
                                            </div>

                                        )}

                                    </div>



                                    {/* Email */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />

                                        {errors.email && (

                                            <div className="invalid-feedback">
                                                {errors.email[0]}
                                            </div>

                                        )}

                                    </div>



                                    {/* Phone */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                                            placeholder="Your phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />

                                        {errors.phone && (

                                            <div className="invalid-feedback">
                                                {errors.phone[0]}
                                            </div>

                                        )}

                                    </div>



                                    {/* Subject */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Subject
                                        </label>

                                        <input
                                            type="text"
                                            name="subject"
                                            className={`form-control form-control-lg ${errors.subject ? 'is-invalid' : ''}`}
                                            placeholder="What is this about?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />

                                        {errors.subject && (

                                            <div className="invalid-feedback">
                                                {errors.subject[0]}
                                            </div>

                                        )}

                                    </div>



                                    {/* Message */}
                                    <div className="col-12">

                                        <label className="form-label">
                                            Your Message
                                        </label>

                                        <textarea
                                            name="message"
                                            rows="5"
                                            className={`form-control resize-none ${errors.message ? 'is-invalid' : ''}`}
                                            placeholder="Tell us about your project or enquiry..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>

                                        {errors.message && (

                                            <div className="invalid-feedback">
                                                {errors.message[0]}
                                            </div>

                                        )}

                                    </div>



                                    {/* Submit Button */}
                                    <div className="col-12 mt-4">

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg rounded-pill px-5"
                                            disabled={loading}
                                        >

                                            {loading ? (

                                                <>

                                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                                    Sending...

                                                </>

                                            ) : (

                                                <>

                                                    Send Message

                                                    <i className="bi bi-arrow-right ms-2"></i>

                                                </>

                                            )}

                                        </button>

                                    </div>


                                </div>

                            </form>


                        </div>

                    </div>


                </div>

            </div>

        </section>

    );

}

export default Contact;
