import React from "react";
import { usePageContent, getSectionContent } from "../utils/useCMS";
import PageHeader from "../components/PageHeader";
import { ResourceCategories, ResourcesCTA, ResourcesIntro, ResourcesList } from "../components/ResourcesDev";
import Navbar from "../components/Navbar";

const Resources: React.FC = () => {
    const { content } = usePageContent('resources');
    const header = getSectionContent(content, 'header') || { title: '', highlight: '', subtitle: '', bgImage: '' };
    const intro = getSectionContent(content, 'intro') || { title: '', description: '' };
    const categories = getSectionContent(content, 'categories') || [];
    const items = getSectionContent(content, 'items') || [];
    const cta = getSectionContent(content, 'cta') || { title: '', subtitle: '', button: '' };

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


            <ResourcesIntro
                title={intro.title}
                description={intro.description}
            />

            <ResourceCategories items={categories} />

            <ResourcesList items={items} />

            <ResourcesCTA data={cta} />
        </>
    );
};

export default Resources;
