import React from "react";
import { Link } from "react-router-dom";

interface CtaBannerProps {
    title?: string;
    buttonText?: string;
    link?: string;
    bgImage?: string;
}

const CtaBanner: React.FC<CtaBannerProps> = ({
    title = "ARE YOU READY TO WORK WITH US?",
    buttonText = "Contact us",
    link = "/contact",
    bgImage = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop",
}) => {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-700/80 to-cyan-600/80" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
                <h2 className="text-white text-2xl md:text-4xl font-bold tracking-wide text-center md:text-left">
                    {title}
                </h2>

                <Link
                    to={link}
                    className="px-8 py-3 bg-lime-400 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-lime-500 hover:scale-105 transition"
                >
                    {buttonText}
                </Link>
            </div>
        </section>
    );
};

export default CtaBanner;
