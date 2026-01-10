import React from "react";
import ServiceCard from "./ServiceCard";

export interface ServiceItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

interface ServicesSectionProps {
    data: {
        title: string;
        subtitle: string;
        list: ServiceItem[];
    };
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ data }) => {
    return (
        <section className="bg-white" id="services">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">
                        {data.title}
                    </h2>
                    <div className="h-1 w-20 bg-brandaccent mx-auto rounded-full" />
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        {data.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.list.map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            subtitle={service.subtitle}
                            description={service.description}
                            image={service.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
