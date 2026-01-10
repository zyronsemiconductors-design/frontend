import React from "react";
import Navbar from "../components/Navbar";
import CtaBanner from "../components/CtaBanner";
import PageHeader from "../components/PageHeader";
import Eng from "../content/Eng";
import { usePageContent, getSectionContent } from "../utils/useCMS";

interface AboutCompanySectionProps {
  title?: string;
  description: string;
}

const AboutCompanySection: React.FC<AboutCompanySectionProps> = ({
  title = "About Company",
  description,
}) => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>

        {/* Underline */}
        <div className="flex justify-center items-center gap-3 mb-10">
          <span className="w-10 h-[3px] bg-blue-600 rounded-full" />
          <span className="w-6 h-[3px] bg-blue-600 rounded-full" />
        </div>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
          {description}
        </p>

        {/* Divider */}
        <div className="mt-16 border-t border-gray-200" />
      </div>
    </section>
  );
};

const About: React.FC = () => {
  const { content, loading } = usePageContent('about');

  // Helper to get CMS content or fallback
  const getContent = (sectionKey: string, fallback: any) => {
    if (loading) return fallback;
    const cmsContent = getSectionContent(content, sectionKey);
    return cmsContent || fallback;
  };

  // Get mission section from CMS
  const missionContent = getContent('mission', {
    title: "About Company",
    description: "Zyron Semiconductors is an ASIC IP and Design services company founded by a group of committed and experienced semiconductor industry professionals with a goal to provide end-to-end design and engineering services. We are driven to use the power of our global network to connect businesses with the right people, and people with the right businesses without bias. It is a leading service provider in VLSI by exceeding expectations on delivery, meeting stringent schedules, demonstrating integrity and intelligence in all our engagements. We offer a spectrum of design and verification services, which includes defining specification, logic partitioning, micro-architecture, RTL coding, synthesis, developing custom and standard VIPs and verification environment development using latest methodologies (UVM/OVM)."
  });

  return (<>
    <div className="min-h-screen w-full flex  overflow-hidden">
      <Navbar />

      <div className="flex-1 min-h-0 justify-center flex items-center">
        <PageHeader
          title={Eng.headers.about.title}
          highlight={Eng.headers.about.highlight}
          subtitle={Eng.headers.about.subtitle}
          bgImage={Eng.headers.about.bgImage}
        />

      </div>
    </div>

    <div className=" bg-white">
      <AboutCompanySection
        title={missionContent.title}
        description={missionContent.description}
      />
      <CtaBanner />
    </div>
  </>
  );
};

export default About;
