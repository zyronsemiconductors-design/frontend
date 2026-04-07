import React from "react";
import Navbar from "../components/Navbar";
import ServicesExactUI from "../components/ServicesExactUI";
import PageHeader from "../components/PageHeader";
import { usePageContent, getSectionContent } from "../utils/useCMS";
import Eng from "../content/Eng";



/* ---------- Main Page ---------- */

const Services: React.FC = () => {
  const { content } = usePageContent('services');
  const header = getSectionContent(content, 'header') || { title: '', highlight: '', subtitle: '', bgImage: '' };
  const servicesList = getSectionContent(content, 'services_list') || [];
  const courses = getSectionContent(content, 'courses_v2') || Eng.courses || null;

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
      <ServicesExactUI features1={servicesList} courses={courses} />

      {/* <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8"> */}
      {/* <ServicesSidebar
          services={servicesData}
          active={activeService}
          onSelect={setActiveService}
        />

        <div className="lg:col-span-8">
          <ServiceContent service={activeService} />
        </div> */}
      {/* </div> */}
    </div></>
  );
};

export default Services;
