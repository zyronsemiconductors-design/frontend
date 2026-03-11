import React from "react";
import { usePageContent, getSectionContent } from "../utils/useCMS";
import PageHeader from "../components/PageHeader";
import { CommunityActivities, CommunityIntro, CommunityJoinCTA, CommunityPillars } from "../components/CommunityDev";
import Navbar from "../components/Navbar";
import Section from "../components/ui/Section";


const Community: React.FC = () => {
    const { content } = usePageContent('community');
    const header = getSectionContent(content, 'header') || { title: '', highlight: '', subtitle: '', bgImage: '' };
    const intro = getSectionContent(content, 'intro') || { title: '', description: '' };
    const pillars = getSectionContent(content, 'pillars') || [];
    const activities = getSectionContent(content, 'activities') || { title: '', description: '', activity: [] };
    const join = getSectionContent(content, 'join') || { title: '', subtitle: '', button: '' };

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

            <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">


                <CommunityIntro
                    title={intro.title}
                    description={intro.description}
                />
            </Section>
            <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">
                <CommunityPillars items={pillars} />
            </Section>

            <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">

                <CommunityActivities items={activities} />
            </Section>

            <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">
                <CommunityJoinCTA data={join} />
            </Section>

        </>
    );
};

export default Community;
