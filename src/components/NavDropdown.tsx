import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

interface DropdownItem {
    label: string;
    to?: string;
    children?: DropdownItem[];
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
                            {items.map((item) => {
                                if (item.children && item.children.length > 0) {
                                    return (
                                        <div key={item.label} className="relative group">
                                            <div className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-zyron-cyan transition cursor-default">
                                                <span>{item.label}</span>
                                                <ChevronRight size={14} className="text-gray-400 group-hover:text-zyron-cyan" />
                                            </div>

                                            <div className="absolute top-0 left-full ml-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                                                <div className="py-2">
                                                    {item.children.map((child) => (
                                                        child.to ? (
                                                            <Link
                                                                key={child.label}
                                                                to={child.to}
                                                                className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-zyron-cyan transition"
                                                                onClick={onClose}
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        ) : (
                                                            <div
                                                                key={child.label}
                                                                className="block px-5 py-3 text-sm text-gray-600"
                                                            >
                                                                {child.label}
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                if (!item.to) {
                                    return (
                                        <div
                                            key={item.label}
                                            className="block px-5 py-3 text-sm text-gray-600"
                                        >
                                            {item.label}
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-zyron-cyan transition"
                                        onClick={onClose}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NavDropdown;
