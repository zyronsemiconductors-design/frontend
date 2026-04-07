import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CoursesEnrollModal from "../../components/CoursesEnrollModal";
import { getCourseCategories } from "../../content/coursesData";

const CoursesLanding: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const categories = getCourseCategories();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-16 bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-serif text-gray-900">
            Kickstart Your Career in VLSI & Semiconductor Industry
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Industry-ready training programs designed for students and professionals
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="#courses-categories"
              className="rounded-2xl bg-zyron-cyan px-6 py-3 font-semibold text-black hover:brightness-95"
            >
              Explore Courses
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-2xl border border-gray-200 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </section>

      <section id="courses-categories" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h3>
                <p className="mt-2 text-gray-600">{category.subtitle}</p>
                <p className="mt-3 text-sm text-gray-500">{category.description}</p>
                <div className="mt-5">
                  <Link
                    to={category.path}
                    className="inline-flex items-center gap-2 rounded-xl bg-zyron-cyan px-4 py-2 text-sm font-semibold text-black hover:brightness-95"
                  >
                    View Courses
                  </Link>
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

export default CoursesLanding;
