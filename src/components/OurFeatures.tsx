import React from "react";
import FeatureCard from "./FeatureCard";

export interface FeatureItem {
    id: string;
    title: string;
    description: string;
    icon: any;
}

interface OurFeaturesProps {
    data: {
        title: string;
        subtitle: string;
        list: FeatureItem[];
    };
}

const OurFeatures: React.FC<OurFeaturesProps> = ({ data }) => {
    return (
        <section className="py-24 bg-white" id="features">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">
                        {data.title}
                    </h2>
                    <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full" />
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        {data.subtitle}
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.list.map((feature, idx) => (
                        <FeatureCard
                            key={feature.id}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            delay={idx * 120}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurFeatures;
