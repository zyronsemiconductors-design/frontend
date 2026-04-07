import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CoursesEnrollModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Start Your Learning Journey
            </h3>
            <p className="mt-2 text-gray-600">
              Please sign in to enroll in this course.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
          >
            Close
          </button>
        </div>

        <div className="mt-4 space-y-2 text-gray-600">
          <div>✔ Track your progress</div>
          <div>✔ Access course materials</div>
          <div>✔ Get certification</div>
          <div className="pt-2">Don’t have an account? Create one in seconds!</div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button className="rounded-xl bg-zyron-cyan px-4 py-3 text-sm font-semibold text-black hover:brightness-95">
            Sign In
          </button>
          <button className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">
            Create Account
          </button>
          <button className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesEnrollModal;
