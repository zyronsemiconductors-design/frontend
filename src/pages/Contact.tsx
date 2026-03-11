import React from "react";
import Navbar from "../components/Navbar";
import Section from "../components/ui/Section";
import ContactSection from "../components/ContactSection";
import PageHeader from "../components/PageHeader";
import { usePageContent, getSectionContent } from "../utils/useCMS";

const Contact: React.FC = () => {
  const { content } = usePageContent('contact');
  const header = getSectionContent(content, 'header') || { title: '', highlight: '', subtitle: '', bgImage: '' };
  const contactInfo = getSectionContent(content, 'contact_info') || { title: '', formTitle: '', address: {}, emails: {}, phone: {}, website: {} };

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
