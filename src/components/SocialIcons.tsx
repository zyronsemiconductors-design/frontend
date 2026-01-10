import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const SocialIcons = () => {
    return (
        <div style={{ display: "flex", gap: "16px" }}>
            <a href="https://www.facebook.com/profile.php?id=61585946035332" target="_blank" rel="noopener noreferrer">
                <FaFacebookF size={22} color="white" />
            </a>

            <a href="https://www.instagram.com/zyronsemiconductors" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={22} color="white" />
            </a>

            <a href="https://www.linkedin.com/company/zyronsemiconductors" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn size={22} color="white" />
            </a>

            <a href="https://x.com/ZyronSemi" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={22} color="white" />
            </a>
        </div>
    );
};

export default SocialIcons;
