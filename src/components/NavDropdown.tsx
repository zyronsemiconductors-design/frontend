import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
    label: string;
    to: string;
}

interface NavDropdownProps {
    title: string;
    items: DropdownItem[];
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
    title,
    items,
    isOpen,
    onOpen,
    onClose,
}) => {
    return (
        <div
            className="relative"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
        >
            {/* Trigger */}
            <div className="flex items-center gap-1 text-lg font-medium text-gray-700 hover:text-zyron-cyan transition cursor-pointer">
                {title}
                <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                        <div className="py-2">
                            {items.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-zyron-cyan transition"
                                    onClick={onClose}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NavDropdown;
