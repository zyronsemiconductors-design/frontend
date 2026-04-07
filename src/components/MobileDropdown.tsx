import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";

interface MobileDropdownProps {
    title: string;
    items: { label: string; to?: string; children?: { label: string; to?: string }[] }[];
    open: boolean;
    onToggle: () => void;
}

export const MobileDropdown: React.FC<MobileDropdownProps> = ({
    title,
    items,
    open,
    onToggle,
}) => {
    return (
        <div className="border-b">
            {/* Header */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-4 text-left text-lg font-semibold"
            >
                <span>{title}</span>
                {open ? <Minus size={18} /> : <Plus size={18} />}
            </button>

            {/* Content */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4 pl-4 space-y-3">
                            {items.map((item) => {
                                if (item.children && item.children.length > 0) {
                                    return (
                                        <div key={item.label} className="space-y-2">
                                            <div className="text-gray-700 text-base font-medium">
                                                {item.label}
                                            </div>
                                            <div className="pl-3 space-y-2">
                                                {item.children.map((child) => (
                                                    child.to ? (
                                                        <Link
                                                            key={child.label}
                                                            to={child.to}
                                                            className="block text-gray-600 text-sm hover:text-zyron-cyan transition"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ) : (
                                                        <div
                                                            key={child.label}
                                                            className="block text-gray-600 text-sm"
                                                        >
                                                            {child.label}
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }

                                if (!item.to) {
                                    return (
                                        <div
                                            key={item.label}
                                            className="block text-gray-600 text-base"
                                        >
                                            {item.label}
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className="block text-gray-600 text-base hover:text-zyron-cyan transition"
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
