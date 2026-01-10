import { useState } from "react";
import ResourcesModal from "./ResourcesModal";

interface Props {
    title: string;
    description: string;
}

export const ResourcesIntro: React.FC<Props> = ({ title, description }) => (
    <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </section>
);

interface Category {
    id: string;
    title: string;
    desc: string;
}

export const ResourceCategories: React.FC<{ items: Category[] }> = ({
    items,
}) => (
    <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((c) => (
                <div
                    key={c.id}
                    className="bg-white p-6 rounded-2xl border hover:shadow-md transition"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {c.title}
                    </h3>
                    <p className="text-sm text-gray-600">{c.desc}</p>
                </div>
            ))}
        </div>
    </section>
);

interface ResourceItem {
    id: string;
    title: string;
    type: string;
    category: string;
    desc: string;
}

export const ResourcesList: React.FC<{ items: ResourceItem[] }> = ({
    items,
}) => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((r) => (
                    <div
                        key={r.id}
                        className="p-6 border rounded-xl bg-gray-50 hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-semibold">
                                {r.type}
                            </span>
                            <span className="text-xs text-gray-500">{r.category}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{r.title}</h4>
                        <p className="text-sm text-gray-600">{r.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export interface ResourcesCTAData {
    title: string;
    subtitle: string;
    button: string;
}

export const ResourcesCTA: React.FC<{ data: ResourcesCTAData }> = ({ data }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <section className="py-20 bg-blue-600 text-white text-center">
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

            {/* Modal */}
            <ResourcesModal open={open} onClose={() => setOpen(false)} />
        </>
    );
};
