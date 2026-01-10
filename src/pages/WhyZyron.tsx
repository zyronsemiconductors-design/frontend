import React from "react";
import Navbar from "../components/Navbar";
import ServicesExactUI from "../components/ServicesExactUI";
import PageHeader from "../components/PageHeader";
import Section from "../components/ui/Section";
import Eng from "../content/Eng";
import { usePageContent, getSectionContent } from "../utils/useCMS";

const WhyZyron: React.FC = () => {
  const { content, loading } = usePageContent('why-zyron');

  // Get advantages from CMS or fallback
  const advantagesContent = loading ? Eng.whyFeatures : getSectionContent(content, 'advantages') || Eng.whyFeatures;

  return (
    <>
      <div className="min-h-screen w-full flex  overflow-hidden">
        <Navbar />

        <div className="flex-1 min-h-0 justify-center flex items-center">
          <PageHeader
            title="Why Partner with"
            highlight="Zyron?"
            subtitle="We combine deep domain expertise with cutting-edge tools to deliver exceptional semiconductor solutions."
            bgImage="https://plus.unsplash.com/premium_photo-1682144748274-add3d8ed04ea?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="70vh"
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
