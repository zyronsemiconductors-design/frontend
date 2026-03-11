import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube, FaGithub } from "react-icons/fa";
import { useSocialLinks } from "../utils/useCMS";

const iconMap: Record<string, any> = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    linkedin: FaLinkedinIn,
    twitter: FaTwitter,
    youtube: FaYoutube,
    github: FaGithub
};

const SocialIcons = () => {
    const { links } = useSocialLinks();
    const items = links.map(link => ({
        icon: (link.icon || link.platform || '').toLowerCase(),
        url: link.url
    }));

    if (items.length === 0) return null;

    return (
        <div style={{ display: "flex", gap: "16px" }}>
            {items.map((item, idx) => {
                const Icon = iconMap[item.icon] || FaLinkedinIn;
                return (
                    <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer">
                        <Icon size={22} color="white" />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialIcons;
