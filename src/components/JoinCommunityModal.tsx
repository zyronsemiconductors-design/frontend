import React, { useState } from "react";
import { X, Send, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail } from "../utils/emailService";

interface JoinCommunityModalProps {
    open: boolean;
    onClose: () => void;
}

const JoinCommunityModal: React.FC<JoinCommunityModalProps> = ({
    open,
    onClose,
}) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        interest: "",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.interest) {
            setError("Please fill all required fields.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await sendEmail({
                endpoint: '/api/contact/community',
                data: {
                    name: form.name,
                    email: form.email,
                    interest: form.interest,
                    message: form.message,
                },
            });

            setSuccess("Welcome to Zyron Community! We’ll be in touch soon.");
            setForm({ name: "", email: "", interest: "", message: "" });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to send. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 text-gray-900 flex items-center justify-center bg-black/60 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 40, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        >
                            <X />
                        </button>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                                <Users size={28} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Join the Zyron Community
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Be part of our network of engineers, innovators & learners.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your Name *"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Your Email *"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="text"
                                name="interest"
                                value={form.interest}
                                onChange={handleChange}
                                placeholder="Role / Interest (VLSI, FPGA, Student...) *"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Why do you want to join?"
                                className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {success && <p className="text-green-600 text-sm">{success}</p>}
                            {error && <p className="text-red-600 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
                            >
                                {loading ? "Joining..." : "Join Community"} <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default JoinCommunityModal;
