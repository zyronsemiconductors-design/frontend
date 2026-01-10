import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
    title: string;
    highlight?: string;
    subtitle?: string;
    bgImage: string;
    height?: string; // optional, e.g. "70vh"
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    highlight,
    subtitle,
    bgImage,
    height = "70vh",
}) => {
    return (
        <div
            className="relative w-full flex items-center justify-center text-center overflow-hidden"
            style={{ height }}
        >
            {/* Background Image */}
            <img
                src={bgImage}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="relative z-10 px-6 max-w-4xl">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold mb-6 text-white"
                >
                    {title}{" "}
                    {highlight && (
                        <span className="text-blue-400">{highlight}</span>
                    )}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-gray-200"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
