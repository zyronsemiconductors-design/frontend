import React from "react";
import Navbar from "../components/Navbar";
import CtaBanner from "../components/CtaBanner";
import PageHeader from "../components/PageHeader";
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

  const getContent = (sectionKey: string) => getSectionContent(content, sectionKey);

  const header = getContent('header') || { title: '', highlight: '', subtitle: '', bgImage: '' };
  const missionContent = getContent('mission') || { title: 'About Company', description: '' };

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
