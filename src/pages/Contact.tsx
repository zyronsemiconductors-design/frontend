import React from "react";
import Navbar from "../components/Navbar";
import Section from "../components/ui/Section";
import ContactSection from "../components/ContactSection";
import PageHeader from "../components/PageHeader";
import Eng from "../content/Eng";
import { usePageContent, getSectionContent } from "../utils/useCMS";

const Contact: React.FC = () => {
  const { content, loading } = usePageContent('contact');

  // Get contact info from CMS or fallback
  const contactInfo = loading ? Eng.Common.contactInfo : getSectionContent(content, 'contact_info') || Eng.Common.contactInfo;

  return (
    <>
      <div className="min-h-screen w-full flex  overflow-hidden">
        <Navbar />

        <div className="flex-1 min-h-0 justify-center flex items-center">
          <PageHeader
            title={Eng.headers.contact.title}
            highlight={Eng.headers.contact.highlight}
            subtitle={Eng.headers.contact.subtitle}
            bgImage={Eng.headers.contact.bgImage}
          />

        </div>
      </div>
      <Section>
        <ContactSection data={contactInfo} />
      </Section>
    </>
  );
};

export default Contact;
