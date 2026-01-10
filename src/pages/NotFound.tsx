import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
            <div className="text-center max-w-xl">
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="flex justify-center mb-6"
                >
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <AlertTriangle size={40} />
                    </div>
                </motion.div>

                {/* 404 Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-4"
                >
                    404
                </motion.h1>

                {/* Message */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-600 mb-8"
                >
                    Oops! The page you’re looking for doesn’t exist or has been moved.
                </motion.p>

                {/* Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
