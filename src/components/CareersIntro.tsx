import React from "react";

interface CareersIntroData {
    title: string;
    description: string;
}

interface CareersIntroProps {
    data: CareersIntroData;
}

export const CareersIntro: React.FC<CareersIntroProps> = ({ data }) => {
    return (
        <section className="max-w-5xl mx-auto px-6 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
                {data.title}
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {data.description}
            </p>
        </section>
    );
};
