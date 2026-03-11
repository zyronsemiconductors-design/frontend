import React, { useState } from "react";
import { Briefcase, MapPin, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Section from "../components/ui/Section";

import PageHeader from "../components/PageHeader";
import { usePageContent, getSectionContent } from "../utils/useCMS";
import { CultureSection } from "../components/CultureSection";
import { CareersIntro } from "../components/CareersIntro";
import { CareersCTA } from "../components/CareersCTA";
import ApplyJobModal from "../components/ApplyJobModal";

interface JobFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
  departments: string[];
}

interface Job {
  title: string;
  dept: string;
  location: string;
  type: string;
}

interface JobCardProps {
  job: Job;
  onApply: (jobTitle: string) => void;
}
/* ---------------- Small Components ---------------- */


export const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => (
  <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between group">
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">
        {job.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4">{job.dept}</p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin size={14} /> {job.location}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase size={14} /> {job.type}
        </span>
      </div>
    </div>

    <button
      onClick={() => onApply(job.title)}
      className="mt-6 w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Apply for ${job.title}`}
    >
      View & Apply
    </button>
  </div>
);


export const JobFilterBar: React.FC<JobFilterBarProps> = ({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  departments,
}) => {
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="bg-white  rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by job title..."
            className="w-full pl-10 pr-4 py-2 border text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full md:w-1/4 py-2 px-4 border text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

/* ---------------- Main Page ---------------- */

const Careers: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const { content } = usePageContent('careers');
  const header = getSectionContent(content, 'header') || { title: '', highlight: '', subtitle: '', bgImage: '' };
  const intro = getSectionContent(content, 'intro') || { title: '', description: '' };
  const culture = getSectionContent(content, 'culture') || { title: '', highlight: '', description: '', image: '', points: [] };
  const jobs = getSectionContent(content, 'jobs') || [];
  const cta = getSectionContent(content, 'cta') || {};

  const departments = ["All", ...new Set(jobs.map((j: any) => String(j.dept || "")))] as string[];

  const filteredJobs = jobs.filter((job: any) => {
    const matchSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchDept = filter === "All" || job.dept === filter;
    return matchSearch && matchDept;
  });

  return (<>
    <div className="min-h-screen w-full flex  overflow-hidden">
      <Navbar />

      <div className="flex-1 min-h-0 justify-center flex items-center">
        <PageHeader
          title={header.title}
          highlight={header.highlight}
          subtitle={header.subtitle}
          bgImage={header.bgImage}
        />
      </div>
    </div>

    <div className="bg-gray-50 min-h-screen">
      <CareersIntro data={intro} />
      <Section className="relative z-10">
        <CultureSection data={culture} />
      </Section>
      {/* 🔍 Search & Filter */}
      <div className="max-w-7xl mx-auto py-0 mb-10 px-4 md:px6">
        <JobFilterBar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          departments={departments}
        />
      </div>

      {/* 💼 Jobs Grid */}
      <div className="max-w-7xl mx-auto py-0 px-4 md:px6 pb-24">
        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs found for your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job: Job, idx: number) => (
              <JobCard key={idx} job={job} onApply={(title) => setSelectedJob(title)} />
            ))}
          </div>
        )}
      </div>
      <ApplyJobModal
        open={!!selectedJob}
        jobTitle={selectedJob || ""}
        onClose={() => setSelectedJob(null)}
      />
      <Section className="relative z-10">
        <CareersCTA data={cta} />
      </Section>
    </div></>
  );
};

export default Careers;
