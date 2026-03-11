import React from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import Section from '../components/ui/Section';
import Navbar from '../components/Navbar';
import { ServicesSection } from '../components/ServicesSection';
import OurFeatures from '../components/OurFeatures';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import { usePageContent, getSectionContent } from '../utils/useCMS';
import { ICON_MAP } from '../cms/iconMap';

const Home: React.FC = () => {
  const { content, loading } = usePageContent('home');

  const getContent = (sectionKey: string) => getSectionContent(content, sectionKey);

  const heroContent = getContent('hero') || [];
  const servicesContent = getContent('services') || { title: '', subtitle: '', list: [] };

  const cmsFeatures = getContent('features') || { title: '', subtitle: '', list: [] };
  const featuresContent = {
    ...cmsFeatures,
    list: (cmsFeatures.list || []).map((feature: any) => ({
      ...feature,
      icon: ICON_MAP[feature.icon] || Object.values(ICON_MAP)[0]
    }))
  };

  const aboutContent = getContent('about') || { title: '', subtitle: '', paragraphs: [], skills: [] };
  const contactContent = getContent('contact_info') || { title: '', formTitle: '', address: {}, emails: {}, phone: {}, website: {} };

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen w-full flex  overflow-hidden">
        <Navbar />

        <div className="flex-1 min-h-0">
          <HeroCarousel slides={heroContent} />
        </div>
      </div>

      {/* Services Preview */}
      <Section className="relative z-10">
        <ServicesSection data={servicesContent} />
      </Section>

      {/* Stats/Highlights */}
      <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">
        <OurFeatures data={featuresContent} />
      </Section>
      <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">
        <AboutSection data={aboutContent} />
      </Section>
      <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">
        <ContactSection data={contactContent} />
      </Section>
    </>
  );
};

export default Home;
