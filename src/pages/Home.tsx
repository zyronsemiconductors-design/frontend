import React from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import Section from '../components/ui/Section';
import Navbar from '../components/Navbar';
import { ServicesSection } from '../components/ServicesSection';
import OurFeatures from '../components/OurFeatures';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Eng from '../content/Eng';
import { usePageContent, getSectionContent } from '../utils/useCMS';

const Home: React.FC = () => {
  const { content, loading } = usePageContent('home');

  // Helper to get CMS content or fallback to hardcoded content
  const getContent = (sectionKey: string, fallback: any) => {
    if (loading) return fallback;
    const cmsContent = getSectionContent(content, sectionKey);
    return cmsContent || fallback;
  };

  // Get hero content from CMS or fallback
  const heroContent = getContent('hero', Eng.headers.home);
  const servicesContent = getContent('services', Eng.home.services);

  // Get features from CMS and merge with icons from Eng data
  const cmsFeatures = getContent('features', null);
  const featuresContent = cmsFeatures ? {
    ...cmsFeatures,
    list: cmsFeatures.list?.map((feature: any, idx: number) => ({
      ...feature,
      icon: Eng.home.features.list[idx]?.icon || Eng.home.features.list[0]?.icon // Fallback to first icon if index doesn't match
    })) || []
  } : Eng.home.features;

  const aboutContent = getContent('about', Eng.home.about);
  const contactContent = getContent('contact_info', Eng.Common.contactInfo);

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