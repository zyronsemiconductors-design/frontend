import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { sendEmail } from "../utils/emailService";

interface Props {
    open: boolean;
    onClose: () => void;
    jobTitle: string;
}

const ApplyJobModal: React.FC<Props> = ({ open, onClose, jobTitle }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        resume: null as File | null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    if (!open) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setForm({ ...form, resume: e.target.files[0] });
            setErrors({ ...errors, resume: "" });
        }
    };

    /* ---------- Validation ---------- */
    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim())
            newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = "Invalid email address";

        if (!form.phone.trim()) newErrors.phone = "Phone is required";
        if (!form.message.trim())
            newErrors.message = "Message is required";

        if (!form.resume)
            newErrors.resume = "Please upload your resume";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const data: any = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                position: jobTitle,
                message: form.message,
                resumeBase64: form.resume ? await toBase64(form.resume) : "",
                resumeName: form.resume?.name
            };

            await sendEmail({
                data, endpoint: '/api/contact/apply'
            });

            setSuccess("Application sent successfully!");
            setForm({
                name: "",
                email: "",
                phone: "",
                message: "",
                resume: null,
            });

            setTimeout(onClose, 1500);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to send application. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                >
                    <X />
                </button>

                <h3 className="text-2xl font-bold mb-1">Apply for</h3>
                <p className="text-blue-600 font-semibold mb-6">{jobTitle}</p>

                <div className="space-y-4 text-gray-900">
                    {/* Name */}
                    <div>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                    </div>

                    {/* Message */}
                    <div>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Short message"
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        {errors.message && (
                            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                        )}
                    </div>

                    {/* Resume */}
                    <div>
                        <input type="file" onChange={handleFile} accept=".pdf,.doc,.docx" />
                        {errors.resume && (
                            <p className="text-red-500 text-xs mt-1">{errors.resume}</p>
                        )}
                    </div>

                    {success && <p className="text-green-600 text-sm">{success}</p>}
                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? "Sending..." : "Submit Application"} <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplyJobModal;

/* ---------- Helper ---------- */
const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
