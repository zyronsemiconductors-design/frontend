import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface FeatureItem {
    id: string;
    title: string;
    content: string[];
}

interface CourseSection {
    title?: string;
    subtitle?: string;
    list?: {
        id: string;
        title: string;
        duration?: string;
        sections?: { title: string; items: string[] }[];
    }[];
    categories?: {
        id: string;
        title: string;
        description?: string;
        courses: {
            id: string;
            title: string;
            duration?: string;
            sections?: { title: string; items: string[] }[];
        }[];
    }[];
}

interface Props {
    features1: FeatureItem[];
    courses?: CourseSection | null;
}

const ServicesExactUI: React.FC<Props> = ({ features1, courses }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [active, setActive] = useState<FeatureItem | null>(null);
    const [openCategory, setOpenCategory] = useState<string | null>(null);

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
            const isCourseHash =
                hash === "courses" ||
                hash.startsWith("course-") ||
                hash.startsWith("category-");
            if (isCourseHash) {
                const training = features1.find((f) => f.id === "training");
                if (training) {
                    setActive(training);
                    return;
                }
            }
        }

        setActive(features1[0]);
    }, [location.hash, features1]);

    useEffect(() => {
        const hash = location.hash.replace("#", "");
        if (!hash) return;
        const el = document.getElementById(hash);
        if (!el) return;
        setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
    }, [location.hash]);

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

                            {courses && (
                                <div id="courses" className="mt-10 space-y-8 scroll-mt-28">
                                    <div className="space-y-2">
                                        {courses.title && (
                                            <h3 className="text-2xl font-semibold text-gray-900">{courses.title}</h3>
                                        )}
                                        {courses.subtitle && (
                                            <p className="text-gray-600">{courses.subtitle}</p>
                                        )}
                                    </div>

                                    {courses?.categories && courses.categories.length > 0 ? (
                                        <div className="space-y-10">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {courses.categories.map((category) => (
                                                    <button
                                                        key={category.id}
                                                        onClick={() => {
                                                            setOpenCategory((prev) =>
                                                                prev === category.id ? null : category.id
                                                            );
                                                        }}
                                                        className={`rounded-2xl border px-5 py-4 text-left transition shadow-sm ${openCategory === category.id
                                                            ? "border-zyron-cyan bg-zyron-cyan/5"
                                                            : "border-gray-200 bg-white hover:shadow-md"
                                                            }`}
                                                    >
                                                        <div className="text-lg font-semibold text-gray-900">
                                                            {category.title}
                                                        </div>
                                                        {category.description && (
                                                            <div className="mt-1 text-sm text-gray-600">
                                                                {category.description}
                                                            </div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>

                                            {courses.categories.map((category) => (
                                                <div
                                                    key={category.id}
                                                    id={`category-${category.id}`}
                                                    className={`space-y-6 ${openCategory === category.id ? "block" : "hidden"}`}
                                                >
                                                    <div className="space-y-2">
                                                        <h4 className="text-xl font-semibold text-gray-900">{category.title}</h4>
                                                        {category.description && (
                                                            <p className="text-gray-600">{category.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-8">
                                                        {category.courses.map((course) => (
                                                            <div
                                                                key={course.id}
                                                                id={`course-${course.id}`}
                                                                className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white scroll-mt-28"
                                                            >
                                                                <div className="flex flex-wrap items-baseline gap-3 mb-4">
                                                                    <h5 className="text-xl font-semibold text-gray-900">{course.title}</h5>
                                                                    {course.duration && (
                                                                        <span className="text-sm font-medium text-zyron-cyan bg-zyron-cyan/10 px-3 py-1 rounded-full">
                                                                            {course.duration}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="space-y-5">
                                                                    {(course.sections || []).map((section, idx) => (
                                                                        <div key={idx} className="space-y-2">
                                                                            <h6 className="text-lg font-semibold text-gray-900">{section.title}</h6>
                                                                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                                                                {(section.items || []).map((item, itemIdx) => (
                                                                                    <li key={itemIdx}>{item}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        courses?.list && courses.list.length > 0 && (
                                            <div className="space-y-8">
                                                {courses.list.map((course) => (
                                                    <div
                                                        key={course.id}
                                                        id={`course-${course.id}`}
                                                        className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white scroll-mt-28"
                                                    >
                                                        <div className="flex flex-wrap items-baseline gap-3 mb-4">
                                                            <h4 className="text-xl font-semibold text-gray-900">{course.title}</h4>
                                                            {course.duration && (
                                                                <span className="text-sm font-medium text-zyron-cyan bg-zyron-cyan/10 px-3 py-1 rounded-full">
                                                                    {course.duration}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="space-y-5">
                                                            {(course.sections || []).map((section, idx) => (
                                                                <div key={idx} className="space-y-2">
                                                                    <h5 className="text-lg font-semibold text-gray-900">{section.title}</h5>
                                                                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                                                        {(section.items || []).map((item, itemIdx) => (
                                                                            <li key={itemIdx}>{item}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
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
