import React from "react";
import Eng from "../content/Eng";
import PageHeader from "../components/PageHeader";
import { ResourceCategories, ResourcesCTA, ResourcesIntro, ResourcesList } from "../components/ResourcesDev";
import Navbar from "../components/Navbar";

const Resources: React.FC = () => {
    const data = Eng.resources;

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


            <ResourcesIntro
                title={data.intro.title}
                description={data.intro.description}
            />

            <ResourceCategories items={data.categories} />

            <ResourcesList items={data.items} />

            <ResourcesCTA data={data.cta} />
        </>
    );
};

export default Resources;
