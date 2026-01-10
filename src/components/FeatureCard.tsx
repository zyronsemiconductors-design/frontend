import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    icon: Icon,
    delay = 0,
}) => {
    return (
        <div
            className="group bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100
      transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
      opacity-0 animate-featureFade"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Icon */}
            <div className="flex justify-center mb-6">
                <div
                    className="w-16 h-16 flex items-center justify-center rounded-full
          bg-blue-500 text-brandblue
          transition-all duration-300
          group-hover:bg-brandblue group-hover:text-white
          group-hover:scale-110"
                >
                    <Icon size={32} />
                </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors group-hover:text-brandblue">
                {title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {description}
            </p>

            {/* Link */}
            <a
                href="#"
                className="inline-flex items-center justify-center text-blue-500 font-semibold text-sm transition-colors hover:text-brandaccent"
            >
                Read More
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                </span>
            </a>
        </div>
    );
};

export default FeatureCard;
