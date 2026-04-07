import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CoursesEnrollModal from "../../components/CoursesEnrollModal";
import { getCategoryById } from "../../content/coursesData";

const CoursesCategory: React.FC = () => {
  const { categoryId } = useParams();
  const category = useMemo(() => (categoryId ? getCategoryById(categoryId) : null), [categoryId]);
  const [modalOpen, setModalOpen] = useState(false);

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-28 max-w-6xl mx-auto px-6">
          <h1 className="text-2xl font-semibold text-gray-900">Category not found</h1>
          <Link to="/courses" className="text-zyron-cyan">Back to Courses</Link>
        </div>
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
            <span className="text-gray-700">{category.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900">{category.title}</h1>
          <p className="mt-2 text-gray-600">{category.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.courses.map((course) => (
              <div key={course.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.shortDescription}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{course.duration}</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{course.level}</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{course.mode}</span>
                </div>
                <div className="mt-5 flex gap-3">
                  <Link
                    to={`/courses/${course.slug}`}
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

export default CoursesCategory;
