import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileDropdown } from "./MobileDropdown";
import NavDropdown from "./NavDropdown";
import Eng from "../content/Eng";
import logo from "../assets/zyronlogo.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<null | "services" | "why">(null);
  const [mobileOpen, setMobileOpen] = useState<null | "services" | "why">(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    setMobileOpen(null);
  }, [location]);

  const linkClass = (path: string) =>
    `relative text-[17px] font-medium transition ${location.pathname === path
      ? "text-zyron-cyan"
      : "text-gray-700 hover:text-zyron-cyan"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-white/70 backdrop-blur-2xl shadow-md h-20"
        : "bg-white h-24"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Zyron Logo"
            className="w-32 h-14 md:w-40 md:h-14 object-contain rounded-lg"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {Eng.nav.main.slice(0, 1).map((item) => (
            <Link key={item.to} to={item.to} className={linkClass(item.to)}>
              {item.label}
            </Link>
          ))}

          <NavDropdown
            title="Our Services"
            items={Eng.nav.services}
            isOpen={openDropdown === "services"}
            onOpen={() => setOpenDropdown("services")}
            onClose={() => setOpenDropdown(null)}
          />

          <NavDropdown
            title="Why Zyron"
            items={Eng.nav.why}
            isOpen={openDropdown === "why"}
            onOpen={() => setOpenDropdown("why")}
            onClose={() => setOpenDropdown(null)}
          />

          {Eng.nav.main.slice(1).map((item) => (
            <Link key={item.to} to={item.to} className={linkClass(item.to)}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile / Tablet Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-black hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden fixed inset-x-0 top-[80px] bg-white text-gray-900 shadow-xl border-t overflow-y-auto z-40"
          >
            <div className="px-6 py-6 border-t">
              {Eng.nav.main.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block py-4 text-lg font-semibold border-b"
                >
                  {item.label}
                </Link>
              ))}

              <MobileDropdown
                title="Our Services"
                items={Eng.nav.services}
                open={mobileOpen === "services"}
                onToggle={() =>
                  setMobileOpen(
                    mobileOpen === "services" ? null : "services"
                  )
                }
              />

              <MobileDropdown
                title="Why Zyron"
                items={Eng.nav.why}
                open={mobileOpen === "why"}
                onToggle={() =>
                  setMobileOpen(mobileOpen === "why" ? null : "why")
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
