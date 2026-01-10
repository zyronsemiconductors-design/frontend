import { useState } from "react";
import JoinCommunityModal from "./JoinCommunityModal";

interface Props {
    title: string;
    description: string;
}

export const CommunityIntro: React.FC<Props> = ({ title, description }) => (
    <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </section>
);


interface Pillar {
    id: string;
    title: string;
    desc: string;
}

export const CommunityPillars: React.FC<{ items: Pillar[] }> = ({ items }) => (
    <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {items.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition"
                    >
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {p.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{p.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


interface Activity {
    title: string;
    desc: string;
}

interface CommunityActivitiesProps {
    title: string;
    description: string;
    activity: Activity[];
}

export const CommunityActivities: React.FC<{ items: CommunityActivitiesProps }> = ({
    items,
}) => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">{items.title}</h2>
                <p className="text-gray-600 mt-2">
                    {items.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {items.activity.map((a, i) => (
                    <div
                        key={i}
                        className="p-6 border rounded-xl bg-gray-50 hover:bg-blue-50 transition"
                    >
                        <h4 className="font-semibold text-gray-900 mb-2">{a.title}</h4>
                        <p className="text-gray-600 text-sm">{a.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

interface JoinData {
    title: string;
    subtitle: string;
    button: string;
}

export const CommunityJoinCTA: React.FC<{ data: JoinData }> = ({ data }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <section className="py-20 bg-blue-600 rounded-lg text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {data.title}
                    </h2>
                    <p className="text-blue-100 mb-8">
                        {data.subtitle}
                    </p>
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                    >
                        {data.button}
                    </button>
                </div>
            </section>

            {/* 🔹 Modal */}
            <JoinCommunityModal open={open} onClose={() => setOpen(false)} />
        </>
    );
};
