import React from "react";
import Navbar from "../components/Navbar";
import ServicesExactUI from "../components/ServicesExactUI";
import PageHeader from "../components/PageHeader";
import Eng from "../content/Eng";



/* ---------- Main Page ---------- */

const Services: React.FC = () => {
  // const [activeService, setActiveService] = useState(servicesData[0]);

  return (<>
    <div className="min-h-screen w-full flex  overflow-hidden">
      <Navbar />

      <div className="flex-1 min-h-0 justify-center flex items-center">
        <PageHeader
          title={Eng.headers.services.title}
          highlight={Eng.headers.services.highlight}
          subtitle={Eng.headers.services.subtitle}
          bgImage={Eng.headers.services.bgImage}
        />

      </div>
    </div>
    <div className=" bg-white">
      <ServicesExactUI features1={Eng.services} />

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
