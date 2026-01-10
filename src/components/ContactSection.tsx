import React, { useState } from "react";
import { MapPin, Mail, Phone, Send, Globe } from "lucide-react";
import { sendEmail } from "../utils/emailService";

interface ContactData {
    title: string;
    formTitle: string;
    address: { label: string; value: string };
    emails: { label: string; general: string; hr: string };
    phone: { label: string; number: string; hours: string };
    website: { label: string; url: string; text: string };
}

interface ContactSectionProps {
    data: ContactData;
}

const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
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

            setSuccess("Message sent successfully! We'll get back to you soon.");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err: any) {
            setError(err.message || "Failed to send message. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-gray-50" id="contact">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Info */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
                            {data.title}
                        </h2>

                        <div className="space-y-8">
                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <MapPin />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {data.address.label}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {data.address.value}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Mail />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {data.emails.label}
                                    </h4>
                                    <p className="text-gray-600">
                                        General: {data.emails.general} <br />
                                        Hr: {data.emails.hr}
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Phone />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {data.phone.label}
                                    </h4>
                                    <p className="text-gray-600">
                                        {data.phone.number} <br />
                                        ({data.phone.hours})
                                    </p>
                                </div>
                            </div>

                            {/* Website */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Globe />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {data.website.label}
                                    </h4>
                                    <a
                                        href={data.website.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-blue-600 underline"
                                    >
                                        {data.website.text}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-8 md:p-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            {data.formTitle}
                        </h3>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                    className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-blue-600"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    required
                                    className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-blue-600"
                            />

                            <textarea
                                rows={4}
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                required
                                className="w-full border-b border-gray-300 bg-transparent py-2 resize-none focus:outline-none focus:border-blue-600"
                            />

                            {success && <p className="text-green-600 text-sm">{success}</p>}
                            {error && <p className="text-red-600 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Send Message"} <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
