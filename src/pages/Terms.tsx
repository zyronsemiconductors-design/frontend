import React from "react";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import Section from "../components/ui/Section";

const Terms: React.FC = () => {
    return (
        <>
            <div className="min-h-screen w-full flex overflow-hidden">
                <Navbar />
                <div className="flex-1 min-h-0 justify-center flex items-center">
                    <PageHeader
                        title="Terms of"
                        highlight="Service"
                        subtitle="Please read our terms and conditions carefully before using our services."
                        bgImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1170&auto=format&fit=crop"
                        height="60vh"
                    />
                </div>
            </div>

            <Section className="bg-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-gray-700 leading-relaxed space-y-8">
                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-4">Agreement to Terms</h2>
                        <p>
                            By accessing or using the services provided by Zyron Semiconductors Pvt. Ltd. ("Zyron", "we", "us", or "our"),
                            you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-4">Use of Services</h2>
                        <p>
                            Our services include semiconductor design, verification, FPGA prototyping, embedded systems, and digital engineering.
                            You agree to use these services only for lawful purposes and in accordance with the specifications agreed upon in
                            any formal service agreement or contract.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-4">Intellectual Property</h2>
                        <p>
                            All content, designs, code, and intellectual property developed or provided by Zyron remain the property of Zyron
                            Semiconductors unless otherwise specified in a written agreement. No license or rights are granted to you except
                            as expressly stated in these terms or a separate contract.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-4">Limitation of Liability</h2>
                        <p>
                            Zyron shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use
                            or inability to use our services, even if we have been advised of the possibility of such damages.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-4">Governing Law</h2>
                        <p>
                            These terms shall be governed by and construed in accordance with the laws of India, specifically under the
                            jurisdiction of the courts in Andhra Pradesh.
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

export default Terms;
