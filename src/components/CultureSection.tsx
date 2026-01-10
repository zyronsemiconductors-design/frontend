import React from "react";

interface CulturePoint {
    title: string;
    desc: string;
}

interface CultureData {
    title: string;
    highlight: string;
    description: string;
    image: string;
    points: CulturePoint[];
}

interface CultureSectionProps {
    data: CultureData;
}

export const CultureSection: React.FC<CultureSectionProps> = ({ data }) => {
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="rounded-2xl shadow-lg w-full object-cover"
                    />
                </div>

                {/* Content */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        {data.title.split(data.highlight)[0]}
                        <span className="text-blue-600">{data.highlight}</span>
                        {data.title.split(data.highlight)[1] || ""}
                    </h2>

                    <p className="text-gray-600 mb-10 leading-relaxed">
                        {data.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {data.points.map((item, i) => (
                            <div
                                key={i}
                                className="p-5 bg-gray-50 rounded-xl border hover:shadow-md transition"
                            >
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
