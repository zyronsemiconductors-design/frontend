import React from "react";
import Navbar from "../components/Navbar";
import ServicesExactUI from "../components/ServicesExactUI";
import PageHeader from "../components/PageHeader";
import Section from "../components/ui/Section";
import { usePageContent, getSectionContent } from "../utils/useCMS";

const WhyZyron: React.FC = () => {
  const { content } = usePageContent('why-zyron');
  const header = getSectionContent(content, 'header') || { title: '', highlight: '', subtitle: '', bgImage: '', height: '70vh' };
  const advantagesContent = getSectionContent(content, 'advantages') || [];

  return (
    <>
      <div className="min-h-screen w-full flex  overflow-hidden">
        <Navbar />

        <div className="flex-1 min-h-0 justify-center flex items-center">
          <PageHeader
            title={header.title}
            highlight={header.highlight}
            subtitle={header.subtitle}
            bgImage={header.bgImage}
            height={header.height || "70vh"}
          />
        </div>
      </div>

      <div className=" bg-gray-50">
        <Section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          </div>
          <ServicesExactUI features1={advantagesContent} />
        </Section>
      </div>
    </>
  );
};

export default WhyZyron;
