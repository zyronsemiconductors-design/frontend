import React, { useState } from "react";
import { CareersCTAData } from "../types";
import { sendEmail } from "../utils/emailService";

interface CareersCTAProps {
    data: CareersCTAData;
}

export const CareersCTA: React.FC<CareersCTAProps> = ({ data }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
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
        setLoading(true);
        setSuccess("");
        setError("");

        try {
            await sendEmail({
                endpoint: '/api/contact',
                data: {
                    name: form.name,
                    email: form.email,
                    message: form.message,
                },
            });


            setSuccess(data.successMessage);
            setForm({ name: "", email: "", message: "" });
        } catch (err: any) {
            console.error(err);
            setError(err.message || data.errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-blue-600 rounded-lg py-20">
            <div className="max-w-5xl mx-auto px-6 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {data.title}
                </h2>
                <p className="text-blue-100 mb-10 text-lg">
                    {data.subtitle}
                </p>

                <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto text-gray-900">
                    <div className="space-y-5">
                        <input
                            type="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder={data.namePlaceholder}
                            required
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder={data.emailPlaceholder}
                            required
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder={data.messagePlaceholder}
                            rows={4}
                            required
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {success && <p className="text-green-600 text-sm">{success}</p>}
                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Sending..." : data.buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
