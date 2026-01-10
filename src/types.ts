export interface Slide {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    imageUrl: string;
}

export interface GeneratedSlideContent {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    imageTheme: string; // Used to pick a relevant placeholder
}
// types/footer.ts
export interface FooterData {
    brand: {
        name: string;
        description: string;
        socials: { icon: "linkedin" | "twitter" | "github"; url: string }[];
    };
    company: { label: string; to: string }[];
    services: { label: string; to: string }[];
    contact: {
        address: string;
        email: string;
        phone: string;
    };
    bottom: {
        copyright: string;
        links: { label: string; to: string }[];
    };
}

export interface CareersCTAData {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    buttonText: string;
    successMessage: string;
    errorMessage: string;
}
