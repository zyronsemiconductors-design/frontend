import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail } from "../utils/emailService";

interface Props {
    open: boolean;
    onClose: () => void;
}

const ResourcesModal: React.FC<Props> = ({ open, onClose }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        topic: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.topic) {
            setError("Please fill all required fields.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await sendEmail({
                endpoint: '/api/contact/resources/enquiry',
                data: {
                    name: form.name,
                    email: form.email,
                    topic: form.topic,
                    message: form.message,
                },
            });
            setSuccess("Inquiry sent successfully! Our experts will contact you soon.");
            setForm({ name: "", email: "", topic: "", message: "" });
            setTimeout(onClose, 2000);
        } catch (err: any) {
            setError(err.message || "Failed to send enquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex  text-gray-900 items-center justify-center bg-black/50 px-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X />
                        </button>

                        <h3 className="text-2xl font-bold mb-2 text-gray-900">
                            Need Expert Guidance?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Tell us your challenge and our experts will connect with you.
                        </p>

                        <div className="space-y-4">
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your Name *"
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Your Email *"
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            <input
                                name="topic"
                                value={form.topic}
                                onChange={handleChange}
                                placeholder="Topic / Area of interest *"
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Brief description (optional)"
                                className="w-full border rounded-lg px-4 py-2"
                            />

                            {success && <p className="text-green-600 text-sm">{success}</p>}
                            {error && <p className="text-red-600 text-sm">{error}</p>}

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Request Guidance"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResourcesModal;
