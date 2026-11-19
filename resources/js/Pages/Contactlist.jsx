import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ContactsList() {
    // Contacts and loading states
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [saving, setSaving] = useState(false);

    // Pagination state
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: null,
        to: null,
    });

    // Edit modal state
    const [editingId, setEditingId] = useState(null);

    // Edit form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [validationErrors, setValidationErrors] = useState({});

    // =====================================
    // FETCH PAGINATED CONTACTS FROM LARAVEL
    // =====================================

    const fetchContacts = async (page = 1) => {
        try {
            setLoading(true);
            setApiError("");

            const response = await axios.get("/api/contacts", {
                params: {
                    page: page,
                },
                headers: {
                    Accept: "application/json",
                },
                timeout: 15000,
            });

            // Set contacts for the selected page
            setContacts(response.data.data || []);

            // Set pagination information
            setPagination(
                response.data.pagination || {
                    current_page: 1,
                    last_page: 1,
                    per_page: 3,
                    total: 0,
                    from: null,
                    to: null,
                },
            );
        } catch (error) {
            console.error("Fetch Contacts Error:", error);

            if (error.response) {
                setApiError(
                    error.response.data?.message ||
                        `Request failed with status ${error.response.status}.`,
                );
            } else if (error.request) {
                setApiError(
                    "Cannot connect to Laravel server. Check whether php artisan serve is running.",
                );
            } else {
                setApiError(error.message || "Unable to load contacts.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Load first page when component opens
    useEffect(() => {
        fetchContacts(1);
    }, []);

    // =====================================
    // PAGINATION PAGE NUMBERS
    // =====================================

    const getPageNumbers = () => {
        const pages = [];

        const lastPage = pagination.last_page;
        const currentPage = pagination.current_page;

        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(lastPage, startPage + 4);
        const adjustedStart = Math.max(1, endPage - 4);

        for (let i = adjustedStart; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    // =====================================
    // OPEN EDIT MODAL
    // =====================================

    const handleEdit = (contact) => {
        setEditingId(contact.id);

        setFormData({
            name: contact.name || "",
            email: contact.email || "",
            phone: contact.phone || "",
            subject: contact.subject || "",
            message: contact.message || "",
        });

        setValidationErrors({});
        setApiError("");
        setSuccessMessage("");
    };

    // =====================================
    // HANDLE EDIT FORM CHANGES
    // =====================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setValidationErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
    };

    // =====================================
    // CLOSE EDIT MODAL
    // =====================================

    const handleCancel = () => {
        if (saving) return;

        setEditingId(null);
        setValidationErrors({});
    };

    // =====================================
    // UPDATE CONTACT IN LARAVEL
    // =====================================

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setValidationErrors({});
            setApiError("");
            setSuccessMessage("");

            const response = await axios.put(
                `/api/contacts/${editingId}`,
                formData,
                {
                    headers: {
                        Accept: "application/json",
                    },
                },
            );

            setSuccessMessage(
                response.data.message || "Contact updated successfully!",
            );

            setEditingId(null);

            // Reload the current page after updating
            await fetchContacts(pagination.current_page);
        } catch (error) {
            console.error("Update Contact Error:", error);

            if (error.response?.status === 422) {
                setValidationErrors(error.response.data.errors || {});
            } else if (error.response) {
                setApiError(
                    error.response.data?.message ||
                        `Update failed with status ${error.response.status}.`,
                );
            } else if (error.request) {
                setApiError("Cannot connect to Laravel server.");
            } else {
                setApiError(error.message || "Unable to update contact.");
            }
        } finally {
            setSaving(false);
        }
    };

    // =====================================
    // GO TO SELECTED PAGE
    // =====================================

    const handlePageChange = (page) => {
        if (
            page < 1 ||
            page > pagination.last_page ||
            page === pagination.current_page
        ) {
            return;
        }

        fetchContacts(page);
    };

    // =====================================
    // RETURN JSX
    // =====================================

    return (
        <section className="py-5">
            <div className="container py-4">
                {/* PAGE HEADING */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                    <div>
                        <span className="text-primary fw-semibold">
                            CONTACT MANAGEMENT
                        </span>

                        <h2 className="fw-bold mt-2 mb-1">Saved Contacts</h2>

                        <p className="text-secondary mb-0">
                            View and manage submitted contact messages.
                        </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="d-flex gap-2">
                        <button
                            type="button"
                            className="btn btn-primary rounded-pill px-3"
                            onClick={() =>
                                fetchContacts(pagination.current_page)
                            }
                            disabled={loading}
                        >
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Refresh
                        </button>

                        <Link
                            to="/contact"
                            className="btn btn-primary rounded-pill px-3"
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            New Contact
                        </Link>
                    </div>
                </div>

                {/* SUCCESS MESSAGE */}
                {successMessage && (
                    <div className="alert alert-success alert-dismissible fade show">
                        <i className="bi bi-check-circle me-2"></i>

                        {successMessage}

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setSuccessMessage("")}
                        ></button>
                    </div>
                )}

                {/* API ERROR */}
                {apiError && (
                    <div className="alert alert-danger" role="alert">
                        <i className="bi bi-exclamation-triangle me-2"></i>

                        {apiError}
                    </div>
                )}

                {/* TOTAL CONTACT COUNT */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                                <i className="bi bi-people fs-3 text-primary"></i>
                            </div>

                            <div>
                                <h3 className="fw-bold mb-0">
                                    {pagination.total}
                                </h3>

                                <p className="text-secondary mb-0">
                                    Total Saved Contacts
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LOADING */}
                {loading && (
                    <div className="text-center py-5">
                        <div
                            className="spinner-border text-primary"
                            role="status"
                        ></div>

                        <p className="text-secondary mt-3">
                            Loading contacts...
                        </p>
                    </div>
                )}

                {/* EMPTY CONTACTS */}
                {!loading && !apiError && contacts.length === 0 && (
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body text-center py-5">
                            <i className="bi bi-inbox display-3 text-secondary"></i>

                            <h4 className="fw-bold mt-3">No Contacts Found</h4>

                            <p className="text-secondary">
                                No contact messages have been saved yet.
                            </p>

                            <Link
                                to="/contact"
                                className="btn btn-primary rounded-pill px-4"
                            >
                                Submit a Contact
                            </Link>
                        </div>
                    </div>
                )}

                {/* CONTACTS TABLE */}
                {!loading && !apiError && contacts.length > 0 && (
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="px-4 py-3">#</th>
                                            <th className="py-3">Name</th>
                                            <th className="py-3">Email</th>
                                            <th className="py-3">Phone</th>
                                            <th className="py-3">Subject</th>
                                            <th className="py-3">Message</th>
                                            <th className="py-3">
                                                Submitted Date
                                            </th>
                                            <th className="py-3 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {contacts.map((contact, index) => (
                                            <tr key={contact.id}>
                                                {/* GLOBAL RECORD NUMBER */}
                                                <td className="px-4">
                                                    {(pagination.current_page -
                                                        1) *
                                                        pagination.per_page +
                                                        index +
                                                        1}
                                                </td>

                                                {/* NAME */}
                                                <td className="fw-semibold">
                                                    {contact.name}
                                                </td>

                                                {/* EMAIL */}
                                                <td>{contact.email}</td>

                                                {/* PHONE */}
                                                <td>
                                                    {contact.phone || "N/A"}
                                                </td>

                                                {/* SUBJECT */}
                                                <td>{contact.subject}</td>

                                                {/* MESSAGE */}
                                                <td
                                                    style={{
                                                        minWidth: "220px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            whiteSpace:
                                                                "pre-wrap",
                                                            overflowWrap:
                                                                "anywhere",
                                                        }}
                                                    >
                                                        {contact.message}
                                                    </div>
                                                </td>

                                                {/* SUBMITTED DATE */}
                                                <td>
                                                    {contact.created_at
                                                        ? new Date(
                                                              contact.created_at,
                                                          ).toLocaleDateString()
                                                        : "N/A"}
                                                </td>

                                                {/* EDIT BUTTON */}
                                                <td className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-primary rounded-pill px-3"
                                                        onClick={() =>
                                                            handleEdit(contact)
                                                        }
                                                    >
                                                        <i className="bi bi-pencil-fill me-1"></i>
                                                        
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* =================================
                                PAGINATION FOOTER
                            ================================= */}

                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 p-3 border-top">
                                {/* RECORD INFORMATION */}
                                <div className="text-secondary small">
                                    Showing{" "}
                                    <strong>{pagination.from || 0}</strong> to{" "}
                                    <strong>{pagination.to || 0}</strong> of{" "}
                                    <strong>{pagination.total}</strong> contacts
                                </div>

                                {/* PAGINATION BUTTONS */}
                                {pagination.last_page >= 1 && (
                                    <nav aria-label="Contacts pagination">
                                        <ul className="pagination pagination-sm mb-0">
                                            {/* PREVIOUS BUTTON */}
                                            <li
                                                className={`page-item ${pagination.current_page === 1 ? "disabled" : ""}`}
                                            >
                                                <button
                                                    type="button"
                                                    className="page-link"
                                                    disabled={
                                                        loading ||
                                                        pagination.current_page ===
                                                            1
                                                    }
                                                    onClick={() =>
                                                        handlePageChange(
                                                            pagination.current_page -
                                                                1,
                                                        )
                                                    }
                                                >
                                                    Previous
                                                </button>
                                            </li>

                                            {/* FIRST PAGE AND ELLIPSIS */}
                                            {getPageNumbers()[0] > 1 && (
                                                <>
                                                    <li className="page-item">
                                                        <button
                                                            type="button"
                                                            className="page-link"
                                                            disabled={loading}
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    1,
                                                                )
                                                            }
                                                        >
                                                            1
                                                        </button>
                                                    </li>

                                                    {getPageNumbers()[0] >
                                                        2 && (
                                                        <li className="page-item disabled">
                                                            <span className="page-link">
                                                                ...
                                                            </span>
                                                        </li>
                                                    )}
                                                </>
                                            )}

                                            {/* PAGE NUMBERS */}
                                            {getPageNumbers().map((page) => (
                                                <li
                                                    key={page}
                                                    className={`page-item ${pagination.current_page === page ? "active" : ""}`}
                                                >
                                                    <button
                                                        type="button"
                                                        className="page-link"
                                                        disabled={loading}
                                                        onClick={() =>
                                                            handlePageChange(
                                                                page,
                                                            )
                                                        }
                                                    >
                                                        {page}
                                                    </button>
                                                </li>
                                            ))}

                                            {/* LAST PAGE AND ELLIPSIS */}
                                            {getPageNumbers()[
                                                getPageNumbers().length - 1
                                            ] < pagination.last_page && (
                                                <>
                                                    {getPageNumbers()[
                                                        getPageNumbers()
                                                            .length - 1
                                                    ] <
                                                        pagination.last_page -
                                                            1 && (
                                                        <li className="page-item disabled">
                                                            <span className="page-link">
                                                                ...
                                                            </span>
                                                        </li>
                                                    )}

                                                    <li className="page-item">
                                                        <button
                                                            type="button"
                                                            className="page-link"
                                                            disabled={loading}
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    pagination.last_page,
                                                                )
                                                            }
                                                        >
                                                            {
                                                                pagination.last_page
                                                            }
                                                        </button>
                                                    </li>
                                                </>
                                            )}

                                            {/* NEXT BUTTON */}
                                            <li
                                                className={`page-item ${pagination.current_page === pagination.last_page ? "disabled" : ""}`}
                                            >
                                                <button
                                                    type="button"
                                                    className="page-link"
                                                    disabled={
                                                        loading ||
                                                        pagination.current_page ===
                                                            pagination.last_page
                                                    }
                                                    onClick={() =>
                                                        handlePageChange(
                                                            pagination.current_page +
                                                                1,
                                                        )
                                                    }
                                                >
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* =================================
                EDIT CONTACT MODAL
            ================================= */}

            {editingId !== null && (
                <>
                    {/* MODAL BACKGROUND */}
                    <div
                        className="modal-backdrop fade show"
                        style={{ zIndex: 1050 }}
                        onClick={handleCancel}
                    ></div>

                    {/* MODAL */}
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="editContactTitle"
                        style={{ zIndex: 1055 }}
                        onClick={handleCancel}
                    >
                        <div
                            className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
                            role="document"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-content border-0 shadow rounded-4">
                                {/* MODAL HEADER */}
                                <div className="modal-header px-4 py-3">
                                    <div>
                                        <h4
                                            className="modal-title fw-bold"
                                            id="editContactTitle"
                                        >
                                            <i className="bi bi-pencil-square text-primary me-2"></i>
                                            Edit Contact
                                        </h4>

                                        <small className="text-secondary">
                                            Update contact details — ID:{" "}
                                            {editingId}
                                        </small>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleCancel}
                                        disabled={saving}
                                        aria-label="Close"
                                    ></button>
                                </div>

                                {/* MODAL BODY */}
                                <div className="modal-body p-4">
                                    <form
                                        id="editContactForm"
                                        onSubmit={handleUpdate}
                                    >
                                        <div className="row g-3">
                                            {/* NAME */}
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="name"
                                                    className={`form-control ${validationErrors.name ? "is-invalid" : ""}`}
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                {validationErrors.name && (
                                                    <div className="invalid-feedback">
                                                        {
                                                            validationErrors
                                                                .name[0]
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            {/* EMAIL */}
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Email
                                                </label>

                                                <input
                                                    type="email"
                                                    name="email"
                                                    className={`form-control ${validationErrors.email ? "is-invalid" : ""}`}
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                {validationErrors.email && (
                                                    <div className="invalid-feedback">
                                                        {
                                                            validationErrors
                                                                .email[0]
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            {/* PHONE */}
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Phone
                                                </label>

                                                <input
                                                    type="text"
                                                    name="phone"
                                                    className={`form-control ${validationErrors.phone ? "is-invalid" : ""}`}
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />

                                                {validationErrors.phone && (
                                                    <div className="invalid-feedback">
                                                        {
                                                            validationErrors
                                                                .phone[0]
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            {/* SUBJECT */}
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Subject
                                                </label>

                                                <input
                                                    type="text"
                                                    name="subject"
                                                    className={`form-control ${validationErrors.subject ? "is-invalid" : ""}`}
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                {validationErrors.subject && (
                                                    <div className="invalid-feedback">
                                                        {
                                                            validationErrors
                                                                .subject[0]
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            {/* MESSAGE */}
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">
                                                    Message
                                                </label>

                                                <textarea
                                                    name="message"
                                                    rows="4"
                                                    className={`form-control ${validationErrors.message ? "is-invalid" : ""}`}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>

                                                {validationErrors.message && (
                                                    <div className="invalid-feedback">
                                                        {
                                                            validationErrors
                                                                .message[0]
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* MODAL FOOTER */}
                                <div className="modal-footer px-4 py-3">
                                    <button
                                        type="button"
                                        className="btn btn-secondary rounded-pill px-4"
                                        onClick={handleCancel}
                                        disabled={saving}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        form="editContactForm"
                                        className="btn btn-primary rounded-pill px-4"
                                        disabled={saving}
                                    >
                                        {saving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-lg me-2"></i>
                                                Update Contact
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default ContactsList;
