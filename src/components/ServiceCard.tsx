import React from "react";

interface ServiceCardProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    subtitle,
    description,
    image,
}) => {
    return (
        <div className="group relative h-60 rounded-lg overflow-hidden shadow-lg cursor-pointer">
            {/* Image */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Default dark overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-end p-5 transition-opacity duration-500 group-hover:opacity-0 z-10">
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>

            {/* 🔵 Blue overlay (bottom → top) */}
            <div
                className="absolute inset-0 bg-blue-600/90 z-20
        transform translate-y-full
        transition-transform duration-500 ease-out
        group-hover:translate-y-0"
            />

            {/* Hover content */}
            <div
                className="absolute inset-0 flex flex-col justify-end p-5 z-30
        opacity-0 transition-opacity duration-500 delay-200
        group-hover:opacity-100"
            >
                <span className="text-yellow-300 text-xs uppercase tracking-wider mb-2">
                    {subtitle}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-100 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;
