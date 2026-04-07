import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CoursesEnrollModal from "../../components/CoursesEnrollModal";
import { getCategoryById, getCourseBySlug } from "../../content/coursesData";

const CoursesSlug: React.FC = () => {
  const { slug } = useParams();
  const course = useMemo(() => (slug ? getCourseBySlug(slug) : null), [slug]);
  const category = useMemo(() => (slug ? getCategoryById(slug) : null), [slug]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [openWeek, setOpenWeek] = useState<string | null>(null);

  const weekSections = useMemo(() => {
    if (!course?.fullContent || course.fullContent.length === 0) return null;
    const sections: { title: string; items: string[] }[] = [];
    let current: { title: string; items: string[] } | null = null;
    for (const line of course.fullContent) {
      const title = line.trim();
      if (/^Week\s*-?\s*\d+/i.test(title)) {
        if (current) sections.push(current);
        current = { title, items: [] };
        continue;
      }
      if (current) current.items.push(line);
    }
    if (current) sections.push(current);
    return sections.length > 0 ? sections : null;
  }, [course?.fullContent]);

  if (!course && !category) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-28 max-w-6xl mx-auto px-6">
          <h1 className="text-2xl font-semibold text-gray-900">Page not found</h1>
          <Link to="/courses" className="text-zyron-cyan">Back to Courses</Link>
        </div>
      </div>
    );
  }

  if (course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <section className="pt-28 pb-8 bg-gradient-to-br from-white via-slate-50 to-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <nav className="text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-zyron-cyan">Home</Link> /{" "}
              <Link to="/courses" className="hover:text-zyron-cyan">Courses</Link> /{" "}
              <span className="text-gray-700">{course.title}</span>
            </nav>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-gray-900">{course.title}</h1>
                <p className="mt-2 text-gray-600">{course.overview}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{course.duration}</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{course.level}</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{course.mode}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="rounded-2xl bg-zyron-cyan px-6 py-3 text-sm font-semibold text-black hover:brightness-95"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
              <p className="mt-2 text-gray-600">{course.overview}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Syllabus</h2>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-600">
                {course.syllabus.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {course.fullContent && course.fullContent.length > 0 && (
              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Full Course Content</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {course.fullContent.length} topics included
                    </p>
                  </div>
                  {!weekSections && course.fullContent.length > 20 && (
                    <button
                      onClick={() => setShowFullContent((prev) => !prev)}
                      className="rounded-full border border-zyron-cyan/40 px-4 py-1.5 text-sm font-semibold text-zyron-cyan hover:bg-zyron-cyan/10"
                    >
                      {showFullContent ? "View Less" : "View More"}
                    </button>
                  )}
                </div>
                {weekSections ? (
                  <div className="mt-4 space-y-3">
                    {weekSections.map((section) => {
                      const isOpen = openWeek === section.title;
                      return (
                        <div key={section.title} className="rounded-xl border border-gray-100 bg-slate-50">
                          <button
                            onClick={() => setOpenWeek(isOpen ? null : section.title)}
                            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-900"
                          >
                            <span>{section.title}</span>
                            <span className="text-zyron-cyan">{isOpen ? "−" : "+"}</span>
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4">
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm leading-relaxed">
                                {section.items.map((item, idx) => (
                                  <li key={idx} className="flex gap-2">
                                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-zyron-cyan/80" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className={`mt-4 rounded-xl border border-gray-100 bg-slate-50 p-4 ${
                      showFullContent ? "" : "max-h-96 overflow-hidden"
                    }`}
                  >
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm leading-relaxed">
                      {(showFullContent ? course.fullContent : course.fullContent.slice(0, 20)).map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-zyron-cyan/80" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Tools Covered</h2>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-600">
                  {course.tools.map((tool, idx) => (
                    <li key={idx}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Duration</h3>
                <p className="mt-2 text-gray-600">{course.duration}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Eligibility</h3>
                <p className="mt-2 text-gray-600">{course.eligibility}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Certification</h3>
                <p className="mt-2 text-gray-600">{course.certification}</p>
              </div>
            </div>
          </div>
        </section>

        <CoursesEnrollModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-28 pb-10 bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-zyron-cyan">Home</Link> /{" "}
            <Link to="/courses" className="hover:text-zyron-cyan">Courses</Link> /{" "}
            <span className="text-gray-700">{category!.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900">{category!.title}</h1>
          <p className="mt-2 text-gray-600">{category!.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category!.courses.map((courseItem) => (
              <div key={courseItem.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-900">{courseItem.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{courseItem.shortDescription}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{courseItem.duration}</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{courseItem.level}</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{courseItem.mode}</span>
                </div>
                <div className="mt-5 flex gap-3">
                  <Link
                    to={`/courses/${courseItem.slug}`}
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="flex-1 rounded-xl bg-zyron-cyan px-4 py-2 text-sm font-semibold text-black hover:brightness-95"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CoursesEnrollModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default CoursesSlug;
