import React from "react";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import Section from "../components/ui/Section";

const Privacy: React.FC = () => {
    return (
        <>
            <div className="min-h-screen w-full flex overflow-hidden">
                <Navbar />
                <div className="flex-1 min-h-0 justify-center flex items-center">
                    <PageHeader
                        title="Privacy"
                        highlight="Policy"
                        subtitle="We are committed to protecting your privacy and ensuring your data is handled securely."
                        bgImage="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1170&auto=format&fit=crop"
                        height="60vh"
                    />
                </div>
            </div>

            <Section className="bg-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-gray-700 leading-relaxed space-y-8">
                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-4">Introduction</h2>
                        <p>
                            Zyron Semiconductors Pvt. Ltd. respects your privacy and is committed to protecting the personal data
                            you share with us. This Privacy Policy describes how we collect, use, and safeguard your information
                            when you visit our website or use our services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-4">Information We Collect</h2>
                        <p>
                            We may collect personal information such as your name, email address, phone number, and company details
                            when you contact us through our website, apply for a job, or engage with our services. We also collect
                            standard log data and cookies to improve your experience.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-4">How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To provide and manage our engineering services.</li>
                            <li>To respond to your inquiries and support requests.</li>
                            <li>To process job applications and recruitment.</li>
                            <li>To improve our website functionality and user experience.</li>
                            <li>To comply with legal and regulatory requirements.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-4">Data Security</h2>
                        <p>
                            We implement robust technical and organizational measures to protect your data against unauthorized
                            access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                            is 100% secure.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-4">Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy or our data practices, please contact us at
                            <a href="mailto:privacy@zyronsemi.com" className="text-zyron-cyan hover:underline ml-1">privacy@zyronsemi.com</a>.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default Privacy;
