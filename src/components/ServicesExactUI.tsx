import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface FeatureItem {
    id: string;
    title: string;
    content: string[];
}

interface Props {
    features1: FeatureItem[];
}

const ServicesExactUI: React.FC<Props> = ({ features1 }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [active, setActive] = useState<FeatureItem | null>(null);

    // 🔹 Sync active item from hash (#design)
    useEffect(() => {
        if (!features1 || features1.length === 0) {
            setActive(null);
            return;
        }

        const hash = location.hash.replace("#", "");
        if (hash) {
            const found = features1.find((f) => f.id === hash);
            if (found) {
                setActive(found);
                return;
            }
        }

        setActive(features1[0]);
    }, [location.hash, features1]);

    const handleSelect = (item: FeatureItem) => {
        setActive(item);

        // ✅ Keep same route, just change hash
        navigate(
            {
                pathname: location.pathname,
                hash: item.id,
            },
            { replace: true }
        );
    };

    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* 🔹 Left Menu */}
                <div className="md:col-span-4 space-y-4">
                    {features1.map((item) => {
                        const isActive = active?.id === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className={`w-full md:w-64 text-left px-3 py-2 border transition text-lg font-medium
                ${isActive
                                        ? "border-gray-300 text-lime-500"
                                        : "border-gray-300 text-gray-900 hover:text-lime-500"
                                    }`}
                            >
                                {item.title}
                            </button>
                        );
                    })}
                </div>

                {/* 🔹 Right Content */}
                <div className="md:col-span-8">
                    {active ? (
                        <>
                            <h2
                                id={active.id}
                                className="scroll-mt-24 text-xl md:text-5xl font-serif text-gray-900 mb-8"
                            >
                                {active.title}
                            </h2>

                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                {(() => {
                                    const blocks: React.ReactNode[] = [];
                                    let i = 0;
                                    while (i < active.content.length) {
                                        const line = active.content[i];
                                        const isBullet = line.trim().startsWith("• ");
                                        if (isBullet) {
                                            const items: string[] = [];
                                            while (i < active.content.length && active.content[i].trim().startsWith("• ")) {
                                                items.push(active.content[i].trim().replace(/^•\s+/, ""));
                                                i += 1;
                                            }
                                            blocks.push(
                                                <ul key={`list-${i}`} className="list-disc pl-6 space-y-2">
                                                    {items.map((item, idx) => (
                                                        <li key={idx}>{item}</li>
                                                    ))}
                                                </ul>
                                            );
                                            continue;
                                        }

                                        if (line.trim().endsWith(":")) {
                                            blocks.push(
                                                <h3 key={`head-${i}`} className="text-xl font-semibold text-gray-900">
                                                    {line}
                                                </h3>
                                            );
                                            i += 1;
                                            continue;
                                        }

                                        blocks.push(<p key={`p-${i}`}>{line}</p>);
                                        i += 1;
                                    }
                                    return blocks;
                                })()}
                            </div>
                        </>
                    ) : (
                        <div className="text-gray-500">Loading services...</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServicesExactUI;
