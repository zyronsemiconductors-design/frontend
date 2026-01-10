import React from "react";
import { Link } from "react-router-dom";
import {
  Cpu,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Github,
} from "lucide-react";
import { FooterData } from "../types";
import { useSocialLinks } from "../utils/useCMS";

interface FooterProps {
  data: FooterData;
}

const iconMap: Record<string, React.FC<any>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
};

const Footer: React.FC<FooterProps> = ({ data }) => {
  const { links: cmsLinks, loading } = useSocialLinks();

  // Use CMS links if available, otherwise fallback to data.brand.socials
  const socialLinks = !loading && cmsLinks.length > 0
    ? cmsLinks.map(link => ({
      icon: link.icon || link.platform.toLowerCase(),
      url: link.url
    }))
    : data.brand.socials;

  return (
    <footer className="bg-black border-t border-zyron-border text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="w-8 h-8 text-zyron-cyan" />
              <span className="font-display font-bold text-xl text-white">
                {data.brand.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {data.brand.description}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((s, i) => {
                const Icon = iconMap[s.icon] || Linkedin;
                return (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zyron-cyan transition-colors"
                    title={s.icon}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-display font-semibold mb-6">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              {data.company.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-zyron-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-display font-semibold mb-6">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              {data.services.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-zyron-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-display font-semibold mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-zyron-blue mt-1 shrink-0" />
                <span>{data.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-zyron-blue shrink-0" />
                <span>{data.contact.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-zyron-blue shrink-0" />
                <span>{data.contact.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>{data.bottom.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {data.bottom.links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
