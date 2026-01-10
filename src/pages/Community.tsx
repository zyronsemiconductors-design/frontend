import React from "react";
import Eng from "../content/Eng";
import PageHeader from "../components/PageHeader";
import { CommunityActivities, CommunityIntro, CommunityJoinCTA, CommunityPillars } from "../components/CommunityDev";
import Navbar from "../components/Navbar";
import Section from "../components/ui/Section";


const Community: React.FC = () => {
    const data = Eng.community;

    return (
        <>
            <div className="min-h-screen w-full flex  overflow-hidden">
                <Navbar />

                <div className="flex-1 min-h-0 justify-center flex items-center">
                    <PageHeader
                        title={data.header.title}
                        highlight={data.header.highlight}
                        subtitle={data.header.subtitle}
                        bgImage={data.header.bgImage}
                    />

                </div>
            </div>

            <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">


                <CommunityIntro
                    title={data.intro.title}
                    description={data.intro.description}
                />
            </Section>
            <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">
                <CommunityPillars items={data.pillars} />
            </Section>

            <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">

                <CommunityActivities items={data.activities} />
            </Section>

            <Section className="bg-gradient-to-b from-transparent to-zyron-blue/5">
                <CommunityJoinCTA data={data.join} />
            </Section>

        </>
    );
};

export default Community;
